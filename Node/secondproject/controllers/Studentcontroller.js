var db = require("./../connection_file").con;
var validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Studentcontroller {
    // Controller methods
    static add_student_details(req, res) {
        // Code to fetch all users
        const {
            name,
            email,
            password
        } = req.query;

        if (!email || !validator.isEmail(email)) {
            return res.status(400).send("Invalid email");
        }
        if (!password || password.length < 8) {
            return res.status(400).send("Invalid password");
        }

        var sql = "INSERT into users value(?,?,?,?,?)";
        db.query(sql, ["1", name, email, password, ''], (err, results) => {
            if (results) {
                res.render("Add-student", {
                    msg: JSON.stringify(results)
                })
            }
            if (err) {
                res.send(err);
            }
        })
    }
    /** This function is used for Get the details. */
    static get_student_details(req, res) {
        // Code to fetch user by ID
        const {
            name,
            email
        } = req.query;

        var sql = "Select * from users where name=? or email=?";
        db.query(sql, [name, email], (err, results) => {
            if (results) {
                res.render("Get-student", {
                    msg: JSON.stringify(results)
                })
            }
            if (err) {
                res.send(err);
            }
        })
    }
    /* This fucntion is used for Get the details of user by id. */
    static get_student_details_by_id(req, res) {
        // Code to fetch user by ID
        const {
            name,
            email
        } = req.query;
        const userId = req.params.id;
        console.log('get_student_details_by_id called')

        var sql = "Select * from users where id=?";
        db.query(sql, [userId], (err, results) => {
            if (results) {
                res.status(201).send({
                    response_message: {
                        status_code: "201   ",
                        message: JSON.stringify(results),
                    }
                });
            }
            if (err) {
                res.send(err);
            }
        })
    }

    //This function is used for delete student details.
    static del_student_details(req, res) {
        const {
            name,
            email
        } = req.query;

        var sql = "DELETE FROM users where name=? or email=?";
        db.query(sql, [name, email], (err, results) => {
            if (results) {
                res.render("Del-student", {
                    msg: JSON.stringify(results)
                })
            }
            if (err) {
                res.send(err);
            }
        })
    }

    /* This fucntion is used for update the details of user by id. */
    static update_student_details(req, res) {
        var sql = "UPDATE users SET name ='user1', email='user2@gmail.com', password = '22222' WHERE email=email";
        db.query(sql, (err, results) => {
            if (results) {
                res.render("Update-student", {
                    msg: JSON.stringify(results)
                })
            }
            if (err) {
                res.send(err);
            }
        })
    }

    /* This fucntion is used for Get the details of user by id using api. */
    static api_get_details(req, res) {
        var sql = "Select * from users";
        db.query(sql, (err, results) => {
            if (results) {
                res.json(results)
            }
            if (err) {
                res.send(err);
            }
        })
    }

    //This route is used for registration.
    static async api_register_details(req, res) {

        const {
            name,
            email,
            password
        } = req.body;

        if (!email || !validator.isEmail(email)) {
            return res.status(400).send({
                response_message: {
                    status_code: "400",
                    message: "Invalid email.",
                }
            });
        }
        if (!password || password.length < 4) {
            return res.status(400).send({
                response_message: {
                    status_code: "400",
                    message: "Invalid password.",
                }
            });
        }
        const isUnique = await Studentcontroller.isEmailUnique(email);

        if (isUnique) {
            // Perform the insertion
            const hashedPassword = await bcrypt.hash(password, 10);

            // current timestamp.
            const currentTimestamp = new Date().getTime();

            const sql = 'INSERT INTO users (name,email,password,created_at) VALUES (?, ?, ?, ?)';
            const values = [name, email, hashedPassword, currentTimestamp];
            db.query(sql, values, (err, results) => {
                if (results) {
                    res.setHeader('Content-Type', 'text/html');
                    res.status(200).json({
                        response_message: {
                            status_code: "200",
                            message: "Registration successfully.",
                        }
                    });
                }
                if (err) {
                    res.send("This is error: " + err);
                }
            })
        } else {

            // Handle the case where email is not unique
            // status code for already exist data. 409
            res.status(409).json({
                response_message: {
                    status_code: "409",
                    message: "Email already exists.",
                }
            });
        }

    }
    // Function to check if email is unique
    static isEmailUnique(email) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT COUNT(*) AS count FROM users WHERE email = ?',
                [email],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        const count = results[0].count;
                        const isUnique = count === 0;
                        resolve(isUnique);
                    }
                }
            );
        });
    }
    //This route is used for Login.
    static async api_login(req, res) {
        const {
            username,
            password
        } = req.body;

        var sql = "Select * from users where name=?";
        db.query(sql, [username], async (err, results) => {
            if (err) {
                res.send("This is error: " + err);
            }
            if (results.length == 0) {
                res.status(404).json({
                    response_message: {
                        status_code: "404",
                        message: 'User not found.'
                    }
                });
            }
            console.log('user data found')
            const user = results[0];

            // password match using bcrypt.compare() fucnction. 
            // return False if password is not match.
            console.log(password)
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {

                res.status(401).json({
                    response_message: {
                        status_code: "401",
                        message: 'Invalid username or password'
                    }
                });
            } else {
                const token = jwt.sign({
                    username: user.username
                }, 'your_secret_key');

                res.status(200).json({
                    response_message: {
                        status_code: "200",
                        message: user.id,
                        token: token
                    }
                });
            }
        })
    }
}
module.exports = Studentcontroller;