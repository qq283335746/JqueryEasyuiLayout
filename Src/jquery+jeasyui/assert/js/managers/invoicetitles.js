var invoicetitles = {
    init: function () {
        this.initForm();
        this.initData();
    },
    initData: function () {
        this.loadDg();
    },
    initForm: function () {
        var pager = $("#dgInvoiceTitle").datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNumber, pageSize) {
                invoicetitles.loadDg(pageNumber, pageSize);
            }
        });
    },
    loadDg: function (pageIndex, pageSize) {
        var dg = $('#dgInvoiceTitle');
        var postData = common.getAuthFmInfo();
        postData.PageIndex = pageIndex;
        postData.PageSize = pageSize;
        var url = common.apiPath + "/Manager/GetInvoiceTitles";
        common.ajax(url, JSON.stringify(postData), 'POST', '', true, true, function (result) {
            if (result.InvoiceTitles.TotalRecord > 0) {
                var dgData = { total: result.InvoiceTitles.TotalRecord, rows: result.InvoiceTitles.DataList };
                dg.datagrid('loadData', dgData);
            }
        })
    },
    onSearch: function () {

    },
    onDel: function () {

    }
}