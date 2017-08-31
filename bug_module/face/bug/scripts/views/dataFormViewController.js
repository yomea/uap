$ns("bug.views");
$import("bug.views.dataFormView")
// bug、dataFormView在编译时将替换为实际值，设计过程中不要随意修改

bug.views.dataFormViewController = function() {
	var me = $extend(mx.views.ViewController);
	me.getView = function() {
		if (me.view == null) {
			me.view = new bug.views.dataFormView({
				controller : me
			});
		}
		return me.view;
	};

	if (typeof (me.utils) == "undefined" || me.utils == null) {
		me.utils = {};
	}
	var _restClient = null;
	me.utils.restClient = function(url, data, fn) {
		_restClient.get(url, data, function(callData) {
			fn(callData);
		});

	}

	var _dataForm = null;
	me._onactivate = function(e) {
		_dataForm = me.getView().findControlById("_dataForm");
	};

	me.utils.removeDataGridSelections = function(datagrid) {
		if (datagrid.displayCheckBox) {// 数据项之前带选择框
			if (datagrid.getCheckedItems().length == 0) {
				mx.indicate("info", "请至少勾选一条待删除记录。");
				return;
			}
			if (confirm("您确认删除数据吗？")) {
				datagrid.removeItems(datagrid.getCheckedItems());
			}
		} else {// 数据项之前不带选择框
			if (datagrid.selection == null) {
				mx.indicate("info", "请选择一条待删除记录。");
				return;
			}
			if (confirm("您确认删除数据吗？")) {
				datagrid.removeItem(datagrid.selection);
			}
		}
	};

	me._initDropDownEditorValue = function() {
		_restClient = new mx.rpc.RESTClient();
		var data = {
			"params" : JSON.stringify({
				"columns" : "id,name",
				"pageIndex" : 1,
				"pageSize" : 20,
				sorter : "name"
			})
		}
		me.utils.restClient(bug.mappath("~/rest/uapProject/"), data, function(
				callData) {
			var projectEdit = _dataForm.getEditor("projectId");// 获取工程编辑器
			projectEdit.setItems(callData.resultValue.items);
			projectEdit.on("changed", function() {
				var d = {
					"params" : JSON.stringify({
						"columns" : "id,name",
						"pageIndex" : 1,
						"pageSize" : 20,
						"filter" : "projectId=" + projectEdit.value,
						sorter : "name"
					})
				}
				me.utils.restClient(bug.mappath("~/rest/uapModule/"), d,
						function(ddata) {
							var moduleEdit = _dataForm.getEditor("moduleId");
							moduleEdit.setValue(null, null);
							moduleEdit.setItems(ddata.resultValue.items);
						});

			});

		});
	}

	me._button_onclick = function() {
		_dataForm.save();
		me.getView().getWindow().hide();
		me.dataGrid.load();
	}

	me.refershDataForm = function(id) {
		_dataForm.load(id);
	}

	return me.endOfClass(arguments);
};