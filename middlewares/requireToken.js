
const jwt = require ('jsonwebtoken');
const User =  require('../models/user');
const Staff =  require('../models/staff');


const requireToken = async ( req, res, next ) => {

    try {

        let token = req.headers?.authorization;
        // console.log("requireToken token Bearer: ", token);

        if(!token){
            return res.status(401).json({
                msg:'No existe el token en el header. Vuelva a entrar con sus credenciales'
            })
        }

        token = token.split(" ")[1];

        // console.log('desde require token: ', token);
      

        const  { _id }  = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(_id);
        let userAuth = null;
        let staffAuth = null;

        userAuth = await User.findById( _id ) ;
        staffAuth = await Staff.findById( _id ) ;

        if(userAuth == null && staffAuth == null ){
            return res.status(404).json({
                msg:'Token no valido - Usuario no existe en DBdddd'
            })
        }

        if(userAuth){
            if(userAuth.status == false){
                        return res.status(500).json({
                            msg:'Usuario con state en false'
                            })
                        }
            req.userAuth= userAuth;
        }

        if( staffAuth ) {
          
            if(staffAuth.status == false){
                return res.status(500).json({
                    msg:'Usuario con state en false'
                    })
                }
            req.userAuth= staffAuth;
        }
        
  
        next();
        
    } catch (error) {
        console.log('desde requireToken: ', error);
        return res.status(401).json({
            success: false,
            msg : "Token expirado",
        })

    }

}



module.exports={ requireToken }