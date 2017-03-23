module.exports = function (app,UserModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@vmail.com"     },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: "bob@vmail.com"       },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: "charly@vmail.com"    },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jannunzi@vmail.com"  }
    ];

    /*
    function deleteUser(req, res) {
        console.log("user service delete called");
        var userId = req.params.userId;
        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }*/

    function deleteUser(req, res) {
        var userId = req.params.userId;
        UserModel.
        deleteUser(userId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;

        /*
        var id = parseInt(users[users.length -1]._id);
        id += 1;
        newUser._id = id.toString();//(new Date()).getTime() + "";
        users.push(newUser);
        console.log(users);
        res.json(newUser);
        */
        UserModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        UserModel
            .updateUser(userId,newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        /*
        console.log(userId);
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                console.log('found user');
                console.log(user);
                console.log('new user');
                var newUser = req.body;
                console.log(newUser);
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
        */
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];


        UserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

        /*
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                res.send(user);
                return;
            }
        }
        res.sendStatus(404);//.send({});
        */

    }

    function findUser(req, res) {
        console.log("user service find User called");
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];


        UserModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user){
                    res.json(user);
                }
                else{
                    res.sendStatus(400).send("User not found for username: " + username);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });


        /*
        var user = users.find(function(u){
            return u.username == username;
        });
        if(user) {
            console.log(user);
            res.send(user);
        } else {
            console.log("user not found");
            res.sendStatus(404);//.send('User not found for username: ' + username);
        }*/
    }

    function findUserByCredentials(req, res){
        console.log("user service called");
        var username = req.query['username'];
        var password = req.query['password'];


        UserModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });


        /*
        var user = users.find(function(u){
            return u.username == username && u.password == password;
        });
        if(user) {
            res.send(user);
        } else {
            res.send('');
        }
        */
    }
};