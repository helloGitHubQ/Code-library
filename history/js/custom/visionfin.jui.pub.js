/**
 * base
 * 放置基本js
 * 通常不修改
 */
var juipub = window.juiPub || {};

var dict = {};//初始化的数据字典json对象

var menu = {};//初始化的菜单json对象

/**
 * 获取地址输入栏中的路径并赋值给window.urlPath
 */
window.urlPath = (function() {
    return location.href;
})();

/**
 * 获取输入栏（location）中的url路径
 * @return
 */ 
function getURLPath() {
    return window.urlPath;
}

/**
 * 从url获取字符串数据
 * 201905 daijy
 * @param key
 * @param url
 * @return 
 */
function getStringFromURLPath(key,url) {
    if(!url){
       url = window.urlPath;
    }
    var reg1 = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = url.match(reg1);
    if (r != null) {
        return unescape(r[2]);
    } else {
        var reg2 = new RegExp("(^|\\?)" + key + "=([^&]*)(&|$)", "i");
        var r = url.match(reg2);
        if (r != null)
            return unescape(r[2]);
    }
    return null;
    /*
     * if(undefined == key || null == key || '' == key.trim()){ return undefined ; }
     * var $_result = undefined ; try { var urlArray = []; var index =
     * window.urlPath.indexOf('?'); var urlLength = window.urlPath.length;
     * if(index > 0){ urlArray[0] = window.urlPath.substring(0,index);
     * urlArray[1] = window.urlPath.substring(index+1,urlLength); var
     * paramsArray = urlArray[1].split('&'); var resultObj = {}; for(var i=0;i<paramsArray.length;i++){
     * var subParams = paramsArray[i].split('='); if(subParams[0]){
     * if(resultObj[subParams[0]]){ var pValue = resultObj[subParams[0]];
     * if(Ext.isArray(pValue)){ pValue.push(subParams[1]);
     * resultObj[subParams[0]] = pValue; }else{ var temp =
     * resultObj[subParams[0]]; var arr = []; arr.push(temp);
     * arr.push(subParams[1]); resultObj[subParams[0]] = arr; }
     * 
     * }else{ resultObj[subParams[0]] = subParams[1]; } } } $_result =
     * resultObj[key] ; }
     *  } catch (e){ } return $_result ;
     */
}

/**
 * 远程服务调用---同步调用方法
 * 
 * @param serviceId 服务地址
 * @param params 参数
 * @param success 成功回调方法
 * @param failure 失败回调方法
 * @param loadMaskMsg 加载时的显示文本
 */
function synExecute(serviceId, params,success, failure,loadMaskMsg) {
    var tempResponse="";
    var serviceURL = "";
    serviceURL = ctxPath + "/" + serviceId;
    if (!$.isFunction(success)) {
        success = function(response){
            showMessage(response);
        };
    }
    if (!$.isFunction(failure)) {
        failure = function(response){
            showMessage(response);
        };
    }
    var _params ={};
    if (params instanceof  Array) {
        _params = convertArrayToObject(params);
    } else {
        _params = params;
    }
    $.ajax({
            url : serviceURL,
            type : "POST",
            data : _params,
            dataType : 'json',
            async:false,
            traditional:true,
            beforeSend: function() {
                $.messager.progress({
                    text: loadMaskMsg
                });
            },
            success : function(response, options) {
                $.messager.progress("close");
                success(response, options);
                tempResponse=response;
            },
            error : function(response, options) {
                $.messager.progress("close");
                failure(response, options);
            }
    });
    return tempResponse;
}


/**
 * 远程服务调用---异步调用方法
 * @param serviceId 服务地址
 * @param params  服务的参数
 * @param success 成功的回调方法
 * @param failure 失败的回调方法
 * @param loadMaskMsg 加载时的显示文本
 * @param timeout 超时时间
 */
function asynExecute(serviceId, params, success, failure,loadMaskMsg, timeout) {
    var serviceURL = "";
    serviceURL = ctxPath + "/" + serviceId;
    if (!$.isFunction(success)) {
        success = function(response){
            showMessage(response);
        };
    }
    if (!$.isFunction(failure)) {
        failure = function(response){
            showMessage(response);
        };
    }
    var _params ={};
    if (params instanceof  Array) {
        _params = convertArrayToObject(params);
    } else {
        _params = params;
    }
    $.ajax({
            url : serviceURL,
            type : "POST",
            data : _params,
            dataType : 'json',
            traditional:true,//防止深度序列化
            timeout:timeout,
            beforeSend: function() {
                $.messager.progress({
                    text: loadMaskMsg
                });
            },
            success : function(response, options) {
                $.messager.progress("close");
                success(response, options);
            },
            error : function(response, options) {
                $.messager.progress("close");
                failure(response, options);
            }
    })
}
/**
 * biz.function
 * 放置业务相关的公共方法
 */
 

 
