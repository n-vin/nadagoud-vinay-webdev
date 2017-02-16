(function () {
    angular
        .module("WebAppMaker")
        .controller("pageEditController",pageEditController);

    function pageEditController($routeParams,pageService,$location) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        //event Handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            var pages = pageService.findPageByWebsiteId(userId);
            vm.pages = pages;
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
            vm.page = pageService.findPageById(pageId);
        }
        init();

        function updatePage(modPage){
            var page = pageService.updatePage(pageId,modPage);
            if(page == null){
                vm.error("Page Update Error");
                return null;
            }
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId);
        }

        function deletePage() {
            pageService.deletePage(pageId);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");
        }

    }
})();