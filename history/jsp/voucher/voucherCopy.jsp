<%@ page contentType="text/html; charset=utf-8"%>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui'%>
	    <div class="topjui-fluid">
			<div class="topjui-row">
		      	<h1 align="center" style="font-size: 24px">会计记账凭证</h1>
		      </div>
		      <div class="topjui-row">
		      	<div class="topjui-col-sm4">
                     <label class="topjui-form-label">账套名称</label>
                     <div class="topjui-input-block">
                         <input name="bookCode" id="save_bookcode" dataField="book_code"
                                data-options="panelHeight:100,valueField:'book_code',required:true,readonly:true,textField:'book_name',multiple:false,editable:false,limitToList:true
                                ,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService&status=1&bookType=1'
                                "
                                data-toggle="topjui-combobox">
                     </div>
                </div>
                <div class="topjui-col-sm4">
                     <label class="topjui-form-label">制证日期</label>
                     <div class="topjui-input-block">
                         <input id="save_voucherDate" name=voucherDate dataField="voucher_date" data-toggle="topjui-datebox" 
                         data-options="width:150,value:top.sysDate,editable:false,readonly:true,required:true
 						,validType:['date']">
                     </div>
                </div>
                <div class="topjui-col-sm4">
                     <div class="topjui-input-block">
				    	<input  data-toggle="topjui-checkbox" id="save_gen_host_flag" name="gen_host_flag" dataField="gen_host_flag"
				    	 value="1"  data-options="labelPosition:'left',label:'传总账',labelWidth:60">
                     </div>
                </div>
                </div>
              <div class="topjui-row">
                <div class="topjui-col-sm4">
                    <label class="topjui-form-label">凭证字</label>
                    <div class="topjui-input-block">
                        <input name="voucherCatalog" id="save_voucher_catalog" dataField="voucher_catalog" data-toggle="topjui-combobox" 
                             data-options="panelHeight:100,editable:true,required:true,valueField:'voucher_catalog',textField:'voucher_name',multiple:false,limitToList:true,url:''">
                    </div>
                </div>
                <div class="topjui-col-sm4">
                    <label class="topjui-form-label">原始票据号</label>
                    <div class="topjui-input-block">
                        <input name="billNo" id="save_bill_no" dataField="bill_no" 
                        	data-toggle="topjui-textbox"
                             data-options="editable:true,validType:['length[0,32]'],width:150">
                    </div>
                </div>
                <div class="topjui-col-sm4">
                    <label class="topjui-form-label">附件数</label>
                    <div class="topjui-input-block">
                        <input name="enclosure" id="save_enclosure" dataField="enclosure" data-toggle="topjui-numberbox"
                             data-options="editable:true,validType:['length[0,32]'],width:150">
                    </div>
                </div>
		      </div>
      	</div>
		<table data-toggle="topjui-edatagrid"
	       data-options="id:'voucherEdit',singleSelect:true,checkOnSelect:true,selectOnCheck:true,autoSave:false,pagination:false,onLoadSuccess:initData,
	       url: 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=getentry&voucherSerial=<%=request.getParameter("voucherSerial")%>',onEndEdit:juipub.endEdit
	            ">
		    <thead>
		    <tr>
		    	<th data-options="field:' ',title:'主键',checkbox:true"></th>
		        <th data-options="field:'summary',title:'摘要',width:200,formatter:comboboxFormatter,editor:{type:'combobox',options:{validType:['length[0,256]'],valueField:'descr',
    	    textField:'descr',editable:true,limitToList:false,url:'com.avengers.accounting.bookset.DescriptionAction.description.service?resCode=description&opCode=qryBtn',onBeforeLoad:addParams}}"></th>
		        <th data-options="field:'account',title:'科目',width:300,formatter:comboboxFormatter,editor:{type:'combotree',options:{required:true,
		        idField:'account',nameField:'short_name',parentField:'pre_acct',leafField:'leaf',editable:true,onChange:checkAccount,
		        url:'com.avengers.accounting.accounttab.AccountTabAction.accountTab.service?resCode=accountTab&opCode=qryAllCatalogTree',onBeforeLoad:addNodeParams}}"></th>
		        <th data-options="field:'direction',title:'借贷方向',width:100,formatter:comboboxFormatter,editor:{type:'combobox',options:{validType:['length[0,18]'],required:true,editable:false,valueField:'item_code',textField:'item_name',
		        multiple:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_DIRECTION',panelHeight:100}}"></th>
		        <th data-options="field:'amt',title:'金额',width:100,editor:{type:'numberbox',options:{validType:['length[0,18]'],textAlign:'right',groupSeparator:',',required:true,precision:2}}"></th>
   		        <th data-options="field:'cur_code',title:'币种',width:100,editor:{type:'combobox',options:{validType:['length[0,3]'],editable:true,valueField:'item_code',required:true,textField:'item_code',
		        multiple:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=K_BZ',panelHeight:100}}"></th>
		    	<th data-options="field:'operateVision',title:'操作',align:'center',width:100,formatter:operateFormatter"></th>
		    </tr>
		    </thead>
		</table>
		
	<div id="voucherEdit-toolbar" class="topjui-toolbar"data-options="grid:{type:'datagrid',id:'voucherEdit'}">
	   <a href="javascript:void(0)"  id="edtBtn"
       data-toggle="topjui-menubutton"
       data-options="method:'doAjax', 
       btnCls:'topjui-btn-green',
       iconCls:'fa fa-save',
       onClick:saveEntry">保存</a>
      	<!-- 表单结束 -->
    </div>
    <!-- 表格工具栏结束 -->

