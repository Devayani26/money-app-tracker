const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/MoneyList', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/add", (req, res) => {
    const { category_select, amount_input, info, date_input } = req.body;

    const data = {
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
             throw err;
        }
        console.log("Record Inserted Successfully");
        res.send("Record Inserted Successfully");
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});