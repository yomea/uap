$ns("uifile.views");

uifile.views.mainView=function(){
	var me = $extend(mx.views.View);
	var base = {};
	base.init = me.init;
	me.init = function () {
		me.permissionID = "-1";
		base.init();
		_initControls();
	};
	
	//----声明mx组件变量------
	var _VSplit1 = null;
	var _VSplit1Area0 = null;
	var _DataTree2 = null;
	var _VSplit1Area1 = null;
	var _DataGrid2 = null;
	var _Label1 = null;
	var _TextEditor6 = null;
	var _DropDownEditor1 = null;
	var _Button3 = null;
	var _Button4 = null;
	var _Button6 = null;
	var _Window = null;
	
	function _initControls(){
		//---调用初始化函数-----
		_init_VSplit1();
		_init_VSplit1Area0();
		_init_DataTree2();
		_init_VSplit1Area1();
		_init_DataGrid2();
		_init_Label1();
		_init_TextEditor6();
		_init_DropDownEditor1();
		_init_Button3();
		_init_Button4();
		_init_Button6();
	  
		me.on("activate", me.controller._onactivate);
	}
	
	//-----定义初始化函数-----
	function _init_VSplit1(){
		_VSplit1=new mx.containers.VSplit({id:"VSplit1",orientation:"vertical",cols:"20%,auto",height:"100%",width:"100%"});
		me.addControl(_VSplit1);
	}
	
	function _init_VSplit1Area0(){
		_VSplit1Area0 = new mx.containers.Container({
			id:"VSplit1Area0",
			layout:"mx.layouts.AbsoluteLayout"
		});
		
		_VSplit1.addControl(_VSplit1Area0, 0);
	}
	
	function _init_DataTree2(){
    	var treeEntityContainer = new mx.datacontainers.TreeEntityContainer({
            //baseUrl: uifile.mappath("~/rest/data/tree"),
            type:"local",
            data: [ {
				id : "a",
				text : "1.变电工程年度造价分析",
				hasChildren : true,
				childNodes : [ {
					id : "b",
					text : "1.1变电工程水平分析",
					hasChildren : true,
					childNodes : [ {
						id : "c",
						text : "1.1.1工程样本情况"
					}, {
						id : "d",
						text : "1.1.2总体造价水平分析"
					} ]
				}, {
					id : "e",
					text : "1.2变电工程典型技术方案",
					hasChildren : true,
				} ]
			} ]
        });
		_DataTree2 = new mx.datacontrols.DataTree({
			id:"DataTree2",
			loadRootNodes:_DataTree2_RootNodes,
			height:"100%",
			nodeMenu:new mx.controls.ContextMenu(),
			width:"100%",
			left:"4",
			showDefaultContextMenu:false,
			y:"7",
			top:"7",
			x:"4",
			entityContainer: treeEntityContainer
		});
		
		_DataTree2.on("expanding",_DataTree2_expanding);
		_DataTree2.on("menushowing",_DataTree2_menushowing);
		_DataTree2.load();
		_VSplit1Area0.addControl(_DataTree2);
	}
	
	function _DataTree2_RootNodes() {
		var rootNodes = {nodes:[
		]};
		
		_DataTree2.load(rootNodes);
	}
	
	function _DataTree2_expanding(args) {
		var node = args.node;
		var params = null;
		node.queryParams = params;
	};
	
	var _DataTree2_menushowing = function(p_args){
		var node = p_args.node;
	};
	
	function _init_VSplit1Area1(){
		_VSplit1Area1 = new mx.containers.Container({
			id:"VSplit1Area1",
			layout:"mx.layouts.AbsoluteLayout"
		});
		
		_VSplit1.addControl(_VSplit1Area1, 1);
	}
	
	function _init_DataGrid2(){
		var gridEntityContainer = new mx.datacontainers.GridEntityContainer({
			baseUrl:null,
			iscID:"-1",
			loadMeta:false,
			"type" : "local", // 声明容器类型为本地数据用local。
			"meta" : [ {
				"name" : "name",
				"caption" : "工程名称"
			}, {
				"name" : "company",
				"caption" : "所属公司"
			}, {
				"name" : "level",
				"caption" : "电压等级"
			}, {
				"name" : "date",
				"caption" : "竣工时间"
			}, {
				"name" : "xingzhi",
				"caption" : "建设性质"
			}, {
				"name" : "xingshi",
				"caption" : "变电站型式"
			}, {
				"name" : "number",
				"caption" : "主变本期台数"
			}, {
				"name" : "mva",
				"caption" : "主变单台容量"
			}, ], // 本地元数据信息。
			"data" : [ {
				"name" : "草湖110kv变电站",
				"company" : "新疆",
				"level" : "110",
				"date" : "2014-04-06",
				"xingzhi" : "新建",
				"xingshi" : "户外站",
				"number" : "1",
				"mva" : "50"
			}, {
				"name" : "草湖110kv变电站",
				"company" : "新疆",
				"level" : "110",
				"date" : "2014-04-06",
				"xingzhi" : "新建",
				"xingshi" : "户外站",
				"number" : "1",
				"mva" : "50"
			}, {
				"name" : "草湖110kv变电站",
				"company" : "新疆",
				"level" : "110",
				"date" : "2014-04-06",
				"xingzhi" : "新建",
				"xingshi" : "户外站",
				"number" : "1",
				"mva" : "50"
			}, {
				"name" : "草湖110kv变电站",
				"company" : "新疆",
				"level" : "110",
				"date" : "2014-04-06",
				"xingzhi" : "新建",
				"xingshi" : "户外站",
				"number" : "1",
				"mva" : "50"
			}, {
				"name" : "草湖110kv变电站",
				"company" : "新疆",
				"level" : "110",
				"date" : "2014-04-06",
				"xingzhi" : "新建",
				"xingshi" : "户外站",
				"number" : "1",
				"mva" : "50"
			} ]
		});
		
		_DataGrid2 = new mx.datacontrols.DataGrid({
			id:"DataGrid2",
			height:"82%",
			width:"97%",
			pageSize:20,
			allowPaging:true,
			layoutConfigs:{left:7,top:75},
			pageIndex:1,
			pageNaviBar:new mx.datacontrols.PageNaviBar({
				id:"PageNaviBar2",
				pageSize:20,
				pageIndex:1
			}),
			entityContainer: gridEntityContainer
		});
		_DataGrid2.load();
		_VSplit1Area1.addControl(_DataGrid2);
	}
	
	function _init_Label1(){
		_Label1=new mx.controls.Label({id:"Label1",text:"工程名称:",height:"25",width:"77",layoutConfigs:{left:9,top:28}});
		_VSplit1Area1.addControl(_Label1);
	}
	
	function _init_TextEditor6(){
		_TextEditor6=new mx.editors.TextEditor({
			id:"TextEditor6",
			lineBreak:false,
			height:"22",
			width:"68",
			layoutConfigs:{left:86,top:30}
		});
		
		_VSplit1Area1.addControl(_TextEditor6);
	}
	
	function _init_DropDownEditor1(){
		_DropDownEditor1=new mx.editors.DropDownEditor({
			id:"DropDownEditor1",
			lineBreak:false,
			height:"22",
			width:"20",
			layoutConfigs:{left:163,top:29}
		});
		
		_VSplit1Area1.addControl(_DropDownEditor1);
	}
	
	function _init_Button3(){
		_Button3=new mx.controls.Button({id:"Button3",text:"分析表预览",height:"21",width:"66",layoutConfigs:{left:253,top:29}});
		_VSplit1Area1.addControl(_Button3);
	}
	
	function _init_Button4(){
		_Button4=new mx.controls.Button({id:"Button4",text:"生成分析报告",height:"21",width:"62",layoutConfigs:{left:334,top:27}});
		_VSplit1Area1.addControl(_Button4);
	}
	
	function _init_Button6(){
		_Button6=new mx.controls.Button({id:"Button6",text:"返回",height:"21",width:"50",layoutConfigs:{left:410,top:29}});
		_VSplit1Area1.addControl(_Button6);
	}
	
	function _init_Window() {		
		if(_Window == null || ((_Window.reusable==false) && _Window.disposed==true)) {
			_Window = uifile.context.windowManager.create({
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