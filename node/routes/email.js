var express = require('express');
var router = express.Router();
var mail = require('nodemailer');


/* GET email page. */
router.get('/', function(req, res, next) {
  res.render('email');
});

router.get('/review',(req,res)=>{
  res.render('review');
});

router.post('/post',(req,res)=>{
  var transporter = mail.createTransport({
    service : 'Gmail',
    auth:{
      user:'livepower0815@gmail.com',
      pass:'123427374'
    }
  });
  var mailOptions = {
    from: '"陳宏宇"<livepower0815@gmail.com>',
    to: 'livepower0815@gmail.com',
    subject: req.body.name + 'send u a email',
    text: req.body.subject + req.body.content
  }
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      return console.log(error);
    }
    res.redirect('/email/review');
  })

  
});


module.exports = router;
