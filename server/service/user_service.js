const db = require('../dao/db_util.js');
var jwt = require('jsonwebtoken');
var dbm = new db();
//구조체 변수 선언
var userService = {};
userService.selectUser = selectUser;
userService.selectUserHis = selectUserHis;
userService.loginUser = loginUser;
userService.insertUser = insertUser;

function selectUser(po) {
    return dbm.runSql("SELECT_USER", po);
}

function selectUserHis(po) {
    return dbm.runSql("SELECT_USER_HIS", po);
}

function loginUser(po) {
    return this.selectUser({"userId": po.userId})
    .then((result) => {
        if(result.list.length == 0) {
            return dbm.promiseException({"code": 100,
            "errno": 01,
            "sqlMessage": '유저아이디 : \''+ po.userId +
            '\'는 없는 아이디 입니다.'});
        }
        var userPwd = result.list[0].userPwd;
        if(po.userPwd != userPwd) {
            return dbm.promiseException({"code": 100,
            "errno": 01,
            "sqlMessage": '유저아이디 : \''+ po.userId +
            '\'의 비밀번호를 확인해주세요.'});
        }
        result.list[0].token = jwt.sign({sub: po.userId}, "login");
        return result;
    })
}

function insertUser() {

}
//구조체로 선언한 변수 넘기기
module.exports = userService;