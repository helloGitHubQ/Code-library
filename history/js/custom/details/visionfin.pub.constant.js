
/**
 * 公共常量定义
 * @type 
 */
juipub.constant = {
        chnWordWidth:13,
        engWordWidth:8,
        //工作流中的节点名设置需要与以下的说明保持一致。由于工作流以名字进行匹配，因此节点名字需要以下面列举的最后后缀，从而使得不同的复核审批能够被不同的菜单所识别。        
        Flow_node_check_suf : "_check", //所有指令发起业务复核节点使用
        Flow_node_approve_suf : "_approve", //所有指令发起业务审批节点使用

        Flow_approve_pass : "3",// 同意
        Flow_approve_refuse : "4",// 拒绝
        Flow_node_square_deal_match : "交易确认",   //债券类成交确认手节点
        Flow_node_square_deal_check : "_deal",  //债券类成交后续的复核审批节点使用
        Flow_node_square_fxdeal_check : "_fxdeal", //外汇及衍生品成交后续的复核审批节点使用
        Flow_node_square_dqdeal : "到期处理",
        Flow_node_square_dqdeal_check : "到期处理复核",
        Flow_node_square_sfq_qr : "收付券确认",
        Flow_node_square_sfq_fh : "收付券复核",
        Flow_node_square_cz_firstsp : "出账审批初审", //已取消
        Flow_node_square_cz_lastsp : "出账审批终审",  //已取消
        Flow_node_square_kj_qr : "会计确认",    //已取消
        Flow_node_square_kj_fh : "会计复核",    //已取消
        Flow_node_square_kj_sp : "会计审批",    //已取消
        Flow_node_square_zj_qr : "资金确认",    //已取消
        Flow_node_square_sxf_lr : "手续费录入",  //已取消
        Flow_node_square_sxf_fh : "手续费录入复核",    //已取消
        Flow_node_square_qs_qr : "资金清算",
        Flow_node_square_qs_sp : "清算审批",
        Flow_node_square_qs_hb : "资金划拨",

        Flow_node_tender_process : "中标处理",
        Flow_node_tender_process_check : "中标处理复核",

        Flow_node_untender_process : "未中标处理",
        Flow_node_untender_process_check : "未中标处理复核",

        Flow_node_tender_hold_register : "持仓登记",
        Flow_node_tender_hold_register_check : "持仓登记复核",

        Flow_node_tender_pay : "缴款录入",  //已取消
        Flow_node_tender_pay_check : "缴款复核",    //已取消

        Flow_node_tender_fee : "承销手续费录入",   //已取消
        Flow_node_tender_fee_check : "承销手续费复核", //已取消

        Flow_node_tender_settle : "中标结算",   //已取消
        Flow_node_tender_settle_check : "中标结算复核",   //已取消
        Flow_node_dxdf : "兑付",  

        Flow_node_cash_instr : "付息兑付发起",
        Flow_node_cash_instr_check : "付息兑付发起复核",
        Flow_node_cash_deal : "付息兑付缴款", //已取消
        Flow_node_cash_deal_check : "付息兑付缴款复核", //已取消
        Flow_node_capital_collection : "本金收取",

        Flow_node_fee_start : "费用支付发起",
        Flow_node_fee_start_check : "费用支付发起复核",
        Flow_node_fee_pay : "费用支付缴款",   //已取消
        Flow_node_fee_pay_check : "费用支付缴款复核",   //已取消
        
        Flow_node_fee_pay_check : "费用支付缴款复核",   //已取消
        Flow_node_fee_pay_check : "费用支付缴款复核",   //已取消

        
        Flow_node_trade_start : "交易发起", 
        Flow_node_trade_approve : "_trade", //交易发起、交易管理动作发起复核审批使用
        
        Flow_node_apply_approve : "_apply", //授信额度申请审批使用
        //用于清空表格
        EMPTY_RECORD:"{ 'dataSetResult' : [ {'totalCount':-1,'dataSetName':'result','data':[]} ], 'returnCode' : 0, 'errorNo' : '0', 'errorInfo' : null }",
        day : '1',
        month : '2',
        year : '3',
        week : '4'
    };