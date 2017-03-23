(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController",profileController);

    function profileController($routeParams,userService,$location) {
        var vm = this;
        var userId = $routeParams['uid'];

        //event Handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;


        vm.userId = userId;

        function init() {
            userService
                .findUserById(userId)
                .success(renderUser);
            /*var promise = userService.findUserById(userId);
            promise.success(function(user){
                console.log("profile controller called");
                vm.user = user;
            });
            */
            /*
            var user = userService.findUserById(userId);
            vm.user = user;
            */
        }
        init();

        function renderUser(user) {
            vm.user = user;
            console.log(user);
        }

        function updateUser(newUser) {
            console.log("update user called");
            /*
            var user = userService.updateUser(userId,newUser);
            if(user != null){
                vm.message = "User Successfully Updated";
            }
            else{
                vm.error = "Unable to update User";
            }
            $location.url("/user/"+userId);
            */
            userService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user != null) {
                        vm.message = "User Successfully Updated!"
                    } else {
                        vm.error = "Unable to update user";
                    }
                });

        }


        function deleteUser() {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                console.log("delete ok pressed");
                userService
                    .deleteUser(userId)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
            /*var result = userService.deleteUser(userId);
            if(result == true){
                $location.url("/login");
            }*/
        }

    }

})();