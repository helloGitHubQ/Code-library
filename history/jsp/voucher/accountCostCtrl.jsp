<%@ page contentType="text/html; charset=utf-8"%>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui'%>
		<form id='entryForm'>
   		      <br/>
		      <div class="topjui-row">
			      	<div class="topjui-col-sm4">
	                         <input name="dept_no" id="entry_dept_no" 
	                                data-options="editable:false,required:true,valueField:'dept_no',textField:'dept_name',label:'记账机构',labelAlign:'right',
			        				multiple:false,limitToList:true,url:'com.avengers.accounting.bookset.DeptAction.dept.service?resCode=dept&opCode=qryDeptByManager',onBeforeLoad:addParams,panelHeight:100"
	                                data-toggle="topjui-combobox">
	                </div>
	                <div class="topjui-col-sm4">
	                         <input id="entry_cost_center" name="cost_center" data-toggle="topjui-combobox" data-options="label:'核算中心',
	                         required:true,validType:['length[0,20]'],editable:false,valueField:'cost_center',textField:'cost_center_name',labelAlign:'right',
			        		multiple:false,limitToList:true,url:'com.avengers.accounting.bookset.CostCenterAction.costcenter.service?resCode=costCenter&opCode=qryBtn',onBeforeLoad:addParams,panelHeight:100">
	                </div>
	                <div class="topjui-col-sm3">
					    	<input  data-toggle="topjui-numberbox" id="entry_quantity" name="quantity"  
					    	data-options="label:'数量',validType:['length[0,18]'],labelAlign:'right',precision:2">
	                </div>
              </div>
              <div class="topjui-row">
	                <div class="topjui-col-sm4">
	                        <input name="price" id="entry_price" data-toggle="topjui-numberbox"
	                             data-options="validType:['length[0,12]'],label:'单价',labelAlign:'right',precision:6">
	                </div>
	                <div class="topjui-col-sm4" id="foreignCodeDiv">
	                        <input name="foreign_cur_code" id="entry_foreign_cur_code" data-toggle="topjui-combobox"
	                             data-options="validType:['length[0,3]'],editable:true,valueField:'item_code',textField:'item_code',labelAlign:'right',label:'外币币种',
			        multiple:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=K_BZ',panelHeight:100">
	                </div>
	                <div class="topjui-col-sm3" id="foreignAmtDiv">
	                        <input name="foreign_amt" id="entry_foreign_amt" data-toggle="topjui-numberbox"
	                             data-options="validType:['length[0,18]'],label:'外币金额',labelAlign:'right',precision:2">
	                </div>
		      </div>
		     </form>
		     <div id="buttons" class="dialog-button" data-options="">
		        <div id="btn">
		            <a href="#" id="composeBtn" data-toggle="topjui-linkbutton"
		               data-options="iconCls:'fa fa-save',onClick:addRowData,text:'保存'"></a>
		        </div>
   	 		</div>
<script>
	$("#foreignCodeDiv").css("display", "none");
	$("#foreignAmtDiv").css("display", "none");
	var href = $('#entrydataDialog').iDialog("options").href;
	var account = getStringFromURLPath("account", href);
	var index = getStringFromURLPath("index", href);
		//关联业务参数
	var params = {
					resCode:"voucherManage",
				  	opCode:"enableOpt",
				  	bookCode:$('#save_bookcode').val(),
				  	account:account
				 };
	$("#entryForm").show(function(){
		var success = function (response){
			if(response.returnCode==0){
			    var result = response.dataSetResult[0].data[0];
				if(result.requireDept=='0'){//记账机构
					$('#entry_dept_no').iCombobox({required: false});
				}
				if(result.requireCost=='0'){//核算中心
					$('#entry_cost_center').iCombobox({required: false});
				}
				if(result.requireQuan=='1'){//数量
					$('#entry_quantity').iNumberbox({required: true});
					$('#entry_price').iNumberbox({required: true});
				}
				if(result.showForeginCode=='1'){//外币币种
					$("#foreignCodeDiv").css("display", "block");
					$("#foreignAmtDiv").css("display", "block");
					$('#entry_foreign_amt').iNumberbox({required: true});
				} 
				if(entryData){
					var assisCostData = entryData[index];
					if(entryData[index]){
						$('#entry_dept_no').iCombobox({value:assisCostData.dept_no});
						$('#entry_cost_center').iCombobox({value:assisCostData.cost_center});
						$('#entry_quantity').iNumberbox({value:assisCostData.quantity});
						$('#entry_price').iNumberbox({value:assisCostData.price});
						if(result.showForeginCode=='1'){
							$('#entry_foreign_cur_code').iCombobox({value:assisCostData.foreign_cur_code});
							$('#entry_foreign_amt').iNumberbox({value:assisCostData.foreign_amt}); 
						}else{
							$('#entry_foreign_cur_code').iCombobox({value:''});
							$('#entry_foreign_amt').iNumberbox({value:''}); 
						}
					}
				}
			}
			
			
			
			
			
		}
		synExecute('com.avengers.accounting.voucher.VoucherAction.voucher.service',params,success, null,'正在处理，请稍后...', 8000) ;
	});
	
</script>