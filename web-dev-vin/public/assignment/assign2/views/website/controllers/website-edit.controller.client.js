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
            websiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    console.log("Websites list-controller" + websites);
                    renderWebsites(websites);
                });

            websiteService
                .findWebsiteById(websiteId)
                .success(function (website){
                    vm.website = website;
                });



            //var websites = websiteService.findWebsitesByUser(userId);
            //vm.websites = websites;
            vm.websiteId = websiteId;
            vm.userId = userId;
            //vm.website = websiteService.findWebsiteById(websiteId);
        }
        init();

        function updateWebsite(modWebsite){
            console.log("updateWebsite called in edit controller");
            websiteService
                .updateWebsite(websiteId,modWebsite)
                .success(function(website){
                    if(website == null){
                        vm.error("Website Update Error");
                        return null;
                    }
                $location.url("/user/"+userId+"/website/");
            });

        }


        function deleteWebsite() {
            websiteService.deleteWebsite(websiteId);
            $location.url("/user/"+userId+"/website");
        }

        function renderWebsites(websites) {
            console.log(websites);
            vm.websites = websites;
            console.log(websites);
        }


    }
})();