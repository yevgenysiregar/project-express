const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //to access body request, it's a must to be imported
const cors = require("cors");
const port = 3000;

const todoList = [
  {
    id: 1,
    todoDescription: "learn express",
    isCompleted: true
  },
  {
    id: 2,
    todoDescription: "deploy to heroku",
    isCompleted: false
  }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// get new data
app.get("/", (req, res) => res.send(todoList));

// post new data
app.post("/todos", (req, res) => {
  todoList.push(req.body);

  res.send({
    message: `New todo successly added!`,
    data: todoList
  });
});

// get data by params
app.get("/todos/:id", (req, res) => {
  const id = req.params.id; //params is to access endpoint/routes beginning with ":"
  res.send(todoList[id]);
});

// update data by parameter
app.put("/todos/:id", (req, res) => {
  todoList[req.params.id] = req.body; // todoList index number 0 data is changed following req.body
  res.send(todoList);
});

// delete todoList
app.delete("/todos/:id", (req, res) => {
  todoList.splice(req.params.id, 1);
  res.send(todoList);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
