/**
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
