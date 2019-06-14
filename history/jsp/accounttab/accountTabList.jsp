<%@ page contentType="text/html; charset=utf-8" %>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui' %>
<head>
    <jsp:include page="../../main/cssinc.jsp"></jsp:include>
    <jsp:include page="../../main/jsinc.jsp"></jsp:include>
</head>

<div data-toggle="topjui-layout" data-options="fit:true">
    <div data-options="region:'west',title:'会计科目树',split:true,border:false,width:'25%',iconCls:'fa fa-sitemap',headerCls:'border_right',bodyCls:'border_right'">
        <div id="accountTabInfo" data-toggle="topjui-tabs"
             data-options="fit:true,border:false,narrow:true,onSelect:getSelectTreeID">
            <div title="资产类" id="tab1">
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">账套名称</label>
                        <div class="topjui-input-block">
                            <input name="qry_book_code" id="qry_book_code1" dataField="book_code"
                                   data-options="onSelect:chgTree,required:true,width:200,valueField:'book_code',textField:'book_name',multiple:false,editable:true,limitToList:true,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService',editable:true"
                                   data-toggle="topjui-combobox">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <ul id="tt1"></ul>
                </div>
            </div>
            <div title="负债类" id="tab2">
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">账套名称</label>
                        <div class="topjui-input-block">
                            <input name="qry_book_code" id="qry_book_code2" dataField="book_code"
                                   data-options="onSelect:chgTree,required:true,width:200,valueField:'book_code',textField:'book_name',multiple:false,editable:true,limitToList:true,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService',editable:true"
                                   data-toggle="topjui-combobox">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <ul id="tt2"></ul>
                </div>
            </div>
            <div title="所有者权益" id="tab3">
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">账套名称</label>
                        <div class="topjui-input-block">
                            <input name="qry_book_code" id="qry_book_code3" dataField="book_code"
                                   data-options="onSelect:chgTree,required:true,width:200,valueField:'book_code',textField:'book_name',multiple:false,editable:true,limitToList:true,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService',editable:true"
                                   data-toggle="topjui-combobox">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <ul id="tt3"></ul>
                </div>
            </div>
            <div title="共同类" id="tab4">
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">账套名称</label>
                        <div class="topjui-input-block">
                            <input name="qry_book_code" id="qry_book_code4" dataField="book_code"
                                   data-options="onSelect:chgTree,required:true,width:200,valueField:'book_code',textField:'book_name',multiple:false,editable:true,limitToList:true,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService',editable:true"
                                   data-toggle="topjui-combobox">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <ul id="tt4"></ul>
                </div>
            </div>
            <div title="损益类" id="tab5">
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">账套名称</label>
                        <div class="topjui-input-block">
                            <input name="qry_book_code" id="qry_book_code5" dataField="book_code"
                                   data-options="onSelect:chgTree,required:true,width:200,valueField:'book_code',textField:'book_name',multiple:false,editable:true,limitToList:true,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService',editable:true"
                                   data-toggle="topjui-combobox">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <ul id="tt5"></ul>
                </div>
            </div>
            <div title="表外" id="tab6">
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">账套名称</label>
                        <div class="topjui-input-block">
                            <input name="qry_book_code" id="qry_book_code6" dataField="book_code"
                                   data-options="onSelect:chgTree,required:true,width:200,valueField:'book_code',textField:'book_name',multiple:false,editable:true,limitToList:true,url:'com.avengers.accounting.bookset.BookSetAction.booksetinfo.service?resCode=bookSetInfo&opCode=qryAllService',editable:true"
                                   data-toggle="topjui-combobox">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <ul id="tt6"></ul>
                </div>
            </div>
        </div>
    </div>

    <div data-options="region:'center',iconCls:'fa fa-group',split:true,border:false,bodyCls:'border_left'">
        <table data-toggle="topjui-datagrid"
               data-options="id: 'accountTab',rownumbers: true,
                            onBeforeLoad:juipub.firstNoLoad,
						     singleSelect:true,
						     pagination:true,
						     checkOnSelect:true,
						     selectOnCheck:true,
					         url: 'com.avengers.accounting.accounttab.AccountTabAction.accountTab.service?resCode=accountTab&opCode=qryBtn'">
            <thead>
            <tr>
                <th data-options="field:' ',title:'',checkbox:true"></th>
                <th data-options="field:'account',title:'科目号',sortable:false"></th>
                <th data-options="field:'pre_acct',title:'上级科目号',sortable:false"></th>
                <th data-options="field:'name',title:'科目全称',width:300,sortable:false"></th>
                <th data-options="field:'direction',title:'余额方向',sortable:false,dictType:'ACC_DIRECTION',formatter:juipub.dictFormatter"></th>
                <th data-options="field:'catalog',title:'类别',sortable:false,dictType:'ACC_TOP_SUB',formatter:juipub.dictFormatter"></th>
                <th data-options="field:'rank',title:'科目级别',sortable:false"></th>
                <th data-options="field:'subject_type',title:'科目类型',sortable:false,dictType:'ACC_SUB_TYPE',formatter:juipub.dictFormatter"></th>
                <th data-options="field:'sub_flag',title:'辅助核算',width:300,sortable:false,formatter:subFlagFormart"></th>
                <th data-options="field:'overdraw',title:'是否允许透支',width:150,sortable:false,dictType:'ACC_OVER_FLAG',formatter:juipub.dictFormatter"></th>
            </tr>
            </thead>
        </table>
        <jui:Init type="dict" params="ACC_DIRECTION,ACC_TOP_SUB,ACC_SUB_TYPE,ACC_OVER_FLAG"/>
        <!-- 表格工具栏开始 -->
        <div id="accountTab-toolbar" class="topjui-toolbar" data-options="grid:{type:'datagrid',id:'accountTab'}">
            <!-- 表单开始 -->
            <form id="queryForm" >
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">科目编号</label>
                        <input name="account" id="qry_account"
                               data-options="width:240,showItemIcon:true"
                               data-toggle="topjui-textbox">
                    </div>
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">科目名称</label>
                        <input name="shortName" id="qry_shortName"
                               data-options="width:240,showItemIcon:true"
                               data-toggle="topjui-textbox">
                    </div>
                </div>
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">科目类别</label>
                        <input name="catalog" id="qry_catalog"
                               data-options="width:240,showItemIcon:true,valueField:'item_code',textField:'item_name',required:false,multiple:false,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_TOP_SUB'"
                               data-toggle="topjui-combobox">
                    </div>
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">科目类型</label>
                        <input name="subject_type" id="qrySubjectTypeAssets"
                               data-options="width:240,showItemIcon:true,valueField:'item_code',textField:'item_name',required:false,multiple:false,editable:true,limitToList:true,url:'bfm.basedata.dict.DictSvr.service?resCode=bfmdict&opCode=items&key=ACC_SUB_TYPE'"
                               data-toggle="topjui-combobox">
                        <div id="divCatalog">
                            <input name="bookCode" id="qry_book_code" data-options=""
                                   data-toggle="topjui-textbox">
                        </div>
                    </div>
                </div>
                <div class="topjui-row">
                    <div class="topjui-col-sm6">
                        <label class="topjui-form-label">含下级</label>
                        <input data-toggle="topjui-checkbox" id="sonAccount" name="sonAccount" value="true"
                               data-options="labelWidth:60">
                    </div>
                </div>
                <div class="topjui-row">
                    <jui:TranPurv transCode="accountTab" subTransCode="qryBtn">
                        <a href="javascript:void(0)"
                           data-toggle="topjui-menubutton"
                           data-options="method:'query',
                            queryBefore:'qryBtn_click',
				           iconCls:'fa fa-search',
				           btnCls:'topjui-btn-blue',
				           form:{id:'queryForm'},
				           grid:{type:'datagrid','id':'accountTab'}">查询</a>
                    </jui:TranPurv>

                    <jui:TranPurv transCode="accountTab" subTransCode="addBtn">
                        <a href="javascript:void(0)" id="addBtn"
                           data-toggle="topjui-linkbutton"
                           data-options="method:'doAjax',btnCls:'topjui-btn-green', iconCls:'fa fa-plus',onClick:addBefore">增加</a>
                    </jui:TranPurv>
                    <jui:TranPurv transCode="accountTab" subTransCode="delBtn">
                        <a href="javascript:void(0)"
                           data-toggle="topjui-menubutton"
                           data-options="method:'doAjax',btnCls:'topjui-btn-brown',iconCls:'fa fa-trash',onClick:delCommit">删除</a>
                    </jui:TranPurv>
                    <jui:TranPurv transCode="accountTab" subTransCode="modBtn">
                        <a href="javascript:void(0)" id='modBtn'
                           data-toggle="topjui-menubutton"
                           data-options="method:'doAjax',btnCls:'topjui-btn-orange',iconCls:'fa fa-pencil',onClick:edtBefore">修改</a>
                    </jui:TranPurv>

                    <jui:TranPurv transCode="accountTab" subTransCode="crtDown">
                        <a href="javascript:void(0)"
                           data-toggle="topjui-menubutton"
                           data-options="method:'export',
                           btnCls:'topjui-btn-black',
                           grid: {
                                    type: 'datagrid',
                                    id: 'accountTab'
                            },
                            form:{id:'queryForm'},
                            title:'会计科目'">当页下载</a></jui:TranPurv>
                                        <jui:TranPurv transCode="accountTab" subTransCode="allDown">
                                            <a href="javascript:void(0)"
                                               data-toggle="topjui-menubutton"
                                               data-options="method:'export',
                           btnCls:'topjui-btn-black',
                           grid: {
                                    type: 'datagrid',
                                    id: 'accountTab'
                            },
                            form:{id:'queryForm'},
                            title:'会计科目',
        allDown:true">全量下载</a></jui:TranPurv>
                </div>
            </form>
        </div>
        <!-- 表格工具栏结束 -->
    </div>
