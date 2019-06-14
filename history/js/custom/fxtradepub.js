var fxpub = window.fxpub || {};
/**
 * 获取风控参数,只有外汇交易使用 控件ID应保持一致
 * dealDate  交易日期
 * rivalNo  交易对手
 * nearValueDate  （近端）起息日
 * dealAmount 近端买入金额
 * combiNo   组合
 * fundNo  账户
 * 
 */
fxpub.getRiskParam =function getRiskParam(businClass,nearValueDate){
  var paramArr = new Array(); 
  var paramPub = 
  {
    resCode:'risk',
    opCode:'instrRiskDeal',
    marketNo:'5',
    'businClass' : businClass, 
    beginDate:$('#dealDate').iDatebox('getValue'),
    rivalNo:$('#rivalNo').iCombogrid('getValue'),
    currencyDate:$('#'+nearValueDate).iDatebox('getValue'),
    currType:currTypeValue,
    effectRange:'1',
    instructionType:'3',
    entrustDirection:"3"
  }
  var rec=$('#instructionStockGrid').iDatagrid('getSelections');
  if(rec.length>0){
    //有指令
    paramArr.push($.extend({
      'dailyInstructionNo':rec[0].daily_instruction_no,
      'indexDailyModify':rec[0].index_daily_modify,
      balance:$('#dealAmount').iNumberbox('getValue'),
      combiNo:rec[0].combi_no,
      fundNo:rec[0].fund_no 
    },paramPub));
  }else{
    paramArr.push($.extend({
      balance:$('#dealAmount').iNumberbox('getValue'),
      combiNo:$('#combiNo').iCombobox('getValue'),
      fundNo:$('#fundNo').iCombobox('getValue')
    },paramPub));
  }
  return paramArr;
}


 /**
  * 
  * 获取起息日 
  * op	业务子码。如getspotvaluedate
  * transFlag	交易类型 1：即期 2：远期 3：掉期 4：定价日 5:人民币外汇期权
  * dealDate 交易日期ID
  * realCurrPair 实际货币对
  * limitValue 期限值
  * limitUnitValue 期限单位
  * calback success调用的方法
  */
 fxpub.getValueDate =function getValueDate(op,transFlag,realCurrPair,limitVal,limitUnitVal,calback){
	  //获取起息日
	  var success = function (response){
		if(response.returnCode==0){
			calback(response);
		}else{
		    showMessage(response);
		}
	  }	
	  var result={
	    resCode:"fxutilservice",
	    opCode:op,
	    "transDate":$('#dealDate').iDatebox('getValue'),
	    "CurrencyPair":realCurrPair,
	    "nearLimit":limitVal,
	    "nearLimitUnit":limitUnitVal,
	    "currFlag":"0",
	    "transFlag":transFlag
	  }
	  asynExecute('bfm.fxbiz.fxutilservice.FXUtilService.service',result,success, null,'正在获取+++', 8000);
 }
 /**
  * 
  * 获取货币对报价信息
  * businClass 业务类型
  * calback success使用record调用的方法
  * currType 为买入币种的id
  * currContra 为卖出币种的id
  */
 fxpub.getDecimalPoint=function getDecimalPoint(callback){
		var success = function (response){
		if(response.returnCode==0&&response.dataSetResult[0].data!=null){
				var record=response.dataSetResult[0].data[0];
				callback(record);
		}else{
			 showMessage(response);
		}
	}
		var result={resCode:"fxutilservice",
					   opCode:"getDecimalPointByCurr",
					   "currType":$('#currType').iCombobox('getValue'),
					   "currContra":$('#currContra').iCombobox('getValue')
					   };
		asynExecute('bfm.fxbiz.fxutilservice.FXUtilService.service',result,success, null,'正在获取+++', 8000);				
}
 /**
  * 
  * 获取币种报价精度
  * curr 币种
  * calback success使用record调用的方法
  */
  fxpub.getCurrDecimalPoint=function getCurrDecimalPoint(curr,callback){
		var success = function (response){
			if(response.returnCode==0&&response.dataSetResult[0].data!=null){
					var record=response.dataSetResult[0].data[0];
					callback(record);
			}else{
				  showMessage(response);
			}
		}
		
	  var result={
	    resCode:"fxutilservice",
	    opCode:"getCurrDecimalPoint",
	    "currencyType":curr
	  }
	  asynExecute('bfm.fxbiz.fxutilservice.FXUtilService.service',result,success, null,'正在获取+++', 8000);
}
 /**
  * 
  * 根据买入金额和汇率计算卖出金额
  * currType 为买入币种的id
  * dealAmount 买入金额的Id
  * amountContra 卖出金额的id
  * spotPrice   汇率的id
  * priceUnit 货币对报价单位
  * realCurrPair 实际货币对 
  */
 fxpub.getBalance=function getBalance(currType,dealAmount,amountContra,spotPrice,priceUnit,realCurrPair){
 	if($('#'+dealAmount).iNumberbox('getValue')>0&&$('#'+spotPrice).iNumberbox('getValue')>0){
		if($('#'+currType).iCombobox('getValue')==realCurrPair.split("/")[0]){
			$('#'+amountContra).iNumberbox('initValue',$('#'+dealAmount).iNumberbox('getValue')*$('#'+spotPrice).iNumberbox('getValue')/priceUnit);
		 }else{
		    $('#'+amountContra).iNumberbox('initValue',$('#'+dealAmount).iNumberbox('getValue')/$('#'+spotPrice).iNumberbox('getValue')*priceUnit);
		 }
	}
 }
 /**
  * 
  * 根据卖出金额和汇率计算买入金额
  * currType 为买入币种的id
  * dealAmount 买入金额的Id
  * amountContra 卖出金额的id
  * spotPrice   汇率的id
  * priceUnit 货币对报价单位
  * realCurrPair 实际货币对 
  */
 fxpub.getAmountContra=function getAmountContra(currType,dealAmount,amountContra,spotPrice,priceUnit,realCurrPair){
 	if($('#'+amountContra).iNumberbox('getValue')>0&&$('#'+spotPrice).iNumberbox('getValue')>0){
		if($('#'+currType).iCombobox('getValue')==realCurrPair.split("/")[0]){
			$('#'+dealAmount).iNumberbox('initValue',$('#'+amountContra).iNumberbox('getValue')/$('#'+spotPrice).iNumberbox('getValue')*priceUnit);
		 }else{
		    $('#'+dealAmount).iNumberbox('initValue',$('#'+amountContra).iNumberbox('getValue')*$('#'+spotPrice).iNumberbox('getValue')/priceUnit);
		 }
	}
 }
