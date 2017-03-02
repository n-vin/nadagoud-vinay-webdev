(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);
    function configuration($routeProvider,$httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/login",{
                templateUrl:"views/user/templates/login.view.client.html",
                controller:  "loginController",
                controllerAs: "loginController"
            })
            .when("/user/:uid",{
                templateUrl:"views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "profileController"
            })
            .when("/register",{
                templateUrl:"views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "registerController"
            })
            .when("/user/:uid/website",{
                templateUrl:"views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "websiteListController"
            })
            .when("/user/:uid/website/new",{
                templateUrl:"views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "websiteNewController"
            })
            .when("/user/:uid/website/:wid",{
                templateUrl:"views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "websiteEditController"
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl:"views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "pageListController"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl:"views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "pageNewController"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl:"views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "pageEditController"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "WidgetChooserController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            });

    }
})();