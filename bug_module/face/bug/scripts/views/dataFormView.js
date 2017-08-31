$ns("bug.views");

bug.views.dataFormView=function(){
	
	var me = $extend(mx.views.View);
	var base = {};
	base.init = me.init;
	me.init = function () {
		me.permissionID = "-1";
		base.init();
		_initControls();
	};
	
	var _Window = null;
	var _dataForm = null;
	var _button = null;
	
	function _initControls(){
		_init_dataForm();
		_init_button();
		
		me.on("activate", me.controller._onactivate);
	}
	
	function _init_button()
	{
		_button = new mx.controls.Button({
		    text: "提交"
		});
		me.addControl(_button);
		_button.on("click", me.controller._button_onclick);
	}
	
	function _init_dataForm()
	{
		var formContainer = new mx.datacontainers.FormEntityContainer(
				{
				   "baseUrl" : bug.mappath("~/rest/uapBug"), 
				   "primaryKey" : "id" 
				});
		_dataForm = new mx.datacontrols.DataForm({
			id:"_dataForm",
		    fields: [
		         [
		             "工程", 
		             { name: "projectId", caption: "工程", editorType: "DropDownEditor", allowEditing: false, displayMember: "name", valueMember: "id" }
		         ], 
		         [
		             "模块", 
		             false, 
		             { name: "moduleId", caption: "模块", editorType: "DropDownEditor", allowEditing: false, displayMember: "name", valueMember: "id" }
		         ],
		         [
		             "bug", 
		             false, 
		             { name: "id", caption: "bug名", editorType: "TextEditor", allowEditing: true },
		             { name: "name", caption: "bug名", editorType: "TextEditor", allowEditing: true },
		             { name: "bugLevel", caption: "bug等级", editorType: "TextEditor", allowEditing: true },
		             { name: "bugCreater", caption: "bug创建者", editorType: "TextEditor", allowEditing: true },
		             { name: "bugCtime", caption: "bug创建时间", editorType: "DateTimeEditor", allowEditing: false,formatString:"yyyy-MM-dd" },
		             { name: "bugDesc", caption: "bug描述", editorType: "TextEditor", allowEditing: true },
		             { name: "bugFile", caption: "bug文件", editorType: "TextEditor", allowEditing: true }
		             /*{ name: "file", caption: "bug文件", editorType: "FileEditor", allowEditing: true }*/
		         ] 
		    ],
		    entityContainer: formContainer // 绑定表单数据容器
		});
		_dataForm.on("load", me.controller._initDropDownEditorValue);
		me.addControl(_dataForm);
	}
	
	function _init_Window() {		
		if(_Window == null || ((_Window.reusable==false) && _Window.disposed==true)) {
			_Window = bug.context.windowManager.create({
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