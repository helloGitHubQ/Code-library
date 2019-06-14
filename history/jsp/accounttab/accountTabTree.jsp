<%@ page contentType="text/html; charset=utf-8" %>
<%@taglib uri='/WEB-INF/jui.tld' prefix='jui' %>

<div data-toggle="topjui-layout" data-options="fit:true" >
    <div data-options="region:'center',title:'会计科目树',border:false,iconCls:'fa fa-sitemap',headerCls:'border_right',bodyCls:'border_right'">
        <div id="accountTabInfo" data-toggle="topjui-tabs"
             data-options="fit:true,border:false,narrow:true,onSelect:getSelectTreeID">
            <div title="资产类" id="tab1">
                <div class="topjui-row">
                    <ul id="tt1"></ul>
                </div>
            </div>
            <div title="负债类" id="tab2">
                <div class="topjui-row">
                    <ul id="tt2"></ul>
                </div>
            </div>
            <div title="所有者权益" id="tab3">
                <div class="topjui-row">
                    <ul id="tt3"></ul>
                </div>
            </div>
            <div title="共同类" id="tab4">
                <div class="topjui-row">
                    <ul id="tt4"></ul>
                </div>
            </div>
            <div title="损益类" id="tab5">
                <div class="topjui-row">
                    <ul id="tt5"></ul>
                </div>
            </div>
            <div title="表外" id="tab6">
                <div class="topjui-row">
                    <ul id="tt6"></ul>
                </div>
            </div>
        </div>
    </div>

</div>
<script>
    //当前选中的下拉编号,全局变量
    var allBookCode='<%=request.getParameter("bookCode")%>';
    //当前选中的树节点编号,全局变量
    var allTreeNode;
    //当前选中的面板编号和树的编号
    var tabAndTreeId;




    //获取选中的tab的ID
    function getSelectTreeID() {
        //清空dataGird
        //tableLoad({"account": "null"});
        var iTabs = $('#accountTabInfo').iTabs('getSelected');
        tabAndTreeId = iTabs[0].id.substring(3, 4);
        initTree(tabAndTreeId, allBookCode);
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
        });
    }

  

  

   

  
</script>