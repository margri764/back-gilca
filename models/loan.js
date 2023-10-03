const {Schema, model} = require ('mongoose');


const LoanSchema = Schema({

    user:{
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
     },

     closedDate: {
        type: Date, 
        default: null, 
      },

      amount: {
        type: Number,
        default: 0
      },

      description: {
              type: String,
              default: ''
      },

      status: {
        type: String,
        enum: ['pendiente', 'pagada', 'vencida'],
        default: 'pendiente' 
      },
  
    }, { timestamps:true}
);

LoanSchema.methods.toJSON = function(){
    const {__v, password,  user_login, ...debt} = this.toObject();

    return debt; 
}


module.exports= model('Loan', LoanSchema);