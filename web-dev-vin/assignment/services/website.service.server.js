module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", updated: new Date(), "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", updated: new Date(), "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", updated: new Date(), "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", updated: new Date(), "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", updated: new Date(), "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", updated: new Date(), "description": "Lorem" }
    ];

    function findWebsitesByUser(req,res){
        var userId = req.params.userId;
        var sites= [];
        for(var w in websites){
            if(websites[w].developerId === userId){
                sites.push(websites[w]);
            }
        }

        console.log(sites);
        res.json(sites);
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id === websiteId){
                res.json(websites[w]);
                return;
            }
        }
        console.log("No website found");
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
        console.log(websiteId);
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId ) {
                console.log('found website');
                console.log(newWebsite);
                websites[w].name = newWebsite.name;
                websites[w].developerId = newWebsite.developerId;
                websites[w].description = newWebsite.description;
                websites[w].updated = new Date();
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }


    function createWebsite(req, res) {
        var newWebsite = req.body;
        console.log("createWebsite called in server");
        var id = parseInt(websites[websites.length -1]._id);
        id += 1;
        newWebsite._id = id.toString();//(new Date()).getTime() + "";
        newWebsite.updated = new Date();
        websites.push(newWebsite);
        console.log(websites);
        res.json(newWebsite);
    }

};