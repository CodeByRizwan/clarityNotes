const book = require("../models/book")

async function handleHomeRedirect(req,res){
    const username = req.query.username
    const books = await book.find({userId : req.user._id})
    return res.render('home',{
        books : books,
        username : username
    })
}

async function handleBookPost(req, res) {
    const { name, author } = req.body;
    const username = req.user.name;
    try {
        const bookData = { 
            name, 
            userId: req.user._id 
        };
        if (author) {
            bookData.author = author; 
        }
        const createdBook = await book.create(bookData);
        if (!createdBook) {
            return res.send("Something went wrong while creating the book");
        }
        return res.redirect(`/home/books?username=${encodeURIComponent(username)}`);
    } catch (error) {
        res.status(500).send({ message: "Error occurred", error: error.message });
    }
}


module.exports = {handleHomeRedirect,handleBookPost}