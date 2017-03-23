module.exports = function () {

    var q = require('q');
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server.js')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);


    var _model;
    function setModel(model)
    {
        _model = model;
    }

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPageToWebsite: addPageToWebsite,
        deletePageFromWebsite: deletePageFromWebsite,
        deleteWebsiteAndChildren: deleteWebsiteAndChildren,
        setModel:setModel
    };

    function createWebsiteForUser(userId,website) {
        var deferred = q.defer();
        console.log("model.website user id : " + userId);
        WebsiteModel.create({_user:userId,name:website.name,description :website.description}, function (err, website) {
            if(err) {
                deferred.reject(err);
            } else {
                //_model.UserModel.addWebsiteToUser(userId,website);
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        WebsiteModel.find({_user:userId}, function (err, website) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(website);
            }
        });
        return deferred.promise;

    }
    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        WebsiteModel.findById(websiteId, function (err, website) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(website);
            }
        });
        return deferred.promise;

    }
    function updateWebsite(websiteId,website) {
        var deferred = q.defer();
        WebsiteModel.update({_id: websiteId},
            {$set: website}, function (err, website) {
                if(err) {
                    deferred.reject(err);
                } else {

                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function addPageToWebsite(websiteId,page) {
        var deferred = q.defer();

        WebsiteModel.findById(websiteId, function (err, website) {
            if(err) {
                deferred.reject(err);
            } else {

                website.pages.push(page);
                deferred.resolve(website.save());
            }
        });
        return deferred.promise;
    }

    /*
    function deleteWebsite(websiteId) {
        var deffered = q.defer();

        //var deferred = q.defer();

        WebsiteModel.remove({_id: websiteId}, function (err, result) {
            if(err) {
                deffered.reject(err);
            } else {
                deffered.resolve(result);
            }
        });
        return deffered.promise;
    }*/

    function deletePageFromWebsite(websiteId,pageId) {
        var deferred = q.defer();

        console.log("website model" +websiteId);
        WebsiteModel.findById(websiteId, function (err, website) {
            if(err) {
                deferred.reject(err);
            } else {

                console.log("website" + website);
                website.pages.splice(website.pages.indexOf(pageId),1);
                deferred.resolve(website.save());
            }
        });
        return deferred.promise;
    }

    function deleteWebsite(websiteId){
        return WebsiteModel.findOne({_id:websiteId}).populate('_user').then(function (website) {
            website._user.websites.splice(website._user.websites.indexOf(websiteId),1);
            website._user.save();
            return deleteWebsiteAndChildren(websiteId);
        }, function (err) {
            console.log(err);
            return err;
        });
    }

    function recursiveDelete(pagesOfWebsite, websiteId) {
        if(pagesOfWebsite.length == 0){
            return WebsiteModel.remove({_id: websiteId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    console.log(err);
                    return err;
                });
        }

        return _model.PageModel.deletePageAndChildren(pagesOfWebsite.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(pagesOfWebsite, websiteId);
                }
            }, function (err) {
                return err;
            });
    }

    function deleteWebsiteAndChildren(websiteId){
        return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
            .then(function (website) {
                var pagesOfWebsite = website.pages;
                return recursiveDelete(pagesOfWebsite, websiteId);
            }, function (err) {
                return err;
            });
    }

    return api;
}