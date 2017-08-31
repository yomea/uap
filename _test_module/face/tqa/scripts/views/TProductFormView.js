$ns("tqa.views");

tqa.views.TProductFormView=function(){
	var me = $extend(mx.views.View);
	var base = {};
	base.init = me.init;
	me.init = function () {
		me.permissionID = "-1";
		base.init();
		_initControls();
	};
	
	//----声明mx组件变量------
	var _HSplit = null;
	var _HSplitArea0 = null;
	var _ToolBar = null;
	var _HSplitArea1 = null;
	var _DataForm = null;
	var _Window = null;
	
	function _initControls(){
		//---调用初始化函数-----
		_init_HSplit();
		_init_HSplitArea0();
		_init_ToolBar();
		_init_HSplitArea1();
		_init_DataForm();
	  
		me.on("activate", me.controller._onactivate);
	}
	
	//-----定义初始化函数-----
	function _init_HSplit(){
		_HSplit=new mx.containers.HSplit({id:"HSplit",orientation:"horizontal",height:"100%",width:"100%",borderThick:"0",rows:"30,auto"});
		me.addControl(_HSplit);
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
				{id:"SaveButton",text:"保存",imageKey:"save",height:"20",toolTip:"保存",width:"60",name:"SaveButton"},
				{id:"RefreshButton",text:"刷新",imageKey:"refresh",height:"20",toolTip:"刷新",width:"60",name:"RefreshButton"},
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
	
	function _init_DataForm(){
		var formEntityContainer = new mx.datacontainers.FormEntityContainer({
			baseUrl:tqa.mappath("~/rest/tProduct/"),
			iscID:"-1",
			primaryKey:"productid",
			loadMeta:false,
			meta:
			[
				{readOnly:false,nullable:false,visible:true,valueType:"string",name:"productid",caption:"productId"},
				{readOnly:false,nullable:false,visible:true,valueType:"string",name:"name",caption:"name"}
			]
		});
		
		_DataForm = new mx.datacontrols.DataForm({
			id:"DataForm",
			height:"100%",
			width:"100%",
			maxCols:1,
			layoutConfigs:{},
			fields:
			[
				[
					"[默认]",true,
					{id:"productid",lineBreak:false,labelWidth:120,readOnly:false,height:"22",name:"productid",caption:"productId",editorType:"TextEditor",nullable:false,editorOptions:{validType:"DIGIT",validOptions:{DIGIT:{validateMessage:"必须为数字",minValue:1,maxValue:111111111111111111111}}}},
					{id:"name",lineBreak:false,labelWidth:120,readOnly:false,height:"22",name:"name",caption:"name",editorType:"TextEditor",nullable:false}
				]
			],
			entityContainer: formEntityContainer
		});
		
		_HSplitArea1.addControl(_DataForm);
	}
	
	function _init_Window() {		
		if(_Window == null || ((_Window.reusable==false) && _Window.disposed==true)) {
			_Window = tqa.context.windowManager.create({
				height:"480",
				reusable:true,
				width:"640"
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