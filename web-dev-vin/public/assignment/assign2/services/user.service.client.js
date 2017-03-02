(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser
        };
        return api;


        function createUser(user) {
            console.log("user client service register called");
            return $http.post("/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function updateUser(userId, newUser) {
            console.log("updateUser called client ");
            return $http.put("/api/user/"+userId, newUser);

        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            console.log("user client service called");
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(userId) {
            console.log("user client service delete called" + userId);
            return $http.delete("/api/user/"+userId);
        }
    }
})();