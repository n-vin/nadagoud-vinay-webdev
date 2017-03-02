(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.createWidget = createWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
            //vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(widgetType) {
            return 'views/widget/templates/editors/widget-' + widgetType + '-editor.view.client.html';
        }

        function updateWidget() {
            //WidgetService.updateWidget(vm.widgetId, vm.widget);
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget" );
                });

        }

        function deleteWidget() {
            //WidgetService.deleteWidget(vm.widgetId);
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget" );
                })

        }

        function createWidget(widgetType) {
            newWidget = {};
            //newWidget._id =  (new Date()).getTime().toString();
            newWidget.widgetType = widgetType;

            //WidgetService.createWidget(vm.pageId, newWidget);
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .success(function () {
                    $location.url("/user/" + vm.userId +"/website/" +vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                });

        }
    }
})();