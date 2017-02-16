(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController",websiteListController);

    function websiteListController($routeParams,websiteService) {
        var vm = this;
        var userId = $routeParams.uid;

        //event Handlers


        function init() {
            var websites = websiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            vm.userId = userId;
        }
        init();


    }
})();