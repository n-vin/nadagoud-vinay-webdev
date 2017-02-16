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
            var loginUser = userService.findUserByCredentials(user.username,user.password );
            if(loginUser != null){
                $location.url("/user/"+loginUser._id);
            }
            else{
                vm.error = "User not found";
            }
        }



        
    }
})();