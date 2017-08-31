
$import("mx.containers.VSplit");				
$import("mx.containers.Container");				
$import("mx.datacontrols.DataTree");
$import("mx.datacontainers.TreeEntityContainer");				
$import("mx.datacontrols.DataGrid");
$import("mx.datacontainers.GridEntityContainer");
$import("mx.datacontrols.PageNaviBar");				
$import("mx.controls.Label");				
$import("mx.editors.TextEditor");				
$import("mx.editors.DropDownEditor");				
$import("mx.controls.Button");				
$import("mx.windows.Window");				
$import("uifile.views.mainView");				
$import("uifile.views.mainViewController");				
$import("uifile.views.mainViewUserController");				

mx.weblets.WebletManager.register(
{
    id: "uifile",
    name: "uifile",
    requires: [],
    onload: function (e) {
		
    }, 
    onstart: function (e) {
    	var mvc = new uifile.views.mainViewUserController();
		e.context.rootViewPort.setViewController(mvc);
    }
});