const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);


app.route("/articles")

.get((req, res) => {
    Article.find((err, articles) => {
        if(!err) {
            res.send(articles);
        }  else {
            res.send(err);
        }
    })
})

.post((req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    })
    article.save(err => {
        if(!err) {
            res.send("Successfully added a document")
        } else {
            res.send(err)
        }
    });
})

.delete((req, res) => {
    Article.deleteMany(err => {
        if(!err) {
            res.send("Successfully deleted all articles!");
        } else {
            res.send(err)
        }
    })
})

// ********************** Specific article *************************************

app.route("/articles/:articleTitle")

.get((req, res) => {
    Article.findOne({title: req.params.articleTitle}, (err, article) => {
        if(!err) {
            if(article) {
                res.send(article)
            } else {
                res.send(`Oops.. No articles matching that title was found!`)
            }
        } else {
            res.send(err)
        }
    })
})

.patch((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        err => {
            if(!err) {
                res.send("Successfully updated the article.")
            } else {
                res.send(err)
            }
        })
})

.put((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
        { overwrite: true},
        err => {
            if(!err) {
                res.send("Successfully updated.")
            } else {
                res.send(err)
            }
        });
});

app.listen(3000, err => {
    console.log("Server started successfully on port 3000");
})