/**
 * 分割期限(例如：外汇)即期不适用
 * limit 输入期限的控件id 默认为textbox
 */
fxpub.splitLimitterm=function splitLimitterm(limit, callBack){
	    var limitterm=$('#'+limit).iTextbox('getValue');
		var limitVal= parseFloat(limitterm.substring(0,limitterm.length-1));
		var limitUnitVal = limitterm.substring(limitterm.length-1,limitterm.length);
		if(limitUnitVal=="D"||limitUnitVal=="d"){
			limitUnitVal = juipub.constant.day;
			limitValue = limitValue;
		}else if(limitUnitVal=="W"||limitUnitVal=="w"){
			limitUnitVal = juipub.constant.week;
		}else if(limitUnitVal=="M"||limitUnitVal=="m"){
			limitUnitVal = juipub.constant.month;
		}else{
			limitUnitVal = juipub.constant.year;
		}
	var result={'limitValue':limitVal,'limitUnitValue':limitUnitVal};
	callBack(result);
}
/**
 * 合并期限(例如：外汇)即期不适用
 * limitId 输入期限的控件id 默认为textbox
 * 
 */
fxpub.unionLimitterm=function unionLimitterm(limitId,limitValue,limitUnitValue){
		if(limitUnitValue==juipub.constant.day){
			limitUnitValue ="D";
		}else if(limitUnitValue==juipub.constant.week){
			limitUnitValue ='W';
		}else if(limitUnitValue==juipub.constant.month){
			limitUnitValue = 'M';
		}else{
			limitUnitValue ='Y';
		}
	 	$('#'+limitId).iTextbox('initValue',limitValue+limitUnitValue);
}

/**
 * 生成期限(例如：外汇)
 */
fxpub.generateLimitterm=function(limitValue,limitUnitValue,callBack){
	var limittermValue = "";
		if(limitUnitValue==juipub.constant.day){
			limittermValue=limitValue+"D"; 
			/**limittermValue=limitValue+"D";   20140504 huanguqn 外汇标准期限，可能不适用于外汇货币掉期*/
		}else if(limitUnitValue==juipub.constant.week){
			limittermValue=limitValue+"W";
		}else if(limitUnitValue==juipub.constant.month){
			limittermValue=limitValue+"M";
		}else if(!juipub.isEmpty(limitUnitValue)){
			limittermValue=limitValue+"Y";
		}
	var result={limittermValue:limittermValue};
	callBack(result);
}

 /**
 * 将补录信息封装入指定的json数组
 * params json数组
 */
fxpub.extendParams=function extendParams(params){
	$.extend(params, {
      creditRiskTakeType:$('#creditRiskTakeType').iCombobox('getValue'),
      marketSpotPrice:$('#marketSpotPrice').iNumberbox('getValue'),
      marketSwapPoint:$('#marketSwapPoint').iNumberbox('getValue'),
      closePrice:$('#closePrice').iNumberbox('getValue'),
      highPrice:$('#highPrice').iNumberbox('getValue'),
      lowPrice:$('#lowPrice').iNumberbox('getValue'),
      midPrice:$('#midPrice').iNumberbox('getValue')});
}