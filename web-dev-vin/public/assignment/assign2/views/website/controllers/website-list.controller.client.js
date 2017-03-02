(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController",websiteListController);

    function websiteListController($routeParams,websiteService) {
        var vm = this;
        var userId = $routeParams.uid;

        //event Handlers


        function init() {
            websiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    console.log("Websites list-controller" + websites);
                    vm.websites = websites;
                    //renderWebsites(websites);
                });
            vm.userId = userId;
        }
        init();
/*
        function renderWebsites(websites) {
            console.log(websites);

            console.log(websites);
        }
*/

    }
})();