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
            pageService
                .findAllPagesForWebsite(websiteId)
                .success(function(pages){
                    console.log("Pages received list controller");
                    vm.pages=pages;
                });
            /*
            var pages = pageService.findAllPagesForWebsite(websiteId);
            vm.pages = pages; */
            vm.userId = userId;
            vm.websiteId = websiteId;
        }
        init();


    }
})();