const {Schema, model} = require ('mongoose');


const StaffSchema = Schema({

      name: {
              type: String,
              default: ''
            },

      lastName: {
                type: String,
                default: ''
              },

      password: {
                type: String,
                required: true
      },

      email: {
              type: String,
              unique: true,
              required: true
             },        

      address:{
                type: String,
                default: ''
             },

      phone:{
              type: String,
              default: ''
            },

      status: {
              type: Boolean,
              default: true
             },
      role: {
            type: String,
            enum: ['staff', 'admin', 'superRole'],
            default: 'staff' 
      }       
  
    }, { timestamps:true}
);

StaffSchema.methods.toJSON = function(){
    const {__v, password,  user_login, ...user} = this.toObject();

    return user; 
}


module.exports= model('Staff', StaffSchema);