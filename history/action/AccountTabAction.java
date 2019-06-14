package com.avengers.accounting.accounttab;

import com.avengers.accounting.accounttab.interfaces.IAccountTabService;
import com.avengers.accounting.domain.bean.AccountTab;
import com.avengers.bfm.business.ServiceFactory;
import com.avengers.bfm.console.base.BaseService;
import com.avengers.bfm.constant.IErrMsg;
import com.avengers.bfm.constant.ITag;
import com.avengers.bfm.util.DataUtil;
import com.avengers.bfm.util.HsSqlString;
import com.avengers.framework.common.share.dataset.MapWriter;
import com.avengers.framework.impl.bizkernel.runtime.exception.BizBussinessException;
import com.avengers.framework.impl.db.session.DBSessionFactory;
import com.avengers.framework.interfaces.bizkernel.runtime.core.IContext;
import com.avengers.framework.interfaces.db.session.IDBSession;
import com.avengers.framework.interfaces.share.dataset.IDataset;
import org.apache.commons.lang.StringUtils;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * *****************************************************************************
 * 系统名称: 资金风险管理系统
 * 模块名称: 会计模块
 * 类 名 称: AccountTabAction
 * 软件版权:
 * 开发人员: panyt
 * 开发时间: 2019-05-22
 * 审核人员:
 * 相关文档:
 * 修改记录: 修改日期   修改人员  修改说明
 * ****************************************************************************
 */
public class AccountTabAction extends BaseService {


