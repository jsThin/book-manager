let express = require('express');
let app = express();
let router = require('./router.js');
let template = require('art-template');
let path = require('path');
let bodyParser = require('body-parser');

//启动静态资源呢
app.use(express.static('public'));
//设置模板路径
app.set('views',path.join(__dirname,'views'));
//设置模板引擎
app.set('view engine','art');
//让express兼容art-template
app.engine('art', require('express-art-template'));
//使用body-parser
app.use(bodyParser.urlencoded({extended: false}));
//加载路由
app.use(router);

app.listen(3000,function() {
    console.log('app is running....')
})