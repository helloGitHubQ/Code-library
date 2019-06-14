<%@ page contentType="text/html; charset=utf-8"%>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui'%>
<head>
    <jsp:include page="../../main/cssinc.jsp"></jsp:include>
    <jsp:include page="../../main/jsinc.jsp"></jsp:include>
</head>

<body>
		<div data-toggle="topjui-layout" data-options="fit:true">
			<div data-options="region:'west',title:'标准科目树',split:true,border:false,width:'24%',iconCls:'fa fa-sitemap',headerCls:'border_right',bodyCls:'border_right'">
				<div id="tabPanel" data-toggle="topjui-tabs" data-options="fit:true,border:false,narrow:true">
				<div title="资产类">
					<ul id="tree1"></ul>
				</div>
				<div title="负债类">
					<ul id="tree2"></ul>
				</div>
				<div title="权益类">
					<ul id="tree3"></ul>
				</div>
				<div title="共同类">
					<ul id="tree4"></ul>
				</div>
				<div title="损益类">
					<ul id="tree5"></ul>
				</div>
				<div title="表外">
					<ul id="tree6"></ul>
				</div>
				</div>
			 </div>
     		
     			<div data-options="region:'center',iconCls:'fa fa-group',split:true,border:false,bodyCls:'border_left'">
					<table data-toggle="topjui-datagrid"
					       data-options="id: 'stdAccount',rownumbers: true,
						     singleSelect:true,
						     pagination:true, 
						     checkOnSelect:true,
						     selectOnCheck:true, 
					         url: 'com.avengers.accounting.accounttab.StdAccountTabAction.stdaccount.service?resCode=stdAccount&opCode=qryBtn'">
					    <thead>
						    <tr>
						        <th data-options="field:' ',title:'',checkbox:true"></th>
						        <th data-options="width:100,field:'account',title:'科目号',sortable:false"></th>
						        <th data-options="width:100,field:'pre_acct',title:'上级科目号',sortable:false"></th>
						        <th data-options="width:500,field:'name',title:'科目全称',sortable:false" ></th>
						        <th data-options="width:200,field:'short_name',title:'科目简称',sortable:false" ></th>
						        <th data-options="width:100,field:'rank',title:'科目级别',sortable:false" ></th>
						        <th data-options="width:50,field:'bottom_flag',title:'最低级标志',sortable:false,hidden:true" ></th>
						        <th data-options="width:70,field:'direction',title:'余额方向',sortable:false,dictType:'ACC_DIRECTION',formatter:juipub.dictFormatter"></th>
						        <th data-options="width:100,field:'catalog',title:'类别',sortable:false,dictType:'ACC_TOP_SUB',formatter:juipub.dictFormatter" ></th>
						        <th data-options="width:120,field:'subject_type',title:'科目类型',sortable:false,dictType:'ACC_SUB_TYPE',formatter:juipub.dictFormatter"></th>
						    </tr>
					    </thead>
					</table>
					
				<!-- 公共数据状态 -->
				<jui:Init type="dict" params="ACC_DIRECTION,ACC_TOP_SUB,ACC_SUB_TYPE" />
				<!-- 表格工具栏开始 -->
			     <!-- 表单开始 -->
				 <form id="queryForm" class="search-box">
				 <div id="stdAccount-toolbar" class="topjui-toolbar"data-options="grid:{type:'datagrid',id:'stdAccount'}">
				 <div class="topjui-row">
					 <div class="topjui-col-sm6">
					 <label class="topjui-form-label">科目号</label>
				     <input name="account" id="qryAccount"  data-options="width:200,showItemIcon:true" data-toggle="topjui-textbox"></div>
				     <div class="topjui-col-sm6">
				     <label class="topjui-form-label">科目全称</label>
				     <input name="name" id="qryName"  data-options="width:200,showItemIcon:true" data-toggle="topjui-textbox"></div>
				  </div>
				  <div class="topjui-row">
				  	 <div class="topjui-col-sm6">   
				     <label class="topjui-form-label">科目类别</label>
				     <input name="catalog" id="qryCatalog"  data-options="width:200,showItemIcon:true,valueField:'item_code',textField:'item_name',required:false,multiple:false,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_TOP_SUB'" data-toggle="topjui-combobox"></div>
				     <div class="topjui-col-sm6">
				     <label class="topjui-form-label">科目类型</label>
				     <input name="subject_type" id="qrySubjectType"  data-options="width:200,panelHeight:275,showItemIcon:true,valueField:'item_code',textField:'item_name',required:false,multiple:false,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_SUB_TYPE'" data-toggle="topjui-combobox"></div>
				  </div>
				  <div class="topjui-row">
				    <input data-toggle="topjui-checkbox" name="nextAccount" id="nextAccount" label="含下级科目"> 
				     <jui:TranPurv transCode="stdAccount" subTransCode="qryBtn">
				     <a href="javascript:void(0)" id="qryBtn"
				           data-toggle="topjui-menubutton"
				           data-options="method:'query',
				           iconCls:'fa fa-search',
				           btnCls:'topjui-btn-blue',
				           form:{id:'queryForm'},
				           grid:{type:'datagrid','id':'stdAccount'},onClick:selectQry">查询</a>
				           </jui:TranPurv>
				    <jui:TranPurv transCode="stdAccount" subTransCode="addBtn">
				      <a href="javascript:void(0)" id="addBtn" 
				       data-toggle="topjui-linkbutton"
				       data-options="method:'doAjax',btnCls:'topjui-btn-green', iconCls:'fa fa-plus',onClick:addBefore">增加</a> 
				    </jui:TranPurv>
				    <jui:TranPurv transCode="stdAccount" subTransCode="edtBtn">
					   <a href="javascript:void(0)" id='edtBtn'
				       data-toggle="topjui-menubutton"
				       data-options="method:'doAjax',btnCls:'topjui-btn-orange',iconCls:'fa fa-pencil',onClick:edtBefore">修改</a>
					</jui:TranPurv>
				    <jui:TranPurv transCode="stdAccount" subTransCode="delBtn">
					   <a href="javascript:void(0)" id="delBtn"
				       data-toggle="topjui-menubutton"
				       data-options="method:'doAjax',btnCls:'topjui-btn-brown',iconCls:'fa fa-trash',onClick:delCommit">删除</a>
				    </jui:TranPurv>
			     </div>
			     </form>
			     <!-- 表单结束 -->
			     </div>
			     <!-- 表格工具栏结束 -->
		</div>
