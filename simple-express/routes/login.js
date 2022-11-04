const express = require("express");
const router = express.Router();
const yup = require("yup");


var passport = require('passport');
var jwt = require('jsonwebtoken');
const jwtSettings = require("../constants/jwtSettings");

//validate
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

const loginSchema = yup.object({
  body: yup.object({
    username: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

router.post("/", validateSchema(loginSchema), (req, res) => {
  const { username, password } = req.body;
  if (username === 'tungnt@softech.vn' && password === '123456789')  {
     // jwt
     var payload = {
      user: {
        username: username,
        email: 'tungnt@softech.vn',
      },
      application: 'ecommerce',
    };

    var secret = 'ADB57C459465E3ED43C6C6231E3C9';
    var token = jwt.sign(payload, secret, {
      expiresIn: 86400, // expires in 24 hours
      audience: jwtSettings.AUDIENCE,
      issuer: jwtSettings.ISSUER,
      subject: username,
      algorithm: 'HS512',
    });

    res.status(200).json({
      ok: true,
      login: true,
      user: {
        username: username,
        fullname: 'Ngo Thanh Tung',
      },
      token: token,
    });
    return;
  }

  res.status(401).json({
    statusCode: 401,
    message: 'Unauthorized',
  });
});
// setup jwt middleware
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  res.json({ ok: true });
});

module.exports = router;
