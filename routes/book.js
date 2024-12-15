const { Router } = require("express")
const router = Router()
const {handleHomeRedirect, handleBookPost} = require('../controllers/book')

router.get("/books",handleHomeRedirect)
router.post("/add-book",handleBookPost)


module.exports = router