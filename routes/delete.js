const { Router } = require("express")
const router = Router()

const { handleBookDelete , handleChapterDelete } = require("../controllers/delete")

router.get("/book/:bookId",handleBookDelete)
router.get("/:bookId/chapter/:chapterId",handleChapterDelete)

module.exports = router 