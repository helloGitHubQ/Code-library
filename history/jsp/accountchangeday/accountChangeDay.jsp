<%@ page contentType="text/html; charset=utf-8"%>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui'%>
<head>
    <jsp:include page="../../main/cssinc.jsp"></jsp:include>
    <jsp:include page="../../main/jsinc.jsp"></jsp:include>
</head>
<body>
<div data-toggle="topjui-layout" data-options="fit:true">
    <div data-options="region:'center',title:'',fit:true,border:false,bodyCls:'border_right_bottom'">
    <form id="actChangeDayForm" method="post">
		<div class="topjui-fluid">
	         <div class="topjui-row">
	             <div class="topjui-col-sm6">
	                 <label class="topjui-form-label">账套名称</label>
	                 <div class="topjui-input-block">
	                     <input type="text" id="book_code" dataField="book_code" name="book_code" data-toggle="topjui-combobox" data-options="width:300,required:true,valueField:'book_code',editable:true,textField:'book_name',multiple:false,limitToList:true,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService&status=1&bookType=1',onChange:qryActChangeDay">
	                 </div>
	             </div>
	              <div class="topjui-col-sm6">
	                 <label class="topjui-form-label">会计日期</label>
	                 <div class="topjui-input-block">
	                    <input type="text" id="sys_date" name="sys_date" dataField="sys_date" data-options="readonly:true,width:300,required:false" data-toggle="topjui-datebox" >
	                 </div>
	             </div>
	         </div>
	         <div class="topjui-row">
	            <div class="topjui-col-sm6">
	                <label class="topjui-form-label">会计主管</label>
	                <div class="topjui-input-block">
	                     <input type="text" id="manager" dataField="manager" name="manager" data-toggle="topjui-combogrid"
							data-options="readonly:true,
							required:false,width:300,
							panelWidth:330,
							labelAlign:'right',
						    idField:'user_id',
						    valueField:'user_id',
						    textField:'user_name',
						    url: 'bfm.basedata.combogrid.ComboGrid.service?resCode=combogrid&opCode=user',
						    columns: [[
						        {field:'user_id',title:'用户id',width:120,sortable:true},
						        {field:'user_name',title:'用户名',width:120,sortable:true}
						    ]],
						    mode:'remote',
						    queryField:'all',
						    pagination:true, 
						    multiple:false,
						    rownumbers:true,
						    collapsible: false
						    "> 
	                </div>
	            </div>
	            <div class="topjui-col-sm6">
	                <label class="topjui-form-label">启用标识</label>
	                <div class="topjui-input-block">
	                     <input type="text" id="status" name="status" dataField="status" data-options="readonly:true,width:300,required:false,valueField:'item_code',textField:'item_name',required:false,multiple:true,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_ZTQYBS'" data-toggle="topjui-combobox" >
	                </div>
	            </div>
	         </div>
	         
	         <div class="topjui-row">
	         <div class="topjui-col-sm12">
	         <jui:TranPurv transCode="accountChangeDay" subTransCode="actChangeDay">
	         	<a href="javascript:void(0)" id="actChangeDay"
		           data-toggle="topjui-menubutton"
		           data-options="method:'doAjax', 
		           iconCls:'fa fa-bolt',
		           btnCls:'topjui-btn-green',
		           grid:{type:'datagrid','id':'actChangeDay'},onClick:accountChangeDay">会计切日</a></jui:TranPurv>
		 
		        <jui:TranPurv transCode="accountChangeDay" subTransCode="cnlChangeDay">
			    <a href="javascript:void(0)" id="cnlChangeDay"
			       data-toggle="topjui-menubutton"
			       data-options="method:'doAjax',
			       iconCls:'fa fa-reply',
			       btnCls:'topjui-btn-brown',
			       grid: {
			                type: 'datagrid',
			                id: 'actChangeDay'
			            },onClick:cancelChangeDay">撤销切日</a></jui:TranPurv>
		         </div>
		         </div>
	    </div>
	</form>    
    </div>
</div>
</body>
<script>
	/**
	 * 会计切日
	 */
	function accountChangeDay(){
		var book_code=$('#book_code').val();
		var status=$('#status').val();
		var sys_date=$('#sys_date').val();
		var succ=function(respons){
			showMessage(respons);
			$('#sys_date').iDatebox('setValue', respons.dataSetResult[0].data[0].paramValue);
		}
		if(book_code!=""){
			$.iMessager.confirm('确认','您确认想要会计切日吗？',function(r){
			    if (r){
					asynExecute('com.avengers.accounting.carryover.AccountChangeDayAction.actchangeday.service?resCode=accountChangeDay&opCode=actChangeDay&book_code='+book_code+'&status='+status+'&sys_date='+sys_date,null,succ, null,'会计切日中+++', 8000) ;
			    }
				});
		}else{
			$.iMessager.alert('警告','请选择要进行会计切日的账套名称！');
		}
	}
	
	/**
	 * 撤销切日
	 */
	function cancelChangeDay(){
		var book_code=$('#book_code').val();
		var status=$('#status').val();
		var sys_date=$('#sys_date').val();
		var succ=function(respons){
			showMessage(respons);
			$('#sys_date').iDatebox('setValue', respons.dataSetResult[0].data[0].paramValue);
		}
		if(book_code!=""){
			$.iMessager.confirm('确认','您确认想要撤销切日吗？',function(r){
			    if (r){
					asynExecute('com.avengers.accounting.carryover.AccountChangeDayAction.actchangeday.service?resCode=accountChangeDay&opCode=cnlChangeDay&book_code='+book_code+'&status='+status+'&sys_date='+sys_date,null,succ, null,'撤销切日中+++', 8000) ;
			    }
				});
		}else{
			$.iMessager.alert('警告','请选择要进行撤销切日的账套名称！');
		}
	}
	
	/**
	 * 查询
	 */
	function qryActChangeDay(){
		var book_code = $("#book_code").val();
		$('#actChangeDayForm').iForm({
		    url:'com.avengers.accounting.carryover.AccountChangeDayAction.actchangeday.service?resCode=accountChangeDay&opCode=qryActChangeDay&book_code='+book_code,
		    success:function(data){
		    	if(data.status!=1){
		    		$('#actCarryover').iLinkbutton('disable');
		    		$('#cnlCarryover').iLinkbutton('disable');
		    	}
	        }
		});
	}
</script>