</div>
<script>
    $("#divCatalog").css("display", "none");
    //当前选中的下拉编号,全局变量
    var allBookCode;
    //当前选中的树节点编号,全局变量
    var allTreeNode;
    //当前选中的面板编号和树的编号
    var tabAndTreeId;

    function qryBtn_click() {

        if ("" == allBookCode || typeof allBookCode == "undefined") {
            $.iMessager.alert('警告', '请在左侧选择账套编号！');
            return false;
        }
        chgTree({book_code: allBookCode});
    }

    function subFlagFormart(str, rowData, rowIndex) {
        var subject_type = "";

        if (str.indexOf("1") != -1) {
            subject_type = "记账机构,"
        }
        if (str.indexOf("2") != -1) {
            subject_type += "成本中心,"
        }
        if (str.indexOf("3") != -1) {
            subject_type += "数量,"
        }
        if (str.indexOf("4") != -1) {
            subject_type += "往来单位,"
        }
        if (str.indexOf("5") != -1) {
            subject_type += "外币,"
        }
        if (subject_type.substring(subject_type.length - 1, subject_type.length) == ",") {
            subject_type = subject_type.substring(0, subject_type.length - 1)
        }
        return subject_type;
    }

    //清除查询条件
    function clear() {
        $("#qry_catalog").iTextbox("setValue", "");
        $("#qry_shortName").iTextbox("setValue", "");
        $("#qry_catalog").iCombobox("setValue", "");
        $("#qrySubjectTypeAssets").iCombobox("setValue", "");
    }
    //获取选中的tab的ID
    function getSelectTreeID() {
        clear()
        for (var i = 1; i < 7; i++) {
            $("#qry_book_code" + i).iCombobox("setValue", allBookCode);
        }
        var iTabs = $('#accountTabInfo').iTabs('getSelected');
        tabAndTreeId = iTabs[0].id.substring(3, 4);
        if (typeof allBookCode != "undefined") {
            chgTree({book_code: allBookCode});
        }
    }

    function chgTree(bookset) {
        allBookCode = bookset.book_code;
        $("#qry_book_code").iTextbox("setValue", allBookCode);
        initTree(tabAndTreeId, allBookCode)
    }
    function initTree(catalog, bookCode) {
        tabAndTreeId = catalog;
        $('#tt' + catalog).iTree({
            method: 'POST',
            parentField: 'pre_acct',
            leafField: 'leaf',
            queryParams: {'resCode': 'accountTab', 'opCode': 'queryTree'},
            url: 'com.avengers.accounting.accounttab.AccountTabAction.accountTab.service?catalog=' + catalog + "&bookCode=" + bookCode,
            idField: 'account',
            nameField: 'short_name',
            onClick: function (node) {
                $("#sonAccount").iCheckbox({checked:true})
                $("#qry_account").iTextbox({value:node.id})
                tableLoad({"account": node.id, "bookCode": allBookCode,"sonAccount":"true"});
                allTreeNode = node.id;
                clear()
            }
        });
    }

    /**
     * 新增
     */
    function addBefore() {

        if ("" == allBookCode || typeof allBookCode == "undefined") {
            $.iMessager.alert('警告', '请在左侧选择账套编号！');
            return;
        }
        var node = $("#tt" + tabAndTreeId).iTree("getSelected");
        if (node == null) {
            $.iMessager.alert('警告', '请在左侧选择要增加父节点！');
            return;
        } else {
            if (typeof node.text == "undefined") {
                $.iMessager.alert('警告', '没有可以添加的根节点！');
                return;
            }
            var href = 'accountTabSave.jsp?addFlag=add&account=' + node.id + "&bookCode=" + allBookCode + '&name=' + node.text + '&indexFlag=' + tabAndTreeId;
            dealDialog('会计科目添加', href, 300, 700, '');
        }
    }

    /**
     * 修改
     */
    function edtBefore() {
        if ("" == allBookCode || typeof allBookCode == "undefined") {
            $.iMessager.alert('警告', '请在左侧选择账套编号！');
            return;
        }
        var record = $('#accountTab').iDatagrid('getSelections');
        if (record.length > 1) {
            $.iMessager.alert('警告', '请选择一条要修改的数据！');
        } else if (record.length == 1) {
            if (record[0].pre_acct == "/") {
                $.iMessager.alert('警告', '根节点不允许修改！');
                return;
            }
            var href = 'accountTabSave.jsp?addFlag=edt&bookCode=' + allBookCode + '&account=' + record[0].account + '&short_name='
                + record[0].short_name + '&indexFlag=' + tabAndTreeId + '&subject_type=' + record[0].subject_type
                + '&direction=' + record[0].direction
                + '&pre_acct=' + record[0].pre_acct
                + '&overdraw=' + record[0].overdraw
                + '&catalog=' + record[0].catalog
                + '&sub_flag=' + record[0].sub_flag;
            dealDialog('会计科目修改', href, 300, 700);
        } else if (record.length <= 0) {
            $.iMessager.alert('警告', '请选择要修改的数据！');
        }
    }

    function tableLoad(account) {
        $("#accountTab").iDatagrid('load',account);
    }

    var $addDialog = $('<div id="accountTabSave"></div>');// 创建元素<div>
    function dealDialog(title, href, height, width) {
        var opts = {
            id: 'accountTabId',// 唯一标识id
            title: title,// 标题
            closed: false, // 关闭状态
            height: height, // 高度
            width: width, // 宽度
            href: href, // 加载页面元素的地址
            buttons: '#btn',
            grid: {
                type: 'datagrid',
                id: 'accountTab'
            }
        };
        $addDialog.iDialog(opts);
    }


    /**
     * 删除
     */
    function delCommit() {
        var records = $("#accountTab").iDatagrid("getSelections");
        var succ = function (respons) {
            showMessage(respons);
            $('#tree1').iTree("reload");
            // 删除后表格刷新。
            if (allTreeNode != "" && typeof allTreeNode != "undefined") {

                tableLoad(  {"account": allTreeNode, "bookCode": allBookCode});
            }
            initTree(tabAndTreeId, allBookCode)
        }
        if (records.length < 1) {
            $.iMessager.alert('警告', '请选择要删除的数据！');
        } else {
            if (records[0].pre_acct == "/" || records[0].rank == 1 || records[0].rank == 0) {
                $.iMessager.alert('警告', '一级科目不允许删除！');
            } else {
                $.iMessager.confirm('确认', '您确认想要删除记录吗？', function (r) {
                    if (r) {
                        var res = {bookCode: allBookCode, account: records[0].account,pre_account:records[0].pre_acct};
                        asynExecute('com.avengers.accounting.accounttab.AccountTabAction.accountTab.service?resCode=accountTab&opCode=delBtn', res, succ, null, '正在删除+++', 8000);
                    }
                });

            }
        }
    }
</script>