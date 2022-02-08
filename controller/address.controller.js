const db = require("../models");

exports.createAddress = async (req, res) => {
  const data = req.body;
  try {
    const post = await db.Address.create(data);
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};

exports.listAllAddress = async (req, res) => {
  try {
    const post = await db.Address.findAll();
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};

exports.listSingleAddress = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await db.Address.findByPk(id);
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};
