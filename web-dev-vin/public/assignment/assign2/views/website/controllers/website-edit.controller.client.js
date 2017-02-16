(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController",websiteEditController);

    function websiteEditController($routeParams,websiteService,$location) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        //event Handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var websites = websiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.website = websiteService.findWebsiteById(websiteId);
        }
        init();

        function updateWebsite(modWebsite){
            var website = websiteService.updateWebsite(websiteId,modWebsite);
            if(website == null){
                vm.error("Website Update Error");
                return null;
            }
            $location.url("/user/"+userId+"/website/"+websiteId);
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(websiteId);
            $location.url("/user/"+userId+"/website");
        }

    }
})();