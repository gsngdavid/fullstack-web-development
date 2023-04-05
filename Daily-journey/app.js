const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const morgan = require("morgan");
const ejs = require("ejs");
// const _ = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(morgan("dev"));

mongoose.connect("mongodb://localhost:27017/daily-journal");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", postSchema);

// Get Requests

app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    if(!err) {
      res.render("home", {pageTitle: "Home", startingContent: homeStartingContent, posts: posts});
    }
  });
})

app.get("/about", (req, res) => {
  res.render("about", {pageTitle: "About", aboutContent: aboutContent});
})

app.get("/contact", (req, res) => {
  res.render("contact", {pageTitle: "Contact", contactContent: contactContent});
})

app.get("/compose", (req, res) => {
  res.render("compose", {pageTitle: "Compose", editMode: false})
})

app.get("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId, (err, post) => {
    if(!err) {
      res.render("post", {post: post})
    }
  });
})

app.get("/update/post/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    res.render("compose", {pageTitle: "Compose", editMode: true, post: post})
  });
});

app.get("/delete/post/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if(!err) {
      console.log("Post successfully deleted.");
      res.redirect("/");
    }
  });
});


// Post Requests

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody
  });
  post.save();
  res.redirect("/");
});

app.post("/update", (req, res) => {
  Post.findByIdAndUpdate(req.body.id, {title: req.body.postTitle, body: req.body.postBody}, err => {
    if(!err) {
      res.redirect(`/posts/${req.body.id}`);
    }
  })
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
