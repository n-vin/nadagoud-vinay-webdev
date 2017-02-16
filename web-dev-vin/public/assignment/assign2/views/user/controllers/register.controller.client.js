(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController",registerController);

    function registerController(userService,$location) {
        var vm = this;
        //event Handlers
        vm.createUser = createUser;

        function init() {

        }
        init();

        function createUser(newUser) {
            var user = userService.createUser(newUser);
            if(user != null){
                $location.url("/user/"+user._id);
            }
            else{
                vm.error = "Username already taken";
            }
        }
    }

})();