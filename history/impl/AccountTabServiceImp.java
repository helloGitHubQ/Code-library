package com.avengers.accounting.accounttab.impl;

import com.avengers.accounting.accounttab.interfaces.IAccountTabService;
import com.avengers.accounting.bookset.interfaces.IBizParamService;
import com.avengers.accounting.bookset.interfaces.IBookSetService;
import com.avengers.accounting.constant.AccConstants;
import com.avengers.accounting.constant.IAccDict;
import com.avengers.accounting.domain.bean.AccountTab;
import com.avengers.accounting.domain.bean.BizParam;
import com.avengers.accounting.domain.bean.BookSet;
import com.avengers.accounting.domain.bean.Entry;
import com.avengers.accounting.domain.dao.AccountTabDao;
import com.avengers.accounting.util.AccountStructureUtil;
import com.avengers.accounting.voucher.interfaces.IVoucherService;
import com.avengers.bfm.constant.IErrMsg;
import com.avengers.bfm.util.DataUtil;
import com.avengers.framework.impl.bizkernel.runtime.exception.BizBussinessException;
import com.avengers.framework.impl.db.session.DBSessionFactory;
import com.avengers.framework.interfaces.db.session.IDBSession;
import com.avengers.framework.interfaces.share.dataset.IDataset;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/********************************************
 * 文件名称: AccountTabServiceImp.java
 * 系统名称: 资金风险管理系统
 * 模块名称:	会计
 * 软件版权:  
 * 功能说明: 会计科目树
 * 系统版本: 2.0.0.1
 * 开发人员: panyingtao
 * 开发时间: 2019-05-23
 * 审核人员:
 * 相关文档:
 * 修改记录: 修改日期    修改人员    修改说明
 *********************************************/
@Service
public class AccountTabServiceImp implements IAccountTabService {
    @Autowired
    private AccountTabDao accountTabDao;
    @Autowired
    private IBookSetService bookSetService;
    @Autowired
    private IBizParamService bizParamService;
    @Autowired
    private IVoucherService voucherService;
    
    
    
    
    /**
     * 新增会计科目树信息
     *
     * @param accountTab
     * @throws BizBussinessException
     */
    @Override
    public void addAccountTab(AccountTab accountTab) throws BizBussinessException {
        try {
            BookSet bookSet = bookSetService.getBookSetInfo(accountTab.getBookCode());

            //判断上级科目发生过业务，查询本地分录表是否有上级科目的记录，若有则不允许新增该科目
            AccountTab preAccountTab = accountTabDao.getAccountTab(accountTab.getBookCode(), accountTab.getPreAcct());
            IDBSession session = DBSessionFactory.getSession();
            StringBuffer sql = new StringBuffer("select 1 from atbacntery where account = '" + preAccountTab.getAccount() + "'");
            IDataset ds;
            try {
                ds = session.getDataSet(sql.toString());
            } catch (SQLException e) {
                throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "查询上级科目是否为会计凭证生成配置时出现异常！");
            }
            if (ds.getRowCount() > 0) {
                throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "上级科目号" + preAccountTab.getAccount() + "科目已在会计凭证生成配置,不能新增会计科目!");
            }

            //科目结构
            String acctStructure = bookSet.getAcctStructure();

