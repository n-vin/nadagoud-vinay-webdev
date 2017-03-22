module.exports = function (app) {

    var UserModel = require("./user/user.model.server.js")();
    var WebsiteModel = require("./website/website.model.server.js")();
    var PageModel = require("./page/page.model.server.js")();
    var WidgetModel = require("./widget/widget.model.server.js")();
    var model= {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel
    };

    UserModel.setModel(model);
    WebsiteModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);
    return model;
}