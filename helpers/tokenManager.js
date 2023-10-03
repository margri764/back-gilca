const jwt = require ('jsonwebtoken');

const generateToken =  async ( _id ) =>{ 

        const payload =  { _id } ; 
        const expiresIn = 60 * 60 * 60;
        // const expiresIn = 10;

        try {
            const token = jwt.sign(payload , process.env.SECRETORPRIVATEKEY,{ expiresIn })

            return { token, expiresIn };
        } catch (error) {
            console.log("error desde generateToken", error);
            
        }
    }


module.exports= {
                  generateToken,
            }