<script>
var href = $('#voucherManagerDialogId').iDialog("options").href;
var copyFlag = getStringFromURLPath("copyFlag", href);//正向或者反向
var genHostFlag = getStringFromURLPath("genHostFlag", href);//传总账标志
var voucherSerials = getStringFromURLPath("voucherSerial", href);
$(function () {
		if(genHostFlag=='0'||genHostFlag=='1'){
			$('#save_gen_host_flag').iCheckbox({checked : true});
		}else if(genHostFlag=='2'){
			$('#save_gen_host_flag').iCheckbox({checked: false});
		}
});
	
	/**
	 *复制时初始化辅助核算的数组
	 */
	function initData(data){
		var rowData;
		for(var i = 0;i<data.rows.length;i++){
			rowData = data.rows[i]; 
			entryData[i] = {
				dept_no:rowData.dept_no,
   				cost_center:rowData.cost_center,
   				quantity:rowData.quantity,
   				foreign_cur_code:rowData.foreign_cur_code,
   				foreign_amt:rowData.foreign_amt,
   				price:rowData.price
			};
		}
	}
	

    //下拉框文本显示
    function comboboxFormatter(value,row,index){
    	  if(this.text && this.text[index]){
              return this.text[index];
          }
          return value;
    }

	function operateFormatter(value, row, index) {
			//数据
		    return "<button  id='assistCost"+index+"' data-toggle='topjui-linkbutton' data-options='iconCls:fa fa-save' onclick='loadDataPage("+index+")' >辅助核算</button>&nbsp;";
	}

	var entryData = new Array();
	//数据项保存
	function saveEntry(){
		//提交时结束编辑
		var rows=$('#voucherEdit').iDatagrid('getRows');
		endEditMethod();
		var flag = true;
		//判断数据是否为空
		if(rows.length<=0){
			$.iMessager.alert('警告','请至少录入一条分录数据!');
			var flag = false;
			return false;
		}
		//判断是否为底层节点
		var hasChk = $("input[name='gen_host_flag']").is(':checked');
		var gen_host_flag;
		if(hasChk){
			gen_host_flag = 1;
		}else{
			gen_host_flag = 0;
		}
		if(entryData.length<rows.length){
			$.iMessager.alert('警告','请将辅助核算内容填写完整!');
			return false;
		}
		var params = new Array(rows.length);
			for(var i=0;i<rows.length;i++){
				params[i] = $.extend(rows[i],$.extend({bookCode:$('#save_bookcode').val(),
					voucherDate:$('#save_voucherDate').val(),
					gen_host_flag:gen_host_flag,
					voucherCatalog:$('#save_voucher_catalog').val(),
					enclosure:$('#save_enclosure').val(),
					billNo:$('#save_bill_no').val(),
					copyFlag:copyFlag
					},entryData[i]));
			} 
		
	
		if(flag){
			var succ=function(respons){
				showMessage(respons);
				if(respons.returnCode==0){
					closeDialog('voucherManagerDialogId');
					$('#voucherManage').iDatagrid('reload');
				}
			}
		
				asynExecute('com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=addVoucher',params,succ, null,'正在保存+++', 8000) ;
		}
	}
	

 function getEditor(number){
	var record=$('#voucherEdit').iEdatagrid('getSelected');
	var index = $('#voucherEdit').iEdatagrid('getRowIndex',record);
	 var editors = $('#voucherEdit').iEdatagrid('getEditors', index);//取当前的编辑器
    var backEditor = editors[number];//获得datagrid的第一个编辑框（库位代码）
    return backEditor;
} 

	
	
	function endEditMethod(){
		var rows=$('#voucherEdit').iDatagrid('getRows');
		(rows).forEach(function(item,index,array){  
		 $("#voucherEdit").datagrid('endEdit',index);  
		});
	}
	
