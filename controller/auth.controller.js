const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { username, email, password, role } = req.body;
  const isEmailExist = await db.User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("err", err);
    }
  );
  if (isEmailExist) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const isUserNameExist = await db.User.findOne({ where: { username } }).catch(
    (err) => {
      console.log("err", err);
    }
  );
  if (isUserNameExist) {
    return res.status(400).json({ message: "UserName already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, salt);

  const data = { username, email, password: hash_password, role };

  try {
    const user = await db.User.create(data);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  const userData = await db.User.findOne({ where: { email } });

  console.log(userData);

  if (!userData)
    return res.status(400).json({ message: `Email doesn't exist` });

  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (!isPasswordCorrect)
    return res.status(200).json({ message: "Password is Incorrect" });

  const token = jwt.sign({ id: userData.id, role: userData.role }, "secret", {
    expiresIn: "1d",
  });

  res.status(200).json({ token, userData });
};
