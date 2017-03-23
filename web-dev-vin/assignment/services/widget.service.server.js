module.exports = function (app,WidgetModel,PageModel) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pid/widget", updateWidgetOrder);


    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "NORTHEASTERN UNIVERSITY !!!"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 3, "text": "Boston Massachusetts"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://www.northeastern.edu/careers/wp-content/uploads/2014/10/Quad-Campus-Photo.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321",
            "text": '<p>Northeastern University is a private research university in Boston, Massachusetts, established in 1898. It is categorized as an R1 institution by the Carnegie Classification of Institutions of Higher Education.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "NORTHEASTERN UNIVERSITY!!!"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/xQSHCjnSL6U" },
        { "_id": "679", "widgetType": "YOUTUBE", "pageId": "523", "width": "100%",
            "url": "https://www.youtube.com/embed/xQSHCjnSL6U" }
    ];

    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;
        WidgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

        /*
        var widgs = [];
        for (w in widgets){
            if(widgets[w].pageId == pageId){
                widgs.push(widgets[w]);
            }
        }
        console.log(widgs);
        res.json(widgs); */
    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;

        WidgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*console.log("find widget by Id: widget id "+ widgetId);
        for (w in widgets){
            if(widgets[w]._id == widgetId){
                res.json(widgets[w]);
                return;
            }
        }
        console.log("No Widgets found");*/
    }

    /*
    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;
        //var pageId = req.params.pageId;

        WidgetModel.findWidgetById(widgetId)
            .then(function (widget){
                PageModel.deleteWidgetFromPage(widget._page,widgetId)
                    .then(function (result) {
                        // handle image delete
                        WidgetModel.deleteWidget(widgetId)
                            .then(function (result) {
                                res.json(result);
                            }, function (err) {
                                res.sendStatus(500).send(err);
                            });
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });

            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    */

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        WidgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
            }, function (err) {
                console.log(err);
                res.sendStatus(404);
            });
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var newWidget = req.body;


        /*
        for(w in widgets){
            var widget = widgets[w];
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
                }*/

        WidgetModel.updateWidget(widgetId,newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

                /*
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }
    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        /*var id = parseInt(widgets[widgets.length -1]._id);
        id += 1;
        widget._id = id.toString();

        widget.pageId = pageId;
         */
        switch(widget.widgetType){
            case "HEADER":
                widget.text = "My Header ";
                widget.size = 3;
                break;
            case "IMAGE":
                widget.width = "100%";
                widget.url = "http://www.northeastern.edu/careers/wp-content/uploads/2014/10/Quad-Campus-Photo.jpg";
                break;
            case "YOUTUBE":
                widget.width = "100%";
                widget.url = "https://www.youtube.com/embed/xQSHCjnSL6U";
                break;
            case "HTML":
                widget.text = "The text comes here ...";
                break;
        }

        WidgetModel.createWidget(pageId,widget)
            .then(function (widget) {
                PageModel.addWidgetToPage(widget._page,widget)
                    .then(function (result) {
                        res.json(widget);
                    },function (err) {
                        //delete widget;
                        res.sendStatus(500).send(err);
                    });
                //res.json(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*widgets.push(widget);
        console.log(widgets);
        res.json(widget);*/
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
if(myFile==undefined){
    res.redirect("/assignment/assign2/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
}
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        /*
        for (var w in widgets){
            console.log("uploadImage" + widgetId +" : " +  widgets[w]._id );
            if (widgets[w]._id === widgetId){
                console.log("match uploadImage" + widgetId +" : " +  widgets[w]._id );
                widgets[w].width = width;
                widgets[w].url = req.protocol + '://' + req.get('host') + '/uploads/' + myFile.filename;
                pageId = widgets[w].pageId;
            }

        }
        */
        WidgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = req.protocol + '://' + req.get('host') + '/uploads/' + myFile.filename;
                widget.width = width;
                WidgetModel.updateWidget(widgetId,widget)
                    .then(function (widget) {
                        //res.json(widget);
                    }, function (err) {
                        //res.sendStatus(500).send(err);
                    });
                //res.json(widget);
            }, function (err) {
                //res.sendStatus(500).send(err);
            });



        res.redirect("/assignment/assign2/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");



    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pid;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);

        WidgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function (response) {

                res.sendStatus(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }

};