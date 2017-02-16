(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController",pageListController);

    function pageListController($routeParams,pageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        //event Handlers


        function init() {
            var pages = pageService.findPageByWebsiteId(websiteId);
            vm.pages = pages;
            vm.userId = userId;
            vm.websiteId = websiteId;
        }
        init();


    }
})();