/**
 * 审批单浏览
 * @param gridId grid列表的id
 * @param type 审批单类型:instr，realDeal，billRepo，billBsd，pendSettle
 */
juipub.exportApprove=function(gridId,type){
            var records = $("#"+gridId).iDatagrid("getSelections");
            if (records.length==1) {
                var record = records[0];
                if('11,12,18,19,25,26,31,32,33,34,35,36,37,38,90,93,94,95,9A,9C,B1,B2,B3,B4,B5,B6,BA,BB,BC,N1,R1,R2,R3,82,86,96,97,91,80,81,88,85,87,84,HEDGE,92'.indexOf(record.busin_class)>=0 
                  || '52,A1,H1,H2,I1,T1,08,09'.indexOf(record.busin_class)>=0 
                  || 'R1,R2,R3'.indexOf(record.busin_type)>=0
                  || '2001,2002'.indexOf(record.busin_class)>=0) {
                    var templatePath = "approveJasper/";
                    var params = {};
                    if(type == 'instr'){
                        templatePath += "instrApprove";
                        params = {
                            DAILYINSTRUCTIONNO: record.daily_instruction_no,
                            INDEXDAILYMODIFY: record.index_daily_modify
                        };
                    }else if(type=='realDeal' || type=='billRepo' || type=='billBsd'){
                        if('B6'.indexOf(record.busin_class)>=0){
                            $.iMessager.alert("提示","暂不支持该业务的审批单浏览!");
                            return;
                        }
                        templatePath += "dealApprove";
                        if('R1,R2,R3,N1'.indexOf(record.busin_class)>=0){
                            params = {
                                BATCHNO: record.batch_no
                            };
                        }else 
                            params = {
                                DEALSERIALNO: record.deal_serial_no
                            };
                        
                    }else if(type=='pendSettle'){
                        templatePath += "pendApprove";
                        params = {
                            PENDSERIALNO: record.pend_serial_no
                        };
                    }
                    if('N1'.indexOf(record.busin_class)>=0){//N1分为直贴跟转帖
                        juipub.exportPdf(templatePath+record.busin_class+record.sub_code,record.busin_typeStr +  '审批单'  , params);
                    }else if('R1,R2,R3'.indexOf(record.busin_class)>=0){
                        juipub.exportPdf(templatePath+record.busin_class,record.busin_typeStr +  '审批单'  , params);
                    }else
                        juipub.exportPdf(templatePath+record.busin_class,record.busin_classStr.split(':')[1] +  '审批单' , params);
                }else {
                    $.iMessager.alert("提示","暂不支持该业务的审批单浏览!");
                }
            }else if(records.length>1){
                $.iMessager.alert("提示","只能选择一条记录浏览!");
            }else{
                $.iMessager.alert("提示","请选择您要浏览的数据!");
            }
};

/**
 * 获取账户和组合
 */
juipub.getFundAndCombi=function(fundNo,combiNo,callBack,permission,businClass){
    //不隐藏账户
    //if(!juipub.isEmpty(fundNo)){
    //  $('#'+fundNo).hide();
    //  $('#'+fundNo).iCombobox({required:false});
    //}
    //xianghuan 20130223 判断,如果是回显方式调用该界面,则默认不需要控制该界面上的账户组合权限
    var winFromFlag = "1";//1:发起，2：编辑，3：签收，4回显,5生效
    winFromFlag=juipub.isEmpty(getStringFromURLPath("winFromFlag"))?winFromFlag:getStringFromURLPath("winFromFlag");
    if(winFromFlag == "4" && permission == null){
        permission = 0;//0:不用控制权限  1：需要控制权限 （默认）
    }
    var params = {resCode:"accountInfo",opCode:"qryFundInfoAndComBi"};
    if(!juipub.isEmpty(businClass)){
        params=$.extend(params,({businClass:businClass}));
    }
    if(!juipub.isEmpty(permission)){
        params=$.extend(params,{permission:permission});
    }
    var success = function (response){
        if(response.returnCode==0){
            var dataRecords=response.dataSetResult[0].data;
                $('#'+combiNo).iCombobox('setValues',[]);
                $('#'+combiNo).iCombobox('reset');
                if(dataRecords!=""&&dataRecords.length>0){
                        $('#'+combiNo).iCombobox('loadData',response);
                        //$('#'+fundNo).iCombobox('loadData',response);
                }
                if(dataRecords.length==1){
                    $('#'+combiNo).iCombobox('select',dataRecords[0].combi_no);
                }
                if(callBack) {
                    callBack(dataRecords);
                }
        }
    }   
    asynExecute('bfm.basedata.account.AccountList.service',params,success, null,'正在处理，请稍后...', 8000) ;
};

