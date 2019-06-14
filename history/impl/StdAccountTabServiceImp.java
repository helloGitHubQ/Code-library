package com.avengers.accounting.accounttab.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.avengers.accounting.accounttab.interfaces.IStdAccountTabService;
import com.avengers.accounting.constant.IAccDict;
import com.avengers.accounting.domain.bean.StdAccountTab;
import com.avengers.accounting.domain.dao.StdAccountTabDao;
import com.avengers.accounting.util.AccountStructureUtil;
import com.avengers.bfm.constant.IErrMsg;
import com.avengers.bfm.util.DataUtil;
import com.avengers.bfm.util.HsSqlString;
import com.avengers.framework.bizframe.core.framework.util.SysParameterUtil;
import com.avengers.framework.impl.bizkernel.runtime.exception.BizBussinessException;
import com.avengers.framework.impl.db.session.DBSessionFactory;
import com.avengers.framework.interfaces.db.session.IDBSession;
import com.avengers.framework.interfaces.share.dataset.IDataset;


/********************************************
 * 文件名称: StdAccountTabServiceImp
 * 系统名称: 资金风险管理系统
 * 模块名称: 
 * 软件版权: 
 * 功能说明: 标准科目实现类 
 * 系统版本:
 * 开发人员: zhangsq 
 * 开发时间: 2019-05-23 09:01:00
 * 审核人员: 
 * 相关文档: 
 * 修改记录: 修改日期 修改人员 修改说明
 *********************************************/
@Service
public class StdAccountTabServiceImp implements IStdAccountTabService{

	@Resource
	private StdAccountTabDao stdAccountTabDao;
	
	/**
	 * 获取标准科目
	 */
	@Override
	public StdAccountTab getStdAccountTab(String account) throws BizBussinessException {
		StdAccountTab sat = new StdAccountTab();
		try {
			sat=stdAccountTabDao.getStdAccountTab(account);
		} catch (SQLException e) {
			throw new  BizBussinessException(IErrMsg.ERR_DBERR,"获取标准科目出错！");
		}
		return sat;
	}

	/**
	 * 新增标准科目
	 */
	@Override
	public void addStdAccountTab(StdAccountTab sat) throws BizBussinessException {		
		String account = sat.getAccount();
		String pre_acct = sat.getPreAcct();
		String short_name = sat.getShortName();
		String subject_type = sat.getSubjectType();
		String bottom_flag = getStdAccountTab(pre_acct).getBottomFlag();//查询上级科目是否为最低级科目
		
		String name="";
		int rank=0;//科目级别 rank
		
		name=qryNameAll(short_name,pre_acct);//通过方法拼接
		
		rank=AccountStructureUtil.isStructureRight(SysParameterUtil.getProperty("STD_STRUCTURE"), pre_acct, account);
	    if(rank==-1){
	    	throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "不符合科目结构规则!");
	    }
		
