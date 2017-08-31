$ns("tqa.views");

//tqa、ProductTypeTreeView在编译时将替换为实际值，设计过程中不要随意修改

tqa.views.ProductTypeTreeViewController = function() {
	var me = $extend(mx.views.ViewController);
	me.typeName="tqa.views.ProductTypeTreeViewController";
	me.getController = function(key){
		return me.getLinkViewController("tqa.views."+key+"Controller");
	};
	me.getView = function() {
		if (me.view == null) {
			me.view = new tqa.views.ProductTypeTreeView({ controller: me });
		}
		return me.view;
	};
	
	var _dataTree = null;
	var _dataGridDetailFormView = null;
	var _selectedNode = null;
	me._onactivate = function(e) {
		_dataTree = me.view.findControlById("DataTree");
		_dataTree.loadRootNodes();
		

		me.view.findControlById("DataGrid").entityContainer.on("deleted",function() {
			//删除操作后，刷新树节点
			if($notEmpty(_selectedNode)) {
				_selectedNode.expand();
				_selectedNode.refresh();
			}
		});

		_dataTree.on("selectionchanged",function() {
			var node = _dataTree.selection;
			var e = new Object();
			e.node = node;
			me._DataTree_onnodeclick(e);
		});
	};

	me._DataTree_onnodeclick = function(e) {
		_dataTree.off("selectionchanged");

		var _dataGrid = me.view.findControlById("DataGrid");
    	//响应左侧树某一类节点的单击操作，在右侧展示该节点相关的数据列表。
    	if (e.node.itemType == "f967f110-325b-4918-bdb5-e378314fdd2d") {
    		_selectedNode = e.node;
    		//设置右侧数据列表过滤字段
			var relationField = 'producttype.typeid';
    		if($notEmpty(_selectedNode) && $notEmpty(relationField)) {
    			var obj=jQuery.parseJSON('{"'+relationField+'":"'+_selectedNode.id+'"}');
        		_dataGrid.setFilter(obj);
    		}
    		
			_dataGrid.load();
    	}
	};

	me._ToolBar_onitemclick = function(e) {
		var _dataGrid = me.view.findControlById("DataGrid");
    	if (_dataGrid == null) return;
    	
    	//获取ToolBar中item的name属性值，然后分别进行不同操作
    	if (e.item.name == "NewButton") {
    		_gridNew_onclick();
    	} else if (e.item.name == "EditButton") {
    		_gridEdit_onclick();
    	} else if (e.item.name == "DelButton") {
    		_gridDelete_onclick();
    	} else if (e.item.name == "PrintButton") {
    		_gridPrint_onclick();
    	}
	};
	
	/**
     * 新增
     */
    function _gridNew_onclick(e) {
		if($isEmpty(_selectedNode)) {
    		mx.indicate("info", "请首先选择要进行新增操作树节点！");
            return;
        }
	    var _detailView = me._getGridDetailFormView();
	    //设置对象id为null
        _detailView.objID = null;
        _detailView.node = _selectedNode;
        _showDetailFormView(_detailView,"表单填写");
    }
    
    /**
     * 删除
     */
    function _gridDelete_onclick(e) {
    	var _dataGrid = me.view.findControlById("DataGrid");
    	if(_dataGrid.displayCheckBox) {//数据项之前带选择框
			if (_dataGrid.getCheckedItems().length == 0) {
	        	mx.indicate("info", "请至少勾选一条待删除记录。");
	            return;
	        }
			if (confirm("您确认删除数据吗？")) {
				_dataGrid.removeItems(_dataGrid.getCheckedItems());
			}
		}else {//数据项之前不带选择框
			if(_dataGrid.selection == null) {
				mx.indicate("info", "请选择一条待删除记录。");
	            return;
			}
			if (confirm("您确认删除数据吗？")) {
				_dataGrid.removeItem(_dataGrid.selection);
			}
		}
    }
    
    /**
     * 打印
     */
	function _gridPrint_onclick(e) {
		var _dataGrid = me.view.findControlById("DataGrid");
		_dataGrid.printGrid(true);
	};
    
    /**
     * 编辑
     */
    function _gridEdit_onclick(e) {
        var _dataGrid = me.view.findControlById("DataGrid");
		if(_dataGrid.selection == null) {
			mx.indicate("info", "请选择一条待编辑记录。");
			return;
		}
		
		var _detailView = me._getGridDetailFormView();
		_detailView.objID =  _dataGrid.selection.getValue(_dataGrid.entityContainer.primaryKey);
		_detailView.node = _selectedNode;
		//显示详细信息页面
		_showDetailFormView(_detailView,"表单编辑");        
    }
    
    /**
     * 显示表单视图
     * @param p_view : 需要显示的视图对象
     * @param p_title : 对话框的标题
     */
    function _showDetailFormView(p_view, p_title) {
    	if(typeof p_view != "undefined") {
			var win = p_view.getWindow();
    		p_view.findControlById("DataForm").load(p_view.objID);
    		win.setTitle(p_title ? p_title : win.title);
			win.showDialog();
    	}
    }
    
    /**
     * 获取表单视图对象
     */
    me._getGridDetailFormView = function() {
    	if (_dataGridDetailFormView == null) {
            _dataGridDetailFormView = me.getController("TProductFormView").getView();
            _dataGridDetailFormView.findControlById("DataForm").entityContainer.on("saved", function(e){
    			_dataGridDetailFormView.getWindow().hide();
    			me.view.findControlById("DataGrid").load();
    			if($notEmpty(_dataTree) && $notEmpty(_dataTree.selection)){
    				_dataTree.selection.refresh();
    			}
    		});
    	}
    	return _dataGridDetailFormView;
    };

	return me.endOfClass(arguments);
};