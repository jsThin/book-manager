let data = require('./data.json');
let path = require('path');
let fs = require('fs');

//封装文件写入方法
function write(res) {
    fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data),(err) => {
        if(err) {
            res.send(err);
        } 
        //重新跳转到首页
        res.redirect('/')
    });
}
//获取最大的id
function maxBookId() {
    let arr = [];
    //将所有id放在同一个数组中
    data.forEach(item => {
        arr.push(item.id);
    });
    //比较返回最大的id
    return Math.max.apply(null,arr);
}
//加载首页   
exports.showIndex = (req,res) => {
    res.render('index.art',{list:data});
}
//跳转到添加图书页面
exports.toAddBook = (req,res) => {
    res.render('toAddBook.art',{});
}
//添加图书，并写入文件
exports.addBook = (req,res) => {
    let book = req.body;
    let newBook = {};
    for(let key in book) {
        newBook[key] = book[key];
    }
    //添加id
    newBook.id = maxBookId() + 1;
    //将新书加入data中
    data.push(newBook);
    //写入文件
    write(res);
}
//跳转到编辑图书页面
exports.toEditBook = (req,res) => {
    let id = req.query.id;
    let info = {};
    data.forEach(item => {
        //注意id的类型，前台传过来的是string
        if(item.id == id) {
            for(let key in item) {
                info[key] = item[key];
            }
        }
    })
    res.render('editBook.art',info);
}
//编辑图书并提交
exports.editBook = (req,res) => {
    let book = req.body;
    data.forEach(item => {
        if(item.id == book.id) {
            for(let key in book) {
                item[key] = book[key];
            }
        }
    });
    write(res);
}
//删除图书
exports.delBook = (req,res) => {
    let id = req.query.id;
    data.forEach((item,index) => {
        if(item.id == id) {
            data.splice(index,1);
        }
    })
    write(res);
}