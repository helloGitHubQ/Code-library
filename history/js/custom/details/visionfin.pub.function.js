/**
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
};