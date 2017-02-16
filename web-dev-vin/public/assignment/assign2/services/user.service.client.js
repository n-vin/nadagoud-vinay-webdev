(function () {
    angular
        .module("WebAppMaker")
        .factory("userService",userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@vmail.com"     },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@vmail.com"       },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@vmail.com"    },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@vmail.com"  }
        ];

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername" : findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "createUser": createUser
        };
        return api;

        function findUserByCredentials(username, password) {
            for(var u in users){
                if(users[u].username == username &&
                    users[u].password == password){
                    return users[u] ;
                }
            }
            return null;
        }
        function findUserById(userId) {
            for(var u in users){
                if(users[u]._id == userId){
                    return users[u] ;
                }
            }
            return null;
        }
        function findUserByUsername(username) {
            for(var u in users){
                if(users[u].username == username){
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId,newUser) {
            for(var u in users){
                if(users[u]._id == userId){
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users) {
                if (users[u]._id == userId) {
                    users.splice(u, 1);
                    return true;
                }
            }
            return false;
        }

        function createUser(newUser) {
            if(findUserByUsername(newUser.username)){
                return null;
            }
            else{
                var id = parseInt(users[users.length -1]._id);
                id += 1;
                var user = {
                    _id: id.toString(),
                    username: newUser.username,
                    password: newUser.password,
                    firstName: "my_first_name",
                    lastName: "my_last_name",
                    email: newUser.username+"@vmail.com"
                };
                users.push(user);
                return user;
            }
        }
    }

})();