package com.avengers.accounting.carryover.impl;

import com.avengers.accounting.accounttab.interfaces.IAccountBalService;
import com.avengers.accounting.bookset.interfaces.IBizParamService;
import com.avengers.accounting.bookset.interfaces.IBookSetPeriodService;
import com.avengers.accounting.bookset.interfaces.IBookSetService;
import com.avengers.accounting.bookset.param.BookSetQueryParam;
import com.avengers.accounting.carryover.interfaces.IAccountChangeDayService;
import com.avengers.accounting.constant.AccConstants;
import com.avengers.accounting.constant.IAccDict;
import com.avengers.accounting.domain.bean.BizParam;
import com.avengers.accounting.domain.bean.BookSet;
import com.avengers.accounting.domain.bean.BookSetPeriod;
import com.avengers.accounting.voucher.interfaces.IVoucherService;
import com.avengers.bfm.constant.IErrMsg;
import com.avengers.bfm.util.DataUtil;
import com.avengers.bfm.util.DateUtil;
import com.avengers.framework.impl.bizkernel.runtime.exception.BizBussinessException;
import com.avengers.framework.interfaces.share.dataset.IDataset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/********************************************
* 文件名称: AccountChangeDayServiceImp
* 系统名称: 资金交易风险管理系统
* 模块名称: 
* 软件版权:  
* 功能说明: 会计切日
* 系统版本: 2.0.0.1
* 开发人员: zhangsq   
* 开发时间: 2019-06-04 10:08:08
* 审核人员:
* 相关文档:
* 修改记录: 修改日期    修改人员    修改说明
*********************************************/
@Service
public class AccountChangeDayServiceImp  implements IAccountChangeDayService{

	@Autowired
	private IBizParamService iBizParamService;
	@Autowired
	private IBookSetService iBookSetService;
	@Autowired
	private IVoucherService iVoucherService;
	@Autowired
	private IBookSetPeriodService iBookSetPeriodService;
	@Autowired
	private IAccountBalService iAccountBalService;
	
