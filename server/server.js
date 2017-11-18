//controller만들어서 controller 바라보게 설정
//epxress서버 생성, 포트 설정 작업, express서버 실행
var express = require('express');
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var path = require("path");
var app = express();
const us = require("./service/user_service");
const uc = require("./controller/user_controller");

//포트 설정
app.set('port', (process.env.PORT || 80));

app.use('/', express.static(__dirname + '/../dist'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
///api/users로 접근시 User 컨트롤러로 분기
app.use('/api/users', uc);

//ULR 호출시 항상 실행
app.use(function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

//포트 열기
app.listen(app.get("port"), function() {
    console.log('해당 포트로 서버 실행 => '+app.get("port"));
});