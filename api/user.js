

exports.register = function (req, res) {
    console.log("req", req.body);
    var today = new Date();
    var users = {
        "name":req.body.name,
        "email": req.body.email,
        "password":req.body.password,
    }
    var mysql=require('mysql');
    var connection= mysql.createConnection({
        host: 'localhost',
        user:"test1",
        password:"4717",
        port:3306,
        database :"project"
    })
    connection.connect();
    console.log 
    var usertest= [users.name,users.email,users.password];
    connection.query('INSERT INTO users (name,email,password) values(?,?,?)' , usertest, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });    
}

exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var mysql=require('mysql');
    var connection= mysql.createConnection({
        host: 'localhost',
        user:"test1",
        password:"4717",
        port:3306,
        database :"project"
    })
    connection.connect();

    connection.query('SELECT * FROM users WHERE email = ?', [email],
    function( error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                if(results[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code":204,
                    "success": "Email does not exists"
                });
            }
        }    
    }) 
}
