var express = require("express");
const { request } = require("../app");
var router = express.Router();
const users = [
  { id: 1, name: "name1", email: "foo1@bar.com" },
  { id: 2, name: "name1", email: "foo2@bar.com" },
  { id: 3, name: "name1", email: "foo3@bar.com" },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// get all user
router.get("/users", function (req, res, next) {
  res.json(users);
});
//get user by id
router.get("/users/id/:id", (req, res, next) => {
  const { id } = req.params;
  const user = users.find((x) => {
    return x.id == id;
  });
  if (user) {
    res.json(user);
    return;
  }
  res.status(410).json({ message: "User id not found" });
});
//Create an user

router.post('/users', (req, res, next) => {
const data=req.body;
users.push(data);

res.status(201).json({ user: data });
});
//get request information 
router.get('/users/search', (req, res, next) => {
  const query=req.query

  //response send to client
  res.json({ message: 'GET METHOD WITH QUERY STRING'  })
})



//update data in object
router.patch("/users/:id", function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  res.json({ ok: true });
});
module.exports = router;
