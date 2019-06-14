<%@ page contentType="text/html; charset=utf-8" %>
<div data-toggle="topjui-layout" data-options="fit:true">
    <div data-options="region:'center',title:'',fit:true,border:false,bodyCls:'border_right_bottom'">
        <form id='ff'>
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
                                    data-options="required:true,labelAlign:'right',validType:['length[0,64]','number']">

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
                            科目名称
                        </label>
                        <div class="topjui-input-block">
                            <input
                                    type="text"
                                    id="shortName"
                                    name="shortName"
                                    dataField="shortName"
                                    data-toggle="topjui-textbox"
                                    data-options="required:true,readonly:false,labelAlign:'right',validType:['length[0,40]']">
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
                                    data-toggle="topjui-textbox"
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
                            <input name="subject_type" id="subject_type" dataField="subject_type"
                                   data-toggle="topjui-combobox"
                                   data-options="required:true,readonly:false,showItemIcon:true,valueField:'item_code',textField:'item_name',multiple:false,editable:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_SUB_TYPE'">
                        </div>
                    </div>

                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">
                            余额方向
                        </label>
                        <div class="topjui-input-block">
                            <input name="direction" id="direction" dataField="direction" data-toggle="topjui-combobox"
                                   data-options="required:true,readonly:false,showItemIcon:true,valueField:'item_code',textField:'item_name',multiple:false,editable:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_DIRECTION'">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">
                            是否允许透支
                        </label>
                        <div class="topjui-input-block">
                            <input name="overdraw" id="overdraw" dataField="overdraw" data-toggle="topjui-combobox"
                                   data-options="required:true,readonly:false,showItemIcon:true,valueField:'item_code',textField:'item_name',multiple:false,editable:false,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_OVER_FLAG'">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <div class="topjui-col-sm12">
                        <label class="topjui-form-label">
                            辅助核算
                        </label>
                        <input data-toggle="topjui-checkbox" id="dept" name="dept" value="1"
                               data-options="label:'记账机构',labelWidth:60,checked:true">
                        <input data-toggle="topjui-checkbox" id="costCenter" name="costCenter" value="2"
                               data-options="label:'核算中心',labelWidth:60,checked:true">
                        <input data-toggle="topjui-checkbox" id="number" name="number" value="3"
                               data-options="label:'数量',labelWidth:60">
                        <input data-toggle="topjui-checkbox" id="unit" name="unit" value="4"
                               data-options="label:'往来单位',labelWidth:60">
                        <input data-toggle="topjui-checkbox" id="fx" name="fx" value="5"
                               data-options="label:'外币',labelWidth:60">
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div id="buttons" class="dialog-button" data-options="region:'south'">
        <div id="btn">
            <a href="#" id="composeBtn" data-toggle="topjui-linkbutton"
               data-options="iconCls:'fa fa-save',onClick:beforeSave,text:'保存'"></a>
            <a href="#" data-toggle="topjui-linkbutton"
               data-options="iconCls:'fa fa-close',btnCls: 'topjui-btn-red',text: '关闭'"
               class="closeDialog topjui-btn-red" onClick="closeDialog('accountTabId')"></a>
        </div>
    </div>
</div>
<script>

    var href = $('#accountTabId').iDialog("options").href;
    var addFlag = getStringFromURLPath("addFlag", href);
    var bookCode = getStringFromURLPath("bookCode", href);
    var account = getStringFromURLPath("account", href);
    var name = getStringFromURLPath("name", href);
    var indexFlag = getStringFromURLPath("indexFlag", href);
    var catalog = getStringFromURLPath("catalog", href);
    var overdraw = getStringFromURLPath("overdraw", href);
    var short_name = getStringFromURLPath("short_name", href);
    var subject_type = getStringFromURLPath("subject_type", href);
    var direction = getStringFromURLPath("direction", href);
    var pre_acct = getStringFromURLPath("pre_acct", href);
    var sub_flag = getStringFromURLPath("sub_flag", href);
    $(function () {
        if (addFlag == 'edt') {
            $("#account").iTextbox({readonly: true, value: account});
            $("#shortName").iTextbox({value: short_name});
            $("#subject_type").iTextbox({value: subject_type});
            $("#direction").iTextbox({value: direction});
            $("#catalog").iCombobox({value: catalog});
            $("#overdraw").iCombobox({value: overdraw});
            $("#pre_acct").iCombobox({value: pre_acct});
            //sub_flag
            $("#dept").iCheckbox({checked: false});
            $("#costCenter").iCheckbox({checked: false});
            if (sub_flag.indexOf("1") != -1) {
                $("#dept").iCheckbox({checked: true});
            }
            if (sub_flag.indexOf("2") != -1) {
                $("#costCenter").iCheckbox({checked: true});
            }
            if (sub_flag.indexOf("3") != -1) {
                $("#number").iCheckbox({checked: true});
            }
            if (sub_flag.indexOf("4") != -1) {
                $("#unit").iCheckbox({checked: true});
            }
            if (sub_flag.indexOf("5") != -1) {
                $("#fx").iCheckbox({checked: true});
            }
        } else if (addFlag == 'add') {
            //  $("#direction").iCombobox({value: allDirection});
            $("#pre_acct").iCombobox({value: pre_acct});
            $("#account").iTextbox({value: account});
            $("#pre_acct").iTextbox({value: account});
            $("#catalog").iCombobox({value: indexFlag});
        }
    });

    function beforeSave() {
        var account = $("#account").iTextbox("getValue");
        $("input[name='account']").attr("value", account);
        submit();
    }

    function submit() {
        var succ = function (response) {
            var returnCode = response.returnCode;
            if (returnCode == "0") {
                showMessage(response);
                //树刷新
                initTree(tabAndTreeId, allBookCode)
                // 新增后表格刷新。
                tableLoad({"account": allTreeNode, "bookCode": allBookCode});
                closeDialog('accountTabId');
            } else {
                showMessage(response);
            }
        };
        var opCode = "";
        if (addFlag == 'add') {
            opCode = 'addBtn';
        } else {
            opCode = 'edtBtn';
        }
        if ($("#ff").iForm("validate")) {
            asynExecute('com.avengers.accounting.accounttab.AccountTabAction.accountTab.service?resCode=accountTab&opCode=' + opCode + "&book_code=" + bookCode + "&preName=" + name, $("#ff").serializeObject(), succ, null, '正在保存+++', 8000);
        }
    }


</script>
