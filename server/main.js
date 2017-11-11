var express = require('express');
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var path = require("path");

//DB 연결
var dbconfig = require("./conf/dbconfig.js");
const mysql = require('mysql');
var connection = mysql.createConnection(dbconfig);

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../dist'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

//ULR 호출시 항상 실행
app.use(function (req, res, next) {
    //DB 작업시
    /* 다른 방법으로 하기때문에 주석처리     
    console.log(req.path);
    var url = req.path;
    if (url === "/api/users") {
        connection.query('select userNo, userName, userId, userPwd from user_info',
            function(err, rows){
                if(err) throw err;
                console.log("The solution is: ", rows);
                res.json(rows);
            });
    } 
    else {
        //app.module.ts 파일의 라우팅을 따라간다.
        // redirect all html requests to `index.html`
        res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
    } 
    */
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.get('/api/users', (req, res, next) => {
    console.log(req.query.user);
})

app.listen(app.get('port'), function() {
    console.log('Angular2 fullstack listening on port '+app.get('port'));
});