		if(bottom_flag==IAccDict.ACC_BOM_FLAG.ACC_BOM_YES){
			if(checkSupCfg(account)>0){
				throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "配置过会计分录,不能去新增标准科目!");
			}
		}
		
		try {
			sat.setName(name);
			sat.setSubjectType(subject_type);
			sat.setRank(rank);//科目级别根据账套科目结构计算得出
			sat.setOverdraw("1");
			sat.setBottomFlag("1");//最低级标志
			
			stdAccountTabDao.addStdAccountTab(sat);
			
			//设置上级目录为非最低级标识
			uptBottomFlag(IAccDict.ACC_BOM_FLAG.ACC_BOM_NO, pre_acct);
		} catch (SQLException e) {
			throw new  BizBussinessException(IErrMsg.ERR_DBERR,"新增标准科目出错！");
		}
	}

	/**
	 * 修改标准科目
	 */
	@Override
	public void edtStdAccountTab(StdAccountTab sat) throws BizBussinessException {
		try {
			stdAccountTabDao.modifyStdAccountTab(sat);
		} catch (SQLException e) {
			throw new  BizBussinessException(IErrMsg.ERR_DBERR,"修改标准科目出错！");
		}
	}

   /**
	 * 查询上级科目的全称
	 * @param short_name 简称
	 * @param pre_acct 上级科目
	 * @return name 拼接后的当前的全称
	 * @throws BizBussinessException
	 */
	public String qryNameAll(String short_name,String pre_acct) throws BizBussinessException{
		String name="";
		IDBSession session = DBSessionFactory.getSession();
		try {
			IDataset ds=session.getDataSet("select name from atbstdaccounttab where account=?", pre_acct);
			name=ds.getString("name")+"_"+short_name;
		} catch (SQLException e) {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "查询上级科目全称时发生错误!");
		}
		return name;
	}
	
	/**
	 * 修改标准科目树
	 */
	public boolean uptStdAccountTab(StdAccountTab sat) throws BizBussinessException{
		IDBSession session = DBSessionFactory.getSession();
		String account =sat.getAccount();
		String name="";
		if (getStdAccountTab(account)==null) {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "科目号" + account + "不存在!");
		} 
		try {
			name=qryNameAll(sat.getShortName(),sat.getPreAcct());
			HsSqlString hss = new HsSqlString("ATBSTDACCOUNTTAB",HsSqlString.TypeUpdate);
			hss.set("pre_acct", sat.getPreAcct());
			hss.set("name", name);
			hss.set("short_name", sat.getShortName());
			hss.set("direction", sat.getDirection());
			hss.set("catalog", sat.getCatalog());
			hss.set("subject_type", sat.getSubjectType());
			hss.setWhere("account", account);
			session.executeByList(hss.getSqlString(),hss.getParamList());
		} catch (SQLException e) {
			throw new  BizBussinessException(IErrMsg.ERR_DBERR,"修改标准科目出错！");
		}
		return true;
		
	}
	
	/**
	 * 删除标准科目
	 */
	@Override
	public void delStdAccountTab(String account) throws BizBussinessException {
		int count=checkSupCfg(account);//检查删除的科目中有没有用来进行会计分录配置
		
		if(count>0){
			throw new  BizBussinessException(IErrMsg.ERR_DBERR,"删除的科目中有进行过会计分录配置！");
		}
		
		IDataset ds=getNextStdAccountTab(account,0,0);//20190611 zhangsq 修改删除多条标准科目
		ds.beforeFirst();
		try {
			while(ds.hasNext()){
				ds.next();
				account=ds.getString("account");
				stdAccountTabDao.deleteStdAccountTab(ds.getString("account"));
			}
		} catch (Exception e) {
			throw new  BizBussinessException(IErrMsg.ERR_DBERR,"删除标准科目出错！");
		}
	}

	/**
	 * 查询标准科目树
	 */
	@Override
	public IDataset queryTree(String catalog) throws BizBussinessException {
		IDBSession session=DBSessionFactory.getSession();
		StringBuffer sql= new StringBuffer("select a.direction,a.subject_type,a.account,a.short_name,a.catalog,a.pre_acct,case when a.pre_acct = '/' then 'false' else 'true' end as leaf from atbstdaccounttab a where 1 = 1");
		List<Object> params=new ArrayList<Object>();
		if(!DataUtil.isNullStr(catalog)){
			sql.append(" and a.catalog = ?");
			params.add(catalog);
		}
		sql.append(" order by a.account");
		IDataset dataset = null;
		try {
			dataset = session.getDataSetByList(sql.toString(), params);
		} catch (SQLException e) {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "查询标准科目树时发生错误！");
		}
		return dataset;
	}

	

	/**
	 * 判断上级科目是否配置过会计分录配置
	 * @param account
	 * @return
	 * @throws BizBussinessException
	 */
	private int checkSupCfg(String account) throws BizBussinessException{
		StringBuffer sql= new StringBuffer("select count(*) count from atbacntery where 1=1 ");
		List<Object> params=new ArrayList<Object>();
		if(!DataUtil.isNullStr(account)){
			sql.append(" and account=? ");
			params.add(account);
		}
		
		IDBSession session = DBSessionFactory.getSession();
		IDataset ds;
		int count = 0;
		try {
			ds=session.getDataSetByList(sql.toString(), params);
			count=ds.getInt("count");
		} catch (SQLException e) {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT,"查询上级科目是否为配置过会计分录配置时出现！");
		}
		return count;
	}

	/**
	 * 查询当前和下级标准科目
	 */
	public IDataset getNextStdAccountTab(String account,int start,int limit) throws BizBussinessException {
		StringBuffer sql = new StringBuffer("select a.* from atbstdaccounttab a where 1=1");
		List<Object> params = new ArrayList<Object>();
		if(!DataUtil.isNullStr(account)){
			sql.append(" and a.account = ?");
			params.add(account);
			sql.append(" or a.pre_acct =?");
			params.add(account);
		}
		
		sql.append(" order by a.account");
		
		IDBSession session = DBSessionFactory.getSession();
		IDataset ds = null;
		try {
			if(limit==0){
				ds = session.getDataSetByList(sql.toString(),params);
			}else{
				ds = session.getDataSetByListForPage(sql.toString(), start, limit, params);
				int count = HsSqlString.getSqlCount(sql.toString(), session, params);
				ds.setTotalCount(count);
			}
		} catch (SQLException e) {
			throw new BizBussinessException(IErrMsg.ERR_DBERR,"查询当前和下级标准科目出现错误！");
		}
		return ds;
	}

	/**
	 * 根据查询条件去查询
	 */
	@Override
	public IDataset getSelectStdAccountTab(StdAccountTab stdAccountTab,String nextAccountFlag,int start,int limit) throws BizBussinessException {
		String account = stdAccountTab.getAccount();
		String name = stdAccountTab.getName();
		String catalog = stdAccountTab.getCatalog();
		String subject_type = stdAccountTab.getSubjectType();
		
		StringBuffer sql = new StringBuffer("select a.* from atbstdaccounttab a where 1=1");
		List<Object> params = new ArrayList<Object>();
		if(!DataUtil.isNullStr(account)){
			sql.append(" and a.account = ?");
			params.add(account);
		}
		if(!DataUtil.isNullStr(name)){
			sql.append(" and a.name like ?");
			params.add("%"+name+"%");
		}
		if(!DataUtil.isNullStr(catalog)){
			sql.append(" and a.catalog = ?");
			params.add(catalog);	
		}
		if(!DataUtil.isNullStr(subject_type)){
			sql.append(" and a.subject_type = ?");
			params.add(subject_type);
		}
		if(nextAccountFlag.equals("true")){//含下级科目
			sql.append(" or a.pre_acct =?");
			params.add(account);
		}
		sql.append(" order by a.account");
		
		IDBSession session = DBSessionFactory.getSession();
		IDataset ds = null;
		try{	
			if(limit==0){
				ds = session.getDataSetByList(sql.toString(),params);
			}else{
				ds = session.getDataSetByListForPage(sql.toString(), start, limit, params);
				int count = HsSqlString.getSqlCount(sql.toString(), session, params);
				ds.setTotalCount(count);
			}
		} catch (SQLException e) {
			throw new BizBussinessException(IErrMsg.ERR_DBERR, "数据库查询出错");
		}
		
		return ds;
	}

	/**
	 * 设置上级目录为非最低级标识
	 */
	@Override
	public void uptBottomFlag(String bottomFlag,String account) throws BizBussinessException {
		IDBSession session=DBSessionFactory.getSession();
		try {
			session.execute("update atbstdaccounttab set bottom_flag=? where account=?",bottomFlag,account);
		} catch (SQLException e) {
			throw new BizBussinessException(IErrMsg.ERR_DBERR, "设置上级目录为非最低级标识出错!");
		}
	}

	
	/**
	 * 查询标准科目列表(根据科目拼接的字符串)
	 */
	@Override
	public IDataset getStdAccountTabList(String accounts) throws BizBussinessException {
		IDBSession session=DBSessionFactory.getSession();
		String sql = "select short_name from atbstdaccounttab where account in (?) ";
		IDataset ds;
		try {
			ds = session.getDataSet(sql, accounts);
		} catch (SQLException e) {
			throw new BizBussinessException(IErrMsg.ERR_PARAMETER, "查询标准科目列表出错!");
		}
		return ds;
	}
	
}
