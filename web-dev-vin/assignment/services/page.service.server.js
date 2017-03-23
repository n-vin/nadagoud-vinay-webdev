module.exports = function (app,PageModel,WebsiteModel,WidgetModel) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages=[
        { "_id": "321", "name": "Post 1", "_website": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "_website": "456", "description": "Lorem" },
        { "_id": "321", "name": "Post 1", "_website": "456", "description": "Lorem" },
        { "_id": "520", "name": "Post 2", "_website": "234", "description": "Lorem" },
        { "_id": "521", "name": "Post 1", "_website": "567", "description": "Lorem" },
        { "_id": "522", "name": "Post 2", "_website": "678", "description": "Lorem" },
        { "_id": "523", "name": "Post 3", "_website": "789", "description": "Lorem" }
    ];

    function findAllPagesForWebsite(req,res){
        console.log("find all pages in server called");
        var websiteId = req.params.websiteId;
        PageModel.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*
        var sites= [];
        for(var p in pages){
            if(pages[p].websiteId === websiteId){
                sites.push(pages[p]);
            }
        }
        console.log(sites);
        res.json(sites);
        */
    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        PageModel.findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*
        for(var p in pages){
            if(pages[p]._id === pageId){
                res.json(pages[p]);
                return;
            }
        }
        console.log("No pages found");
        */
    }

    /*
    function deletePage(req,res){
        var pageId = req.params.pageId;

        PageModel.findPageById(pageId)
            .then(function (page){
                WebsiteModel.deletePageFromWebsite(page._website,pageId)
                    .then(function (result) {
                        WidgetModel.deleteAllWidgetsForPage(pageId)
                            .then(function (result) {
                                PageModel.deletePage(pageId)
                                    .then(function (result) {
                                        res.json(result);
                                    },function (err) {
                                        res.sendStatus(500).send(err);
                                    });
                                //res.json(result);
                            }, function (err) {
                                res.sendStatus(500).send(err);
                            });
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });

            }, function (err) {
                res.sendStatus(500).send(err);
            });

        /*PageModel
            .deletePage(pageId)
            .then(function (result) {
                res.json(result);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
/*
        var pageId = req.params.pageId;

        WidgetModel.deleteAllWidgetsForPage(pageId)
            .then(function (result) {

            }, function (err) {

        });




        PageModel
            .deletePage(pageId)
            .then(function (result) {
                res.json(result);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*for(var p in pages){
            if(pages[p]._id === pageId){
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        console.log("No page found");
    }*/

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        PageModel.
        deletePage(pageId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var newPage = req.body;
        console.log(pageId);
        PageModel
            .updatePage(pageId,newPage)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*for(var p in pages) {
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
        */
    }


    function createPage(req, res) {
        var newPage = req.body;
        console.log("createPage called in server");
        PageModel.createPage(newPage._website,newPage)
            .then(function (page) {
                WebsiteModel.addPageToWebsite(page._website,page)
                    .then(function (result) {
                        res.json(page);
                    },function (err) {
                        //delete page;
                        res.sendStatus(500).send(err);
                    });

            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*var id = parseInt(pages[pages.length -1]._id);
        id += 1;
        newPage._id = id.toString();//(new Date()).getTime() + "";
        //newPage.updated = new Date();
        pages.push(newPage);
        console.log(pages);
        res.json(newPage);*/
    }

};