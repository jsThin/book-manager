let express = require('express');
let router = express.Router();
let server = require('./server.js');


router.get('/',server.showIndex);
router.get('/toAddBook',server.toAddBook);
router.post('/addBook',server.addBook);
router.get('/toEditBook',server.toEditBook);
router.post('/editBook',server.editBook);
router.get('/delBook',server.delBook);

module.exports = router;