/**
 * 获取虚拟业务编号，
 * succ：回调方法
 * 将生成的虚拟编号传入回调方法进行
 */
juipub.getSequenceNo = function getSequenceNo(succ){
    //异步请求
    $.ajax({
        url:'bfm.bondbiz.relateinstr.GetSequenceNoService.service?resCode=getsequenceno&opCode=getsequenceno',
        type:"POST",
        data:{"key":"virtualBusinNo"},
        dataType:'json',
        success:function(result){
            if (!$.isFunction(succ)) {
                succ = function(result){
                };
            }
            var returnCode = "-1";
            var errorInfo;
            returnCode = result.returnCode;
            errorInfo  = result.errorInfo;
            if(returnCode == "0"){
                var record = result.dataSetResult[0].data[0].sequenceNo;
                succ(record);
            }else{
                showMessage(result);
            }
        },
        error:function(response, options) {
            $.messager.progress("close");
            failure(response, options);
        }
    });
};


/**
 * 获取系统参数
 * @param paramCode 系统参数编号
 * @param flag 可写可不写 默认关联机构查询参数 false为不关联机构
 * @param defaultValue 在找不到参数时给一个默认值
 */
juipub.getParamforString = function(params,callBack){
    var succ = function(result, options) {
        var returnCode = "-1";
        var errorInfo;
        returnCode = result.returnCode;
        errorInfo = result.errorInfo;

        if (returnCode == "0"||returnCode == 0) {
            callBack(result.dataSetResult[0].data[0].paramValue);
        } else {
            $.iMessager.alert("提示", "查询错误<br>原因：" + errorInfo);
        }
    }

    var serviceId = "com.avengers.bfm.console.query.SysParameterQueryService.getSysParameter.service";
    var res = {resCode:'getSysParameter',opCode:'qry',paramCode:params.paramCode,flag:params.flag,defaultValue:params.defaultValue,orgId:params.orgId};
        
    asynExecute(serviceId,res, succ, null, '正在处理+++', 8000);
};

/**
 *获取系统参数
 * @param config json数组 包含param_id:参数名，和defaultValue：在找不到参数时给一个默认值
 * @param calFun 回调函数
 */
juipub.getParamValue = function getParamValue(config, calFun) {
    var succ = function(result, options) {
        var returnCode = "-1";
        var errorInfo;
        returnCode = result.returnCode;
        errorInfo = result.errorInfo;
        if (returnCode == "0"||returnCode == 0) {
            calFun(result.dataSetResult[0].data[0].paramValue);
        } else {
            $.iMessager.alert("提示", "查询错误<br>原因：" + errorInfo);
        }
    }
    var params = {
        'param_id' : config.param_id,
        'defaultValue' : config.defaultValue,
        resCode : "param",
        opCode  : "qry"
    };
    asynExecute("bfm.pub.param.ParamQuery.service",params, succ, null, '正在处理+++', 8000);
}

/**
 * 获取交易对手基本信息
 */
juipub.getCustomInfo = function(config, calFun) {
    var success = function(result) {
        var returnCode = "-1";
        var errorInfo;
        returnCode = result.returnCode;
        errorInfo = result.errorInfo;
        var res = "";
        if(result.dataSetResult[0].data!=null){
            res=result.dataSetResult[0].data[0];
            calFun(res);
        } else {
            $.iMessager.alert("提示", "查询对方基本信息失败<br>原因：" + errorInfo);
        }
    };
    if (juipub.isEmpty(config.custNo)) {
        return;
    }   
    var params = {
        'custNo' : config.custNo
    };
    params = $.extend(params, {
                resCode : "customInfo",
                opCode : "qry"
            });
    asynExecute("bfm.basedata.custominfo.CustomList.service", params,
    success, null, "正在获取基本信息，请稍后...",8000);
}

