var invoices = {
    init: function () {
        this.initForm();
        this.initData();
    },
    initData: function () {
        this.loadDg();
    },
    initForm: function () {
        var pager = $("#dgInvoice").datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNumber, pageSize) {
                invoices.loadDg(pageNumber, pageSize);
            }
        });
    },
    loadDg: function (pageIndex,pageSize) {
        var dg = $('#dgInvoice');
        var postData = common.getAuthFmInfo();
        postData.PageIndex = pageIndex;
        postData.PageSize = pageSize;
        var url = common.apiPath + "/Manager/GetInvoices";
        common.ajax(url, JSON.stringify(postData), 'POST', '', true, true, function (result) {
            if (result.NoLimitInvoices.TotalRecord > 0) {
                var dgData = { total: result.NoLimitInvoices.TotalRecord, rows: result.NoLimitInvoices.DataList };
                dg.datagrid('loadData', dgData);
            }
        })
    },
    onSearch: function () {

    },
    onDel: function () {

    }
}