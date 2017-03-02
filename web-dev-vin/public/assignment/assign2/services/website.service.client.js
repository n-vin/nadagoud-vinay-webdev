(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService",websiteService);
    
    function websiteService($http) {
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;

        function findWebsitesByUser(userId) {
            console.log("website service client called");
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+websiteId);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId, website);
        }

        function createWebsite(userId, website) {

            return $http.post("/api/user/"+userId+"/website", website);
        }

        /*function findWebsiteById(websiteId) {
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }
        function updateWebsite(websiteId,up_website) {
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    websites[w].description = up_website.description;
                    websites[w].name = up_website.name;
                    websites[w].developerId = up_website.developerId;
                    websites[w].updated = new Date();
                    return websites[w];
                }
            }
            return null;
        }


        function deleteWebsite(websiteId) {
            for(var u in websites) {
                if (websites[u]._id == websiteId) {
                    websites.splice(u, 1);
                    return true;
                }
            }
            return false;
        }

        function createWebsite(userId,website){
            var id = parseInt(websites[websites.length -1]._id);
            id += 1;
            var newWebsite = {
                _id: id.toString(),
                name: website.name,
                developerId: userId,
                updated: new Date(),
                description: website.description
            };
            websites.push(newWebsite);
            return newWebsite;
        }*/

    }
})();