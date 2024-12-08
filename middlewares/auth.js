const { crackTheJWTToken } = require("../services/auth")

function checkForAuthentication(cookieName){
    return async (req,res,next)=>{      
        const cookieValue = req.cookies[cookieName]
     
        if(!cookieValue){
           return res.redirect("/user/signin")
        }

        try {
            const userPayLoad = await crackTheJWTToken(cookieValue)
            console.log(userPayLoad);
            
            req.user = userPayLoad
            next()
        } catch (error) {
            return next()
        }
    }
}

module.exports = checkForAuthentication