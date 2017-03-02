(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController",loginController);
    function loginController(userService,$location) {
        var vm = this;

        //event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            console.log("login controller called");
            var promise = userService
                .findUserByCredentials(user.username, user.password);
            promise.success(function(user){
                console.log(user);
                if(user) {
                    $location.url("/user/"+user._id);
                } else {
                    vm.error = "User not found";
                }
            });
        }




        
    }
})();