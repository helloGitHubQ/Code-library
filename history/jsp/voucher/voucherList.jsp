<%@ page contentType="text/html; charset=utf-8" %>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui' %>
<head>
    <jsp:include page="../../main/cssinc.jsp"></jsp:include>
    <jsp:include page="../../main/jsinc.jsp"></jsp:include>
</head>

<div data-toggle="topjui-layout" data-options="fit:true">

    <div data-options="region:'center',iconCls:'fa fa-group',split:true,border:false,bodyCls:'border_left'">
        <table data-toggle="topjui-datagrid"
               data-options="id: 'voucherManage',rownumbers: true,
						     singleSelect:false,
						     pagination:true,
						     checkOnSelect:true,
						     selectOnCheck:true,
						     onClickRow:rowclick,
						     onBeforeLoad:juipub.firstNoLoad,
					         url: 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=qryBtn'">
            <thead>
            <tr>
                <th data-options="field:' ',title:'',checkbox:true"></th>
                <th data-options="field:'book_name',title:'账套名称',width:150,sortable:false"></th>
                <th data-options="field:'voucher_serial',title:'凭证序列号',width:170,sortable:false"></th>
                <th data-options="field:'voucher_catalog',title:'凭证类别',width:100,sortable:false"></th>
                <th data-options="field:'voucher_no',title:'凭证号',width:100,sortable:false"></th>
                <th data-options="field:'input_operator',title:'制证人',width:100,sortable:false"></th>
                <th data-options="field:'voucher_date',title:'制证日期',width:120,sortable:false,formatter:juipub.dateFormatter"></th>
                <th data-options="field:'checker',title:'审核人',width:100,sortable:false"></th>
                <th data-options="field:'check_flag',title:'审核状态',width:100,sortable:false,dictType:'ACC_PZGL_SHZT',formatter:juipub.dictFormatter"></th>
                <th data-options="field:'post_flag',title:'记账标志',width:100,sortable:false,dictType:'ACC_PZGL_JZBZ',formatter:juipub.dictFormatter"></th>
                <th data-options="field:'post_date',title:'记账日期',width:120,sortable:false,formatter:juipub.dateFormatter"></th>
                <th data-options="field:'gen_host_flag',title:'传总账标志',width:100,sortable:false,dictType:'ACC_PZGL_CZZBZ',formatter:juipub.dictFormatter"></th>
            </tr>
            </thead>
        </table>
        <jui:Init type="dict" params="ACC_PZGL_CZZBZ,ACC_PZGL_JZBZ,ACC_PZGL_SHZT"/>
        <!-- 表格工具栏开始 -->
        <div id="voucherManage-toolbar" class="topjui-toolbar" data-options="grid:{type:'datagrid',id:'voucherManage'}">
            <!-- 表单开始 -->
            <form id="queryForm">
                <div class="topjui-fluid">
                	<div class="topjui-row">
                        <div class="topjui-col-sm3">
                            <label class="topjui-form-label">账套名称</label>
                            <div class="topjui-input-block">
                                <input name="bookCode" id="qry_book_code" 
                                       data-options="valueField:'book_code',required:true,textField:'book_name',multiple:false,editable:true,limitToList:true
                                       ,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService&status=1&bookType=1'"
                                       data-toggle="topjui-combobox">
                            </div>
                        </div>
						<div class="topjui-col-sm7">
                            <label class="topjui-form-label">制证起止日期</label>
                            <div class="topjui-input-block">
                                <input id="qry_vcbeginDate" name="vcBeginDate" data-toggle="topjui-datebox" data-options="width:200,editable:true,readonly:false,required:false
							 	,validType:['date']">
                         	~
                                <input id="qry_vcendDate" name="vcEndDate" data-toggle="topjui-datebox" data-options="width:200,editable:true,readonly:false,required:false
							 	,validType:['date']">
                            </div>
                        </div>
                       
						
                        
                       
                	</div>
                    <div class="topjui-row">
                         <div class="topjui-col-sm3">
                            <label class="topjui-form-label">凭证类别</label>
                            <div class="topjui-input-block">
                                <input name="voucherCatalog" id="qry_voucher_catalog" data-toggle="topjui-combobox"
                                     data-options="panelHeight:100,editable:true,valueField:'voucher_catalog',textField:'voucher_name',multiple:false,limitToList:true,url:'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=getVC'">
                            </div>
                        </div>
                        <div class="topjui-col-sm7">
                        		<label class="topjui-form-label">记账日期范围</label>
                        		   <div class="topjui-input-block">
                        		
		                                <input id="qry_ptbeginDate" name="ptBeginDate" data-toggle="topjui-datebox" data-options="width:200,editable:true,readonly:false,required:false
									 	,validType:['date']">
		                         	~
		                                <input id="qry_ptendDate" name="ptEndDate" data-toggle="topjui-datebox" data-options="width:200,editable:true,readonly:false,required:false
									 	,validType:['date']">
									</div>
                        </div>
                        
                         
                	</div>
                	<div class="topjui-row">
                		<div class="topjui-col-sm3">
                            <label class="topjui-form-label">审核状态</label>
                             <div class="topjui-input-block">
				                 <input name="checkFlag" 	id="qry_check_flag" data-toggle="topjui-combobox"
				                    data-options="panelHeight:110,editable:true,valueField:'item_code',textField:'item_name',multiple:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_PZGL_SHZT'">
                        	</div>
                        </div>
                	
                	
                		<div class="topjui-col-sm3">
                        	<label class="topjui-form-label">记账状态</label>
			                 <div class="topjui-input-block">
				                 <input name="postFlag" 	id="qry_post_flag" data-toggle="topjui-combobox"
				                    data-options="panelHeight:110,editable:true,valueField:'item_code',textField:'item_name',multiple:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_PZGL_JZBZ'">
                        	</div>
                        </div>
                	
                	
                	</div>
                </div>
            </form>
    <div class="topjui-row">
     <jui:TranPurv transCode="voucherManage" subTransCode="qryBtn">
	         <a href="javascript:void(0)"
	            data-toggle="topjui-menubutton"
	            data-options="method:'query',id:'qry_Btn',
			     iconCls:'fa fa-search',
			     btnCls:'topjui-btn-blue',
			     form:{id:'queryForm'},
			     grid:{type:'datagrid','id':'voucherManage'},queryBefore:'checkOption'">查询</a>
	                </jui:TranPurv>
     <jui:TranPurv transCode="voucherManage" subTransCode="addBtn">
     <a href="javascript:void(0)" id="addBtn"
     data-toggle="topjui-menubutton"
     data-options="
       iconCls:'fa fa-plus',
       btnCls:'topjui-btn-green',
       onClick:showAddDetail
    ">新增</a> 
    </jui:TranPurv>
     <jui:TranPurv transCode="voucherManage" subTransCode="edtBtn">
    <a href="javascript:void(0)" id="edtBtn"
       data-toggle="topjui-menubutton"
       data-options="
			iconCls: 'fa fa-pencil',
            btnCls: 'topjui-btn-orange',
           onClick:showEditDetail
             ">修改</a>
     </jui:TranPurv>
     
     <jui:TranPurv transCode="voucherManage" subTransCode="delBtn">
	   <a href="javascript:void(0)" id="delBtn"
       data-toggle="topjui-menubutton"
       data-options="method:'doAjax',
       extend: '#combiInfo-toolbar', 
       btnCls:'topjui-btn-brown',
       iconCls:'fa fa-trash',
       onClick:delCommit">删除</a>
     </jui:TranPurv>
     <jui:TranPurv transCode="voucherManage" subTransCode="fCopyBtn">
	    <a href="javascript:void(0)" id="fCopyBtn"
       data-toggle="topjui-menubutton"
       data-options="
       	iconCls:'fa fa-copy',
      	btnCls: 'topjui-btn-orange',
		onClick:forwardCopy
           ">正向复制</a> 
     </jui:TranPurv>
     <jui:TranPurv transCode="voucherManage" subTransCode="bCopyBtn">
	    <a href="javascript:void(0)" id="bCopyBtn"
       data-toggle="topjui-menubutton"
       data-options="
       	iconCls:'fa fa-copy',
      	btnCls: 'topjui-btn-orange',
		onClick:backwardCopy
           ">反向复制</a> 
     </jui:TranPurv>
   
     
     <jui:TranPurv transCode="voucherManage" subTransCode="detailBtn">
     <a href="javascript:void(0)" data-toggle="topjui-menubutton"
		data-options="
		iconCls: 'fa fa-list-alt',
		btnCls: 'topjui-btn-orange',
		onClick:showVoucherDetail
          ">明细查看</a>
	</jui:TranPurv>			         
	
  </div>