/**
 * 20190411 使用同步方式签收任务
 */
juipub.takeSynTask = function(config) {
    var params = {
        'taskId' : config.taskId
    };
    var serviceId = 'workflow.client.task.takeTask.service';
    return synExecute(serviceId, params, null, null, '正在处理+++', 8000);
}

/**
 * 通过清算路径号获取清算路径信息 20190412 
 */
juipub.getCustomAccountBySerialNo = function(config, calFun) {
    var succ = function(result, options) {
            var returnCode = "-1";
            var errorInfo;
            returnCode = result.returnCode;
            errorInfo = result.errorInfo;
            var res ="";
            if(result.dataSetResult[0].data!=null){
                res=result.dataSetResult[0].data[0];
                calFun(res);
            } else {
                $.iMessager.alert("提示", "查询客户汇路信息失败<br>原因：" + errorInfo);
            }
    }
    
    
    if (juipub.isEmpty(config.serialNo)) {
        return;
    }
    var params = {
        'serialNo' : config.serialNo
    };
    params = $.extend(params, {
                resCode : "customInfo",
                opCode : "custAccount"
            });

    asynExecute("bfm.basedata.custominfo.CustomList.service", params,
            succ, null, "正在获取客户汇路信息，请稍后...",8000);
}

/**
 * 获取清算路径信息 
 */
juipub.getSysSerialInfo = function(config, calFun) {
    var success = function(result) {
        var returnCode = "-1";
            var errorInfo;
            returnCode = result.returnCode;
            errorInfo = result.errorInfo;
            if (returnCode == "0"||returnCode == 0) {
                var res ="";
                if(result.dataSetResult[0].data!=null){
                    res=result.dataSetResult[0].data[0];
                }
                calFun(res);
            } else {
                $.iMessager.alert("提示", "查询客户汇路信息失败<br>原因：" + errorInfo);
            }
    };
    if (juipub.isEmpty(config.custNo)) {
        return;
    }
    var params = {
        'custNo' : config.custNo,
        'currType' : config.currType,
        'position' : config.position,
        'cflType'  : config.cflType,
        'upFlag'   : config.upFlag
    };
    params =  $.extend(params, {
                resCode : "customInfo",
                opCode : "custSerialInfo"
            });

    asynExecute("bfm.basedata.custominfo.CustomList.service", params,
            success, null, "正在获取客户汇路信息，请稍后...",8000);

}
/**
 * 分割期限(例如：外汇)即期
 */
juipub.splitLimittermforSpot = function(limitterm, callBack){
    	var re = limitterm;
		if(re=="TODAY"){
			limitValue = "0";
			limitUnitValue = juipub.constant.day;
		}else if(re=="TOM"){
			limitValue = "1";
			limitUnitValue = juipub.constant.day;
		}else if(re=="SPOT"){
			limitValue = "2";
			limitUnitValue = juipub.constant.day;
		}
		var result={limitValue:limitValue,limitUnitValue:limitUnitValue};
		callBack(result);
 }
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
    };/**
 * function
 * 放置业务无关的公共方法
 */
 
/**
 * 首次列表不进行加载
 * 用法：设置到datagrid的onBeforeLoad方法上
 * @param param
 * @return {Boolean}
 */
juipub.firstNoLoad = function firstNoLoad(param) {
        var firstLoad = $(this).attr('firstLoad');
        if (firstLoad == 'false' || typeof (firstLoad) == 'undefined'){
            $(this).attr('firstLoad','true');
            return false;
        }
        param[topJUI.config.datagrid.start] = (param.page-1)*param.rows+1;
        "page" != topJUI.config.datagrid.page && (param[topJUI.config.datagrid.page] = param.page, delete param.page);
        "rows" != topJUI.config.datagrid.size && (param[topJUI.config.datagrid.size] = param.rows, delete param.rows);
        return true;
};

/**
 * 根据传入参数获取报表
 * xlsr请求返回Excel提供下载
 * htmlr请求在指定iframe进行展示
 */
