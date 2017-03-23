module.exports = function () {

    var q = require('q');
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var _model;
    function setModel(model)
    {
        _model = model;
    }

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        deleteAllWidgetsForPage: deleteAllWidgetsForPage,
        deleteWidgetOfPage: deleteWidgetOfPage,
        setModel:setModel
    };

    function createWidget(pageId,widget) {
        var deferred = q.defer();
        widget._page = pageId;

        WidgetModel.create(widget, function (err, widget) {
            if(err) {
                deferred.reject(err);
            } else {
                //_model.PageModel.addWidgetToPage(pageId,widget);
                deferred.resolve(widget);
            }
        });
        return deferred.promise;
    }




    function getAllWidgets(count, widgetsOfPage, widgetCollectionForPage) {
        if(count == 0){
            return widgetCollectionForPage;
        }

        return WidgetModel.findById(widgetsOfPage.shift()).select('-__v')
            .then(function (widget) {
                widgetCollectionForPage.push(widget);
                return getAllWidgets(--count, widgetsOfPage, widgetCollectionForPage);
            }, function (err) {
                return err;
            });
    }
    function findAllWidgetsForPage(pageId){

        return _model.PageModel
            .findPageById(pageId)
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                var numberOfWidgets = widgetsOfPage.length;
                var widgetCollectionForPage = [];

                return getAllWidgets(numberOfWidgets, widgetsOfPage, widgetCollectionForPage);

            }, function (err) {
                return err;
            });
    }

    /*
    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        WidgetModel.find({_page:pageId}, function (err, widgets) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widgets);
            }
        });
        return deferred.promise;

    }*/

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        WidgetModel.findById(widgetId, function (err, widget) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widget);
            }
        });
        return deferred.promise;

    }

    function updateWidget(widgetId,widget) {

        var deferred = q.defer();

        WidgetModel.update({_id: widgetId},
            {$set: widget}, function (err, widget) {
                if(err) {
                    deferred.reject(err);
                } else {

                    deferred.resolve(widget);
                }
            });
        return deferred.promise;

    }

    /*
    function deleteWidget(widgetId) {

        var deferred = q.defer();

        WidgetModel.remove({_id: widgetId}, function (err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;

    }
    */

    function deleteAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        WidgetModel.remove({_page: pageId}, function (err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;

    }

    function reorderWidget(pageId, start, end) {
        return _model.PageModel
            .findPageById(pageId)
            .then(function (page) {
                console.log("model reorder" + page);
                page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                page.save();
                console.log("model reorder 1" + page);

                return 200;
            }, function (err) {
                return err;
            });
    }

    function deleteWidget(widgetId){
        return WidgetModel.findById(widgetId).populate('_page').then(function (widget) {
            widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId),1);
            widget._page.save();
            if(widget.widgetType == "IMAGE"){
                deleteUploadedImage(widget.url);
            }
            return WidgetModel.remove({_id:widgetId});
        }, function (err) {
            return err;
        });
    }

    function deleteWidgetOfPage(widgetId) {
        return WidgetModel.findById(widgetId)
            .then(function (widget) {
                if(widget.widgetType == "IMAGE"){
                    deleteUploadedImage(widget.url);
                }
                return WidgetModel.remove({_id: widgetId});
            }, function (err) {
                return err;
            });
    }

    function deleteUploadedImage(imageUrl) {
        // Local helper function
        // if(imageUrl && imageUrl.search('http') == -1){
        //     // Locally uploaded image
        //     // Delete it
        //     fs.unlink(publicDirectory+imageUrl, function (err) {
        //         if(err){
        //             console.log(err);
        //             return;
        //         }
        //         console.log('successfully deleted '+publicDirectory+imageUrl);
        //     });
        // }
return;
    }

    return api;
}