</div>
<!-- 表格工具栏结束 -->
    </div>
</div>
<script>
/**
 * 行选中时判断操作权限
 */
function rowclick(){
	var selectData = $("#voucherManage").iDatagrid("getSelections");
	if(selectData){
		if(selectData.length == 1){
			//会计凭证对应账套的月结账状态为0-未结账
			var selectedOne = selectData[0];
			if(selectedOne.check_flag=='1'||selectedOne.check_flag=='3'){
				$("#edtBtn").iMenubutton('enable');
			}else{
				$("#edtBtn").iMenubutton('disable');
			}
			
			
			//关联业务参数
			var params = {
							resCode:"voucherManage",
						  	opCode:"enableOpt",
						  	bookCode:selectedOne.book_code
						 };
			var success = function (response){
				if(response.returnCode==0){
				    var result = response.dataSetResult[0].data[0];
					/* if(result.enableAdd=='1'){
						$("#addBtn").iMenubutton('enable');
					}else{
						$("#addBtn").iMenubutton('disable');
					} */
				}
			}
			asynExecute('com.avengers.accounting.voucher.VoucherAction.voucher.service',params,success, null,'正在处理，请稍后...', 8000) ;
		}
	}
}
/**
 * 增加面板
 */
function showAddDetail(){
	var title = "凭证添加";
	var href = ctxPath+'/topjui/jsp/accounting/voucher/voucherAdd.jsp?flag=addVoucher';
	var height = 700;
	var width=1200;
	openEditDialog(title,href,height,width,null);
}

