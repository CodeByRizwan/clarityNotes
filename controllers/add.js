async function getAddBookForm(req,res){
    return res.render("forms",{
        whatForm : "book"
    })
}

async function getAddChapterForm(req,res){
    const {bookId} = req.params
    return res.render("forms",{
        whatForm : "chapter",
        bookId : bookId
    })
}

async function getAddFieldForm(req,res){
    const { chapterId } = req.params
    return res.render("forms",{
        whatForm : "field",
        chapterId : chapterId
    })
}

module.exports = {getAddBookForm , getAddChapterForm , getAddFieldForm}