module.exports = function () {

    var q = require('q');
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel',UserSchema);


    var _model;
    function setModel(model)
    {
        _model = model;
    }

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        addWebsiteToUser: addWebsiteToUser,
        deleteWebsiteFromUser: deleteWebsiteFromUser,
        setModel:setModel
    };


    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId,user) {
        var deferred = q.defer();
        UserModel.update({_id: userId},
            {$set: user}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {

                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        UserModel.find({username: username,password: password}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {

                    deferred.resolve(user[0]);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.find({username: username}, function (err, user) {
            if(err) {
                deferred.reject(err);
            } else {

                deferred.resolve(user[0]);
            }
        });
        return deferred.promise;
    }

    function addWebsiteToUser(userId,website) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {
            if(err) {
                deferred.reject(err);
            } else {

                user.websites.push(website);
                deferred.resolve(user.save());
            }
        });
        return deferred.promise;
    }

    /*
    function deleteUser(userId) {
    }*/


    function recursiveDelete(websitesOfUser, userId) {
        if(websitesOfUser.length == 0){
            console.log("delete uesr ,,");
            return UserModel.remove({_id: userId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        } 

        return _model.WebsiteModel.deleteWebsiteAndChildren(websitesOfUser.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(websitesOfUser, userId);
                }
            }, function (err) {
                return err;
            });
    }

    function deleteUser(userId) {
        console.log("delete user 1" + userId);
        return UserModel.findById({_id: userId})
            .then(function (user) {
                console.log("delete user 2" + userId);

                var websitesOfUser = user.websites;
                return recursiveDelete(websitesOfUser, userId);
            }, function (err) {
                console.log(err);
                return err;
            });
    }


    function deleteWebsiteFromUser(userId,websiteId) {
        var deferred = q.defer();

        console.log("user  model" +userId);
        UserModel.findById(userId, function (err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("user" + user);
                user.websites.splice(user.websites.indexOf(websiteId),1);
                deferred.resolve(user.save());
            }
        });
        return deferred.promise;
    }


};