function openEditDialog(title,href,height,width,url){
    // 创建元素<div>,返回一个jquery对象
    var $detailDialog = $('<div id="detailDialog"></div>');
    //创建窗体
    var opts = {
        id: 'voucherManagerDialogId',// dialog唯一标识id
        title:title,// 标题
        closed: false, // 关闭状态
        modal: true,//非模态框
        height: height, // 高度
        width: width, // 宽度
        href: href, // 加载页面元素的地址
        grid: {
            type: 'datagrid',
            id: 'voucherManage'
        },
        buttons: [
            {text: '关闭', iconCls: 'fa fa-close', btnCls: 'topjui-btn-red', handler: function (){closeDialog('voucherManagerDialogId'); } }
        ]
    };
    if(url!=null){
    	opts = $.extend(opts,{url:url});
    }
     //在div元素中嵌入dialog
     $detailDialog.iDialog(opts);
}
/**
 * 修改面板
 */
function showEditDetail(){
	var selectData = $("#voucherManage").iDatagrid("getSelections");
	if(selectData){
		if(selectData.length == 1){
			var title = "凭证修改";
			var href = ctxPath+'/topjui/jsp/accounting/voucher/voucherAdd.jsp?flag=edtVoucher&genHostFlag='+selectData[0].gen_host_flag+'&voucherSerial='+selectData[0].voucher_serial;
			var height = 700;
			var width=1200;
			var url = 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=qryBtn&voucherSerial='+selectData[0].voucher_serial;
			openEditDialog(title,href,height,width,url);
		}else{
			$.iMessager.alert('警告',"请选择一条数据修改");
		}
	}else{
		$.iMessager.alert('警告',"请选择一条数据修改");
	}
}


