var sitemenus = {
    init: function () {
        sitemenus.Load();
    },
    container: $("#dlgSiteMenus"),
    Load: function () {
        var t = $("#treeCt");
        var postData = '{"appId":"100000"}';
        var url = common.apiPath + '/Manager/GetSiteMenusTree';
        common.ajax(url, postData, 'GET', '', true, true, function (result) {
            if (!result.SiteMenusTree) {
                return false;
            }
            t.tree({
                data: result.SiteMenusTree,
                animate: true,
                onContextMenu: function (e, node) {
                    e.preventDefault();
                    $(this).tree('select', node.target);
                    $('#mmTree').menu('show', {
                        left: e.pageX,
                        top: e.pageY
                    });
                }
            })
        })
    },
    onAdd: function () {
        var t = $("#treeCt");
        var node = t.tree('getSelected');
        if (!node) {
            $.messager.alert('错误提示', '请选中一个节点再进行操作', 'error');
            return false;
        }

        common.dlgForm("dlgSiteMenus", "/page/sitemenus-edit.html?action=add&Id=" + node.id + "", 600, 300, "新建菜单导航", "icon-add", function () {
            var container = $('#dlgSiteMenus');
            container.find('#lbParentText').text(node.text);
            container.find('#hParentId').val(node.id);
        }, function () {
            sitemenus.onSave();
        });
    },
    onSave: function () {
        var isValid = $('#dlgFm').form('validate');
        if (!isValid) return false;

        var sId = $.trim($("#hId").val());
        var sParentId = $("#hParentId").val();
        var sTitle = $.trim($("#txtTitle").val());
        var sUrl = $.trim($("#txtUrl").val());
        var sDescr = $.trim($("#txtDescr").val());
        var sort = $.trim($("#txtSort").val());
        if (sort == "") sort = 0;

        var t = $('#treeCt');
        var selectedNode = t.tree('getSelected');
        sitemenus.idStep = '';
        sitemenus.getIdStep(t, selectedNode);
        var sIdStep = sitemenus.idStep;

        var authFmInfo = common.getAuthFmInfo();
        var postData = '{"Id":"' + sId + '","ParentId":"' + sParentId + '","Title":"' + sTitle + '","IdStep":"' + sIdStep + '","Url":"' + sUrl + '","Descr":"' + sDescr + '","Sort":"' + sort + '"}';
        postData = JSON.parse(postData);
        postData.Platform = authFmInfo.Platform;
        postData.DeviceId = authFmInfo.DeviceId;
        var url = common.apiPath + "/Manager/SaveSiteMenus";
        common.ajax(url, JSON.stringify(postData), 'POST', '', true, true, function (result) {
            common.messagerShow("温馨提示", "保存成功！");
            var selected = t.tree('getSelected');
            if (selected.text == "请选择") {
                t.tree('update', {
                    target: selected.target,
                    id: result.Data,
                    text: sTitle
                });
                sitemenus.container.dialog('close');
                return false;
            }
            var parentNode = t.tree('getParent', selected.target);
            if (sId == "") {
                t.tree('append', {
                    parent: selected.target,
                    data: [{
                        id: result.Data, text: sTitle, "attributes": {
                            "parentId": sParentId
                        },
                    }]
                });
            }
            else {
                t.tree('update', {
                    target: selected.target,
                    text: sTitle
                });
            }
            sitemenus.container.dialog('close');
        });
    },
    idStep: '',
    getIdStep: function (t, node) {
        if (node) {
            if (sitemenus.idStep != '') sitemenus.idStep += ',';
            sitemenus.idStep += node.id;
            var pNode = t.tree('getParent', node.target);
            sitemenus.getIdStep(t, pNode);
        }
    }
}