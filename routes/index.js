const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

const MailList = require('../models/MailList');
const blogController = require('../controllers/blogController')

const router = express.Router();

/* GET home page. */
router.get('/', blogController.get_blogs);

router.post('/createBlog', blogController.post_blog)

router.delete('/delete/:id', blogController.delete_blog);
router.post('/newsletter',[

  body('email','Email is required').trim().isLength({min: 1}).escape(),

  (req, res, next)=> {
    
    const errors = validationResult(req);

    let newSubscriber = new MailList({
      email: req.body.email
    })

    if(errors.isEmpty()) {
      newSubscriber.save((err) => {
        if(err) {
          res.status(500).json({msg: 'error adding new subscriber', err })
        }
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'code.koushlendra@gmail.com',
            pass: process.env.GMAIL_PASS
          }
        });
      
        let mailOptions = {
          from: 'code.koushlendra@gmail.com',
          to: req.body.email,
          subject: 'Nodemailer Testing',
          text: 'Thank you for subscribing'
        }
      
        transporter.sendMail(mailOptions, (err, info) => {
          console.log(err || info.response);
        })
        res.status(200).json({msg: 'added new subscriber check your mail'})
        
      })
    } else {
      res.status(500).json({msg: 'error validating input', err: errors.array()})
    }
  }
] );

module.exports = router;