function showVoucherDetail(){
	var selectData = $("#voucherManage").iDatagrid("getSelections");
	if(selectData){
		if(selectData.length == 1){
			var title = "凭证明细查看";
			var href = ctxPath+'/topjui/jsp/accounting/voucher/voucherDetail.jsp?genHostFlag='
					+selectData[0].gen_host_flag+'&voucherSerial='+selectData[0].voucher_serial
					+'&bookCode='+selectData[0].book_code
					+'&voucherCatalog='+selectData[0].voucher_catalog
					+'&period='+selectData[0].period
					+'&voucherNo='+selectData[0].voucher_no;
			var height = 700;
			var width=1200;
			var url = 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=qryBtn&voucherSerial='+selectData[0].voucher_serial;
			openEditDialog(title,href,height,width,url);
		}else{
			$.iMessager.alert('警告',"请选择一条数据查看");
		}
	}else{
		$.iMessager.alert('警告',"请选择一条数据查看");
	}
}


function checkOption(){
	if(!$("#queryForm").iForm("validate")){
		return false;
	}
}

/**
 * 删除
 */
function delCommit(){
	var succ=function(respons){
		showMessage(respons);
		$('#voucherManage').iDatagrid('reload');
	}
	var selectData = $("#voucherManage").iDatagrid("getSelections");
	if(selectData){
		if(selectData.length<1){
			$.iMessager.alert('警告',"请选择需要删除的数据");
		}else{
			//遍历选中的数据如果存在状态为审核通过状态的不允许删除
			$.iMessager.confirm('确认','您确认想要删除选中的凭证信息吗？',function(r){
			    if (r){
			        var ids = [];
					for(var i=0;i<selectData.length;i++){
					    var o = {};
					    o["voucherSerial"] = selectData[i].voucher_serial;
						ids[i]=o;
						if(selectData[i].check_flag!=1&&selectData[i].check_flag!=3){//状态不为待审核、审核拒绝的凭证删除报错
							$.iMessager.alert('警告',"凭证号为"+selectData[i].voucher_serial+"的凭证不为可以删除的状态！");
							return false;
						}
					}
					var res=convertArrayToObject(ids);
					asynExecute('com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=delVoucher',res,succ, null,'正在删除+++', 8000) ;
			    }
				});
		}
	}else{
		$.iMessager.alert('警告',"请选择需要删除的数据");
	}
}

/**
 * 正向复制
 */
function forwardCopy(){
	var selectData = $("#voucherManage").iDatagrid("getSelections");
	if(selectData){
		if(selectData.length == 1){
			var title = "凭证数据正向复制";
			var href = ctxPath+'/topjui/jsp/accounting/voucher/voucherCopy.jsp?genHostFlag='+selectData[0].gen_host_flag+'&voucherSerial='+selectData[0].voucher_serial+'&copyFlag=forwardCopy';
			var height = 700;
			var width=1200;
			var url = 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=qryBtn&voucherSerial='+selectData[0].voucher_serial;
			openEditDialog(title,href,height,width,url);
		}else{
			$.iMessager.alert('警告',"请选择一条数据复制");
		}
	}else{
		$.iMessager.alert('警告',"请选择一条数据复制");
	}
}



/**
 * 反向复制
 */
function backwardCopy(){
	var selectData = $("#voucherManage").iDatagrid("getSelections");
	if(selectData){
		if(selectData.length == 1){
			var title = "凭证数据反向复制";
			var href = ctxPath+'/topjui/jsp/accounting/voucher/voucherCopy.jsp?genHostFlag='+selectData[0].gen_host_flag+'&voucherSerial='+selectData[0].voucher_serial+'&copyFlag=backwardCopy';
			var height = 700;
			var width=1200;
			var url = 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=qryBtn&voucherSerial='+selectData[0].voucher_serial;
			openEditDialog(title,href,height,width,url);
		}else{
			$.iMessager.alert('警告',"请选择一条数据复制");
		}
	}else{
		$.iMessager.alert('警告',"请选择一条数据复制");
	}
}








</script>
