module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "520", "name": "Post 2", "websiteId": "234", "description": "Lorem" },
        { "_id": "521", "name": "Post 1", "websiteId": "567", "description": "Lorem" },
        { "_id": "522", "name": "Post 2", "websiteId": "678", "description": "Lorem" },
        { "_id": "523", "name": "Post 3", "websiteId": "789", "description": "Lorem" }
    ];

    function findAllPagesForWebsite(req,res){
        console.log("find all pages in server called");
        var websiteId = req.params.websiteId;
        var sites= [];
        for(var p in pages){
            if(pages[p].websiteId === websiteId){
                sites.push(pages[p]);
            }
        }
        console.log(sites);
        res.json(sites);
    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id === pageId){
                res.json(pages[p]);
                return;
            }
        }
        console.log("No pages found");
    }

    function deletePage(req,res){
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id === pageId){
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        console.log("No page found");
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var newPage = req.body;
        console.log(pageId);
        for(var p in pages) {
            var page = pages[p];
            if( page._id === pageId ) {
                console.log('found page');
                console.log(newPage);
                pages[p].name = newPage.name;
                //pages[p].developerId = newPage.developerId;
                pages[p].description = newPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }


    function createPage(req, res) {
        var newPage = req.body;
        console.log("createPage called in server");
        var id = parseInt(pages[pages.length -1]._id);
        id += 1;
        newPage._id = id.toString();//(new Date()).getTime() + "";
        //newPage.updated = new Date();
        pages.push(newPage);
        console.log(pages);
        res.json(newPage);
    }

};