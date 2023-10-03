
const User = require('../models/user');

const getUserSearch = async (req, res) => {

    const querySearch = req.query.userSearch;
  
    try {
      const regex = new RegExp(querySearch.split(/\s+/).join('.*'), 'i'); 
      const users = await User.find({
        $or: [
          { name: { $regex: regex } },
          { lastName: { $regex: regex } }
        ]
      })
  
      res.status(200).json({
        success: true,
        users
         });

    } catch (error) {
      console.log('Error en getUserSearch:', error);
      return res.status(500).json({
        success: false,
        msg: 'Ups algo salió mal, hable con el administrador' });
    }
};

  
module.exports = { getUserSearch }