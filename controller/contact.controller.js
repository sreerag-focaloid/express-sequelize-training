const db = require("../models");

exports.createContact = async (req, res) => {
  const data = req.body;
  try {
    const post = await db.Contact.create(data);
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};

exports.listAllContacts = async (req, res) => {
  try {
    const post = await db.Contact.findAll({ include: [db.Address] });
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};

exports.listSingleContact = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await db.Contact.findByPk(id, { include: [db.Address] });
    res.send(post);
  } catch (err) {
    res.send(err);
  }
};