    @Override
    protected void action(IContext context) throws Exception {

        if ("accountTab".equals(resCode)) {
            if ("queryTree".equals(opCode)) {
                queryTreeList(context);
            } else if ("qryBtn".equals(opCode)) {
                //查询当前和直属下级
                qry(context);
            } else if ("addBtn".equals(opCode)) {
                //新增会计科目
                add(context);
            } else if ("edtBtn".equals(opCode)) {
                //修改会计科目
                edt(context);
            } else if ("delBtn".equals(opCode)) {
                //删除会计科目
                del(context);
            }  else if ("queryTabMaxLevel".equals(opCode)) {
                //查询科目最大级别
                queryTabMaxLevel(context);
            }else if ("qryAllCatalogTree".equals(opCode)) {
                //查询所有种类的树
            	qryAllCatalogTree(context);
            } else {
                throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "操作:" + opCode + "配置不存在");
            }
        } else {
            throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "操作:" + resCode + "配置不存在");
        }
    }

    /**
     * 20190606 chenql 增加
     * 查询所有种类的树
     * @throws BizBussinessException 
	 * @param 
	 * @throws 
	 */
	private void qryAllCatalogTree(IContext context) throws BizBussinessException {
		IDBSession session = DBSessionFactory.getSession();
        try {
            IDataset request = context.getRequestDataset();
            String bookCode = request.getString("bookCode");

            StringBuilder sb = new StringBuilder("select a.direction,a.pre_acct,a.account, a.short_name,case when a.pre_acct='*' then 'false' else 'true' end as leaf from(  select direction,pre_acct,account, short_name,book_code from atbaccounttab union  select '',  '*', '/', '所有种类', book_code from atbaccounttab ) a where 1=1");
            List params = new ArrayList<String>();
            if (!DataUtil.isNullStr(bookCode)) {
                sb.append(" and a.book_code=? ");
                params.add(bookCode);
            }
            sb.append(" order by a.account ");
            IDataset dataset = session.getDataSetByList(sb.toString(),params);
            context.setResult("result", dataset);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "查询会计科目发生异常", e);
        }
		
	}

	/**
     * 删除会计科目
     *
     * @param context
     * @throws BizBussinessException
     */
    private void del(IContext context) throws BizBussinessException {
        IDataset request = context.getRequestDataset();
        String account = request.getString("account");
        String bookCode = request.getString("bookCode");
        String pre_acct = request.getString("pre_account");
        IAccountTabService accountTabService = ServiceFactory.getBean(IAccountTabService.class, "accountTabServiceImp");
        accountTabService.deleteAccountTab(account, bookCode,pre_acct);
        MapWriter mw = new MapWriter();
        mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
        mw.put(ITag.ErrorInfo, "会计科目删除成功！");
        context.setResult("result", mw.getDataset());
    }

    /**
     * 修改会计科目
     *
     * @param context
     * @throws BizBussinessException
     */
    private void edt(IContext context) throws BizBussinessException {
        IDataset request = context.getRequestDataset();
        String account = request.getString("account");
        String shortName = request.getString("shortName");
        String direction = request.getString("direction");
        String subject_type = request.getString("subject_type");
        String book_code = request.getString("book_code");
        String overdraw = request.getString("overdraw");
        String subFlag1 = request.getString("dept");
        String subFlag2 = request.getString("costCenter");
        String subFlag3 = request.getString("number");
        String subFlag4 = request.getString("unit");
        String subFlag5 = request.getString("fx");
        String subFlag = subFlag1 + "," + subFlag2 + "," + subFlag3 + "," + subFlag4+ "," + subFlag5;

        IAccountTabService iAccountTabService = ServiceFactory.getBean(IAccountTabService.class, "accountTabServiceImp");
        AccountTab oldAccountTab = iAccountTabService.getAccountTab(book_code, account);
        AccountTab oldPreAccountTab = iAccountTabService.getAccountTab(book_code, oldAccountTab.getPreAcct());
        if (oldAccountTab == null) {
            throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "科目号" + account + "不存在!");
        }
        try {
            oldAccountTab.setShortName(shortName);
            oldAccountTab.setName(oldPreAccountTab.getName() + "_" + shortName);
            oldAccountTab.setDirection(direction);
            oldAccountTab.setOverdraw(overdraw);
            oldAccountTab.setSubjectType(subject_type);
            oldAccountTab.setSubFlag(subFlag);

            iAccountTabService.modifyAccountTab(oldAccountTab);
            MapWriter mw = new MapWriter();
            mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
            mw.put(ITag.ErrorInfo, "会计科目修改成功！");
            context.setResult("result", mw.getDataset());
        } catch (Exception e) {
            loger.error(IErrMsg.ERR_DEFAULT, e);
            throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "修改会计科目时发现未知异常");
        }
    }

    /**
     * 新增会计科目
     *
     * @param context
     * @throws BizBussinessException
     */
    private void add(IContext context) throws BizBussinessException {
        IDataset request = context.getRequestDataset();
        String account = request.getString("account");
        String pre_acct = request.getString("pre_acct");
        String shortName = request.getString("shortName");
        String preName = request.getString("preName");
        String direction = request.getString("direction");
        String subject_type = request.getString("subject_type");
        String catalog = request.getString("catalog");
        String overdraw = request.getString("overdraw");
        String subFlag1 = request.getString("dept");
        String subFlag2 = request.getString("costCenter");
        String subFlag3 = request.getString("number");
        String subFlag4 = request.getString("unit");
        String subFlag5 = request.getString("fx");
        String subFlag = subFlag1 + "," + subFlag2 + "," + subFlag3 + "," + subFlag4+ "," + subFlag5;
        String book_code = request.getString("book_code");

        AccountTab accountTab = new AccountTab();
        if (StringUtils.isNotBlank(overdraw)){
            accountTab.setOverdraw(overdraw);
        }
        accountTab.setCatalog(catalog);
        accountTab.setAccount(account);
        accountTab.setPreAcct(pre_acct);
        accountTab.setShortName(shortName);
        accountTab.setName(preName + "_" + shortName);
        accountTab.setDirection(direction);
        accountTab.setSubjectType(subject_type);
        accountTab.setSubFlag(subFlag);
        accountTab.setBookCode(book_code);
        IAccountTabService iAccountTabService = ServiceFactory.getBean(IAccountTabService.class, "accountTabServiceImp");
        iAccountTabService.addAccountTab(accountTab);
        MapWriter mw = new MapWriter();
        mw.put(ITag.ErrorNo, IErrMsg.ERR_SUCCESS);
        mw.put(ITag.ErrorInfo, "会计科目新增成功！");
        context.setResult("result", mw.getDataset());
    }


    /**
     * 查询会计科目树
     *
     * @param context
     * @throws BizBussinessException
     */
    public void queryTreeList(IContext context) throws BizBussinessException {
        IAccountTabService accountTabService = ServiceFactory.getBean(IAccountTabService.class);
        IDataset request = context.getRequestDataset();
        //类别
        String catalog = request.getString("catalog");
        String bookCode = request.getString("bookCode");
        IDataset iDataset = accountTabService.queryTreeList(catalog, bookCode);
        context.setResult("result", iDataset);
    }
    /**
     * 查询账套的科目的最大科目级别
     *
     * @param context
     * @throws BizBussinessException
     */
    public void queryTabMaxLevel(IContext context) throws BizBussinessException {
        IDataset request = context.getRequestDataset();
        String bookCode = request.getString("bookCode");
        IDBSession session = DBSessionFactory.getSession();
        IDataset dataSet;
        try {
             dataSet = session.getDataSet("select distinct rank from atbaccounttab where   rank!=0 and book_code=?", bookCode);
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "查询最大科目级别数据库出错",e);
        }
        context.setResult("result", dataSet);
    }

    /**
     * 查询当前和直属下级会计科目
     *
     * @param context
     * @throws BizBussinessException
     */
    private void qry(IContext context) throws BizBussinessException {
        IDataset request = context.getRequestDataset();
        int start = request.getInt("start");
        int limit = request.getInt("limit");
        String account = request.getString("account");
        String bottomFlag = request.getString("bottomFlag");
        String shortName = request.getString("shortName");
        String bookCode = request.getString("bookCode");
        String sonAccount = request.getString("sonAccount");
        if (StringUtils.isBlank(bookCode)){
            return;
        }
        String catalog = request.getString("catalog");
        String subject_type = request.getString("subject_type");
        try {
            StringBuffer sql = new StringBuffer("select a.* from atbaccounttab a where 1=1");
            List<Object> params = new ArrayList<Object>();
            if (StringUtils.isNotBlank(sonAccount)){
                if (!DataUtil.isNullStr(account)) {
                    sql.append(" and  a.account like ? ");
                    params.add(account+"%");
                }
            }else {
                if (!DataUtil.isNullStr(account)) {
                    sql.append(" and a.account=? ");
                    params.add(account);
                }
            }

            if (!DataUtil.isNullStr(shortName)){
                sql.append(" and a.short_name like ? ");
                params.add("%"+shortName+"%");
            }
            if (!DataUtil.isNullStr(bookCode)){
                sql.append(" and a.book_code = ? ");
                params.add(bookCode);
            }
            if (!DataUtil.isNullStr(bottomFlag)){
                sql.append(" and a.bottom_flag = ? ");
                params.add(bottomFlag);
            }
            if (!DataUtil.isNullStr(subject_type)){
                sql.append(" and a.subject_type = ? ");
                params.add(subject_type);
            }
            if (!DataUtil.isNullStr(catalog)){
                sql.append(" and a.catalog = ? ");
                params.add(catalog);
            }
            sql.append(" order by a.account asc");
            IDBSession session = DBSessionFactory.getSession();
            IDataset ds;
            if (limit == 0) {
                ds = session.getDataSetByList(sql.toString(), params);
            } else {
                ds = session.getDataSetByListForPage(sql.toString(), start, limit, params);
                int count = HsSqlString.getSqlCount(sql.toString(), session, params);
                ds.setTotalCount(count);
            }
            context.setResult("result", ds);
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "数据库查询出错",e);
        }
    }

}