juipub.getExcelReport = function(param) {
    var url = param.url;
    var iframeName = param.ifameName;
    if(!url) {
        $.iMessager.alert('提示','未找到报表url！');
        return;
    }
    if(!iframeName) {
        iframeName = "reportFrame";
    }
    
    var oFrm = document.getElementsByName(iframeName)[0];
    if(oFrm!=null && !oFrm.onload) {
        oFrm.onload = oFrm.onreadystatechange = function() {
            if (this.readyState && this.readyState!='complete' && this.readyState!='interactive') {
                return;
            } else {
                hideMask();
            }
        }       
    }
    if(navigator.userAgent.indexOf("MSIE")<0 && url.indexOf(".xlsr")>0) {
        //非IE内核浏览器没能监听到文件下载事件，无法在弹出下载框后关闭遮罩，故暂不展示
    } else if(oFrm!=null) {
        showMask();
    }
    if(oFrm) {//下载excel
        oFrm.contentWindow.location.href = juipub.getAppPath()+url;
    }else {//查看html
        window.location.href =juipub.getAppPath()+url;
    }
};

/**
 * 获取绝对路径
 */
juipub.getAbsolutePath=function getAbsolutePath() {
    var pathName = window.location.pathname.substring(1);  
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));  
    var webUrl = window.location.protocol + '//' + window.location.host + '/'+ webName + '/';
    return webUrl;
};

/**
 * 获取应用路径。如：http://localhost:8080/fx/
 */
juipub.getAppPath=function getAppPath() {
	var localObj = window.location;
	var contextPath = localObj.pathname.split("/")[1];
	var basePath = localObj.protocol + "//" + localObj.host + "/"+ contextPath+ "/";
    return basePath;
};

/**
 * 导出 pdf 文件
 * 
 * @param {}
 *          template 模板名称
 * @param {}
 *          fileName 文件名
 * @param {}
 *          parameters 查询参数
 */
juipub.exportPdf = function(template, fileName, parameters, target) {
    var exportUrl = "bfm.pub.jasperreport.JasperExportPdf.service?resCode=jasperreport&opCode=jasperreportpdf";
    exportUrl = exportUrl+"&template="+template+"&fileName="+fileName+"&parameters="+escape(JSON.stringify(parameters));
    window.location.href =juipub.getAbsolutePath()+exportUrl;
    
};


/**
 * 事由窗体公共处理
 * @param id 控件的id
 * @param flag  boolean类型的参数 为false时隐藏提交按钮
 * @param title 窗体的标题
 */
juipub.remarkDetail=function(){
    var params =$("#"+this.id).textbox("options").buttonParams;
    $.iMessager.prompt({'title':params.title,msg:"",defaultValue:$('#'+params.id).iTextbox('getValue'),fn:function(text){
                    if (!juipub.isEmpty(text)){
                         $('#'+params.id).iTextbox('setValue',text);
                    }},'showFlag':params.flag},null,null,10)
}

/**
 * 复核审批提交前弹出输入框
 * TODO 注释修改
 */
juipub.beforeCheckCommit=function (label,defaultMemo, callback){
    $.iMessager.prompt({'title':'提示', msg:'请输入'+label+':', defaultValue:defaultMemo, fn:function(text) {
        if (!juipub.isEmpty(text)) {
            callback(text);
        }
    }},null,null,3);
};/**
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
};/**
 * show
 * 放置与业务无关的工具方法
 * 主要包含格式转换、日期处理、数据处理
 */

 /**
 * 是否为空,为空返回true
 */
juipub.isEmpty =function isEmpty(val) {
        if(val==null || val==undefined||val.trim()==''){
            return  true;
        }
        return false;
};

 /**
 * 将数组转换为json数组
 * @param params
 * @returns
 */
function convertArrayToObject(params) {
    if (params instanceof  Array) {
        var arrayLength = params.length;
        if (arrayLength >= 0) {
            var obj = {};
            var str = '{';
            var key = [];
            var result = [];
            for (var o in params[0]) {
                key.push(o);
                str = str + o + ':"",';
            }
            str = str.substring(0, str.length - 1) + '}';
            obj = eval("(" + str + ")");
            for (var m = 0, mLen = key.length; m < mLen; m++) {
                result[m] = new Array();
            }
            for (var i = 0, iLen = params.length; i < iLen; i++) {
                for (var j = 0, jLen = key.length; j < jLen; j++) {
                    var _name = key[j];
                    if (params[i][_name]==null ||params[i][_name] == ''||params[i][_name]==undefined) {
                        result[j][i] = "";
                    } else {
                        result[j][i] = params[i][_name];
                    }
                }
            }
            for (var k = 0, klen = result.length; k < klen; k++) {
                obj[key[k]] = result[k];
            }
            return obj;
        }
    } else {
        return {};
    }
}