            //计算科目级别
            int structureRight = AccountStructureUtil.isStructureRight(acctStructure, accountTab.getPreAcct(), accountTab.getAccount());
            if (structureRight == -1) {
                throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "输入的科目号" + accountTab.getAccount() + "不符合科目结构" + acctStructure + "!");
            }
            accountTab.setRank(structureRight);

            if (accountTabDao.getAccountTab(accountTab.getBookCode(), accountTab.getAccount()) != null) {
                throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "科目号" + accountTab.getAccount() + "已存在!");
            }
            if (accountTabDao.addAccountTab(accountTab) != 1) {
                throw new BizBussinessException(IErrMsg.ERR_DBERR, "添加会计科目树业务参数出错");
            } else {
                preAccountTab.setBottomFlag(IAccDict.ACC_BOM_FLAG.ACC_BOM_NO);
                accountTabDao.modifyAccountTab(preAccountTab);
            }
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "添加会计科目树业务数据库出错", e);
        }
    }

    /**
     * 删除会计科目树信息
     *
     * @param account
     * @param bookCode
     * @param pre_acct
     * @throws BizBussinessException
     */
    @Override
    public void deleteAccountTab(String account, String bookCode, String pre_acct) throws BizBussinessException {
        //检查删除的科目中有没有用来进行会计分录配置
        StringBuffer sql = new StringBuffer("select 1 from atbacntery where account in ( select account from atbstdaccounttab  where account =? or pre_acct like ? )");
        IDBSession session = DBSessionFactory.getSession();
        int num;
        try {
            num = session.account(sql.toString(), account, account + "%");
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "检查删除的科目中有没有用来进行会计分录配置时数据库查询出错");
        }
        if (num > 0) {
            throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "删除的科目进行过会计分录配置");
        } else {
            try {
                session.beginTransaction();
                session.execute("delete from atbaccounttab where book_code=? and (account=? or pre_acct like ? ) ", bookCode, account, account + "%");
                //删除完之后  更新最底级标志
                int ifPreant = session.account("select count(*) from atbaccounttab where book_code=? and  pre_acct = ?  ", bookCode, pre_acct);
                if (ifPreant == 0) {
                    session.execute("update ATBACCOUNTTAB set bottom_flag=? where book_code=? and account=?", IAccDict.ACC_BOM_FLAG.ACC_BOM_YES, bookCode, pre_acct);
                }
                session.endTransaction();
            } catch (SQLException e) {
                try {
                    session.rollback();
                } catch (SQLException e1) {
                    throw new BizBussinessException(IErrMsg.ERR_DBERR, "删除会计科目数据库回滚出错", e1);
                }
                throw new BizBussinessException(IErrMsg.ERR_DBERR, "删除会计科目数据库出错", e);
            }
        }
    }

    /**
     * 修改会计科目树信息
     *
     * @param accountTab
     * @throws BizBussinessException
     */
    @Override
    public void modifyAccountTab(AccountTab accountTab) throws BizBussinessException {
        try {
            if (accountTabDao.modifyAccountTab(accountTab) != 1) {
                throw new BizBussinessException(IErrMsg.ERR_DBERR, "修改会计科目树业务参数出错");
            }
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "修改会计科目树业务数据库出错", e);
        }
    }

    /**
     * 获取会计科目树信息
     *
     * @param bookCode
     * @param accountTab
     * @return
     * @throws BizBussinessException
     */
    @Override
    public AccountTab getAccountTab(String bookCode, String accountTab) throws BizBussinessException {
        try {
            return accountTabDao.getAccountTab(bookCode, accountTab);
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "查询会计科目树业务数据库出错", e);
        }
    }

    @Override
    public String getAccountTabsByBookCodeAndAccount(String bookCode, String account) throws BizBussinessException {
        BookSet bookSetInfo = bookSetService.getBookSetInfo(bookCode);
        AccountTab accountTab = null;
        try {
            accountTab = accountTabDao.getAccountTab(bookCode, account);
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "查询会计科目数据库出错", e);
        }
        int rank = accountTab.getRank();
        String acctStructure = bookSetInfo.getAcctStructure();
        int length = acctStructure.split("-").length;
        IDBSession session = DBSessionFactory.getSession();
        int tmpRank=rank;
        String allAccounts = account+",";
        String tmpAccounts="";
        while (tmpRank<length){
            //科目等级小于最大等级时
            if (tmpRank==rank){
                tmpAccounts=account;
            }
            IDataset dataSet = null;
            try {
                dataSet = session.getDataSet("select account from atbaccounttab where pre_acct in (" + tmpAccounts + ")");
            } catch (SQLException e) {
                throw new BizBussinessException(IErrMsg.ERR_DBERR, "查询会计科目数据库出错", e);
            }
            tmpAccounts="";
            dataSet.beforeFirst();
            while (dataSet.hasNext()){
                tmpAccounts+= "'"+dataSet.getString("account")+"'"+",";
            }
            allAccounts+=tmpAccounts;
            if (tmpAccounts.contains(",")){
                tmpAccounts=tmpAccounts.substring(0,tmpAccounts.length()-1);
            }
            tmpRank++;
        }
        return allAccounts.substring(0,allAccounts.length()-1);
    }

    /**
     * 获取该账套下会计科目信息
     *
     * @param bookCode
     * @return
     * @throws BizBussinessException
     */
    @Override
    public List<AccountTab> getAccTabByBC(String bookCode) throws BizBussinessException {
        IDBSession session = DBSessionFactory.getSession();
        try {
            List<AccountTab> list = session.getObjectList("select * from atbaccounttab where book_code=? ", AccountTab.class, bookCode);
            return list;
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DBERR, "查询会计科目树业务数据库出错", e);
        }
    }

    @Override
    public Map<String, String> checkShowOrRequire(String bookCode, String account) throws BizBussinessException {
        AccountTab accountTab = getAccountTab(bookCode, account);
	  /*第一位记账机构   1
		第二位成本中心   2
		第三位数量   3
		第四位往来单位  4
		第五位外币币种 5*/
        String subFlag = accountTab.getSubFlag();
        Map<String, String> map = new HashMap<String, String>();
        if (subFlag.contains("1")) {//记账机构
            map.put("requireDept", "1");
        } else {
            map.put("requireDept", "0");
        }
        if (subFlag.contains("2")) {//成本中心
            map.put("requireCost", "1");
        } else {
            map.put("requireCost", "0");
        }
        if (subFlag.contains("3")) {//数量
            map.put("requireQuan", "1");
        } else {
            map.put("requireQuan", "0");
        }
        //判断外币币种是否显示
        BizParam bizParam = bizParamService.getBizParam(bookCode, AccConstants.BIZ_PARAM_CURR_SEPARATE_FLAG);
        if (bizParam != null && bizParam.getParamValue().equals("0") && subFlag.contains("5")) {//账套参数外币币种为0 外币币种 并且辅助核算标志勾选外币币种时
            map.put("showForeginCode", "1");
        } else {
            map.put("showForeginCode", "0");
        }
        return map;
    }

    @Override
    public IDataset queryTreeList(String catalog, String bookCode) throws BizBussinessException {
        IDBSession session = DBSessionFactory.getSession();
        StringBuilder sb = new StringBuilder("select direction,pre_acct,account,short_name, case when pre_acct='/' then 'false' else 'true' end as leaf  from atbaccounttab  where 1=1");
        //20190604 cql 增加不为空的判断
        ArrayList<Object> objects = new ArrayList<Object>();
        if (!DataUtil.isNullStr(catalog)) {
            sb.append(" and catalog=?");
            objects.add(catalog);
        }
        if (StringUtils.isNotBlank(bookCode)) {
            sb.append(" and book_code=?");
            objects.add(bookCode);
        }
        try {
            return session.getDataSetByList(sb.toString(),objects);
        } catch (SQLException e) {
            throw new BizBussinessException(IErrMsg.ERR_DEFAULT, "查询会计科目发生异常", e);
        }
    }

    
    @Override
	
	public boolean isOverdraw(Entry entry, String bookCode) throws BizBussinessException {
		boolean isOver = true;
		
		AccountTab accountTab = getAccountTab(bookCode, entry.getAccount());
		//若查询不到科目信息，报错；
		if (accountTab == null) {
			throw new BizBussinessException(IErrMsg.ERR_DEFAULT,"科目号为" + entry.getAccount() + "的科目不存在，请维护科目；");
		}
		if (accountTab.getOverdraw() != null && accountTab.getOverdraw().equals("0")) {//不为空并且不允许透支
			double totalAmount = 0.0;//计算总金额
			double qcye = 0.0;//已记账期末余额
			double unPostAmount = 0.0;//未记账金额
			boolean tabIsDebit = accountTab.getDirection().equals("D") ? true : false;// 科目是否为借方科目
			boolean tabIsIncome = accountTab.getDirection().equals("I") ? true : false;// 科目是否为收方金额
			boolean listIsDebit = accountTab.getDirection().equals("D") ? true : false;// 分录是否为借方金额
			boolean listIsIncome = accountTab.getDirection().equals("I") ? true : false;// 科目是否为收方科目
			if (tabIsDebit || tabIsIncome) {
				List<Object> params = new ArrayList<Object>();
				String sql = " select sum(balance+debit_amt-credit_amt) as qm from atbaccountbal where book_code=? and cur_code=? " 						+ " and account=? and cost_center = ? ";
				// 当取不到已记账期末余额时，默认其值为期末余额为0；
				
				params.add(bookCode);
				params.add(entry.getCurCode());
				params.add( entry.getAccount());
				params.add(entry.getCostCenter());
		        IDBSession session = DBSessionFactory.getSession();
		        IDataset ds = null;
				try {
					ds = session.getFirstRecordDatasetByList(sql, params);
				} catch (SQLException e) {
					
					throw new BizBussinessException(IErrMsg.ERR_DEFAULT,"科目余额数据查询失败！",e);
				}
				String qm = ds.getString("qm");
				if (!DataUtil.isNullStr(qm)) {
					qcye = Double.parseDouble(qm);
				}
				
				unPostAmount = voucherService.getUnPostAmount(accountTab, entry.getCurCode(), entry.getCostCenter())[0];
				if (listIsDebit || listIsIncome) {
					totalAmount = qcye + unPostAmount + entry.getAmt();
				} else {
					totalAmount = qcye + unPostAmount - entry.getAmt();
				}
			} else {
				String sql = " select sum(balance-debit_amt+credit_amt) as qm from atbaccountbal where book_code= ? and cur_code= ? " 
						+ " and account= ? and cost_center = ? ";
				List<Object> params = new ArrayList<Object>();
				params.add(bookCode);
				params.add(entry.getCurCode());
				params.add(entry.getAccount());
				params.add(entry.getCostCenter());
				IDBSession session = DBSessionFactory.getSession();
		        IDataset ds = null;
				try {
					ds = session.getFirstRecordDatasetByList(sql, params);
				} catch (SQLException e) {
					throw new BizBussinessException(IErrMsg.ERR_DEFAULT,"科目余额数据查询失败！",e);
				}
				
				//当取不到已记账期末余额时，默认其值为期末余额为0；
				String qm = ds.getString("qm");
				if (!DataUtil.isNullStr(qm)) {
					qcye = Double.parseDouble(qm);
				}
				unPostAmount = voucherService.getUnPostAmount(accountTab, entry.getCurCode(), entry.getCostCenter())[0];
				if (listIsDebit || listIsIncome) {
					totalAmount = qcye + unPostAmount - entry.getAmt();
				} else {
					totalAmount = qcye + unPostAmount + entry.getAmt();
				}
			}
			if (totalAmount >= 0) {
				isOver = false;
			}
		} else {
			isOver = false;
		}
		return isOver;
	}
    

}
