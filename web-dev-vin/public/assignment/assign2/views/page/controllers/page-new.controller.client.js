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
            pageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            //var pages = pageService.findPageByWebsiteId(vm.websiteId);

        }
        init();

        function createPage(newPage) {
            pageService
                .createPage(vm.websiteId,newPage)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });

        }

    }
})();