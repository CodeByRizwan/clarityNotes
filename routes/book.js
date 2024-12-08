const { Router } = require("express")

const router = Router()

const {handleHomeRedirect, handleBookPost} = require('../controllers/book')
const checkForAuthentication = require("../middlewares/auth")

router.get("/books",handleHomeRedirect)
router.post("/add-book",handleBookPost)


module.exports = router