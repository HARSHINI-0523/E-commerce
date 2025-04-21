//create mini-express app
const exp = require("express");

require("dotenv").config();

const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenVerify = require("../middlewares/tokenVerify.js");
const expressAsyncHandler = require("express-async-handler");

//add body parser middleware
userApp.use(exp.json());

//create sample rest api(req handlers- routes)
//route to get users(protected route)
userApp.get(
  "/users",
  tokenVerify,
  expressAsyncHandler(async (req, res) => {
    //get usersCollection obj
    const usersCollection = req.app.get("usersCollection");
    //get users data from usersCollection of DB
    let usersList = await usersCollection.find().toArray();
    //send users data to client
    res.send({ message: "users", payload: usersList });
  })
);

//route to send one user by id(protected route)
userApp.get(
  "/users/:username",
  tokenVerify,
  expressAsyncHandler(async (req, res) => {
    //get usersCollection obj
    const usersCollection = req.app.get("usersCollection");
    //get id from url
    const usernameOfUrl = req.params.username;
    //find user by id
    let user = await usersCollection.findOne({
      username: { $eq: usernameOfUrl },
    });
    //send res
    res.send({ message: "one user", payload: user });
  })
);

//route to create user (public route)
userApp.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    //get usersCollection obj
    const usersCollection = req.app.get("usersCollection");
    //get new User from client
    const newUser = req.body;

    //verify duplicate user
    let existingUser = await usersCollection.findOne({
      username: newUser.username,
    });
    //if user already existed
    if (existingUser !== null) {
      res.send({ message: "User already existed" });
    }
    //if user not existed
    else {
      //hash the password
      let hashedpassword = await bcryptjs.hash(newUser.password, 7);
      //replace plain password with hashed password in newUser
      newUser.password = hashedpassword;
      //add products property
      newUser.products = [];
      //save user
      await usersCollection.insertOne(newUser);
      //send res
      res.send({ message: "user created" });
    }
  })
);

//user login(authentication)(public route)
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    //get usersCollection obj
    const usersCollection = req.app.get("usersCollection");
    //get new UserCredentils from client
    const userCred = req.body;
    //verify username
    let dbUser = await usersCollection.findOne({ username: userCred.username });
    //if user not existed
    if (dbUser === null) {
      res.send({ message: "Invalid username" });
    }
    //if user found,compare passwords
    else {
      let result = await bcryptjs.compare(userCred.password, dbUser.password);
      //if passwords not matched
      if (result === false) {
        res.send({ message: "Invalid password" });
      }
      //if passwords are matched
      else {
        //create JWT token
        let signedToken = jwt.sign(
          { username: userCred.username },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        //send res
        res.send({
          message: "login success",
          token: signedToken,
          user: dbUser,
        });
      }
    }
  })
);

//route to update user(protected route)
userApp.put(
  "/user",
  //tokenVerify,
  expressAsyncHandler(async (req, res) => {
    //get usersCollection obj
    const usersCollection = req.app.get("usersCollection");
    //get modified user from client
    let modifiedUser = req.body;
    console.log(modifiedUser);
    //modify by username
    await usersCollection.updateOne(
      { username: modifiedUser.username },
      { $set: { ...modifiedUser } }
    );

    res.send({ message: "User modified" });
  })
);

//route to delete user(protected route)
userApp.delete(
  "/user/:id",
  tokenVerify,
  expressAsyncHandler((req, res) => {})
);

//add selected product to a specific user cart
userApp.put(
  "/add-to-cart/:username",
  expressAsyncHandler(async (req, res) => {
    //get usersCollection obj
    const usersCollection = req.app.get("usersCollection");
    //get usernbame from url
    let usernameFromUrl = req.params.username;
    //get cart obj
    let productObj = req.body;
    console.log(productObj);
    let result = await usersCollection.updateOne(
      { username: usernameFromUrl },
      { $push: { products: productObj } }
    );
    res.send({ message: "product added", payload: result });
  })
);

//get latest cart
userApp.get(
  "/cart/:username",
  expressAsyncHandler(async (req, res) => {
    //get usersCollection obj
    const usersCollection = req.app.get("usersCollection");
    //get username from url
    let usernameFromUrl = req.params.username;
    //get cart
    let user = await usersCollection.findOne({ username: usernameFromUrl });
    //send res
    res.send({ message: "cart", payload: user });
  })
);

//export userApp
module.exports = userApp;
