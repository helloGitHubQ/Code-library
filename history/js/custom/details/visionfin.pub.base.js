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
