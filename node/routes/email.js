var express = require('express');
var router = express.Router();
var mail = require('nodemailer');



/* GET email page. */
router.get('/', function(req, res, next) {
  res.render('email',{ 
    csrfToken: req.csrfToken() ,
    nameNull: req.flash('name_info'),
    emailNull: req.flash('email_info'),
    subjectNull: req.flash('subject_info')
  });
});

router.get('/review',(req,res)=>{
  res.render('review');
});

router.post('/post',(req,res)=>{
  if(req.body.name == ''){
    req.flash('name_info','姓名不可為空值');
    res.redirect('/email');
    return;
  }else if(req.body.email == ''){
    req.flash('email_info','信箱不可為空值');
    res.redirect('/email');
    return;
  }else if(req.body.subject == ''){
    req.flash('subject_info','標題不可為空值');
    res.redirect('/email');
    return;
  }
  
  var transporter = mail.createTransport({
    service : 'Gmail',
    auth:{
      user: process.env.gmail_user,
      pass: process.env.gmail_pass
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
