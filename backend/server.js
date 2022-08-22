const users = [
 { id: 1, firstName: "Jane", lastName: "Doe", age: 30 }, 
  { id: 2, firstName: "John", lastName: "Doe", age: 35 },
  { id: 3, firstName: "Johnny", lastName: "Doe", age: 50 },
  { id: 4, firstName: "Mike", lastName: "Foo", age: 18 },
];





const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/all", (req, res) => {
  res.json(users);
});

app.get("/one/:id", (req, res) => {
  const user = users.find((el) => el.id == req.params.id);
  res.json(user || "User not found");
});

app.post("/create", (req, res) => {
  const fullName = req.body.fullName.split(" ");
  const newUser = {
    id: uuid.v4(),
    firstName: fullName[0],
    lastName: fullName[1],
    age: parseInt(req.body.age),
  };
  users.push(newUser);
  res.json(users);
});

app.delete("/delete/:id", (req, res) => {
  console.log("params", req.params.id);
  const deletedIndex = users.findIndex((user) => user.id == req.params.id);
  users.splice(deletedIndex, 1);
  res.json(users);
});

// 1. find the target user
// 2. update the target user
// 3. update changes
app.put("/update/:id", (req, res) => {
  const { id } = req.params
  const updateIndex = users.findIndex((user) => user.id == id )

  users[updateIndex] = {...users[updateIndex], ...req.body}

  res.json(users)
})

app.listen(3000, () => console.log("Running on 3000"));
