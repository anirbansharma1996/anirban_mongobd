const {Schema,model} = require("mongoose")

const UserSchema= new Schema({
  name:String,
  email:String,
  password:String,
})
 const Usermodel = model("mock_1",UserSchema)
 module.exports=Usermodel