
$import("mx.containers.Container");				
$import("mx.windows.Window");				
$import("bug.views.mainView");				
$import("bug.views.mainViewController");				
$import("bug.views.mainViewUserController");				

mx.weblets.WebletManager.register(
{
    id: "bug",
    name: "bug",
    requires: [],
    onload: function (e) {
		
    }, 
    onstart: function (e) {
    	var mvc = new bug.views.mainViewUserController();
		e.context.rootViewPort.setViewController(mvc);
    }
});