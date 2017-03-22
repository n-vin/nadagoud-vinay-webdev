module.exports = function (app) {
    //var actorModel = require('./models/actor.model.server')();
    var Model = require('./model/models.server')();
    //var UserModel = require('./model/user/user.model.server.js')();
    require('./services/user.service.server')(app,Model.UserModel);
    //var WebsiteModel = require('./model/website/website.model.server.js')();
    require('./services/website.service.server')(app,Model.WebsiteModel,Model.UserModel);
    //var PageModel = require('./model/page/page.model.server.js')();
    require('./services/page.service.server')(app,Model.PageModel,Model.WebsiteModel,Model.WidgetModel);
    require('./services/widget.service.server')(app,Model.WidgetModel,Model.PageModel);
    // TODO: create the services for the other entities: website, page, widget
};