/**
 * 将数组转换为String
 * @param params 
 * @returns
 */
function convertArrayToString(params) {
    var tmp='';
    if (params instanceof  Array) {
        for(var i=0;i<params.length;i++){
            tmp=tmp+params[i]+',';
        }
        tmp=tmp.substring(0,tmp.length-1);
        return tmp;
    }else{
        return params;
    }
}
 
 /**
 * 将数值转换为金额格式（两位小数），例如：1,000.00
 * @param value
 * @param rowData
 * @param rowIndex
 */
juipub.moneyFormatter = function moneyFormatter(value, rowData, rowIndex) {
    var numberFlag = ($.isNumeric(value));
    value += "";
    var formatInt = value;
    var decimalStr = "00";
    var index = value.indexOf(".");
    //小数判断
    if(index>=0){
        //四舍五入两位小数
        value = parseFloat(value).toFixed(2)+"";
        formatInt = value.substring(0, index);
        decimalStr = value.substring(index + 1, value.length);
    }
    if(numberFlag){
        //数字则转换为金额格式
        for (var g = /(\d+)(\d{3})/; g.test(formatInt);){
            formatInt = formatInt.replace(g, "$1,$2");
        }
        return formatInt + "." + decimalStr;
    }else{
        //非数字返回原始值
        return value;
    }
};

/**
 * 数字格式化
 * precision 小数精度
 * @param value
 * @param rowData
 * @param rowIndex
 * @param config
 */
juipub.numFormatter = function numFormatter(value, rowData, rowIndex, config) {
    var numberFlag = ($.isNumeric(value));
    var precision = config.precision ? config.precision : 0;
    value += "";
    //数字判断
    if(numberFlag){
        //四舍五入precision位小数，默认0位小数
        value = parseFloat(value).toFixed(precision)+"";
    }
    return value;
};

/**
 * 百分比格式转换
 * @param value
 * @param rowData
 * @param rowIndex
 */
juipub.percentFormatter = function percentFormatter(value, rowData, rowIndex) {
    value += "";
    var numberFlag = ($.isNumeric(value));
    if(numberFlag){
        return (parseFloat(value)*100).toFixed(4);
    }
    return value;
};

/**
 * 日期格式转换
 * @param value
 * @param rowData
 * @param rowIndex
 */
juipub.dateFormatter = function dateFormatter(value, rowData, rowIndex) {
    if(value==0 || value=="0"){
        return "";
    }
    value += "";
    var symbol = "-";
    if(value.length==8){
        //年月日格式，YYYYMMDD的日期格式转换为YYYY-MM-DD格式
        return value.substring(0,4)+symbol+value.substring(4,6)+symbol+value.substring(6,8);
    }
    return value;
}

/**
 * 月份格式转换
 * @param value
 * @param rowData
 * @param rowIndex
 */
juipub.monthFormatter = function monthFormatter(value, rowData, rowIndex) {
    if(value==0 || value=="0"){
        return "";
    }
    value += "";
    var symbol = "-";
    if(value.length==6){
        //年月格式，YYYYMM的日期格式转换为YYYY-MM格式
        return value.substring(0,4)+symbol+value.substring(4,6);
    }
    return value;
};

/**
 * 时间格式转换hh:mm:ss
 * @param value
 * @param rowData
 * @param rowIndex
 */
juipub.timeFormatter = function timeFormatter(value, rowData, rowIndex) {
    if(value==0 || value=="0"){
        return "";
    }
    var numberFlag = ($.isNumeric(value));
    if(numberFlag){
        value = prefixInteger(value,6);
        var symbol = ":";
        //时分秒格式，hhmmss的日期格式转换为hh:mm:ss格式
        return value.substring(0,2)+symbol+value.substring(2,4)+symbol+value.substring(4,6);
    }
    return value;
};

/**
 * 数据字典格式转换（需先对字典进行初始化）
 * @param value
 * @param rowData
 * @param rowIndex
 * @param config
 */
