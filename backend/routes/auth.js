const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signin, signout, signup, addToRead, addToDeleted, getUserData } = require("../controllers/auth");

router.get("/signout", signout);
router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Enter proper email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Enter password with length greater than 5"),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Enter proper email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Enter password with length greater than 5"),
  ],
  signin
);

router.post('/add-read',addToRead)
router.post('/add-delete',addToDeleted)
router.post('/get-user',getUserData)

module.exports = router;