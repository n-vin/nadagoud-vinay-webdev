(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController",websiteNewController);

    function websiteNewController(websiteService,$routeParams,$location) {
        var vm = this;
        var userId = $routeParams.uid;

        //event Handlers
        vm.createWebsite = createWebsite;

        function init() {
            var websites = websiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            vm.userId = userId;
        }
        init();

        function createWebsite(newWebsite) {
            websiteService.createWebsite(userId,newWebsite);
            $location.url("/user/"+userId+"/website");
        }

    }
})();