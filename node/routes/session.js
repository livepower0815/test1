var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('session',{
    myName: req.session.myName,
    email: req.session.email
  });
});
router.post('/',(req,res)=>{
  req.session.myName = req.body.myName;
  req.session.email = req.body.email;
  res.redirect('/session');
});
module.exports = router;
