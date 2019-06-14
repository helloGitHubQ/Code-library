<%@ page contentType="text/html; charset=utf-8"%>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui'%>
	    <div class="topjui-fluid">
	    	<div class="topjui-row" >
	    		<a onclick="pageSkip('1')" href="#" data-options="iconCls:'icon-search',iconAlign:'center'" data-toggle="topjui-linkbutton">首页</a>
				<a onclick="pageSkip('2')" href="#" data-options="iconCls:'icon-search',iconAlign:'center'" data-toggle="topjui-linkbutton">上一页</a>
				<a onclick="pageSkip('3')" href="#" data-options="iconCls:'icon-search',iconAlign:'center'" data-toggle="topjui-linkbutton">下一页</a>
				<a onclick="pageSkip('4')" href="#" data-options="iconCls:'icon-search',iconAlign:'center'" data-toggle="topjui-linkbutton">末页</a>
				<a onclick="pageSkip('5')" href="#" data-options="iconCls:'icon-search',iconAlign:'center'" data-toggle="topjui-linkbutton">打印</a>
	    	</div>
			<div class="topjui-row">
		      	<h1 align="center" style="font-size: 24px">会计记账凭证</h1>
		      </div>
		      <div class="topjui-row">
		      	<div class="topjui-col-sm4">
                     <label class="topjui-form-label">账套名称</label>
                     <div class="topjui-input-block">
                         <input name="bookCode" id="save_bookcode" dataField="book_code"
                                data-options="panelHeight:100,valueField:'book_code',readonly:true,required:true,textField:'book_name',multiple:false,editable:false,limitToList:true
                                ,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService&status=1&bookType=1'"
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
				    	 value="1"  data-options="labelPosition:'left',readonly:true,label:'传总账',labelWidth:60">
                     </div>
                </div>
                </div>
              <div class="topjui-row">
                <div class="topjui-col-sm4">
                    <label class="topjui-form-label">凭证字</label>
                    <div class="topjui-input-block">
                        <input name="voucherCatalog" id="save_voucher_catalog" dataField="voucher_catalog" data-toggle="topjui-combobox" 
                             data-options="panelHeight:100,editable:true,required:true,readonly:true,valueField:'voucher_catalog',textField:'voucher_name',multiple:false,limitToList:true,url:''">
                    </div>
                </div>
                <div class="topjui-col-sm4">
                    <label class="topjui-form-label">原始票据号</label>
                    <div class="topjui-input-block">
                        <input name="billNo" id="save_bill_no" dataField="bill_no" 
                        	data-toggle="topjui-textbox"
                             data-options="editable:true,readonly:true,validType:['length[0,32]'],width:150">
                    </div>
                </div>
                <div class="topjui-col-sm4">
                    <label class="topjui-form-label">附件数</label>
                    <div class="topjui-input-block">
                        <input name="enclosure" id="save_enclosure" dataField="enclosure" data-toggle="topjui-numberbox"
                             data-options="editable:true,readonly:true,validType:['length[0,32]'],width:150">
                    </div>
                </div>

		      </div>
      	</div>
		<table data-toggle="topjui-datagrid"
	       data-options="id:'voucherDetail',
	       singleSelect:true,checkOnSelect:true,selectOnCheck:true,autoSave:false,pagination:true,
	            url: 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=getentry&voucherSerial=<%=request.getParameter("voucherSerial")%>'
	            ">
		    <thead>
		    <tr>
		        <th data-options="field:'summary',title:'摘要',width:200"></th>
		        <th data-options="field:'account_name',title:'科目',width:150"></th>
		        <th data-options="field:'direction',title:'借贷方向',width:100,dictType:'ACC_DIRECTION',formatter:juipub.dictFormatter"></th>
		        <th data-options="field:'amt',title:'金额',groupSeparator:',',align:'right',width:100"></th>
   		        <th data-options="field:'cur_code',title:'币种',width:100"></th>
   		        <th data-options="field:'dept_name',title:'记账机构',width:150"></th>
		        <th data-options="field:'cost_name',title:'核算中心',width:150"></th>
		        <th data-options="field:'quantity',title:'数量',width:100"></th>
		        <th data-options="field:'price',title:'单价',groupSeparator:',',align:'right',width:100"></th>
		        <th data-options="field:'foreign_cur_code',title:'外币币种',width:100"></th>
   		        <th data-options="field:'foreign_amt',title:'外币金额',groupSeparator:',',align:'right',width:100"></th>
		    </tr>
		    </thead>
		</table>
		<jui:Init type="dict" params="ACC_DIRECTION"/>
		

