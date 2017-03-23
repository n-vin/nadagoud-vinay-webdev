module.exports = function () {

    var q = require('q');
    var mongoose = require('mongoose');
    //var WebsiteSchema = require('../website/website.schema.server.js')();
    //var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
    var PageSchema = require('./page.schema.server.js')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var _model;
    function setModel(model)
    {
        _model = model;
    }

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetToPage: addWidgetToPage,
        deleteWidgetFromPage: deleteWidgetFromPage,
        deletePageAndChildren: deletePageAndChildren,
        setModel:setModel
    };

    function createPage(websiteId,page) {

        var deferred = q.defer();
        console.log("model.website user id : " + websiteId);
         PageModel.create({_website:websiteId,name:page.name,description :page.description}, function (err, page) {
            if(err) {
                deferred.reject(err);
            } else {
                //_model.WebsiteModel.addPageToWebsite(websiteId,page);
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        PageModel.find({_website:websiteId}, function (err, pages) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(pages);
            }
        });
        return deferred.promise;
        /*var deferred = q.defer();
        WebsiteModel.find({_user:userId}, function (err, website) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(website);
            }
        });
        return deferred.promise;
*/
    }
    function findPageById(pageId) {
        var deferred = q.defer();
        PageModel.findById(pageId, function (err, page) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page);
            }
        });
        return deferred.promise;

    }

    function updatePage(pageId,page) {

        var deferred = q.defer();

        PageModel.update({_id: pageId},
            {$set: page}, function (err, page) {
                if(err) {
                    deferred.reject(err);
                } else {

                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    /*
    function deletePage(pageId) {
        var deffered = q.defer();

        //var deferred = q.defer();

        PageModel.remove({_id: pageId}, function (err, result) {
            if(err) {
                deffered.reject(err);
            } else {
                deffered.resolve(result);
            }
        });
        return deffered.promise;

        /*PageModel.findPageById(pageId,function (err,page) {
            if(err)
                deffered.reject(err);
            else {
                //page.remove();
                deffered.resolve(page.remove());
            }
        });*/
        /*PageModel.findByIdAndRemove(pageId, function (err, page) {
            if(err)
                deffered.reject(err);
            else {
                page.remove();
                deffered.resolve(page);
            }
        });
        return deffered.promise;
    }*/

    function addWidgetToPage(pageId,widget) {
        var deferred = q.defer();

        PageModel.findById(pageId, function (err, page) {
            if(err) {
                deferred.reject(err);
            } else {

                page.widgets.push(widget);
                deferred.resolve(page.save());
            }
        });
        return deferred.promise;
    }

    function deleteWidgetFromPage(pageId,widgetId){
        var deferred = q.defer();

        console.log("page model" +pageId);
        PageModel.findById(pageId, function (err, page) {
            if(err) {
                deferred.reject(err);
            } else {

                console.log("page" + page);
                page.widgets.splice(page.widgets.indexOf(widgetId),1);
                deferred.resolve(page.save());
            }
        });
        return deferred.promise;
    }

    function deletePage(pageId) {
        return PageModel.findById(pageId).populate('_website').then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();
            return deletePageAndChildren(pageId);
        }, function (err) {
            return err;
        });
    }

    function recursiveDelete(widgetsOfPage, pageId) {
        if(widgetsOfPage.length == 0){
            return PageModel.remove({_id: pageId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return _model.WidgetModel.deleteWidgetOfPage(widgetsOfPage.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return recursiveDelete(widgetsOfPage, pageId);
                }
            }, function (err) {
                return err;
            });
    }

    function deletePageAndChildren(pageId) {
        return PageModel.findById({_id: pageId})
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                return recursiveDelete(widgetsOfPage, pageId);
            }, function (err) {
                return err;
            });
    }



    return api;
}