juipub.dictFormatter = function dictFormatter(value, rowData, rowIndex, config) {
    var dictType = config.dictType;
    var json = dict[dictType];
    if(value && json){
        value = value+"";
        return json[value];
    }
    return value;
};


/**
 * 将日期增加一定天数
 * @param date YYYYMMDD
 * @param days 
 * @return YYYYMMDD格式日期字符串
 */
juipub.addDate = function addDate(date,days){
    var tmp = new Date(juipub.dateFormatter(date+""));
    tmp.setDate(tmp.getDate()+days);
    return juipub.dateTo8(tmp);
}

/**
 * 将Date对象转换为YYYYMMDD的日期字符串
 * @param date Date对象
 */
juipub.dateTo8 = function dateTo8(date){
	var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    //convertDateToFullDate为topjui.core.min.js中方法
    return year+convertDateToFullDate(month)+convertDateToFullDate(day);
}

/**
 * JSON转url字符串
 * @param param 查询的参数
 * @param key 参数前缀 例如 param={a:1},key=student,return student.a=1 
 */
juipub.json2Url = function(param,key) {
    var paramStr = "";
    if (param instanceof String || param instanceof Number || param instanceof Boolean) {
        paramStr += "&" + key + "=" + encodeURIComponent(param);
    } else {
        $.each(param, function(i) {
            var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
            paramStr += '&' + juipub.json2Url(this, k);
        });
    }
    return paramStr.substr(1);
};
 /**
 * 转浮点数
 */
juipub.toFloat=function(val,message) {
	if(val){
		if('number' == (typeof val)){
			return val;
		}
		else
			return parseFloat(val.replace(/\,/g,""));
	}else{
		if(message){
			alert(message);
		}else{
			return 0;
		}
	}
}
    
/**
 * @description 根据两个八位的整型日期，计算出两者之间的间隔天数
 * @param {}
 *            longBeginDate, longEndDate八位的整型日期
 * @return {}
 */
juipub.calDaysBetweenTwoDates = function(longBeginDate, longEndDate) {
	var strat=parseFloat(longBeginDate);
	var end=parseFloat(longEndDate);
	if(longBeginDate>longEndDate){
		strat=longEndDate;
		end=longBeginDate;
	}
	var tempDate1 = new Date();
	tempDate1 = Date.parse(new Date(juipub.dateFormatter(strat+"")));

	var tempDate2 = new Date();
	tempDate2 = Date.parse(new Date(juipub.dateFormatter(end+"")));

	return (tempDate2 - tempDate1) / (1000 * 24 * 3600);
}

 /**
 * edatagrid编辑器支持combobox/combotree名称显示统一endEdit处理
 * @param index
 * @param row
 * @param changes
 */
juipub.endEdit = function endEdit(index, row, changes){
    //查询所有编辑器类型为combobox/combotree的field，进行统一text设置处理
    var fields = $('#'+this.id).iDatagrid("getColumnFields");
    for(var i=0;i<fields.length;i++){
        var field = fields[i];
        var fieldOptions = $('#'+this.id).iDatagrid('getColumnOption',field);
        if(fieldOptions.editor){
            if(fieldOptions.editor.type=='combobox' || fieldOptions.editor.type=='combotree'){
                var editor = $('#'+this.id).iDatagrid('getEditor', {index:index,field:field});
                var text = $(editor.target).iCombobox('getText');
                if(!fieldOptions.text){
                    fieldOptions.text = {};
                }
                fieldOptions.text[index] = text;
            }
        }
    }
}

/**
 * 将某界面某id范围内的元素设置为只读
 * @param id
 */
juipub.readonlySet = function readonlySet(id){
	var inputs = $("#"+id).find("input");
	juipub.doReadonlySet(inputs);
	var textareas = $("#"+id).find("textarea");
	juipub.doReadonlySet(textareas);
}

juipub.doReadonlySet = function doReadonlySet(inputs){
	if(inputs && inputs.length>0){
		for(var i=0;i<inputs.length;i++){
			var input = inputs[i];
			if(input.id.indexOf("_easyui_")==0){
				var inputDom = $("#"+input.id);
				inputDom.attr("readonly",true);
				inputDom.addClass("validatebox-readonly");
				if(inputDom.parent){
					inputDom.parent().addClass("textbox-readonly");
				}
			}
		}
	}
}
