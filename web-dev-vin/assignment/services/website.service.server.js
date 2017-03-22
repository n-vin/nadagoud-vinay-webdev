module.exports = function (app,WebsiteModel,UserModel) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "_user": "456", dateCreated: new Date(), "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "_user": "456", dateCreated: new Date(), "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "_user": "456", dateCreated: new Date(), "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "_user": "123", dateCreated: new Date(), "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "_user": "123", dateCreated: new Date(), "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "_user": "234", dateCreated: new Date(), "description": "Lorem" }
    ];

    function findWebsitesByUser(req,res){
        var userId = req.params.userId;

        WebsiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

        /*
        var sites= [];
        for(var w in websites){
            if(websites[w]._user === userId){
                sites.push(websites[w]);
            }
        }

        console.log(sites);
        res.json(sites);
        */
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;

        WebsiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });


        /*for(var w in websites){
            if(websites[w]._id === websiteId){
                res.json(websites[w]);
                return;
            }
        }
        console.log("No website found");*/
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id === websiteId){
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        console.log("No website found");
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var newWebsite = req.body;

        WebsiteModel
            .updateWebsite(websiteId,newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*
        console.log(websiteId);
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId ) {
                console.log('found website');
                console.log(newWebsite);
                websites[w].name = newWebsite.name;
                websites[w]._user = newWebsite._user;
                websites[w].description = newWebsite.description;
                //websites[w].dateCreated = new Date();
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }


    function createWebsite(req, res) {
        var newWebsite = req.body;
        console.log("createWebsite called in server");
        /*
        var id = parseInt(websites[websites.length -1]._id);
        id += 1;
        newWebsite._id = id.toString();//(new Date()).getTime() + "";
        newWebsite.updated = new Date();
        websites.push(newWebsite);
        console.log(websites);
        res.json(newWebsite);
        */
        WebsiteModel
            .createWebsiteForUser(newWebsite._user,newWebsite)
            .then(function (website) {

                UserModel.addWebsiteToUser(website._user,website)
                    .then(function (result) {
                        res.json(website);
                    },function (err) {
                        //delete website;
                        res.sendStatus(500).send(err);
                    });
                /*newWebsite._user =  website._user;
                newWebsite.name =  website.name;
                newWebsite.description =  website.description;
                newWebsite.dateCreated =  website.dateCreated;*/
                //res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};