/**
 * 增加参数
 */
	function addParams(param){
		param.bookCode=$('#save_bookcode').val();
	}
	
	
	
	function addNodeParams(node,param){
		param.bookCode=$('#save_bookcode').val();
	}
	
	function loadDataPage(index){
		 var editors = $('#voucherEdit').iEdatagrid('getEditors', index);
		 if(editors.length!=0){
			 var account = $(editors[1].target).iCombobox("getValue");
				if(!account){
					$.iMessager.alert('警告','请先录入科目数据!');
					return false;
				}else{
					var newValue = account;
				} 
				var rHeight=240; // 高度
		        var rWidth=800; // 宽度
		        rTitle="数据添加";
		        rHref=ctxPath+'/topjui/jsp/accounting/voucher/accountCostCtrl.jsp?account='+newValue+'&index='+index;
		        // 创建元素<div>,返回一个jquery对象
		        var $detailDialog = $('<div id="dataDialog"></div>');
		        //创建窗体
		        var opts = {
		            id: 'entrydataDialog',// dialog唯一标识id
		            title:rTitle,// 标题
		            closed: false, // 关闭状态
		            modal: true,//非模态框
		            height: rHeight, // 高度
		            width: rWidth, // 宽度
		            href: rHref // 加载页面元素的地址
		        };
		         //在div元素中嵌入dialog
		         $detailDialog.iDialog(opts);
				
		 }else{
			 return false;
		 }
		
	}
	
	function addRowData(){
        if ($("#entryForm").iForm("validate")) {
        	var record = $('#voucherEdit').iEdatagrid('getSelected');
    		var index = $('#voucherEdit').iEdatagrid('getRowIndex',record);
    		entryData[index] = {
    				dept_no:$("#entry_dept_no").val(),
    				cost_center:$("#entry_cost_center").val(),
    				quantity:$("#entry_quantity").val(),
    				foreign_cur_code:$("#entry_foreign_cur_code").val(),
    				foreign_amt:$("#entry_foreign_amt").val(),
    				price:$("#entry_price").val()
    		};
    		closeDialog('entrydataDialog');
        }
	}
	//判断节点是否为叶子结点
	function checkAccount(newValue, oldValue){
		var t = $(this).iCombotree('tree'); 
		var n = t.tree('getSelected');
		if(n){
			var m = n.children.length;
			if(m!=0){
				$.iMessager.alert('警告',"只能选择最底层科目！");
				$(this).iCombotree('setValue', {id:oldValue});
				return false;
			}
		}
	}
	
</script>