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
            websiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    console.log("Websites list-controller" + websites);
                    renderWebsites(websites);
                });
            //var websites = websiteService.findWebsitesByUser(userId);
            //vm.websites = websites;
            vm.userId = userId;
        }
        init();

        function createWebsite(newWebsite){
            console.log("createWebsite called in client");
            newWebsite.developerId = userId;
            //newWebsite.updated= new Date();
            websiteService
                .createWebsite(userId,newWebsite)
                .success(function(){
                    $location.url("/user/"+userId+"/website");
                });
        }

        function renderWebsites(websites) {
            console.log(websites);
            vm.websites = websites;
            console.log(websites);
        }
    }
})();