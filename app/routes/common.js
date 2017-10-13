const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
const passport = require('passport')


router.get('/', (req, res, next) => {
  res.render('index.ejs')
})

router.get('/login', (req, res, next) => {
  if(req.flash('loginMessage')){
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    })
  }
})

router.get('/signup', (req, res, next) => {
  if (req.flash('signupMessage')) {
    res.render('signup.ejs'), {
      message: req.flash('signupMessage')
    }
  }
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.get('/profile', isLoggedIn, (req, res, next) => res.render('profile.ejs', {
  user: req.user
}))

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router


function isLoggedIn(req, res, next){
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next()

  res.redirect('/')
}
