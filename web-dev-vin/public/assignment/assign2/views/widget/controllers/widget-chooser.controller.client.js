(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.createWidget = createWidget;

        function init() {
            //vm.widgets = WidgetService.findAllWidgets(vm.pageId);
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();

        function createWidget(widgetType) {
            console.log("createWidget called chooser client ");
            newWidget = {};
            //newWidget._id =  (new Date()).getTime().toString();
            newWidget.widgetType = widgetType;

            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    //var wid = widget;
                    $location.url("/user/" + vm.userId +"/website/" +vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);

                });

            //WidgetService.createWidget(vm.pageId, newWidget);
            //$location.url("/user/" + vm.userId +"/website/" +vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }
})();