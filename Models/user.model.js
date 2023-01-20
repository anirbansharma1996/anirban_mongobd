const {Schema,model} = require("mongoose")

const UserSchema= new Schema({
  name:String,
  email:String,
  password:String,
})
 const Usermodel = model("mock_1",UserSchema)
 module.exports=Usermodel


//  const schema = {
//   users: {
//     fields: {
//       userID: { type: 'integer', primary_key: true },
//       userName: { type: 'string', not_null: true },
//       email: { type: 'string', not_null: true }
//     }
//   },
//   posts: {
//     fields: {
//       postID: { type: 'integer', primary_key: true },
//       userID: { type: 'integer', not_null: true, foreign_key: { references: 'users.userID' } },
//       title: { type: 'string', not_null: true },
//       content: { type: 'string', not_null: true },
//       date_created: { type: 'date', not_null: true }
//     }
//   }
// }
