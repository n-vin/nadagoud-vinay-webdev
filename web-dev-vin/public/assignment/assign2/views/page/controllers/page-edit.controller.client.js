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
            /*var pages = pageService.findPageByWebsiteId(userId);
            vm.pages = pages; */
            pageService
                .findAllPagesForWebsite(websiteId)
                .success(function(pages){
                    console.log("Pages received edit controller");
                    vm.pages=pages;
                });

            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
            pageService
                .findPageById(pageId)
                .success(function(page){
                    console.log("Page received in edit controller");
                    vm.page=page;
                });
            //vm.page = pageService.findPageById(pageId);
        }
        init();

        function updatePage(modPage){
            //var page = pageService.updatePage(pageId,modPage);
            pageService
                .updatePage(pageId,modPage)
                .success(function (page) {
                    vm.page = page;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/");
                });
        }

        function deletePage() {
            pageService
                .deletePage(pageId)
                .success(function () {
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                });
            /*
            if(pageId == null){
                vm.error("Page Delete Error");
                return null;
            }*/

        }

    }
})();