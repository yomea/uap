$ns("tqa.views");

//tqa、TProductFormView在编译时将替换为实际值，设计过程中不要随意修改

tqa.views.TProductFormViewController = function() {
	var me = $extend(mx.views.ViewController);
	me.typeName="tqa.views.TProductFormViewController";
	me.getController = function(key){
		return me.getLinkViewController("tqa.views."+key+"Controller");
	};
	me.getView = function() {
		if (me.view == null) {
			me.view = new tqa.views.TProductFormView({ controller: me });
		}
		return me.view;
	};
	
	me._onactivate = function(e) {
		me.view.findControlById("DataForm").entityContainer.on("saved",function() {
			var node = me.view.node;
			//刷新子节点
			if($notEmpty(node)) {
				node.expand();
				node.refresh();
            }
		});
	};

	me._ToolBar_onitemclick = function(e) {
		var node = me.view.node;
		var _form = me.view.findControlById("DataForm");
    	if (_form == null) return;
    	
    	if (e.item.name == "SaveButton") {
    		//在实体容器中添加关联字段信息。
    		if($isEmpty(me.view.objID)) {
    			_form.entityContainer.setValue("producttype.typeid",node.id);
    		}
    		_form.save();
    	} else if (e.item.name == "RefreshButton") {
    		_form.load(me.view.objID);
    	} else if (e.item.name == "PrintButton") {
    		_form.printForm(true);
    	}
	};

	return me.endOfClass(arguments);
};