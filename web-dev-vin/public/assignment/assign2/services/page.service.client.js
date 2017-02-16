(function () {
    angular
        .module("WebAppMaker")
        .service("pageService",pageService);
    
    function pageService() {
        var pages=[
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function findPageByWebsiteId(websiteId) {
            var pageslist = [];
            for(var p in pages){
                if(pages[p].websiteId == websiteId){
                    pageslist.push(pages[p]);
                }
            }
            return pageslist;
        }

        function findPageById(pageId) {
            for(var p in pages){
                if(pages[p]._id == pageId){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }


        function createPage(websiteId,page){
            var id = parseInt(pages[pages.length -1]._id);
            id += 1;
            var newPage = {
                _id: id.toString(),
                name: page.name,
                websiteId: websiteId,
                description: page.description
            };
            pages.push(newPage);
            return newPage;
        }

        function updatePage(pageId,up_page) {
            for(var p in pages){
                if(pages[p]._id == pageId){
                    pages[p].description = up_page.description;
                    pages[p].name = up_page.name;
                    pages[p].developerId = up_page.websiteId;
                    return pages[p];
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if (pages[p]._id == pageId) {
                    pages.splice(p, 1);
                    return true;
                }
            }
            return false;
        }

    }
})();