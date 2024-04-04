const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoute = require('./routes/products.route.js')
const dotenv = require("dotenv");

dotenv.config()

// middleware
app.use(express.json());

//routes
app.use("/api/products", productRoute);

// Connecting to database
mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@clustercrud.nefdryo.mongodb.net/ClusterCrud?retryWrites=true&w=majority`
).then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch(() => {
    console.log("Connection Failed!");
});