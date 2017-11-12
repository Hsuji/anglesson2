var express = require('express');
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var path = require("path");

//DB 연결
var dbconfig = require("./conf/dbconfig.js");
const mysql = require('mysql');
var connection = mysql.createConnection(dbconfig);

const mysql2 = require('promise-mysql');
var connection2 = mysql2.createConnection;

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../dist'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

var generateWhere = function(paramObj) {
    var whereStr = '';
    Object.keys(paramObj).forEach((key) => {
        whereStr += ' and ' + key + ' =?';
    });
    return whereStr;
}

var generateWhereValue = function(paramObj) {
    var whereValue = [];
    Object.keys(paramObj).forEach((key) => {
        whereValue.push(paramObj[key]);
    });
    return whereValue;
}

var errorHandle = (err)=>{
    var result = {};
    result["error"] = {"code" : err.code,
    "no" : err.errno,
    "msg" : err.sqlMessage
    };
    return result;
}

var rowsHandle = (rows)=>{
    var result = {};
    result["list"] = rows;
    return result;
}

//select user List
app.get('/api/users', (req, res, next) => {
    var result = {};
    var paramObj = JSON.parse(req.query.user);
    console.log('params =>', paramObj);
    var sql = 'SELECT userNo, userName, userId, userPwd, complete from user_info where 1=1 ';
    sql += generateWhere(paramObj);
    console.log('sql =>', sql);
    var values = generateWhereValue(paramObj);
    console.log('values =>', values);
    //connection.query : 비동기 방식으로 작동
    connection.query(sql, values, (err, rows) => {
        if(err) throw err;
        console.log("rows =>", rows);
        result['list'] = rows;
        res.json(result);
        //쿼리 이후 next() 호출해주기 위해 위치 변경
        next();
    });
});

app.get('/api/users', (req, res, next) => {
    console.log(req.query.user);
});

//select user history
app.get('/api/userhis/:userNo', (req, res, next) => {
    var values = [req.params.userNo];
    var sql = "SELECT userNo, userData from user_his where userNo=?";
    connection2(dbconfig).then((conn) => {
        //커리 수행 후 결과값 리턴 -> rowsHandle로 보냄
        return conn.query(sql, values);
    })
    .then(rowsHandle)
    .catch(errorHandle)
    .then((result) => {
        console.log(result);
        res.json(result);
        // next();
    });
});

app.post('/api/users', (req, res, next) => {
    //insert user info
    var sql = "INSERT INTO user_info(";
    sql += "userId, userName, userPwd, complete)";
    sql += " values(?,?,?,?)";
    var pm = req.body;
    var values = [pm.userId, pm.userName, pm.userPwd, pm.complete];
    var result = {};
    connection2(dbconfig).then((conn) => {
        return conn.query(sql, values);
    })
    .then((result) => {
        console.log(result);
        //affectedRows: 실행된 row 수
        if(result.affectedRows == 1){
            result["msg"] = {"code": 200, "no": 20, "msg": "정상적으로 입력되었습니다."};
        }
        return result;
    })
    .catch(errorHandle)
    .then((result) => {
        /* => 함수를 사용했기 때문에 sql이 동일한 sql을 바라보게 되고 
           insert보다 select가 속도가 빠르기 때문에(비동기) insert시 sql이 select sql로 변경된다. 
           고로 콜백을 이용하여 insert가 종료된 후 select를 실행해야한다.
         */
        //select user list
        sql = 'SELECT userNo, userName, userId, userPwd, complete from user_info';
        connection2(dbconfig).then((conn) => {
            return conn.query(sql);
        })
        .then(rowsHandle)
        .catch(errorHandle)
        .then((result) => {
            console.log(result);
            res.json(result);
        });
    });
});


//ULR 호출시 항상 실행
app.use(function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});


app.listen(app.get('port'), function() {
    console.log('Angular2 fullstack listening on port '+app.get('port'));
});