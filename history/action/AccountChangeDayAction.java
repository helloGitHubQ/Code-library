package com.avengers.accounting.carryover;

import java.sql.SQLException;

import com.avengers.accounting.carryover.interfaces.IAccountChangeDayService;
import com.avengers.bfm.business.ServiceFactory;
import com.avengers.bfm.console.base.BaseService;
import com.avengers.bfm.constant.IErrMsg;
import com.avengers.bfm.constant.ITag;
import com.avengers.framework.common.share.dataset.MapWriter;
import com.avengers.framework.impl.bizkernel.runtime.exception.BizBussinessException;
import com.avengers.framework.impl.db.session.DBSessionFactory;
import com.avengers.framework.interfaces.bizkernel.runtime.core.IContext;
import com.avengers.framework.interfaces.db.session.IDBSession;
import com.avengers.framework.interfaces.share.dataset.IDataset;

/********************************************
 * 文件名称: AccountCarryOverAction
 * 系统名称: 资金交易风险管理系统
 * 模块名称: 会计核算
 * 软件版权: 
 * 功能说明: 会计切日
 * 系统版本: 
 * 开发人员: zhangsq
 * 开发时间:  
 * 审核人员:
 * 相关文档:
 * 修改记录: 修改日期    修改人员    修改说明
 * 		 20190531 zhhangsq  规范命名	
 *********************************************/
public class AccountChangeDayAction extends BaseService{

	@Override
	protected void action(IContext context) throws Exception {
		if ("accountChangeDay".equals(resCode)) {
			if("qryActChangeDay".equals(opCode)){
				//会计切日查询
				qryActChangeDay(context);
			}else if("actChangeDay".equals(opCode)){
				//会计切日
				actChangeDay(context);
			}else if("cnlChangeDay".equals(opCode)){
				//撤销切日
				cnlChangeDay(context);
			}else{
				throw new BizBussinessException(IErrMsg.ERR_NORECORD, "操作:" + opCode + "配置不存在!");
			}
		}else {
			throw new BizBussinessException(IErrMsg.ERR_NORECORD, "资源:" + resCode + "配置不存在!");
		}
	}
	
	/**
	 * 撤销切日
	 * @param context
	 * @throws BizBussinessException
	 */
	private void cnlChangeDay(IContext context) throws BizBussinessException{
		IDBSession session = DBSessionFactory.getSession();
		IDataset request = context.getRequestDataset();
		String status = request.getString("status");
		String paramValueReturn = "";
        String bookCode=request.getString("book_code");
		IAccountChangeDayService iAccountChangeDayService=ServiceFactory.getBean(IAccountChangeDayService.class);
		if(status.equals("1")){
			try{
				session.beginTransaction();
				paramValueReturn=iAccountChangeDayService.cnlChangeDay(bookCode);
				session.endTransaction();
			} catch (SQLException e) {
				try {
					session.rollback();
				} catch (SQLException e1) {
					throw new BizBussinessException(IErrMsg.ERR_OTHEREXP, "撤销切日时数据回滚失败！",e1);
				}
				throw new BizBussinessException(IErrMsg.ERR_DBERR, "会计切日失败！",e);
			}
			MapWriter mw = new MapWriter();
			mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
			mw.put(ITag.ErrorInfo, "撤销切日切换成功！");
			mw.put("paramValue", paramValueReturn);
			context.setResult("result", mw.getDataset());
		}else {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "账套未启用!");
		}
	}

	/**
	 * 会计切日
	 * @param context
	 * @throws BizBussinessException
	 */
	private void actChangeDay(IContext context) throws BizBussinessException{
		IDBSession session = DBSessionFactory.getSession();
		IDataset request = context.getRequestDataset();
		String status = request.getString("status");
		String paramValueReturn = "";
		IAccountChangeDayService iAccountChangeDayService=ServiceFactory.getBean(IAccountChangeDayService.class);
        String bookCode = request.getString("book_code");
		if(status.equals("1")){//账套状态为启用
			try {
				session.beginTransaction();
				paramValueReturn=iAccountChangeDayService.actChangeDay(bookCode);
				session.endTransaction();
			} catch (SQLException e) {
				try {
					session.rollback();
				} catch (SQLException e1) {
					throw new BizBussinessException(IErrMsg.ERR_OTHEREXP, "会计切日时数据回滚失败！",e1);
				}
				throw new BizBussinessException(IErrMsg.ERR_DBERR, "会计切日失败！",e);
			}
			
			MapWriter mw = new MapWriter();
			mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
			mw.put(ITag.ErrorInfo, "会计切日切换成功！");
			mw.put("paramValue", paramValueReturn);
			context.setResult("result", mw.getDataset());
		}else{
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "账套未启用!");
		}
	}

	/**
	 * 会计切日查询
	 * @param context
	 * @throws BizBussinessException
	 */
	private void qryActChangeDay(IContext context) throws BizBussinessException{
		IDataset request = context.getRequestDataset();
		String bookCode = request.getString("book_code");
		IAccountChangeDayService iAccountChangeDayService=ServiceFactory.getBean(IAccountChangeDayService.class);
		IDataset ds=iAccountChangeDayService.qryActChangeDay(bookCode);
		context.setResult("result", ds);
	}

}