	/**
	 * 撤销切日
	 */
	@Override
	public String cnlChangeDay(String bookCode) throws BizBussinessException {
		String sysDate=iBookSetService.getBookSetInfo(bookCode).getSysDate()+"";//从账套信息中获取会计日期
		String paramValueReturn="";//返回撤销切日后的日期
		String period=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD).getParamValue();
		String nextPeriod=period;//上一个会计期间为当前账套期间
		String maxPeriod;
		String year=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_YEAR).getParamValue();
		int nextYear=Integer.parseInt(year);//上一年为当前年份
		int beginDate;//当前期间开始日
		
		if (!iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_TRUN_FLAG).getParamValue().equals(IAccDict.ACC_TRUN_FLAG.TRUN_FLAG_WHS)) {
			if(iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD_DEAL).getParamValue() != null){
				String periodDeal=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD_DEAL).getParamValue();
				if(!periodDeal.equals(IAccDict.ACC_PERIOD_DEAL.PERIOD_DEAL_WJZ)){
					throw new BizBussinessException(IErrMsg.ERR_DEFAULT,"只有月结账状态为未结转,才能进行撤销切日");
				}
			}else {
				throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "账套业务参数中未发现月结状态!");
			}
			
			if(iVoucherService.haveVoucherBySysDate(bookCode,sysDate)){
				throw new BizBussinessException(IErrMsg.ERR_DEFAULT,"已有凭证,不能进行撤销切日!");
			}
			
			BookSetPeriod bookSetPeriod=iBookSetPeriodService.getBookSetPeriod(bookCode, period, Integer.parseInt(year));
			if(bookSetPeriod==null){
				throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "不存在相应的账套期间信息！");
			}else {
				beginDate=bookSetPeriod.getBeginDate();
			}
			
			try {
				if(DateUtil.diffDate(DateUtil.getSysDate(),beginDate)==0){//当日就是当前期间开始日
					//修改当前会计期间为上一期间
					BizParam bizParam=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD);
					String yearBegin=DateUtil.getFirstDayOfYear(sysDate);
					if(String.valueOf(DateUtil.getSysDate()).equals(yearBegin)){//年初
						//修改当前会计年度为上一年度
						bizParam=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_YEAR);
						
						nextYear=Integer.parseInt(year)-1;
						bizParam.setParamValue(String.valueOf(nextYear));
						iBizParamService.modifyBizParam(bizParam);
						
						//年初时更新上一个期间为上一年的最后的会计期间
						bizParam=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD);
						maxPeriod=iBookSetPeriodService.maxPeriod(bookCode, String.valueOf(nextYear));
						bizParam.setParamValue(maxPeriod);
						iBizParamService.modifyBizParam(bizParam);
						nextPeriod=maxPeriod;
						
						//删除当前会计年度的账套期间信息
						iBookSetPeriodService.deleteBookSetPeriod(bookCode, sysDate.substring(0, 4));
					}else{
						//修改当前会计期间为上一个期间;如果为一位数，直接在它之前去拼上个0;
						nextPeriod=DataUtil.fix0BeforeString(String.valueOf(Integer.parseInt(period)-1), 2);
					}
				}else{
					//当日科目余额表删除
					iAccountBalService.delAccountBal(String.valueOf(beginDate), bookCode);
				}
				paramValueReturn=DateUtil.addDate(sysDate, -1);//切换账套会计日期为上一日
				
				//更新账套基本信息及业务参数
				BookSet bookSet=iBookSetService.getBookSetInfo(bookCode);
				bookSet.setSysDate(Integer.parseInt(paramValueReturn));
				bookSet.setCurrentPeriod(nextYear+nextPeriod);
				iBizParamService.uptRelTimeBP(bookSet);
				iBookSetService.modifyBookSetInfo(bookSet, false);
				
				iBizParamService.uptBizParam(IAccDict.ACC_TRUN_FLAG.TRUN_FLAG_YHS, bookCode, AccConstants.BIZ_PARAM_TRUN_FLAG);
			}catch(Exception e){
				throw new BizBussinessException(IErrMsg.ERR_DBERR, "撤销切日时发生出错!",e);
			}
		}else {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "会计核算不为未核算或者业务参数中会计核算标志不存在！");
		}
		
		return paramValueReturn;
	}

	/**
	 * 会计切日
	 */
	@Override
	public String actChangeDay(String bookCode) throws BizBussinessException {
		String paramValueReturn="";//返回会计切日完的会计日期
		String sysDate=iBookSetService.getBookSetInfo(bookCode).getSysDate()+"";//从账套信息中获取会计日期
		String period=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD).getParamValue();
		String nextPeriod=period;//下一会计期间初始化为当前的会计期间
		String minPeriod;
		String year=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_YEAR).getParamValue();
		int nextYear=Integer.parseInt(year);//下一年初始化为当前年份
		
		if (!iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_TRUN_FLAG).getParamValue().equals(IAccDict.ACC_TRUN_FLAG.TRUN_FLAG_WHS)) {
			if(iVoucherService.haveUnpostVoucher(bookCode,sysDate)){
				throw new BizBussinessException(IErrMsg.ERR_DEFAULT,"有未记账凭证,请您先去记账!");
			}
			
			BookSetPeriod bookSetPeriod=iBookSetPeriodService.getBookSetPeriod(bookCode, period, Integer.parseInt(year));
			int endDate;//当前期间结束日
			if(bookSetPeriod==null){
				throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "不存在相应的账套期间信息！");
			}else{
				endDate=bookSetPeriod.getEndDate();
			}
			
			if(DateUtil.diffDate(DateUtil.getSysDate(),endDate)==0){
				if(!iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD_DEAL).getParamValue().equals(IAccDict.ACC_PERIOD_DEAL.PERIOD_DEAL_YJZ)){
					throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "请您先进行月结！");//判断是否月结
				}
			}
			
			try {
				if(DateUtil.diffDate(DateUtil.getSysDate(),endDate)==0){
					BizParam bizParam=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD);
					String yearEnd=DateUtil.getLastDayOfYear(sysDate);
					if(String.valueOf(DateUtil.getSysDate()).equals(yearEnd)){//年末
						//修改当前年度为下一年度
						bizParam=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_YEAR);
						nextYear=Integer.parseInt(year)+1;
						bizParam.setParamValue(String.valueOf(nextYear));
						iBizParamService.modifyBizParam(bizParam);
						
						//生成下一年的账套期间信息
						iBookSetPeriodService.addOneYearBSPeriod(bookCode, nextYear+"0101");
						
						//年末时更新会计期间为下一年的第一个会计期间
						bizParam=iBizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_PERIOD);
						minPeriod=iBookSetPeriodService.minPeriod(bookCode, String.valueOf(nextYear));
						bizParam.setParamValue(minPeriod);
						iBizParamService.modifyBizParam(bizParam);
						nextPeriod=minPeriod;
						
						iBizParamService.uptBizParam(IAccDict.ACC_PERIOD_DEAL.PERIOD_DEAL_WJZ, bookCode, AccConstants.BIZ_PARAM_PERIOD_DEAL);
					}else{
						//修改当前会计期间为下一个期间;如果为一位数，直接在它之前去拼上个0;
						nextPeriod=DataUtil.fix0BeforeString(String.valueOf(Integer.parseInt(period)+1), 2);
					}
					
					iBizParamService.uptBizParam(IAccDict.ACC_TRUN_FLAG.TRUN_FLAG_WHS, bookCode, AccConstants.BIZ_PARAM_TRUN_FLAG);
				}else{
					iAccountBalService.copyAccountBal(sysDate, bookCode);
				}
				
				//切换账套会计日期为下一日
				paramValueReturn=DateUtil.addDate(sysDate, 1);
				iBizParamService.uptBizParam(paramValueReturn, bookCode,AccConstants.BIZ_PARAM_SYS_DATE);
				
				//账套基本信息及业务参数更新
				BookSet bookSet=iBookSetService.getBookSetInfo(bookCode);
				bookSet.setSysDate(Integer.parseInt(paramValueReturn));
				bookSet.setCurrentPeriod(nextYear+nextPeriod);
				iBizParamService.uptRelTimeBP(bookSet);
				iBookSetService.modifyBookSetInfo(bookSet, false);
			} catch (Exception e) {
				throw new BizBussinessException(IErrMsg.ERR_DBERR, "会计切日时发生出错!");
			}
				
		}else {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "会计核算不为未核算或业务参数中会计核算标志不存在！");
		}
		return paramValueReturn;
	}

	/**
	 * 会计切日查询
	 */
	@Override
	public IDataset qryActChangeDay(String bookCode) throws BizBussinessException {
		BookSetQueryParam bookSetQueryParam =new BookSetQueryParam();
		bookSetQueryParam.setBookcode(bookCode);		
		IDataset ds;
		try {
			ds=iBookSetService.getPubCheckList(bookSetQueryParam);
		}  catch(Exception e){
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "查询会计切日时发生出错!",e);
		}
		return ds;
	}
}
