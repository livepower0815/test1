var express = require('express');
var router = express.Router();
// get firebase data
var firebaseDb = require('../connections/firebas_admin_connect');

/* GET todolist page. */
router.get('/', function(req, res, next) {
    firebaseDb.ref('todos').once('value',(snapshot)=>{
        res.render('toDoList',{
            'todos':snapshot.val()
        });
    })
});

// 新增資料post
router.post('/addList',(req,res)=>{
    var content = req.body.content;
    var contentRef = firebaseDb.ref('todos').push();
    contentRef.set({'content':content})
    .then(()=>{
        firebaseDb.ref('todos').once('value',(snapshot)=>{
            res.send({
                "success":true,
                "result":snapshot.val(),
                "message":"資料讀取成功"
            });
        })
    });
});

//刪除資料post
router.post('/removeList',(req,res)=>{
    var _id = req.body.id;
    firebaseDb.ref('todos').child(_id).remove()
    .then(()=>{
        firebaseDb.ref('todos').once('value',(snapshot)=>{
            res.send({
                "success":true,
                "result":snapshot.val(),
                "message":"資料刪除成功"
            })
        })
    })
});


module.exports = router;
