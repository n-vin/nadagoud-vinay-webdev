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

    }

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

    function deleteAllWidgetsForPage(pageId) {

        var deferred = q.defer();

        WidgetModel.remove({_id: pageId}, function (err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;

    }

    function reorderWidget(pageId,start,end) {

    }

    return api;
}