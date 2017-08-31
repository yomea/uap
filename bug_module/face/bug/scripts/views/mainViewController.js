$ns("bug.views");

$import("bug.views.dataFormViewUserController");

bug.views.mainViewController = function() {
	var me = $extend(mx.views.ViewController);
	var base = {};
	me.typeName = "bug.views.mainViewController";
	// 需要引入$import
	me.getController = function(key) {
		return me.getLinkViewController("bug.views." + key + "Controller");
	};
	me.getView = function() {
		if (me.view == null) {
			me.view = new bug.views.mainView({
				controller : me
			// 设置controller属性
			});
		}
		return me.view;
	};

	if (typeof (me.utils) == "undefined" || me.utils == null)
		me.utils = {};

	var _dataGrid = null;
	var restClient = new mx.rpc.RESTClient();
	var _dataTree = null;

	me._onactivate = function(e) {
		_dataTree = me.getView().findControlById("_dataTree");
		_dataTree.loadRootNodes(),
		// _dataTree.load();
		_dataGrid = me.getView().findControlById("_dataGrid");
	};

	// 定义dataTree展开事件,用于AbstractDataServiceController
	me._DataTree_expanding = function(e) {
		var uapNode = e.node;
		uapNode.queryParams = {
			nodes : [ {
				parentNodeProp : "projectId",
				className : "UapModule",
				displayMode : "entityNode",
				nodeTextProp : "name",
				nodeIDProp : "id",
				nodes : []
			} ]
		};
	}

	me._DataTree_nodeclick = function(e) {
		if (!e.node.hasChildren) {
			_dataGrid.setFilter({
				moduleId : e.node.id
			});
			_dataGrid.load();
		}
	}

	var dataFormController = null;
	var _Window = null;

	me._NewBntton_onclick = function() {
		if (dataFormController == null) {
			dataFormController = me.getController("dataFormViewUser");
		}
		_Window = dataFormController.getView().getWindow();
		_Window.show();
		dataFormController.refershDataForm(null);
		dataFormController.dataGrid = _dataGrid;
	}

	me._DelButton_onclick = function() {
		if (_dataGrid.displayCheckBox) {
			var ids = _dataGrid.getCheckedIDs();
			_dataGrid.removeItems(ids);
		} else {
			_dataGrid.removeItems(_dataGrid.selections);
		}
		_dataGrid.load();
	}
	// 编辑按钮
	me._EditButton_onclick = function() {
		if (!_dataGrid.selection) {
			mx.indicate("info", "请选择一条待编辑的记录。");
			return;
		}
		var id = _dataGrid.selection
				.getValue(_dataGrid.entityContainer.primaryKey);
		if (dataFormController == null) {
			dataFormController = me.getController("dataFormViewUser");
		}
		_Window = dataFormController.getView().getWindow();
		_Window.show();
		dataFormController.refershDataForm(id);
		dataFormController.dataGrid = _dataGrid;
	}

	me.newProject_treeNode = function(e) {
		var text = prompt("请输入工程名");
		var curTreeNode = e.target.owner.curTreeNode;
		var data = {
			"items" : [ {
				"name" : text
			} ]
		}
		restClient.post(bug.mappath("~/rest/uapProject/save"), JSON
				.stringify(data), function() {
			_dataTree.load();
		});
	}

	me.newModule_treeNode = function(e) {
		var text = prompt("请输入模块名");
		var curTreeNode = e.target.owner.curTreeNode;
		var data = {
			"items" : [ {
				"projectId" : curTreeNode.id,
				"name" : text
			} ]
		}
		restClient.post(bug.mappath("~/rest/uapModule/save"), JSON
				.stringify(data), function() {
			_dataTree.load();
		});
	}

	me._dataTree_menushowing = function(e) {
		if (e.node.hasChildren) {
			var items = [ {
				name : "newProject",
				text : "新建工程",
				imageKey : "new",
				onclick : me.newProject_treeNode
			}, {
				name : "newModule",
				text : "新建模块",
				imageKey : "new",
				onclick : me.newModule_treeNode
			}, {
				name : "delete",
				text : "删除",
				imageKey : "delete",
				onclick : me.delete_treeNode
			}, {
				name : "edit",
				text : "修改",
				imageKey : "edit",
				onclick : me.edit_treeNode
			} ];
			_dataTree.nodeMenu.setItems(items);
		} else {
			_dataTree.nodeMenu.setItems([ {
				name : "delete",
				text : "删除",
				imageKey : "delete",
				onclick : me.delete_treeNode
			}, {
				name : "edit",
				text : "修改",
				imageKey : "edit",
				onclick : me.edit_treeNode
			} ]);
		}
		_dataTree.nodeMenu.curTreeNode = e.node;
	}

	me._importButton_onclick = function() {
		_dataGrid.showImportExcelWizard(bug.context.windowManager);
	}

	me._ImportButton_onclick = function() {
		// _dataGrid.showImportExcelWizard(bug.context.windowManager);

		/*
		 * var excelHandler = new mx.utils.ExcelUtil();
		 * excelHandler.setBaseUrl("http://localhost:9000/bug/mx/servlets/importExcelServlet");
		 * excelHandler.setParams({tableName:"uap_bug", columnNames:"id,name",
		 * columnCaptions:"编号,异常名", fileName:"异常统计表格"});
		 * excelHandler.exportExcel();
		 */

		_dataGrid.exportExcel({
			tableName : "uap_bug",
			columnNames : "id,name",
			columnCaptions : "编号,异常名称",
			fileName : "异常列表"
		});
	}

	return me.endOfClass(arguments);
};