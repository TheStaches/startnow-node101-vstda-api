const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
const data = [{todoItemId: 0,name: 'an item',priority: 3,completed: false},
    {todoItemId: 1,name: 'another item',priority: 2,completed: false},
    {todoItemId: 2,name: 'a done item',priority: 1,completed: true}
];

// body-parser for incoming htttp body
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Get Routes
app.get("/", (req, res) => {
    res.status(200).json({status: "ok"});
});
app.get("/api/TodoItems", (req, res) => {
    res.status(200).json(data);
});
app.get("/api/TodoItems/:number", (req, res) => {
    let number = req.params.number;
    res.status(200).json(data[number]);
});

// Post Routes
app.post("/api/TodoItems/", (req, res) => {
    data[req.body.todoItemId] = req.body;
    res.status(201).json(data[req.body.todoItemId]);

});

// Delete Route
app.delete("/api/TodoItems/:number", (req, res) => {
    let number = req.params.number;
    let item = data[number];
    delete data[number];
    res.status(200).json(item);
});

module.exports = app;
