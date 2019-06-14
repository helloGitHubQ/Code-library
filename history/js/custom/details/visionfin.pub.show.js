/**
 * show
 * 放置业务相关的公共功能展示方法
 */

/**
 * 附件上传tab公共方法
 * tabsId：Tabs的id
 * type：附件归属类别1：指令类   2：业务类
 * businNo 传入编号
 * 在指定tabs中添加附件上传 
 */
juipub.showFileupload = function(tabsId,type,businNo,erecordNo,key){
    var srcUrl = ctxPath+'/topjui/jsp/pub/instrStockFile.jsp?attachType='+type+'&businNo='+businNo+'&tabsId='+tabsId;
    if(erecordNo){
        srcUrl = srcUrl + '&erecordNo='+erecordNo;
    }
    if(key){
        srcUrl = srcUrl + '&key='+key;
    }
    $('#'+tabsId).iTabs('add',{
        title:'业务附件',
        content:'<iframe frameborder="no" id="fileupload" border="0" width="100%" height="100%" src="'+srcUrl+'">',
        closable:false,
        selected: false
    });
};

/**
 * 交易对手选择公共界面
 * @param buttonParams 由四个参数组成：
 *  'text':显示名字的控件id,不需要时赋值为null或不传入
 *  'value':存放id的控件id,
 *  'calBackFun':回调函数,
 *  'flag': true是单选，flase是多选
 *  现支持依赖于textbox或combo的控件
 */
juipub.showDailyCustInfo = function showDailyCustInfo(){
        //默认为文本框
        var params =$("#"+this.id).textbox("options").buttonParams;
        var boxType="";//控件类型
        var rTitle="常用交易对手选择";
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        //根据className判断控件类型
        if(this.className.indexOf("combogrid") != -1 ){//20190408 daijy 增加combogrid类型
            boxType='combogrid';
        }else if(this.className.indexOf("combo") != -1 ){
            boxType='combo';
        }else{
            boxType='textbox';
        }
        // 创建元素<div>,返回一个jquery对象
        var $userDialog = $('<div id="pubUserDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubUserOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href:ctxPath+'/topjui/jsp/pub/dailyCustInfo.jsp?flag='+params.flag+'&textId='+params.text+'&valueId='+params.value+'&callFunction='+params.calBackFun+'&boxType='+boxType, 
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubUserOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $userDialog.iDialog(opts);
};

/**
 * 用户信息选择公共界面
 * @param buttonParams 由四个参数组成：
 *  'text':显示名字的控件id,不需要时赋值为null或不传入
 *  'value':存放id的控件id,
 *  'calBackFun':回调函数,
 *  现支持依赖于textbox或combo的控件
 */
juipub.showUserSelector = function showUserSelector(){
        //默认为文本框
        var params =$("#"+this.id).textbox("options").buttonParams;
        var boxType="";//控件类型
        var rTitle="用户信息";
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        //根据className判断控件类型
        if(this.className.indexOf("combogrid") != -1 ){//20190408 daijy 增加combogrid类型
            boxType='combogrid';
        }else if(this.className.indexOf("combo") != -1 ){
            boxType='combo';
        }else{
            boxType='textbox';
        }
        // 创建元素<div>,返回一个jquery对象
        var $userDialog = $('<div id="userDialog"></div>');
        //创建窗体
        var opts = {
            id: 'userDialog',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            //href: '../pub/userSelector.jsp?flag='+params.flag+'&textId='+params.text+'&valueId='+params.value+'&callFunction='+params.calBackFun, 
            href: ctxPath+'/topjui/jsp/pub/userSelector.jsp?flag='+params.flag+'&valueId='+params.value+'&callFunction='+params.calBackFun+'&textId='+params.text+'&boxType='+boxType,
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('userDialog');} }
            ]
        };
         //在div元素中嵌入dialog
         $userDialog.iDialog(opts);
};

/**
 * 岗位选择公共界面
 * @param buttonParams 由四个参数组成：
 *  'text':显示名字的控件id,,不需要时赋值为null或不传入
 *  'value':存放id的控件id,
 *  'calBackFun':回调函数,
 *  现支持依赖于textbox或combo的控件
 */
