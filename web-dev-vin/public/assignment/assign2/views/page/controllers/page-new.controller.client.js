(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController",pageNewController);

    function pageNewController(pageService,$routeParams,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        //event Handlers
        vm.createPage = createPage;

        function init() {
            var pages = pageService.findPageByWebsiteId(vm.websiteId);
            vm.pages = pages;
        }
        init();

        function createPage(newPage) {
            pageService.createPage(vm.websiteId,newPage);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

    }
})();