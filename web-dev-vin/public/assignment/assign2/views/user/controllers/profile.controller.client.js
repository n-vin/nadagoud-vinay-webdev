(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController",profileController);

    function profileController($routeParams,userService,$location) {
        var vm = this;

        //event Handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var userId = $routeParams['uid'];

        function init() {
            var user = userService.findUserById(userId);
            vm.user = user;
        }
        init();

        function updateUser(newUser) {
            var user = userService.updateUser(userId,newUser);
            if(user != null){
                vm.message = "User Successfully Updated";
            }
            else{
                vm.error = "Unable to update User";
            }
            $location.url("/user/"+userId);
        }

        function deleteUser() {
            var result = userService.deleteUser(userId);
            if(result == true){
                $location.url("/login");
            }
        }
    }

})();