juipub.showPositionSelector = function showPositionSelector(){
        //默认为文本框
        var params =$("#"+this.id).textbox("options").buttonParams;
        var rTitle="岗位选择";
        var boxType="";//控件类型
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        //根据className判断控件类型
        if(this.className.indexOf("combo") != -1 ){
            boxType='combo';
        }else{
            boxType='textbox';
        }
        // 创建元素<div>,返回一个jquery对象
        var $userDialog = $('<div id="pubGwDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubGwOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href: ctxPath+'/topjui/jsp/pub/positionSelector.jsp?textId='+params.text+'&valueId='+params.value+'&callFunction='+params.calBackFun+'&boxType='+boxType, 
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubGwOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $userDialog.iDialog(opts);
};

/**
 * 外部交易对手选择公共界面
 * @param buttonParams 由四个参数组成：
 *  'text':显示名字的控件id,,不需要时赋值为null或不传入
 *  'value':存放id的控件id,
 *  'calBackFun':回调函数,
 *  现支持依赖于textbox或combo的控件
 */
juipub.showOutCustSelector = function showOutCustSelector(){
        //默认为文本框
        var params =$("#"+this.id).textbox("options").buttonParams;
        var rTitle="外部交易对手选择";
        var boxType="";//控件类型
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        //根据className判断控件类型
        if(this.className.indexOf("combo") != -1 ){
            boxType='combo';
        }else{
            boxType='textbox';
        }
        // 创建元素<div>,返回一个jquery对象
        var $userDialog = $('<div id="pubOutCustDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubOutCustOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href:ctxPath+'/topjui/jsp/pub/outCust.jsp?valueId='+params.value+'&callFunction='+params.calBackFun+'&boxType='+boxType+'&fullName='+params.fullName+'&shortName='+params.shortName+'&creditNo='+params.creditNo, 
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubOutCustOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $userDialog.iDialog(opts);
};

/**
 * 明细界面 
 * businClass：业务类型
 * serialNo：交易流水号
 * showType 明细类型
 * 呼出一个dialog加载交易明细
 */
juipub.showDetailService = function(businClass,serialNo,showType){
        var rTitle="";
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=900; // 宽度
        if(businClass=='sysCustInfo'){
          rTitle="对手方交易对手明细";
          rHref=ctxPath+'/topjui/jsp/pub/sysCustInfoView.jsp?custNo='+serialNo;
        }else if(businClass=='selfCustInfo'){
          rTitle="我方信息明细";
          var rHeight=300; // 高度
          var rWidth=900; // 宽度
          rHref=ctxPath+'/topjui/jsp/pub/selfCustInfoView.jsp?custNo='+serialNo;
        }else if(businClass=='netInfo'){
          rTitle="清算信息明细";
          var rHeight=300; // 高度
          var rWidth=900; // 宽度
          var record={'nettingNo2':serialNo}
          rHref=ctxPath+'/topjui/jsp/pub/netInfo.jsp?param='+(JSON.stringify(record)).replace(/\"/g,"'");
        }
        // 创建元素<div>,返回一个jquery对象
        var $detailDialog = $('<div id="detailDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubDetailDialog',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            modal: true,//非模态框
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href: rHref, // 加载页面元素的地址
            buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubDetailDialog'); } }
            ]
        };
         //在div元素中嵌入dialog
         $detailDialog.iDialog(opts);
};
/**
 * 交易信息明细界面 TODO
 * businClass：业务类型
 * serialNo：交易流水号
 * showType 明细类型1:查看界面 2:修改界面 3:成交确认 4:复制界面  5:展期界面 6:平仓
 * 呼出一个dialog加载交易明细
 */
juipub.showTradeDetailService = function(businClass,serialNo,showType,otherParam){
		var rTitle="";
    	var rHref="";
    	var rHeight=650; // 高度
        var rWidth=1000; // 宽度
    	if('B1,BA'.indexOf(businClass)!=-1){
    	  rTitle="外汇即期交易";
    	  rHref=ctxPath+'/topjui/jsp/bfm/fxbiz/fxtrade/foreignExchangeSpotDetail.jsp?dealSerialNo='+serialNo+'&showType='+showType;
    	}else if('B2,BB'.indexOf(businClass)!=-1){
    	  rTitle="远期交易";
    	  rHref=ctxPath+'/topjui/jsp/bfm/fxbiz/fxtrade/foreignExchangeForwardDetail.jsp?dealSerialNo='+serialNo+'&showType='+showType;
    	}else if('B3,BC'.indexOf(businClass)!=-1){
    	  rTitle="掉期交易";
    	  rHref=ctxPath+'/topjui/jsp/bfm/fxbiz/fxtrade/foreignExchangeSwapDetail.jsp?dealSerialNo='+serialNo+'&showType='+showType;
    	}else if('B4'.indexOf(businClass)!=-1){
    	  rTitle="外汇货币掉期交易";
    	  rHref=ctxPath+'/topjui/jsp/bfm/fxbiz/fxtrade/foreignCcsDetail.jsp?dealSerialNo='+serialNo+'&showType='+showType;
    	}else if('B5'.indexOf(businClass)!=-1){
    	  rTitle="外汇期权交易";
    	  rHref=ctxPath+'/topjui/jsp/bfm/fxbiz/fxtrade/foreignExchangeOptionDetail.jsp?dealSerialNo='+serialNo+'&showType='+showType;
    	}else if('92'.indexOf(businClass)!=-1){
    	  rTitle="利率互换交易";
    	  rHref=ctxPath+'/topjui/jsp/bfm/fxbiz/fxtrade/interestRateSwapDetail.jsp?dealSerialNo='+serialNo+'&showType='+showType;
    	}else if('HEDGE'.indexOf(businClass)!=-1){
    	  rTitle="敞口对冲申请";
    	  rHref=ctxPath+'/topjui/jsp/basedata/exposurerequest/exposureRequestDetail.jsp?dealSerialNo='+serialNo+'&showType='+showType+'&indexDailyModify='+otherParam;
    	}else{
    		$.iMessager.alert("提示","该交易不支持交易明细查看!");
    		return;
    	}   
    	 if(showType=='1'){
    	  	rTitle+="明细";
    	  }else if(showType=='2'){
    	    rTitle+="修改";
    	  }else if(showType=='3'){
    	    rTitle+="成交确认";
    	  }else if(showType=='4'){
    	    rTitle+="复制";
    	  }else if(showType=='5'){
    	    rTitle+="展期";
    	  }else if(showType=='6'){
    	    rTitle="交易平仓";
    	  }
    	// 创建元素<div>,返回一个jquery对象
    	var $tradeDetailDialog = $('<div id="tradeDetailDialog"></div>');
    	//创建窗体
	    var opts = {
            id: 'pubTradeDetailDialog',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            modal: true,//非模态框
            height: rHeight, // 高度
            width: rWidth, // 宽度
            content: '<iframe frameborder="no" id="tradeDetailFrame" border="0" width="100%" height="100%" src="'+rHref+'">',
            buttons: '#tradeButtonGroup'
        };
         //在div元素中嵌入dialog
         $tradeDetailDialog.iDialog(opts);
};

/**
 * 业务流程明细公共界面
 *  @param simpleSerialNo 序号
 *  @param businClass 业务类型
 */
juipub.workflowDetail = function workflowDetail(param){
        var rTitle="业务流程明细";
        // 创建元素<div>,返回一个jquery对象
        var $pubWorkflowDialog = $('<div id="pubWorkflowDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubWorkFlowOptions',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: 500, // 高度
            width: 1050, // 宽度
            href: ctxPath+'/topjui/jsp/pub/workFlowDetail.jsp?param='+(JSON.stringify(param)).replace(/\"/g,"'"),
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubWorkFlowOptions');} }
            ]
        };
         //在div元素中嵌入dialog
         $pubWorkflowDialog.iDialog(opts);
};


/**
 * 外部机构选择公共界面
 * @param buttonParams 由四个参数组成：
 *  'text':显示名字的控件id,,不需要时赋值为null或不传入
 *  'value':存放id的控件id,
 *  'calBackFun':回调函数,
 *  现支持依赖于textbox或combo的控件
 */
juipub.showOutOrgSelector = function showOutOrgSelector(){
        //默认为文本框
        var params =$("#"+this.id).textbox("options").buttonParams;
        var rTitle="外部机构选择";
        var boxType="";//控件类型
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        //根据className判断控件类型
        if(this.className.indexOf("combo") != -1 ){
            boxType='combo';
        }else{
            boxType='textbox';
        }
        // 创建元素<div>,返回一个jquery对象
        var $orgDialog = $('<div id="pubOutOrgDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubOutOrgOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href: ctxPath+'/topjui/jsp/pub/outOrg.jsp?orgId='+params.value+'&callFunction='+params.calBackFun+'&boxType='+boxType+'&orgName='+params.text, 
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubOutOrgOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $orgDialog.iDialog(opts);
};

/**
 * 清算路径选择公共界面
 * @param buttonParams 由2个参数组成：
 *  'value':存放id的控件id,
 *  'calBackFun':回调函数,
 *  现支持依赖于textbox的控件
 */
juipub.showAccountInfo = function showAccountInfo(){
        //默认为文本框
        var params =$("#"+this.id).textbox("options").buttonParams;
        var rTitle="清算路径选择";
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        // 创建元素<div>,返回一个jquery对象
        var $userDialog = $('<div id="pubAccountInfoDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubAccountInfoOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href: ctxPath+'/topjui/jsp/pub/accountInfo.jsp?valueId='+params.value+'&callFunction='+params.calBackFun+'&record='+(JSON.stringify(params.record)).replace(/\"/g,"'"), 
            buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubAccountInfoOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $userDialog.iDialog(opts);
};

/**
 * 申请信息查询条件公共界面
 *  @param param 查询的参数
 * @param gridId 显示结果的grid的id
 * @author zhangsq 20190516
 */
juipub.instrQryDetail = function instrQryDetail(param1){
        var url = '';   
        if(param1=='bankBondBsd'){
            url = '/topjui/jsp/pub/instrQry.jsp?from=bankBondBsd';
        }else if(param1=='commInstrApprove'){
            url = '/topjui/jsp/pub/instrQry4CommInstr.jsp';
        }else{
            url='/topjui/jsp/pub/instrQry.jsp';
        }
        var rTitle="申请信息查询";
        // 创建元素<div>,返回一个jquery对象
        var $pubWorkflowDialog = $('<div id="instrQryDialog"></div>');
        //创建窗体
        var opts = {
            id: 'instrQryOptions',// dialog唯一标识id
            title:rTitle,// 标题
            closed: true, // 关闭状态
            height: 350, // 高度
            width: 900, // 宽度
            closable:false,
            onClose:function(){},//覆盖onClose不被销毁
            href: ctxPath+url,
             buttons: [
                {text: '确定', iconCls: 'fa fa-search', btnCls: 'topjui-btn-blue', handler:getQry },
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){ $("#instrQryOptions").iDialog('close');} }
            ]
        };
         //在div元素中嵌入dialog
         $pubWorkflowDialog.iDialog(opts);
};

/**
 * 交易事件查询条件公共界面
 *  @param param 查询的参数
 * @param gridId 显示结果的grid的id
 */
juipub.tradeQryDetail = function tradeQryDetail(){
        var rTitle="交易查询";
        // 创建元素<div>,返回一个jquery对象
        var $pubWorkflowDialog = $('<div id="tradeQryDialog"></div>');
        //创建窗体
        var opts = {
            id: 'tradeQryOptions',// dialog唯一标识id
            title:rTitle,// 标题
            closed: true, // 关闭状态
            height: 350, // 高度
            width: 900, // 宽度
            closable:false,
            onClose:function(){},//覆盖onClose不被销毁
            href: ctxPath+'/topjui/jsp/pub/tradeQry.jsp',
             buttons: [
                {text: '清空', iconCls: 'fa fa-refresh', btnCls: 'topjui-btn-blue', handler:reset },       
                {text: '确定', iconCls: 'fa fa-search', btnCls: 'topjui-btn-blue', handler:getQry },
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){ $("#tradeQryOptions").iDialog('close');} }
            ]
        };
        //在div元素中嵌入dialog
        $pubWorkflowDialog.iDialog(opts);
};

