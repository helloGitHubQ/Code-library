<%@ page contentType="text/html; charset=utf-8" %>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui' %>
<head>
    <jsp:include page="../../main/cssinc.jsp"></jsp:include>
    <jsp:include page="../../main/jsinc.jsp"></jsp:include>
</head>

<div data-toggle="topjui-layout" data-options="fit:true">

    <div data-options="region:'center',iconCls:'fa fa-group',split:true,border:false,bodyCls:'border_left'">
        <table data-toggle="topjui-datagrid"
               data-options="id: 'voucherCheck',rownumbers: true,
						     singleSelect:false,
						     pagination:true,
						     checkOnSelect:true,
						     selectOnCheck:true,
						     onBeforeLoad:juipub.firstNoLoad,
					         url: 'com.avengers.accounting.voucher.VoucherCheckAction.vouchercheck.service?resCode=voucherCheck&opCode=qryBtn&checkFlag=1'">
            <thead>
            <tr>
                <th data-options="field:' ',title:'',checkbox:true"></th>
                <th data-options="field:'book_name',title:'账套名称',sortable:false"></th>
                <th data-options="field:'voucher_serial',title:'凭证序列号',sortable:false"></th>
                <th data-options="field:'voucher_catalog',title:'凭证类别',sortable:false"></th>
                <th data-options="field:'voucher_no',title:'凭证号',sortable:false"></th>
                <th data-options="field:'input_operator',title:'制证人',sortable:false"></th>
                <th data-options="field:'voucher_date',title:'制证日期',sortable:false,formatter:juipub.dateFormatter"></th>
                <th data-options="field:'checker',title:'审核人',sortable:false"></th>
                <th data-options="field:'check_flag',title:'审核状态',width:300,sortable:false,dictType:'ACC_PZGL_SHZT',formatter:juipub.dictFormatter"></th>
                <th data-options="field:'post_flag',title:'记账标志',width:150,sortable:false,dictType:'ACC_PZGL_JZBZ',formatter:juipub.dictFormatter"></th>
                <th data-options="field:'post_date',title:'记账日期',width:150,sortable:false,formatter:juipub.dateFormatter"></th>
                <th data-options="field:'gen_host_flag',title:'传总账标志',width:150,sortable:false,dictType:'ACC_PZGL_CZZBZ',formatter:juipub.dictFormatter"></th>
            </tr>
            </thead>
        </table>
        <jui:Init type="dict" params="ACC_PZGL_CZZBZ,ACC_PZGL_JZBZ,ACC_PZGL_SHZT"/>
        <!-- 表格工具栏开始 -->
        <div id="voucherCheck-toolbar" class="topjui-toolbar" data-options="grid:{type:'datagrid',id:'voucherCheck'}">
            <!-- 表单开始 -->
            <form id="queryForm">
                <div class="topjui-fluid">
                	<div class="topjui-row">
                        <div class="topjui-col-sm3">
                            <label class="topjui-form-label">账套名称</label>
                            <div class="topjui-input-block">
                                <input name="bookCode" id="qry_book_code" 
                                       data-options="valueField:'book_code',required:true,textField:'book_name',multiple:false,editable:false,limitToList:true
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
                </div>
            </form>
    <div class="topjui-row">
     <jui:TranPurv transCode="voucherCheck" subTransCode="qryBtn">
	         <a href="javascript:void(0)"
	            data-toggle="topjui-menubutton"
	            data-options="method:'query',id:'qry_Btn',
			     iconCls:'fa fa-search',
			     btnCls:'topjui-btn-blue',
			     form:{id:'queryForm'},
			     grid:{type:'datagrid','id':'voucherCheck'},queryBefore:'checkOption'">查询</a>
	                </jui:TranPurv>
   <jui:TranPurv transCode="voucherCheck" subTransCode="passBtn">
     	<a href="javascript:void(0)" id="applyBtn"
     		data-toggle="topjui-menubutton"
			data-options="
			iconCls:'fa fa-check',
    		btnCls:'topjui-btn-green',
    		onClick:passCommit
           ">审核通过</a>
	 </jui:TranPurv>
	 <jui:TranPurv transCode="voucherCheck" subTransCode="refuseBtn">
		<a href="javascript:void(0)" id="closeBtn"
			data-toggle="topjui-menubutton"
			data-options="
			iconCls:'fa fa-times',
    		btnCls:'topjui-btn-brown',
    		onClick:refuseCommit
           ">审核拒绝</a>
     </jui:TranPurv>
     <jui:TranPurv transCode="voucherCheck" subTransCode="detailBtn">
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
            id: 'voucherCheck'
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



function showVoucherDetail(){
	var selectData = $("#voucherCheck").iDatagrid("getSelections");
	if(selectData){
		if(selectData.length == 1){
			var title = "凭证明细查看";
			var href = ctxPath+'/topjui/jsp/accounting/voucher/voucherDetail.jsp?genHostFlag='+selectData[0].gen_host_flag+'&voucherSerial='+selectData[0].voucher_serial;
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
 * 通过
 */
	
	function passCommit(){
		var succ=function(respons){
			showMessage(respons);
			$('#voucherCheck').iDatagrid('reload');
		}
		var records=$("#voucherCheck").iDatagrid("getSelections");
		if(records.length<1){
			$.iMessager.alert('警告','请选择要审核的凭证！');
		}else{
			$.iMessager.confirm('确认','您确认想要通过选中的凭证信息吗？',function(r){
			    if (r){
			        var ids = [];
					for(var i=0;i<records.length;i++){
					    var o = {};
					    o["voucherSerial"] = records[i].voucher_serial;
						ids[i]=o;
					}
					var res=convertArrayToObject(ids);
					asynExecute('com.avengers.accounting.voucher.VoucherCheckAction.vouchercheck.service?resCode=voucherCheck&opCode=passBtn',res,succ, null,'正在处理+++', 8000) ;
			    }
				});
		}
	}
	
/**
 * 拒绝
 */
 	function refuseCommit(){
 		var succ=function(respons){
			showMessage(respons);
			$('#voucherCheck').iDatagrid('reload');
		}
		var records=$("#voucherCheck").iDatagrid("getSelections");
		if(records.length<1){
			$.iMessager.alert('警告','请选择要审核的凭证！');
		}else{
			$.iMessager.confirm('确认','您确认想要审核拒绝选中的凭证信息吗？',function(r){
			    if (r){
			        var ids = [];
					for(var i=0;i<records.length;i++){
					    var o = {};
					    o["voucherSerial"] = records[i].voucher_serial;
						ids[i]=o;
					}
					var res=convertArrayToObject(ids);
					asynExecute('com.avengers.accounting.voucher.VoucherCheckAction.vouchercheck.service?resCode=voucherCheck&opCode=refuseBtn',res,succ, null,'正在处理+++', 8000) ;
			    }
				});
		}
	}

</script>
