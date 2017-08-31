
$ns("bug.views");
$import("bug.views.dataFormViewController")

bug.views.dataFormViewUserController=function(){
	var me = $extend(bug.views.dataFormViewController);
    return me.endOfClass(arguments);
};