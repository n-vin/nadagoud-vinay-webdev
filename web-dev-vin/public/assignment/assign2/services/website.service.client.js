(function () {
    angular
        .module("WebAppMaker")
        .service("websiteService",websiteService);
    
    function websiteService() {
        var websites = [

            { "_id": "123", "name": "Facebook",    "developerId": "456", updated: new Date(), "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", updated: new Date(), "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", updated: new Date(), "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", updated: new Date(), "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", updated: new Date(), "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", updated: new Date(), "description": "Lorem" }
        ];
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;

        function findWebsitesByUser(userId) {
            var sites= [];
            for(var w in websites){
                if(websites[w].developerId == userId){
                    sites.push(websites[w]);
                }
            }
            return sites;

        }
        function findWebsiteById(websiteId) {
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
        }

    }
})();