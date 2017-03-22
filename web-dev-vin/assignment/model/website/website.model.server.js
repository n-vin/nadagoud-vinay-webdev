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
    function deleteWebsite(websiteId) {

    }

    return api;
}