const {Schema, model} = require ('mongoose');


const UserSchema = Schema({

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

      clientNumber: {
                      type: String,
                      require: true
                    },

      activeLoan: {
                    type: Boolean,
                    default: true
                  },

      address:{
                type: String,
                default: ''
             },

      phone:{
              type: String,
              default: ''
            },

      state: {
              type: Boolean,
              default: true
             },








  
    }, { timestamps:true}
);

UserSchema.methods.toJSON = function(){
    const {__v, password,  user_login, ...user} = this.toObject();

    return user; 
}


module.exports= model('User', UserSchema);