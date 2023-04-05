const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");


// Fruit Schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Why not name"]
    },
    rating: Number,
    review: String
});

// People Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: Number,
    favourateFruit: fruitSchema
});


// Fruit Model
const Fruit = mongoose.model("Fruit", fruitSchema);

// People Model
const Person = mongoose.model("Person", personSchema);



// const watermelon = new Fruit({
//     name: "Watermelon",
//     rating: 2,
//     review: "Not good."
// });

// watermelon.save();

// const peaches = new Fruit({
//     name: "Peaches",
//     rating: 10,
//     review: "Pretty awesome!"
// });

// peaches.save();

// const orange = new Fruit({
//     name: "Orange",
//     rating: 6,
//     review: "Delicious"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 5,
//     review: "Spice"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Successfully inserted");
//     }
// });

// Fruit.find(function(err, fruits) {
//     if(err) {
//         console.log(err);
//     } else {
//         fruits.forEach(fruit => {
//             console.log(fruit.name);
//         });
//     }
// });

Fruit.deleteMany({}, err => {
   if(err) {
       console.log(err);
   } else {
    console.log("Successfully deleted one record!");
   }
});

// Fruit.updateOne({_id: "63174098ecb8f0b749194eba"}, {name: "Peach"}, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Seccessfully updated one document!");
//     }
// });



// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favourateFruit: pineapple
// });

// person.save();

// fruit.save();

// Person.deleteMany({name: "John"}, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("successfully deleted!")
//     }
// });

// Person.find((err, people) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("people:")
//         console.log(people)
//     }
// })

// Person.updateOne({name: "John"}, {favourateFruit: watermelon}, err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated.");
//     }
// });