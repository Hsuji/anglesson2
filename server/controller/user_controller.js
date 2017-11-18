//server.js(express) -> View(angular) -> userController(Controller)
//-> user_service.js(service) -> db.util.js(Model) 
var express = require("express");
var router = express.Router();
var us = require("../service/user_service");

//URL 매핑
//여기 /일 경우 /api/users가 앞에 있음
router.get('/', selectUser);
router.get('/his/:userNo', selectUserHis);
router.post('/', insertUser);
router.get('/login', login);

module.exports = router;

function login(req, res, next) {
    var po = {};
    if(req.query.user) {
        po = JSON.parse(req.query.user);
    }
    us.loginUser(po)
    .then((result) => {
        console.log(result);
        res.json(result);
    }).catch(result => {
        console.log(result);
        res.json(result);
    });
}

function insertUser(req, res, next) {

}

function selectUser(req, res, next) {
    var po = {};
    if(req.query.user) {
        po = JSON.parse(req.query.user);
    }
    console.log(po);
    us.selectUser(po)
    .then((result) => {
        res.json(result);
    }).catch(result => {
        res.json(result);
    });
}

function selectUserHis(req, res, next) {
    var po = {"userNo":req.params.userNo};
    console.log(po);
    us.selectUserHis(po)
    .then((result) => {
        res.json(result);
    }).catch(result => {
        res.json(result);
    });
}
