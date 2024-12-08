const { Router } = require("express")
const router = Router()

const {handleSignup, handleSignin, handleLogout} = require('../controllers/user.js')

router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.post('/signup',handleSignup)
router.post('/signin',handleSignin)
router.get('/logout',handleLogout)

module.exports = router