<script>
var href = $('#voucherManagerDialogId').iDialog("options").href;
var voucherSerials = getStringFromURLPath("voucherSerial", href);
var genHostFlag = getStringFromURLPath("genHostFlag", href);//传主机标志
var period = getStringFromURLPath("period", href);//当前会计期间
var bookCode = getStringFromURLPath("bookCode", href);//账套
var voucherCatalog = getStringFromURLPath("voucherCatalog", href);//凭证类别
var voucherNo = parseInt(getStringFromURLPath("voucherNo", href));//凭证号
function pageSkip(flag){
	if(flag=='1'){//首页
		reloadEntry(bookCode,voucherCatalog,period,'1','1');
		voucherNo = 1;
	}
	if(flag=='2'){//上一页
		reloadEntry(bookCode,voucherCatalog,period,voucherNo-1,'2');
		voucherNo = voucherNo-1;
	}
	if(flag=='3'){//下一页
		reloadEntry(bookCode,voucherCatalog,period,voucherNo+1,'3');
		voucherNo = voucherNo+1;
	}
	if(flag=='4'){//末页

	}
	if(flag=='5'){//打印

	}
}


function reloadEntry(bookCode,voucherCatalog,period,voucherNo,flag){
	alert(voucherNo);
	//关联业务参数
	var params = {
					resCode:"voucherManage",
				  	opCode:"qryBtn",
				  	bookCode:bookCode,
				  	voucherCatalog:voucherCatalog,
				  	period:period,
				  	voucherNo:voucherNo
				 };
	var success = function (response){
		if(response.returnCode==0){
			if(response.dataSetResult[0].data){//设置数据
			    var result = response.dataSetResult[0].data[0];
				$("#save_bookcode").iCombobox('setValue',result.book_code);
				$("#save_voucherDate").iDatebox('setValue',result.voucher_date);
				$("#save_voucher_catalog").iCombobox('setValue',result.voucher_catalog);
				$("#save_bill_no").iTextbox('setValue',result.bill_no);
				$("#save_enclosure").iNumberbox('setValue',result.enclosure);
				if(result.gen_host_flag=='0'||result.gen_host_flag=='1'){
					$('#save_gen_host_flag').iCheckbox({checked : true});
				}else if(genHostFlag=='2'){
					$('#save_gen_host_flag').iCheckbox({checked: false});
				}
				var url = 'com.avengers.accounting.voucher.VoucherAction.voucher.service?resCode=voucherManage&opCode=getentry&voucherSerial='+result.voucher_serial;
				$("#voucherDetail").iDatagrid({url:url});
			}else{
				if(flag=='1'||flag=='2'){//首页
					$.iMessager.alert('警告',"当前已经为首条");
				}
				if(flag=='3'||flag=='4'){//下一页
					$.iMessager.alert('警告',"当前已经为最后一条");
				}
			}
		}
	}
	asynExecute('com.avengers.accounting.voucher.VoucherAction.voucher.service',params,success, null,'正在处理，请稍后...', 8000) ;
}


$(function () {
		if(genHostFlag=='0'||genHostFlag=='1'){
			$('#save_gen_host_flag').iCheckbox({checked : true});
		}else if(genHostFlag=='2'){
			$('#save_gen_host_flag').iCheckbox({checked: false});
		}
});
</script>