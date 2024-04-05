const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoute = require('./routes/products.route.js')
const userRoute = require('./routes/users.route.js')
const dotenv = require("dotenv");
const userAuthentication = require("./middlewares/authentication.js")

dotenv.config()

// middleware
app.use(express.json());

//routes
app.use("/api/products", userAuthentication, productRoute);
app.use("/api/user", userRoute);

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