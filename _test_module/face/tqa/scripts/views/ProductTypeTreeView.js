$ns("tqa.views");

tqa.views.ProductTypeTreeView=function(){
	var me = $extend(mx.views.View);
	var base = {};
	base.init = me.init;
	me.init = function () {
		me.permissionID = "-1";
		base.init();
		_initControls();
	};
	
	//----声明mx组件变量------
	var _VSplit = null;
	var _VSplitArea0 = null;
	var _DataTree = null;
	var _VSplitArea1 = null;
	var _HSplit = null;
	var _HSplitArea0 = null;
	var _ToolBar = null;
	var _HSplitArea1 = null;
	var _DataGrid = null;
	var _Window = null;
	
	function _initControls(){
		//---调用初始化函数-----
		_init_VSplit();
		_init_VSplitArea0();
		_init_DataTree();
		_init_VSplitArea1();
		_init_HSplit();
		_init_HSplitArea0();
		_init_ToolBar();
		_init_HSplitArea1();
		_init_DataGrid();
	  
		me.on("activate", me.controller._onactivate);
	}
	
	//-----定义初始化函数-----
	function _init_VSplit(){
		_VSplit=new mx.containers.VSplit({id:"VSplit",orientation:"vertical",cols:"20%,auto",height:"100%",width:"100%",resizable:true,borderThick:"0"});
		me.addControl(_VSplit);
	}
	
	function _init_VSplitArea0(){
		_VSplitArea0 = new mx.containers.Container({
			id:"VSplitArea0"
		});
		
		_VSplit.addControl(_VSplitArea0, 0);
	}
	
	function _init_DataTree(){
    	var treeEntityContainer = new mx.datacontainers.TreeEntityContainer({
            baseUrl: tqa.mappath("~/rest/data/tree"),
            type:"remote"
        });
		_DataTree = new mx.datacontrols.DataTree({
			id:"DataTree",
			loadRootNodes:_DataTree_RootNodes,
			height:"100%",
			nodeMenu:new mx.controls.ContextMenu(),
			width:"100%",
			showDefaultContextMenu:false,
			entityContainer: treeEntityContainer
		});
		
		_DataTree.on("nodeclick", me.controller._DataTree_onnodeclick);
		_DataTree.on("expanding",_DataTree_expanding);
		_DataTree.on("menushowing",_DataTree_menushowing);
		_VSplitArea0.addControl(_DataTree);
	}
	
	function _DataTree_RootNodes() {
		
		var rootNodes = {nodes:[
				{
					classDisplayName:"ProductType",//类显示名
					itemType:"productType",//
					nodeTextProp:"typename",//要显示的节点文本的字段
					className:"ProductType",//表示哪个类
					nodeIDProp:"typeid",//节点的id（指定要再返回的数据中要查找的字段）
					displayMode:"entityNode",//模式（实体节点）
					nodes:[]
				}
		]};
		
		_DataTree.load(rootNodes);
	}
	
	function _DataTree_expanding(args) {
		var node = args.node;
		var params = null;
		node.queryParams = params;
	};
	
	var _DataTree_menushowing = function(p_args){
		var node = p_args.node;
	};
	
	function _init_VSplitArea1(){
		_VSplitArea1 = new mx.containers.Container({
			id:"VSplitArea1"
		});
		
		_VSplit.addControl(_VSplitArea1, 1);
	}
	
	function _init_HSplit(){
		_HSplit=new mx.containers.HSplit({id:"HSplit",orientation:"horizontal",height:"100%",width:"100%",padding:"0",borderThick:"0",rows:"25,auto"});
		_VSplitArea1.addControl(_HSplit);
	}
	
	function _init_HSplitArea0(){
		_HSplitArea0 = new mx.containers.Container({
			id:"HSplitArea0",
			layout:"mx.layouts.AbsoluteLayout"
		});
		
		_HSplit.addControl(_HSplitArea0, 0);
	}
	
	function _init_ToolBar(){		
		_ToolBar = new mx.controls.ToolBar({
			id:"ToolBar",
			height:"24",
			direction:"horizontal",
			width:"100%",
			itemAlign:"right",
			layoutConfigs:{},
			items:[
				{id:"NewButton",text:"新建",imageKey:"add",height:"20",toolTip:"新建",width:"60",name:"NewButton"},
				{id:"DelButton",text:"删除",imageKey:"delete",height:"20",toolTip:"删除",width:"60",name:"DelButton"},
				{id:"EditButton",text:"编辑",imageKey:"edit",height:"20",toolTip:"编辑",width:"60",name:"EditButton"},
				{id:"PrintButton",text:"打印",imageKey:"print",height:"20",toolTip:"打印",width:"60",name:"PrintButton"}
			]
		});
		
		_ToolBar.on("itemclick", me.controller._ToolBar_onitemclick);
		_HSplitArea0.addControl(_ToolBar);
	}
	
	function _init_HSplitArea1(){
		_HSplitArea1 = new mx.containers.Container({
			id:"HSplitArea1",
			layout:"mx.layouts.AbsoluteLayout"
		});
		
		_HSplit.addControl(_HSplitArea1, 1);
	}
	
	function _init_DataGrid(){
		var gridEntityContainer = new mx.datacontainers.GridEntityContainer({
			baseUrl:tqa.mappath("~/rest/tProduct/"),
			iscID:"-1",
			primaryKey:"productid",//设置主键为productid，这行不会显示，默认隐藏
			loadMeta:false
		});
		
		_DataGrid = new mx.datacontrols.DataGrid({
			columns:[
				{id:"productid",dataType:"string",readOnly:false,name:"productid",width:"120",caption:"产品编号",editorType:"TextEditor",nullable:false,editorOptions:{validType:"DIGIT",validOptions:{DIGIT:{validateMessage:"必须为数字",minValue:1,maxValue:111111111111111111111}}}},
				{id:"name",dataType:"string",readOnly:false,name:"name",width:"120",caption:"产品名称",editorType:"TextEditor",nullable:false}
			],
			
			id:"DataGrid",
			height:"100%",
			displayCheckBox:true,
			width:"100%",
			pageSize:20,
			allowEditing:false,
			allowPaging:true,
			layoutConfigs:{},
			pageIndex:1,
			pageNaviBar:new mx.datacontrols.PageNaviBar({
				id:"PageNaviBar",
				height:"24",
				pageSize:20,
				pageIndex:1
			}),
			entityContainer: gridEntityContainer
		});
		
		_HSplitArea1.addControl(_DataGrid);
	}
	
	function _init_Window() {		
		if(_Window == null || ((_Window.reusable==false) && _Window.disposed==true)) {
			_Window = tqa.context.windowManager.create({
				entry:true
			});
		}
		_Window.on("activate", function() {
			_Window.setView(me);
		});
		_Window.on("close", function(e){
		    $.each(_Window.controls, function(i, o){
				o.$e.detach();
			});
		});
	}
	
	me.getWindow = function() {
		_init_Window();
		return _Window;
	};
	

	/**
	 * 对于自嵌套实体节点，获取该类节点第一层过滤条件
	 * @param filter 对应于设计时属性selfLoopTopFilter的值
	 * @param itemtype 当前节点的类型标示
	 * @param pnode 当前节点的父节点
	 * @param hasPropGroup 该实体节点是否有属性分组
	 */
	function _resolveLoopEntityNodeTopFilter(filter, itemtype, pnode, hasPropGroup) {
		if(filter == "") return "";
		if(hasPropGroup) filter = filter + " and ";
		
		var _node = _getParentInstantTreeNode(pnode);
		if(_node == null) return filter;
		if(_node.itemType == itemtype) {
			return "";
		}
		return filter;
	}

	/**
	 * 获取当前节点所属的实体节点(entityNode)或枚举节点(enumNode)，
	 * 如果当前节点是实体节点或枚举节点，则直接返回。
	 * @param node 当前节点
	 */
	function _getParentInstantTreeNode(node) {
		if(node == null) return "";
		if(node.displayMode == "entityNode" || node.displayMode == "enumNode") return node;
		
		while(node && node.getParentNode()) {
			if(node.getParentNode().displayMode == "entityNode" 
					|| node.getParentNode().displayMode == "enumNode") {
				return node.getParentNode();
			}
			node = node.getParentNode();
		}
		return null;
	}

	/**
	 * 获取当前节点所属的实体节点(entityNode)或枚举节点(enumNode)的id值
	 * @param node 当前节点
	 */
	function _getParentInstantTreeNodeID(node) {
		var pnode = _getParentInstantTreeNode(node);
		if(pnode == null) return "";
		else return pnode.id;
	}

	/**
	 * 获取与上级节点相关联的实体属性
	 * @param foreignKeyProp 对应设计时属性foreignKeyProp
	 * @param selfLoopProp  对应设计时属性selfLoopProp
	 * @param itemtype 当前节点的类型标示
	 * @param pnode 当前节点的父节点
	 */
	function _resolveforeignKeyProp(foreignKeyProp, selfLoopProp, itemtype, pnode) {
		var _node = _getParentInstantTreeNode(pnode);
		if(_node == null) return foreignKeyProp;
		if(_node.itemType == itemtype) {
			return selfLoopProp;
		}
		return foreignKeyProp;
	}
	
	me.findControlById = function(controlId){
		try{
			return me.findControl("id", controlId);
		} catch(err) {
			mx.indicate("info","未找到对应的mx控件:    "+ err.message);
			return null;
		}	
	};
    return me.endOfClass(arguments);
};