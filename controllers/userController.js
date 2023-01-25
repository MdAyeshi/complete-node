// const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// const { registerValidation, loginValidation } = require("../middleware/validation");
const JWT_KEY = process.env.JWT_KEY;

exports.signUp = async (req, res, next) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   User
   .findOne({where: {email: email}})
   .then(user => {
      console.log(user)
      if(user){
         res.send({'message':'user already present', 'user':user});
      }
      return bcrypt.hash(password, 12);
   })
   .then(hashedPassword => {
      const newUser = new User({name: name, email: email, password: hashedPassword})
      return newUser.save();
   })
   .then(result => {
      console.log(result);
      res.send({'message': 'user created successfully', 'result': result});
   })
   .catch(error => {
      console.log(error)
      res.send({'message': 'something went wrong creating user', 'result': error});
   })
   // const { error, value } = registerValidation(req.body);
   // if (error) return res.status(400).send(error.details[0].message);
 
   // const emailExist = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
   // if (emailExist) return res.status(400).send({ message: "Email already exists!" });
 
   // try {
   //   const newUser = await createUserObj(req);
   //   const savedUser = await User.create(newUser);
   //   return res.status(200).send({ message: "User created successfully!", user: savedUser });
   // } catch (err) {
   //   return res.status(400).send({ error: "User created successfully!", error: err });
   // }
 };
 
 // login
 exports.logIn = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    User
    .findOne({where:{email: email}})
    .then(user => {
       return bcrypt.compare(password, user.password)
      })
      .then(passwordMatch => {
         if(passwordMatch){
            // setting cookie for login
            res.setHeader('Set-Cookie', 'isLoggedIn=true; Max-Age=10'); // Max-Age=10 expiry time in seconds; Secure {hides on client side}, HttpOnly{can't be accessed on client side}
         res.send({'message':'successfully loged in'})
      }
      else {
         res.send({'message':'please check the credentials once'});
      }
   })
   .catch(error =>{
      res.send({'message':'something went wrong'});
   })
   // const { error } = loginValidation(req.body);
   // if (error) return res.status(400).send(error.details[0].message);
 
   // const foundUser = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
   // if (!foundUser) return res.status(400).send({ message: "invalid login credential", foundUser:foundUser });
 
   // try {
   //   const isMatch = await bcrypt.compareSync(req.body.password, foundUser.password);
   //   if (!isMatch) return res.status(400).send({ message: "invalid login credential" });
 
   //   // create and assign jwt
   //   const token = await jwt.sign({ _id: foundUser._id }, JWT_KEY);
 
   //   return res.status(200).header("auth-token", token).send({ "auth-token": token, userId: foundUser._id });
   // } catch (error) {
   //   return res.status(400).send(error);
   // }
 };


   exports.getAllUsers = async(req, res) => {
      // const allUsers = await User.find({});
      // if(!allUsers){
      //    res.status(400).send({"error":"no users found"})
      // }else{
      //    return res.status(200).send({message:"here are the found users:", allUsers})
      // }
   }

exports.updateUser = async(req, res) => {
//    try{
//    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {$set: req.body}, {new: true})
//    if (!updatedUser) {
//       return res.status(400).send({ message: "Could not update user" });
//     }
//     return res.status(200).send({ message: "User updated successfully", updatedUser });

//   } catch (error) {
//     return res.status(400).send({ error: "An error has occurred, unable to update user" });
//   }
}

exports.deleteUser = async(req, res) => {
   //  try{
   //    const deletedUser = await User.findByIdAndDelete(req.params.userId);
   //    if(!deletedUser){
   //       return res.status(400).send({message:"could not delete user, seems like a database issue"})
   //    }else{
   //       return res.status(200).send({message:"user deleted successfully!"})
   //    }
   // }catch(error){
   //    return res.status(400).send({error:"an error occured, unable to delete user"})
   // }
    
}

exports.data = async(req, res) => {
   return res.status(200).send({message:"hitting the data route", userId: req.user})
}

const createUserObj = async (req) => {
   return{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
   };
}