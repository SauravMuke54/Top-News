const User = require("../models/user");
//middleware which helps to validate data sent by client before processing it on server(errors)
const { validationResult } = require("express-validator");
//used for token based authentication(generation)
const jwt = require("jsonwebtoken");
//used for creating middleware for handiling authentication and authorization
const { expressjwt: expressJWT } = require("express-jwt");

//signup controller
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      
      res.json({
        email: user.email,
        id: user._id,
      });
    })
    .catch((err) => {
      console.log(err)
      if (err) {
        return res.status(400).json({
          err: "Not able to save user in DB",
        });
      }
    });
};

//signout controller
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Sign out successful",
  });
};
//422 error code:Unprocessable entity
//signin controller
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User Email does not exist",
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Password and Email does not match",
        });
      }

      //create token
      const token = jwt.sign({ _id: user._id }, "shhhhh");

      //put token in user cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
      //send response to frontend
      const { _id, name, email,already_read,deleted } = user;
      res.json({ token, user: { _id,email, name,already_read,deleted} });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: "User Email does not exist",
        });
      }
    });
};

exports.addToDeleted=(req,res)=>{
    const id = req.body._id;
    const did=req.body.did
    console.log(id,did)
    User.findOneAndUpdate({_id:id},{$push:{deleted:did}}).then((response) => {
        if (!response) {
          return res.status(400).json({ err: "Error in adding/updating" });
        }
        return res.status(200).json({ msg: "Delete id added successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.addToRead=(req,res)=>{
    const id = req.body._id;
    const rid=req.body.rid
    User.findOneAndUpdate({_id:id},{$push:{already_read:rid}}).then((response) => {
        if (!response) {
          return res.status(400).json({ err: "Error in adding/updating" });
        }
        return res.status(200).json({ msg: "Delete id added successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
}


exports.getUserData=(req,res)=>{

    const id=req.body._id

    User.find({_id:id}).then(data=>{

        return res.status(200).json({data:data})
    }).catch(err=>{
        return res.status(400).json({error:err})
    })


}



//middlewares ---protected routes
exports.isSignedIn = expressJWT({
  secret: "shhhhh",
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};