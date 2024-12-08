const user = require('../models/user.js'); 


async function handleSignup(req, res) {
    
    const {username , password} = req.body;

    try {
        const createdUser = await user.create({
            username,
            password
        })

        if(!createdUser){
            return res.status(500).send({message : "We are sorry! something went wrong whle creating the user. Please try again later"})
        }
        
        return res.redirect(`/user/signin`);

    } catch (error) {
        return res.redirect('/user/signup')
    }
}

async function handleSignin(req,res){
    const {username , password} = req.body
    
    try{
        const token = await user.comparePasswordAndReturnToken(username, password)
        
        if(!token){
            throw new Error("token is missing")
        }

        return res.cookie("token",token,{ 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
        }).redirect(`/home/books?username=${encodeURIComponent(username)}`)
    }catch(error){
        return res.render("signin", { error: error.message });
    }
}

async function handleLogout(req,res){
    return res.clearCookie('token').redirect("/user/signin")
}


module.exports = { handleSignup , handleSignin , handleLogout};
