const express = require("express");
const router = express.Router();
const fs = require("fs");
const yup = require("yup");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var _ = require("lodash");

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(400).json({ type: err.name, message: err.message });
  }
};

const fileCategory = "./data/categories.json";
const data = fs.readFileSync(fileCategory, { encoding: "utf8", flag: "r" });
var categories = JSON.parse(data);
router.get("/", function (req, res, next) {
  res.json(categories);
});
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const category = categories.find((c) => {
    return c.id == id;
  });
  if (category) {
    res.json(category);
    return;
  }
  res.status(410).json({ message: "not found" });
});

const categorySchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
  }),
});

router.post("/", function (req, res, next) {
  try {
    const { name, description } = req.body;
    // Kiểm tra name và description phải có trong body
    if (!name || !description) {
      res.sendStatus(400);
      return;
    }

    const max = _.maxBy(categories, "id");
    categories.push({ id: max.id + 1, name, description });

    // Save to file
    fs.writeFileSync(fileCategory, JSON.stringify(categories), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });

    res.sendStatus(201);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;

  const { name, description } = req.body;
  let update = categories.find((category) => {
    return category.id.toString() === id;
  });
  if (update) {
    update.name = name;
    update.description = description;
    fs.writeFileSync(fileCategory, JSON.stringify(categories), function (err) {
      if (err) throw err;
      console.log("saved");
    });
    res.status(200).json(update);
    return;
  }
});

router.delete('/:id', function (req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);
      return;
    }

    let found = categories.find((category) => {
      return category.id.toString() === id;
    });

    if (found) {
      _.remove(categories, (category) => {
        return category.id.toString() === id;
      });

      // Save to file
      fs.writeFileSync(fileCategory, JSON.stringify(categories), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      res.sendStatus(200);
      return;
    } else {
      res.sendStatus(410);
      return;
    }
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});


module.exports = router;
