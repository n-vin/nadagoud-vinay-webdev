(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        /*var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Rio Olympics 2016"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 3, "text": "India's achievement in Rio 2016"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://static.sportskeeda.com/wp-content/uploads/2016/06/149372023-1466652013-800.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321",
                "text": '<p>India competed at the 2016 Summer Olympics in Rio de Janeiro, Brazil, from 5 to 21 August 2016. Indian athletes have appeared in every edition of the Summer Olympics since 1920, although they had their official debut at the 1900 Summer Olympics in Paris. </p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Best of Rio Olympic 2016 !!!"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/embed/El1_ENLEmKA" }
        ];*/

        var api = {
            "findAllWidgets" : findAllWidgets,
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function findAllWidgets(pageId) {
            console.log("findAllWidgets client called");
            return $http.get("/api/page/"+pageId+"/widget");
            //return widgets;
        }

        function deleteWidget(widgetId) {
            console.log("deleteWidget client called");
            return $http.delete("/api/widget/"+widgetId);
            /*
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }*/
        }

        function updateWidget(widgetId, newWidget){
            console.log("updateWidget client called");
            return $http.put("/api/widget/"+widgetId,newWidget);
            /*
            for(w in widgets){
                widget = widgets[w];
                if(widget._id === widgetId){
                    switch(widget.widgetType){
                        case "HEADER":
                            widget.text = newWidget.text;
                            widget.size = newWidget.size;
                            break;
                        case "IMAGE":
                            widget.width = newWidget.width;
                            widget.url = newWidget.url;
                            break;
                        case "YOUTUBE":
                            widget.width = newWidget.width;
                            widget.url = newWidget.url;
                            break;
                        case "HTML":
                            widget.text = newWidget.text;
                            break;
                    }
                }
            }*/
        }

        function findWidgetById(widgetId) {
            console.log("findWidgetById client called" + widgetId);
            return $http.get("/api/widget/"+widgetId);
            /*
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;*/
        }

        function findWidgetsByPageId(pageId) {
            console.log("findWidgetsByPageId client called");
            return $http.get("/api/page/"+pageId+"/widget");
            /*
            var widgetsforPage = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    widgetsforPage.push(widgets[w]);
                }
            }
            return widgetsforPage;*/
        }

        function createWidget(pageId,newWidget) {
            console.log("createWidget client called" + newWidget);
            return $http.post("/api/page/"+pageId+"/widget",newWidget);
            /*
            widget.pageId = pageId;
            switch(widget.widgetType){
                case "HEADER":
                    widget.text = "Default Text";
                    widget.size = 3;
                    break;
                case "IMAGE":
                    widget.width = "100%";
                    widget.url = "https://static.sportskeeda.com/wp-content/uploads/2016/06/149372023-1466652013-800.jpg";
                    break;
                case "YOUTUBE":
                    widget.width = "100%";
                    widget.url = "https://www.youtube.com/embed/El1_ENLEmKA";
                    break;
                case "HTML":
                    widget.text = "Default Text";
                    break;
            }
            widgets.push(widget);*/
        }
    }
})();