</body>

<script type="text/javascript">
	window.onload=function(){
	/**
	 *  标准科目树渲染
	 *  1-资产类|2-负债类|3-权益类|4-共同类|5-损益类|6-表外
	 */
	 for(var i=1;i<7;i++){
		$('#tree'+i+'').iTree({
			method:'POST',
			parentField:'pre_acct',
			leafField:'leaf',
			queryParams:{'resCode':'stdAccount','opCode':'queryTree'},
		    url:'com.avengers.accounting.accounttab.StdAccountTabAction.stdaccount.service?catalog='+i,
		    idField:'account',
			nameField:'short_name',
			onClick: function(node){
				stdLoad({account:node.id,catalog:node.catalog}); 
			}
		});
	    } 
	}
	
	/**
	 * 判断是哪颗树
	 */
	function judgeTree(){
		var tab = $("#tabPanel").iTabs('getSelected');
		var index = $('#tabPanel').iTabs('getTabIndex',tab);
		var node=null;
		index = Number(index)+1;
		
		node=$("#tree"+index+"").iTree('getSelected');
		return node;
	}
	
	/**
	 * 新增
	 */	
	function addBefore(){
		var tab = $("#tabPanel").iTabs('getSelected');
		var index = $('#tabPanel').iTabs('getTabIndex',tab);
		var node=judgeTree();
		
		if(node==null){
			$.iMessager.alert('警告','请在左侧选择要增加父节点！');
			return;
		}else {
			var href='stdAccountTabSave.jsp?addFlag=add&account='+node.id+'&indexFlag='+index+'&direction='+node.direction+'&catalog='+node.catalog;
			dealDialog('标准科目添加',href,250,700,'');
		}
	}
	
	/**
	 * 修改
	 */	
	function edtBefore(){
	   var tab = $("#tabPanel").iTabs('getSelected');
	   var index = $('#tabPanel').iTabs('getTabIndex',tab);	
	   var record = $('#stdAccount').iDatagrid('getSelections');
       if(record.length>1){
       	 $.iMessager.alert('警告','请选择一条要修改的数据！');
       }else if(record.length==1){
       	 var href='stdAccountTabSave.jsp?addFlag=edt&indexFlag='+index;
       	 var url='com.avengers.accounting.accounttab.StdAccountTabAction.stdaccount.service?resCode=stdAccount&opCode=qryBtn&account='+record[0].account;
       	 dealDialog('标准科目修改',href,250,700,url);
       }else if(record.length<=0){
       	 $.iMessager.alert('警告','请选择要修改的数据！');
       }
	}
	
	function stdLoad(params){
		var account=params.account;
		$("#stdAccount").iDatagrid({url:'com.avengers.accounting.accounttab.StdAccountTabAction.stdaccount.service?resCode=stdAccount&opCode=qryBtn&account='+account}); 
		$('#qryAccount').iTextbox('setValue',account);
		$('#nextAccount').iCheckbox('check'); 
	}
	
	var $addDialog = $('<div id="stdAccountSave"></div>');// 创建元素<div>
	function dealDialog(titile,href,height,width,durl){
					var opts = {
			            id: 'stdAccountId',// 唯一标识id
			            title: titile,// 标题
			            closed: false, // 关闭状态
			            height:height, // 高度
			            width: width, // 宽度
			            href: href, // 加载页面元素的地址
			            buttons:'#btn',
			            collapsible:false,
			            maximizable:false,
			            grid:{
				           type:'datagrid',
				           id:'stdAccount'
				        }
		        	};
		        	if(!juipub.isEmpty(durl)){
		        	 $.extend(opts, {'url':durl});
		        	}
			        $addDialog.iDialog(opts);
		}
	
	/**
	 * 删除
	 */	
	function delCommit(){
		var records = $('#stdAccount').iDatagrid('getSelections');
		var succ=function(respons){
			showMessage(respons);
			var tab = $("#tabPanel").iTabs('getSelected');
			var index = $('#tabPanel').iTabs('getTabIndex',tab);
			index=Number(index)+1;
			$('#stdAccount').iDatagrid('reload');
			$('#tree'+index+'').iTree("reload");
		}
		
		if(records.length<1){
			$.iMessager.alert('警告','请选择要删除的数据！');
		}else{
			if(records[0].pre_acct=="/"){
				$.iMessager.alert('警告','一级科目不允许删除！');
			}else{
				$.iMessager.confirm('确认','您确认想要删除记录吗？',function(r){
			    if (r){
			        var ids = [];
					for(var i=0;i<records.length;i++){
					    var o = {};
					    o["account"] = records[i].account;
						ids[i]=o;
					}
					var res=convertArrayToObject(ids);
					asynExecute('com.avengers.accounting.accounttab.StdAccountTabAction.stdaccount.service?resCode=stdAccount&opCode=delBtn',res,succ, null,'正在删除+++', 8000) ;
			    }
				});
			}
		}
		
	}
	
	/**
	 * 查询
	 */	
	function selectQry(){
		var account=$('#qryAccount').val();
		var catalog=$('#qryCatalog').val();
		var name=$('#qryName').val();
		var subject_type=$('#qrySubjectType').val();
		var tab = $("#tabPanel").iTabs('getSelected');
		var index = $('#tabPanel').iTabs('getTabIndex',tab);
		var nextAccountFlag=$('#nextAccount').iCheckbox('isChecked'); 

		var node=judgeTree();
		index=Number(index)+1;
		if($("#tree"+index+"").iTree('getSelected')!=null){
			$("#tree"+index+"").iTree({'uncheck':document.getElementById(node.domId)});
		}
		$('#stdAccount').iDatagrid({
			url:'com.avengers.accounting.accounttab.StdAccountTabAction.stdaccount.service?resCode=stdAccount&opCode=qryDetail&account='+account+'&catalog='+catalog+'&name='+name+'&subject_type='+subject_type+'&nextAccountFlag='+nextAccountFlag
		});
	}
	
</script>
