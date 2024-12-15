const book = require("../models/book")
const chapter = require("../models/chapter")

async function handleBookDelete(req,res){
    const { bookId } = req.params
    const username = req.user.name    
    try {
        const foundBook = await book.findByIdAndDelete(bookId)
        if(!foundBook){
            res.status(400).json({message : "book not found with the given id"})
        }
        await chapter.deleteMany({bookId})
        res.redirect(`/home/books?username=${encodeURIComponent(username)}`)
    } catch (error) {
        console.log("something went wrong while finding the book" , error);
        res.redirect(`/home/books?username=${encodeURIComponent(username)}`)
    }
}

async function handleChapterDelete(req,res){
    const { chapterId , bookId } = req.params
    
    try {
        const foundChapter = await chapter.findByIdAndDelete(chapterId)
        if(!foundChapter){
            res.status(400).json({message : "chapter not found with the given id"})
        }
        res.redirect(`/book/${bookId}/chapters`)
    } catch (error) {
        console.log("something went wrong while deleting a chapter" , error)
        res.redirect(`/book/${bookId}/chapters`)
    }
}

module.exports = { handleBookDelete , handleChapterDelete }