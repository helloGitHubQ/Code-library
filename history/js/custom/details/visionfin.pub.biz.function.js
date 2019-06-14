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