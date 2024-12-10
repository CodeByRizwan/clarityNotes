const book = require("../models/book");
const chapter = require("../models/chapter")

async function handleChaptersDisplay(req,res){
    const bookID = req.params.bookID
    const chapters = await chapter.find({
        bookId : bookID
    })
    const foundBook = await book.findById(bookID)
    
    return res.render('chapters',{
        chapters : chapters,
        book : foundBook,
        username : req.user.name
    })    
}

async function handleOneChapterDisplay(req, res) {
    const chapterId = req.params.chapID;

    try {
        const foundChapter = await chapter.findById(chapterId);
        if (!foundChapter) {
            return res.status(404).send("Chapter does not exist");
        }
        const filteredCustomFields = new Map(
            Array.from(foundChapter.fields).filter(([key , value]) => !key.startsWith("__"))
        )
        
        const chapterCorrected = {
            _id : foundChapter._id,
            bookId : foundChapter.bookId,
            name : foundChapter.name,
            number : foundChapter.number,
            fields : filteredCustomFields
        }
      
        return res.render('aChapter', { chapter: chapterCorrected });
    } catch (error) {
        console.log("Error finding chapter:", error);
        return res.status(400).send("Error retrieving chapter");
    }
}


async function handleChapterCreation(req,res){
    const { name , number} = req.body
    const bookId = req.params.bookId
    console.log(bookId);
    

    try{
        const createdChapter = await chapter.create({
            name : name,
            number : number,
            bookId : bookId
    })
    
    }catch(error){
        console.log("something went wrong while creating the chapter",error);
        return res.status(500).send("We are sorry! something went wrong while creating the chapter")
    }
    return res.redirect(`/book/${bookId}/chapters`)
}

module.exports = {handleChaptersDisplay , handleOneChapterDisplay , handleChapterCreation}