/**
 * 复核审批处理公共界面
 *  @param inTitle 要显示的title
 *  @param setSelectionDatas 要审批的数据
 *  @param btnName 按钮名称
 *  @param callBack 父窗口需要定义一个名称为approveCallback的回调函数用于提交后执行刷新列表。
 */
juipub.approveWin = function approveWin(title,setSelectionDatas,btnName,approveType,callBack){
        // 创建元素<div>,返回一个jquery对象
        var $pubWorkflowDialog = $('<div id="approveWin"></div>');
        //创建窗体
        var opts = {
            id: 'approveWinOptions',// dialog唯一标识id
            title:title,// 标题
            closed: false, // 关闭状态
            height: 350, // 高度
            width: 700, // 宽度
            closable:false,
            href: ctxPath+'/topjui/jsp/pub/approveWindow.jsp?setSelectionDatas='+(JSON.stringify(setSelectionDatas)).replace(/\"/g,"'")+'&btnName='+btnName+'&approveType='+approveType,
            buttons : '#notExistsBtn'
        };
         //在div元素中嵌入dialog
         $pubWorkflowDialog.iDialog(opts);
};
/**
 * 现金流查询tab公共方法
 * tabsId：Tabs的id
 * dealSerialNo：现金流的成交编号
 * flag  1-查询交易流水号，否则传入的为成交编号
 * 在指定tabs中添加现金流查询 
 */
juipub.showInstCflQuery = function(tabsId,dealSerialNo,flag,title){
    var srcUrl = ctxPath+'/topjui/jsp/pub/instrCflQuery.jsp?dealSerialNo='+dealSerialNo+'&tabsId='+tabsId+'&flag='+flag;
    var rTitle="现金流查询";
    if(!juipub.isEmpty(title)){
    	rTitle=title;
    }
    $('#'+tabsId).iTabs('add',{
        title:rTitle,
        content:'<iframe frameborder="no" id="fileupload" border="0" width="100%" height="100%" src="'+srcUrl+'">',
        closable:false,
        selected: false
    });
};
/**
 * 现金流查询公共方法
 * dealSerialNo：现金流的成交编号
 * flag  1-查询交易流水号，否则传入的为成交编号
 * 现金流查询弹窗
 */
juipub.showInstCflDialog = function showInstCflDialog(dealSerialNo,flag){
        // 创建元素<div>,返回一个jquery对象
        var $instCflDialog = $('<div id="instcflDiv"></div>');
        //创建窗体
        var opts = {
            id: 'instcflOptions',// dialog唯一标识id
            title:'现金流查询',// 标题
            closed: false, // 关闭状态
            height: 700, // 高度
            width: 1000, // 宽度
            closable:true,
            href: ctxPath+'/topjui/jsp/pub/instrCflQuery.jsp?dealSerialNo='+dealSerialNo+'&flag='+flag
        };
         //在div元素中嵌入dialog
         $instCflDialog.iDialog(opts);
};
/**
 * 提前到期公共界面
 *  @param trade_serial_no 序号
 *  @param deal_serial_no 交易流水号
 *  @param showFlag  标志
 */
juipub.tqdqDetailDialog = function tqdqDetailDialog(param){
        var rTitle="提前到期";
        // 创建元素<div>,返回一个jquery对象
        var $pubTqdqDetailDialog = $('<div id="tqdqDetailDialog"></div>');
        //创建窗体
        var opts = {
            id: 'tqdqDetailOptions',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: 500, // 高度
            width: 1050, // 宽度
            href: ctxPath+'/topjui/jsp/bfm/fxbiz/advancematurity/tqdqDetail.jsp?param='+(JSON.stringify(param)).replace(/\"/g,"'"),
             buttons: "#dqBtnGroup"
        };
         //在div元素中嵌入dialog
         $pubTqdqDetailDialog.iDialog(opts);
};
/**
 * 外汇提前到期公共界面
 *  @param busin_type 业务类型
 *  @param currency_pair 货币对
 *  @param deal_serial_no 交易流水号
 *  @param showFlag  标志
 */
juipub.tqdqFxDetailDialog = function tqdqFxDetailDialog(param){
        var rTitle="提前到期";
        // 创建元素<div>,返回一个jquery对象
        var $pubFxTqdqDetailDialog = $('<div id="fxtqdqDetailDialog"></div>');
        //创建窗体
        var opts = {
            id: 'fxtqdqDetailOptions',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: 500, // 高度
            width: 1050, // 宽度
            href:ctxPath+'/topjui/jsp/bfm/fxbiz/advancematurity/fxTQDQDetail.jsp?param='+(JSON.stringify(param)).replace(/\"/g,"'"),
            buttons:"#fxdqBtnGroup"
        };
         //在div元素中嵌入dialog
         $pubFxTqdqDetailDialog.iDialog(opts);
};
/**
 *  交易补录信息公共界面
 *  @param busin_type 业务类型
 *  @param currency_pair 货币对
 *  @param deal_serial_no 交易流水号
 *  @param showFlag  标志
 */
juipub.fxSupplementDetailDialog = function fxSupplementDetailDialog(param){
        var rTitle="交易信息补录";
        // 创建元素<div>,返回一个jquery对象
        var $pubFxTqdqDetailDialog = $('<div id="fxSupplementDetailDialog"></div>');
        //创建窗体
        var opts = {
            id: 'fxSupplementDetailOptions',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: 350, // 高度
            grid:{
            	type:'datagrid',
			    id:param.gridId
            },
            width: 1150, // 宽度
            href:ctxPath+'/topjui/jsp/pub/fxSupplement.jsp?param='+(JSON.stringify(param)).replace(/\"/g,"'"),
            url:'com.avengers.bfm.console.basedata.cmdealext.CmDealExtService.cmdealextinfo.service?resCode=cmdealext&opCode=qryBtn&dealSerialNo='+param.dealSerialNo
        };
         //在div元素中嵌入dialog
         $pubFxTqdqDetailDialog.iDialog(opts);
};

/**
 * 金属基础交易选择公共界面
 * @param buttonParams 由四个参数组成：
 *  'value':存放id的控件id,
 *  'calBackFun':回调函数,
 *  'flag': false是单选，true是多选
 */
juipub.showMetalTradeInfo = function showMetalTradeInfo(){
        //默认为文本框
        var params =$("#"+this.id).textbox("options").buttonParams;
        var rTitle="金属基础交易";
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        var qryParam={'exposureType':$('#'+params.exposuerType).iCombobox('getValue'),'open_branch':$('#'+params.openBranch).iCombotree('getValue'),'metalNo':$('#'+params.value).iTextbox('getValue')};
        // 创建元素<div>,返回一个jquery对象
        var $metalTradeDialog = $('<div id="pubMetalTradeDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubMetalTradeOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href:ctxPath+'/topjui/jsp/pub/metalTradeInfo.jsp?param='+(JSON.stringify(params)).replace(/\"/g,"'")+'&callFunction='+params.calBackFun+'&qryPram='+(JSON.stringify(qryParam)).replace(/\"/g,"'"),
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubMetalTradeOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $metalTradeDialog.iDialog(opts);
}

/**
 *  金属基础交易信息公共界面
 *  @param dealSerialNo 交易流水号
 *  @param chgNo  版本号
 *  @param gridId  调用界面的gridid
 */
juipub.metaltransDetailDialog = function metaltransDetailDialog(param){
        var $dialogViewLock = $('<div id="dialogViewLock"></div>');
        var dealSerialNo = param.dealSerialNo; 
        var chgNo = param.chgNo; 
        var opts = {
			id : 'dialogViewLockOpts',// 唯一标识id
			title : '金属基础交易信息明细',// 标题 
			closed : false, // 关闭状态
			height : 700, // 高度
			width : 1200, // 宽度
			grid:{
		           type:'datagrid',
		           id:param.gridId
		        },
			href : ctxPath+'/topjui/jsp/pub/metaltransViewLock.jsp?dealSerialNo='+dealSerialNo+'&chgNo='+chgNo, // 加载页面元素的地址
			url:'com.avengers.bfm.console.basedata.metaltrade.MetalTradeService.metaltradeinfo.service?resCode=metaltrade&opCode=qryBtn&dealSerialNo='+dealSerialNo+'&chgNo='+chgNo,
			buttons : '#notExistsBtn'
		};
		$dialogViewLock.iDialog(opts);
};

/**
 *  期权行权明细信息公共界面
 *  @param dealSerialNo 交易流水号
 *  @param tradeSerialNo  操作序号
 *  @param gridId  调用界面的gridid
 */
juipub.dealDetailOptionExc = function dealDetailOptionExc(config){
        var rTitle="期权行权";
        // 创建元素<div>,返回一个jquery对象
        var $pubDetailOptionExc = $('<div id="pubDetailOptionExc"></div>');
        //创建窗体
        var opts = {
            id: 'pubDetailOptionExcOpts',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: 800, // 高度
            width: 1200, // 宽度
            grid:{
		           type:'datagrid',
		           id:config.gridId
		        },
            href: ctxPath+'/topjui/jsp/bfm/fxbiz/alldetailwin/dealDetailOptionExc.jsp?dealSerialNo='+config.dealSerialNo+'&tradeSerialNo='+config.tradeSerialNo,
            url:"com.avengers.bfm.console.fxbiz.foreignexchangeoptionexc.ForeignExchangeOptionExcService.foreignexchangeoptionexcinfo.service?resCode=foreignexchangeoptionexc&opCode=query4OptionExcDetail&dealAttr=2&dealSerialNo="+config.dealSerialNo+"&tradeSerialNo="+config.tradeSerialNo,
            buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubDetailOptionExcOpts');} }
            ]
        };
         //在div元素中嵌入dialog
         $pubDetailOptionExc.iDialog(opts);
};
/**
 *  关联金属基础交易信息公共界面
 *  @param dealSerialNo 交易流水号
 *  @param chgNo  版本号
 *  @param gridId  调用界面的gridid
 */
juipub.showChgRelMetalTradeInfo = function showChgRelMetalTradeInfo(){
        //默认为文本框
        var optionParams =$("#"+this.id).textbox("options").buttonParams;
        var exposureType="001";
		var chgType=$('#'+optionParams.chgType).iCombobox('getValue');
		qryTag='2';
		if(chgType=='4'){
			exposureType='003';
			qryTag='6';
		}
		var qryParam={'exposureType':exposureType,'flag':qryTag};
        var rTitle="关联金属基础交易";
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        // 创建元素<div>,返回一个jquery对象
        var $metalRelTradeDialog = $('<div id="pubRelMetalTradeDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubRelMetalTradeOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href:ctxPath+'/topjui/jsp/pub/chgRelMetalTradeInfo.jsp?param='+(JSON.stringify(optionParams)).replace(/\"/g,"'")+'&callFunction='+optionParams.calBackFun+"&qryParam="+(JSON.stringify(qryParam)).replace(/\"/g,"'"),
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubRelMetalTradeOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $metalRelTradeDialog.iDialog(opts);
};
/**
 *  关联金属基础交易信息公共界面
 *  @param dealSerialNo 交易流水号
 *  @param chgNo  版本号
 *  @param gridId  调用界面的gridid
 */
juipub.showMetalTradeLockInfo = function showMetalTradeLockInfo(){
        //默认为文本框
        var optionParams =$("#"+this.id).textbox("options").buttonParams;
		var qryParam={'dealSerialNo':$('#'+optionParams.dealSerialNo).iTextbox('getValue'),'chgNo':$('#'+optionParams.chgNo).iTextbox('getValue')};
        var rTitle="金属基础锁汇信息";
        var rHref="";
        var rHeight=700; // 高度
        var rWidth=1000; // 宽度
        // 创建元素<div>,返回一个jquery对象
        var $metalRelTradeLockDialog = $('<div id="pubRelMetalTradeLockDialog"></div>');
        //创建窗体
        var opts = {
            id: 'pubRelMetalTradeLockOption',// dialog唯一标识id
            title:rTitle,// 标题
            closed: false, // 关闭状态
            height: rHeight, // 高度
            width: rWidth, // 宽度
            href:ctxPath+'/topjui/jsp/pub/metalTradeLockInfo.jsp?param='+(JSON.stringify(optionParams)).replace(/\"/g,"'")+'&callFunction='+optionParams.calBackFun+"&qryParam="+(JSON.stringify(qryParam)).replace(/\"/g,"'"),
             buttons: [
                {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('pubRelMetalTradeLockOption');} }
            ]
        };
         //在div元素中嵌入dialog
         $metalRelTradeLockDialog.iDialog(opts);
};