var members = {
    init: function () {
        this.initForm();
        this.initData();
    },
    initData: function () {
        this.loadDg();
    },
    initForm: function () {
        var pager = $("#dgMember").datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNumber, pageSize) {
                members.loadDg(pageNumber, pageSize);
            }
        });
    },
    loadDg: function (pageIndex, pageSize) {
        var dg = $('#dgMember');
        var postData = common.getAuthFmInfo();
        postData.PageIndex = pageIndex;
        postData.PageSize = pageSize;
        var url = common.apiPath + "/Manager/GetMembers";
        common.ajax(url, JSON.stringify(postData), 'POST', '', true, true, function (result) {
            if (result.Data.TotalRecord > 0) {
                var dgData = { total: result.Data.TotalRecord, rows: result.Data.DataList };
                dg.datagrid('loadData', dgData);
            }
        })
    },
    onSearch: function () {

    },
    onDel: function () {

    }
}