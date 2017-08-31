
$import("mx.containers.VSplit");				
$import("mx.containers.Container");				
$import("mx.datacontrols.DataTree");
$import("mx.datacontainers.TreeEntityContainer");				
$import("mx.containers.HSplit");				
$import("mx.controls.ToolBar");				
$import("mx.datacontrols.DataGrid");
$import("mx.datacontainers.GridEntityContainer");
$import("mx.datacontrols.PageNaviBar");				
$import("mx.windows.Window");				
$import("tqa.views.ProductTypeTreeView");				
$import("tqa.views.ProductTypeTreeViewController");				
$import("tqa.views.ProductTypeTreeViewUserController");				
$import("mx.datacontrols.DataForm");
$import("mx.datacontainers.FormEntityContainer");				
$import("tqa.views.TProductFormView");				
$import("tqa.views.TProductFormViewController");				
$import("tqa.views.TProductFormViewUserController");				

mx.weblets.WebletManager.register(
{
    id: "tqa",
    name: "tqa",
    requires: [],
    onload: function (e) {
		
    }, 
    onstart: function (e) {
    	var mvc = new tqa.views.ProductTypeTreeViewUserController();
		e.context.rootViewPort.setViewController(mvc);
    }
});