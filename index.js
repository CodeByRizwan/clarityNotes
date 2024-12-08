require('dotenv').config();

const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const userRouter = require('./routes/user') 
const bookRouter = require("./routes/book")
const chapterRouter = require("./routes/chapter")
const fieldsRouter = require("./routes/fields")
const connectMongoDb = require("./connection");
const checkForAuthentication = require("./middlewares/auth");

const app = express()

connectMongoDb(process.env.MONGO_DB_URI)

app.use(helmet())
app.set('trust proxy', 1)


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.redirect("/user/signin")
})
app.use("/user",userRouter)
app.use("/home",checkForAuthentication("token"),bookRouter)
app.use("/book",checkForAuthentication("token"),chapterRouter)
app.use("/chapter",checkForAuthentication("token"),fieldsRouter)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!'); 
  });

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("server started successfully");
})