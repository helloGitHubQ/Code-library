package com.avengers.accounting.accounttab;

import java.sql.SQLException;

import com.avengers.accounting.accounttab.interfaces.IStdAccountTabService;
import com.avengers.accounting.domain.bean.StdAccountTab;
import com.avengers.bfm.business.ServiceFactory;
import com.avengers.bfm.console.base.BaseService;
import com.avengers.bfm.constant.IErrMsg;
import com.avengers.bfm.constant.ITag;
import com.avengers.bfm.util.BeanUtil;
import com.avengers.framework.common.share.dataset.MapWriter;
import com.avengers.framework.impl.bizkernel.runtime.exception.BizBussinessException;
import com.avengers.framework.interfaces.bizkernel.runtime.core.IContext;
import com.avengers.framework.interfaces.share.dataset.IDataset;

/********************************************
* 文件名称: StdAccountTabAction.java
* 系统名称: 资金交易风险管理系统
* 模块名称: 会计核算
* 软件版权:  
* 功能说明: 标准科目
* 系统版本: 2.0.0.0
* 开发人员: zhangsq 
* 开发时间: 2019-05-23 09:00:00
* 审核人员:
* 相关文档:
* 修改记录: 修改日期    修改人员    修改说明
*********************************************/
public class StdAccountTabAction extends BaseService{

	@Override
	protected void action(IContext context) throws Exception {
		if("stdAccount".equals(resCode)) {            
			if( "qryBtn".equals(opCode)) {
				qry(context);//查询当前和直属下级标准科目
			}else if( "addBtn".equals(opCode)) {
				add(context);//新增标准科目
			}else if("edtBtn".equals(opCode)){
				edt(context);//修改标准科目
			}else if("delBtn".equals(opCode)){
				del(context);//删除标准科目
			}else if("queryTree".equals(opCode)){
				queryTree(context);//查询标准科目树
			}else if("qryDetail".equals(opCode)){
				qryDetail(context);//根据查询条件去查询
			}else{
				throw new BizBussinessException(IErrMsg.ERR_NORECORD, "资源:" + resCode +"，操作:" + opCode + "配置不存在!");
			}
		}else {
			throw new BizBussinessException(IErrMsg.ERR_NORECORD, "资源:" + resCode + "配置不存在!");
		}
	}
	
	/**
	 * 根据查询条件去查询
	 * @param context 
	 * @throws BizBussinessException
	 */
	private void qryDetail(IContext context) throws BizBussinessException{
		IDataset request=context.getRequestDataset();
		int start = request.getInt("start");
		int limit = request.getInt("limit");
		String nextAccountFlag = request.getString("nextAccountFlag");
		StdAccountTab stdAccountTab=new StdAccountTab();
		try{
			BeanUtil.dataset2Bean(stdAccountTab, context.getRequestDataset());
		} catch (Exception e) {
			loger.error(IErrMsg.ERR_DEFAULT, e);
			throw new BizBussinessException(IErrMsg.ERR_DBERR,"修改标准科目时发现错误!",e);
		}
		IStdAccountTabService iStdAccountTabService = ServiceFactory.getBean(IStdAccountTabService.class, "stdAccountTabServiceImp");
		IDataset ds = iStdAccountTabService.getSelectStdAccountTab(stdAccountTab,nextAccountFlag,start,limit);
		context.setResult("result", ds);
	}

	/**
	 * 删除标准科目
	 * @param context
	 * @throws BizBussinessException
	 */
	private void del(IContext context) throws BizBussinessException{
		IDataset request = context.getRequestDataset();
		String account = request.getString("account");
		IStdAccountTabService iStdAccountTabService = ServiceFactory.getBean(IStdAccountTabService.class, "stdAccountTabServiceImp");
		iStdAccountTabService.delStdAccountTab(account);
			
		MapWriter mw = new MapWriter();
		mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
		mw.put(ITag.ErrorInfo, "标准科目删除成功！");
		context.setResult("result", mw.getDataset());
	}

	/**
	 * 修改标准科目
	 * @param context
	 * @throws BizBussinessException
	 */
	private void edt(IContext context) throws BizBussinessException,SQLException{
		StdAccountTab stdAccountTab = new StdAccountTab();
		IStdAccountTabService iStdAccountTabService = ServiceFactory.getBean(IStdAccountTabService.class, "stdAccountTabServiceImp");
		
		try{
			BeanUtil.dataset2Bean(stdAccountTab, context.getRequestDataset());
		} catch (Exception e) {
			loger.error(IErrMsg.ERR_DEFAULT, e);
			throw new BizBussinessException(IErrMsg.ERR_DBERR,"修改标准科目时发现错误!",e);
		}
		iStdAccountTabService.uptStdAccountTab(stdAccountTab);
		
		MapWriter mw = new MapWriter();
		mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
		mw.put(ITag.ErrorInfo, "标准科目修改成功！");
		context.setResult("result", mw.getDataset());
	}

	/**
	 * 新增标准科目
	 * @param context
	 * @throws BizBussinessException
	 */
	private void add(IContext context) throws BizBussinessException{
		IDataset request = context.getRequestDataset();
		String account = request.getString("account");
		StdAccountTab stdAccountTab = new StdAccountTab();
		
		IStdAccountTabService iStdAccountTabService = ServiceFactory.getBean(IStdAccountTabService.class, "stdAccountTabServiceImp");
		if (iStdAccountTabService.getStdAccountTab(account)!=null) {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "科目号" + account + "已存在!");
		}
		
		try{
			BeanUtil.dataset2Bean(stdAccountTab, context.getRequestDataset());
		} catch (Exception e) {
			loger.error(IErrMsg.ERR_DEFAULT, e);
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "增加标准科目时出现错误");
		}	
		iStdAccountTabService.addStdAccountTab(stdAccountTab);
		
		MapWriter mw = new MapWriter();
		mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
		mw.put(ITag.ErrorInfo, "标准科目新增成功！");
		context.setResult("result", mw.getDataset());
	}
	
	/**
	 * 查询当前和直属下级标准科目
	 * @param context
	 * @throws BizBussinessException 
	 */
	private void qry(IContext context) throws BizBussinessException {
		IDataset request = context.getRequestDataset();
		String account = request.getString("account");
		int start = request.getInt("start");
		int limit = request.getInt("limit");
		IStdAccountTabService iStdAccountTabService= ServiceFactory.getBean(IStdAccountTabService.class, "stdAccountTabServiceImp");
		IDataset ds = iStdAccountTabService.getNextStdAccountTab(account,start,limit);
		context.setResult("result", ds);
	}

	/**
	 * 查询标准科目树
	 * @param context
	 * @throws BizBussinessException
	 */
	private void queryTree(IContext context) throws BizBussinessException{
		IDataset request = context.getRequestDataset();
		String catalog = request.getString("catalog");
		IStdAccountTabService iStdAccountTabService= ServiceFactory.getBean(IStdAccountTabService.class, "stdAccountTabServiceImp");
		IDataset dataset=iStdAccountTabService.queryTree(catalog);
		context.setResult("result", dataset);
	}

}
