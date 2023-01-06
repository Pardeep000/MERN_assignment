const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//
const post = require("../models/post");
const User = require("../models/user");
//
const userauth = require("../middleware/userauth");
//
let createpostArray = [
  body("title", "Title length should not be less than 3 characters").isLength({
    min: 3
  }),
  body(
    "description",
    "Description length should not be less than 5 characters"
  ).isLength({
    min: 5
  })
];

router.post("/createpost", userauth, createpostArray, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  let { title, description, topic } = req.body;
  let uid = req.data.id;
  //for finding name of poster
  let existingUser = await User.findOne({ _id: uid });
  //
  try {
    await post.create({
      id: uid,
      name: existingUser.name,
      title,
      description,
      topic
    });
    //reading all posts by everyone
    // let ownerPosts = await post.find({ id: req.data.id }).sort({ date: -1 });
    let allPosts = await post.find().sort({ date: -1 });
    //sending response
    res.status(200).json({
      msg: "Post has been added.",
      result: allPosts
    });
  } catch (e) {
    res.status(400).json({ msg: "error occurred in creating post", error: e });
  }
  //end
});

router.get("/readpost", userauth, async (req, res) => {
  try {
    //reading all posts by everyone
    // let ownerPosts = await post.find({ id: req.data.id }).sort({ date: -1 });
    let allPosts = await post.find().sort({ date: -1 });
    //sending response
    res.status(200).json({
      msg: "All Post has been read.",
      result: allPosts
    });
  } catch (e) {
    res
      .status(400)
      .json({ msg: "error occurred in reading all post", error: e });
  }
  //end
});

module.exports = router;
