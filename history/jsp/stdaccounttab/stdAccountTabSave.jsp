<%@ page contentType="text/html; charset=utf-8"%>
<div data-toggle="topjui-layout" data-options="fit:true">
  <div data-options="region:'center',title:'',fit:true,border:false,bodyCls:'border_right_bottom'">
  	<form id='ff' >
  	   <div class="topjui-fluid">
          <div class="topjui-row">
            <div class="topjui-col-sm6">
              <label class="topjui-form-label">
               科目号
              </label>
              <div class="topjui-input-block">
                <input 
                    type="text"
                    id="account"
                    dataField="account"
                    name="account"
                    data-toggle="topjui-textbox"
                    data-options="required:true,labelAlign:'right',validType:'number'">

              </div>
            </div>
            <div class="topjui-col-sm6">
              <label class="topjui-form-label">
                上级科目
              </label>
              <div class="topjui-input-block">
                <input 
                    type="text"
                    id="pre_acct"
                    name="pre_acct"
                    dataField="pre_acct"
                    data-toggle="topjui-textbox"
                    data-options="required:true,readonly:true,labelAlign:'right'">

              </div>
            </div>
          </div>
          <div class="topjui-row">
            <div class="topjui-col-sm6" id="pDiv">
              <label class="topjui-form-label">
               科目简称
              </label>
              <div class="topjui-input-block">
                <input 
                    type="text"
                    id="short_name"
                    name="short_name"
                    dataField="short_name"
                    data-toggle="topjui-textbox"
                    data-options="required:true,readonly:false,labelAlign:'right'">
              </div>
            </div>
            <div class="topjui-col-sm6" id="pnDiv">
              <label class="topjui-form-label">
                科目类别
              </label>
              <div class="topjui-input-block">
                <input 
                    type="text"
                    id="catalog"
                    name="catalog"
                    dataField="catalog"
                    data-toggle="topjui-combobox"
                    data-options="required:true,readonly:true,labelAlign:'right',showItemIcon:true,valueField:'item_code',textField:'item_name',multiple:false,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_TOP_SUB'">
              </div>
            </div>
          </div>
          <div class="topjui-row">
            <div class="topjui-col-sm6">
              <label class="topjui-form-label">
               科目类型
              </label>
              <div class="topjui-input-block">
             <input name="subject_type" id="subject_type" dataField="subject_type" data-toggle="topjui-combobox"  data-options="panelHeight:275,required:false,readonly:false,showItemIcon:true,valueField:'item_code',textField:'item_name',multiple:false,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_SUB_TYPE'">
              </div>
            </div>
            <div class="topjui-col-sm6">
              <label class="topjui-form-label">
               余额方向
              </label>
              <div class="topjui-input-block">
             <input name="direction" id="direction" dataField="direction" data-toggle="topjui-combobox"  data-options="required:true,readonly:false,showItemIcon:true,valueField:'item_code',textField:'item_name',multiple:false,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_DIRECTION'">
              </div>
            </div>
          </div>
       </div>     
     </form>
  </div>
	<div  id="buttons" class="dialog-button" data-options="region:'south'">
		<div id="btn">
		    <a href="#" id="composeBtn" data-toggle="topjui-linkbutton"  data-options="iconCls:'fa fa-save',onClick:beforeSave,text:'保存'"  ></a>
		    <a href="#" data-toggle="topjui-linkbutton"   data-options="iconCls:'fa fa-close',btnCls: 'topjui-btn-red',text: '关闭'" class="closeDialog topjui-btn-red" onClick="closeDialog('stdAccountId')"></a>
		</div> 
	</div>
</div>
<script>

	  var href = $('#stdAccountId').iDialog("options").href;
	  var addFlag = getStringFromURLPath("addFlag", href);
	  var account = getStringFromURLPath("account", href);
	  var catalog = getStringFromURLPath("catalog", href);
	  var direction = getStringFromURLPath("direction", href);
	  var pre_acct = getStringFromURLPath("pre_acct", href);
	  var indexFlag = getStringFromURLPath("indexFlag", href);
	  indexFlag=Number(indexFlag)+1;
	  $("#stdAccountId").iForm({"onLoadSuccess":loadSuccess});
	  
	  if(addFlag=='edt'){
		  $("#account").iTextbox({readonly:true});
	  }else if(addFlag=='add'){
		  $("#account").iTextbox({value:account});
		  $("#pre_acct").iTextbox({value:account});
		  $("#direction").iTextbox({value:direction}); 
		  $("#catalog").iCombobox({value:catalog});
	  }
  
	 function loadSuccess(){
	 	if(addFlag=='edt'){
	 	 qry_account= $("#account").iTextbox("getValue"); 
	 	}
	 }
 
 	function beforeSave(){
 		var accountThis = $("#account").iTextbox("getValue");
 		if(addFlag=='add'){
 			//验证科目号前几位是否和上级科目号相同
 	 		if(!accountThis.match("^"+account+"[0-9]*$")){
 	 			$.iMessager.alert('警告','科目号不符合科目结构规则（科目号前几位必须和上级科目号相同）！');
 				return;
 	 		}
 		}
 		
		submit();
     }
 	
	 function submit(){
	 	var succ= function(response) {
		 	returnCode = response.returnCode;
			errorInfo = response.errorInfo;
			if(returnCode == "0"){
				showMessage(response);
				$('#stdAccount').iDatagrid('reload');
				$('#tree'+indexFlag+'').iTree("reload");
				closeDialog('stdAccountId');
			}else{
				showMessage(response);
			}
	 	};
	 	
	 	var opCode="";
	 	if(addFlag=='add'){
	 	 	opCode='addBtn';
	 	}else{
	 		opCode='edtBtn';
	 	}
	 	if($("#ff").iForm("validate")){
			asynExecute('com.avengers.accounting.accounttab.StdAccountTabAction.stdaccount.service?resCode=stdAccount&opCode='+opCode,$("#ff").serializeObject(),succ,null,'正在保存+++', 8000);
	 	}
	 }
 
 
</script>
