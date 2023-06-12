var db = require("./../connection_file");
const Studentcontroller = require('./../controllers/Studentcontroller');

var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const myMiddleware = require('./../middleware/myMiddleware');

/* GET home page. */
router.get("/", (req, res) => {
    res.render('index')
});

/* Add student details page. */
router.get("/add-student", (req, res) => {
    res.render("Add-student");
});

/* Show student details page. */
router.get("/get-student", (req, res) => {
    res.render("GET-student");
});

/* Delete student details page. */
router.get("/delete-student", (req, res) => {
    res.render("Del-student");
});

/* Update student details page. */
router.get("/update-student", (req, res) => {
    res.render("Update-student");
});


router.get('/add-student-details', Studentcontroller.add_student_details); /*Add student details Request*/
router.get('/get-student-details', Studentcontroller.get_student_details); //Show student details Request
router.get('/del-student-details', Studentcontroller.del_student_details); //Delete student details Request
router.get('/update-student-details', Studentcontroller.update_student_details); //Update student details Request


/*******************  APIs Routes *******************/
router.get('/api/get-details/:id',myMiddleware, Studentcontroller.get_student_details_by_id); //Show student details Request
router.post('/api/get-details',myMiddleware, Studentcontroller.api_get_details); //Update student details Request
router.post('/api/register', Studentcontroller.api_register_details); //Update student details Request
router.post('/api/login', Studentcontroller.api_login); //Update student details Request

module.exports = router;