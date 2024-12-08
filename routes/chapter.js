const { Router } = require('express')

const router = Router()

const {handleChaptersDisplay , handleOneChapterDisplay , handleChapterCreation } = require("../controllers/chapter")

router.get('/:bookID/chapters',handleChaptersDisplay)
router.get('/chapter/:chapID',handleOneChapterDisplay)
router.post('/:bookID/add-chapter',handleChapterCreation)


module.exports = router