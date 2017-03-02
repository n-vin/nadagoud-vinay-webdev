(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController",registerController);

    function registerController(userService,$location) {
        var vm = this;
        //event Handlers
        vm.createUser = createUser;

        /*
        function init() {

        }
        init();

        /*
        function createUser(newUser) {
            var user = userService.createUser(newUser);
            if(user != null){
                $location.url("/user/"+user._id);
            }
            else{
                vm.error = "Username already taken";
            }
        }
        */
        function createUser(user) {
            //var myuser = user;
            userService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "sorry that username is taken"
                })
                .error(function(){
                    userService
                        .createUser(user)
                        .success(function(user){
                            console.log(user);
                            $location.url("/user/"+user._id);
                        })
                        .error(function () {
                            vm.error = 'sorry could not register';
                        });
                });
        }
    }

})();