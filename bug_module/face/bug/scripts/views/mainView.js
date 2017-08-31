$ns("bug.views");

$import("mx.datacontainers.TreeEntityContainer");
$import("mx.datacontrols.DataTree");
$import("mx.datacontrols.PageNaviBar");
$import("mx.editors.DropDownEditor");
$import("mx.datacontrols.ComplexGrid");

bug.views.mainView = function() {
	var me = $extend(mx.views.View);
	var base = {};
	base.init = me.init;
	me.init = function() {
		me.permissionID = "-1";
		base.init();
		_initControls();
	};

	var _VSplit = null;
	var _containerLeft = null;
	var _containerRight = null;
	var _Window = null;
	var _dataTree = null;
	var _dataTreeContainer = null;
	var _dataGrid = null;
	var _init_menu = null;

	function _initControls() {
		_init_VSplit();
		_init__container();
		_init_dataTree();
		_init_dataGrid();
		me.on("activate", me.controller._onactivate);
	}

	function _init_dataGrid() {
		var gridEntityContainer = new mx.datacontainers.GridEntityContainer({
			baseUrl : bug.mappath("~/rest/uapBug/"),
			iscID : "-1",
			primaryKey : "id",
			loadMeta : true,
			type : "remote"
		});
		_dataGrid = new mx.datacontrols.ComplexGrid({
			columns : [ {
				id : "id",
				dataType : "string",
				readOnly : true,
				name : "id",
				width : "120",
				caption : "主键",
				editorType : "TextEditor"
			}, {
				id : "name",
				dataType : "string",
				readOnly : false,
				name : "name",
				width : "120",
				caption : "bug名",
				editorType : "TextEditor"
			}, {
				id : "bugLevel",
				dataType : "string",
				readOnly : false,
				name : "bugLevel",
				width : "120",
				caption : "bug等级",
				editorType : "TextEditor",
				valueFormatter : function(value) {
					if (value == "紧急") {
						this.cssStyle = {
							color : "blue",
							"background-color" : "red"
						};
					} else {
						this.cssStyle = null;
					}
					return value;
				}
			}, {
				id : "bugCreater",
				dataType : "string",
				readOnly : false,
				name : "bugCreater",
				width : "120",
				caption : "bugCreater",
				editorType : "TextEditor"
			}, {
				id : "bugCtime",
				formatString : "yyyy-MM-dd",
				dataType : "date",
				readOnly : false,
				name : "bugCtime",
				width : "120",
				caption : "bugCtime",
				editorType : "TextEditor"
			}, {
				id : "bugDesc",
				dataType : "string",
				readOnly : false,
				name : "bugDesc",
				width : "120",
				caption : "bugDesc",
				editorType : "TextEditor"
			}, {
				id : "bugFile",
				dataType : "string",
				readOnly : false,
				name : "bugFile",
				width : "120",
				caption : "bugFile",
				editorType : "TextEditor"
			} ],
			searchBox : new mx.datacontrols.DataGridSearchBox({
				fields : [ {
					name : "bugLevel",
					caption : "bug等级",
					editorType : "TextEditor"
				}, {
					name : "name",
					caption : "bug名",
					editorType : "TextEditor"
				} ]
			}),
			id : "_dataGrid",
			height : "100%",
			width : "100%",
			pageSize : 20,
			allowPaging : true,
			pageIndex : 1,
			displayCheckBox : true,
			pageNaviBar : new mx.datacontrols.PageNaviBar({
				id : "PageNaviBar",
				pageSize : 20,
				pageIndex : 1
			}),
			entityContainer : gridEntityContainer,
			displayRowNumber : true,
			toolBar : new mx.controls.ToolBar({
				items : [ {
					id : "NewBntton",
					droppedDown : false,
					text : "新建",
					imageKey : "add",
					height : "20",
					width : "60",
					onclick : me.controller._NewBntton_onclick
				}, {
					id : "DelButton",
					droppedDown : false,
					text : "删除",
					imageKey : "delete",
					height : "20",
					width : "60",
					onclick : me.controller._DelButton_onclick
				}, {
					id : "ImportButton",
					droppedDown : false,
					text : "导出Excel",
					imageKey : "add",
					height : "20",
					width : "120",
					onclick : me.controller._ImportButton_onclick
				}, {
					id : "EditButton",
					droppedDown : false,
					text : "编辑",
					imageKey : "edit",
					height : "20",
					width : "60",
					onclick : me.controller._EditButton_onclick
				},{
					id : "importButton",
					droppedDown : false,
					text : "导入Excel",
					imageKey : "edit",
					height : "20",
					width : "120",
					onclick : me.controller._importButton_onclick
				} ]
			})
		});
		_containerRight.addControl(_dataGrid);
	}

	function _init_dataTree() {
		_dataTreeContainer = new mx.datacontainers.TreeEntityContainer({
			//baseUrl : bug.mappath("~/rest/uapProject/tree"),
			baseUrl : bug.mappath("~/rest/data/tree"),
			type : "remote"
		});
		_dataTree = new mx.datacontrols.DataTree({
			id : "_dataTree",
			loadRootNodes:_DataTree_RootNodes,
			height : "70%",
			width : "100%",
			left : "10",
			y : "18",
			top : "18",
			x : "10",
			entityContainer : _dataTreeContainer,
			nodeMenu:new mx.controls.ContextMenu({
				items: [
				        { name: "new", text: "新建", imageKey: "new", onclick:me.controller.new_treeNode}, 
				        { name: "open", text: "删除", imageKey: "delete", onclick:me.controller.delete_treeNode}, 
				        { name: "close", text: "修改", imageKey: "edit", onclick:me.controller.edit_treeNode}
				    ]
			})
		});

		_dataTree.on("expanding", me.controller._DataTree_expanding);
		_dataTree.on("nodeclick", me.controller._DataTree_nodeclick)
		_dataTree.on("menushowing",me.controller._dataTree_menushowing);
		_containerLeft.addControl(_dataTree);
	}
//////////////////////////////////////////test////////////////////////////////	
function _DataTree_RootNodes() {
		//用于AbstractDataServiceController类
		var rootNodes = {nodes:[
				{
					classDisplayName:"ProductType",
					itemType:"node",//
					nodeTextProp:"name",//要显示的节点文本的字段
					className:"UapProject",//hql
					nodeIDProp:"id",//节点的id（指定要再返回的数据中要查找的字段）
					displayMode:"entityNode",//模式
					nodes:[
					 {
						 parentNodeProp:"projectId",//将会根据父id查询，如果查到有值，表示有子节点
						 className:"UapModule",//hql语言对应的对应
						 displayMode:"entityNode"//回显模式，除此之外，还有enumMode，virtualMode
					 }      
					 ]
				}
		]};
		_dataTree.load(rootNodes);
	}
	
	function _init__container() {
		_containerLeft = new mx.containers.Container({
			id : "_containerLeft",
			layout : "mx.layouts.AbsoluteLayout"
		});
		_containerRight = new mx.containers.Container({
			id : "_containerRight",
			layout : "mx.layouts.AbsoluteLayout"
		});
		_VSplit.addControl(_containerLeft, 0);
		_VSplit.addControl(_containerRight, 1);
	}

	function _init_VSplit() {
		_VSplit = new mx.containers.VSplit({
			id : "_VSplit",
			cols : "20%, 80%",
			height : '100%',
			width : '100%'
		});
		me.addControl(_VSplit);
	}

	function _init_Window() {
		if (_Window == null
				|| ((_Window.reusable == false) && _Window.disposed == true)) {
			_Window = bug.context.windowManager.create({
				entry : true
			});
		}
		_Window.on("activate", function() {
			_Window.setView(me);
		});
		_Window.on("close", function(e) {
			$.each(_Window.controls, function(i, o) {
				o.$e.detach();
			});
		});
	}

	me.getWindow = function() {
		_init_Window();
		return _Window;
	};

	me.findControlById = function(controlId) {
		try {
			return me.findControl("id", controlId);
		} catch (err) {
			mx.indicate("info", "未找到对应的mx控件:    " + err.message);
			return null;
		}
	};
	return me.endOfClass(arguments);
};