const Staff = require('../models/staff')
const User = require('../models/user')

const checkUserEmail = async (email) => {

    let emailToCheck = email.split("@");
    const isStaff = emailToCheck[1].includes(process.env.EMAILSTAFF);

    const query = isStaff ? Staff.findOne({ email }) : User.findOne({ email });
    const user = await query.lean();

    if (!user) {
      throw new Error(`El email ${email} no existe`);
    }
    
    return user;
}



module.exports=  {checkUserEmail}