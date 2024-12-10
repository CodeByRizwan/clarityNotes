const { Router } = require("express")
const { getAddBookForm, getAddChapterForm, getAddFieldForm } = require("../controllers/add")
const { handleChapterCreation } = require("../controllers/chapter")
const { handleNewFieldCreation } = require("../controllers/fields")
const router = Router()

router.get("/book",getAddBookForm)
router.get("/:bookId/chapter",getAddChapterForm)
router.post("/:bookId/chapter",handleChapterCreation)
router.get("/:chapterId/field",getAddFieldForm)
router.post("/:chapterId/field",handleNewFieldCreation)


module.exports = router