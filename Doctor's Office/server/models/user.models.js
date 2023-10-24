const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
  }, {timestamps: true});
// Get => declare an empty attribute = _confirmPassword
//Set = > assign the value to the attribute
    UserSchema.virtual('confirmPassword').get(()=> 
    this._confirmPassword
    ).set(value=>{
        console.log("--------------",value);
        this._confirmPassword=value
    });
    UserSchema.pre('validate', function(next){
        console.log("Inside Password Validation");
        console.log(this.password, "----------", this.confirmPassword)
        if(this.password!==this.confirmPassword)
        {
            this.invalidate('confirmPassword', "Password must match");
        }
        next();
    },  {timestamps: true})

    UserSchema.pre('save', async function(next)
    {
        console.log("In Hashed Password Function");
        try{
            const hashedPassword = await bcrypt.hash(this.password,10)
            this.password = hashedPassword
            console.log("Hashed Password =", hashedPassword);
        }
        catch (error){
            console.log(error);
        }
        next();
    })
const User = mongoose.model('User', UserSchema);
module.exports = User;