const { sequelize } = require("../models");
const db = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createWholeUser = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const wholeUserData = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(wholeUserData.password, salt);

    const userObj = {
      username: wholeUserData.username,
      email: wholeUserData.email,
      password: hash_password,
      role: wholeUserData.role,
    };

    const createdUser = await db.User.create(userObj, { transaction });
    if (!createdUser) {
      await transaction.rollback();
      return res.status(200).json({ message: "User Cannot be created" });
    }

    const createdUserId = createdUser.id;
    console.log(createdUserId, "id of created user");

    const contactObj = {
      phoneNumber: wholeUserData.phoneNumber,
      userId: createdUserId,
    };

    const createdContact = await db.Contact.create(contactObj, { transaction });
    if (!createdContact) {
      await transaction.rollback();
      return res.status(200).json({ message: "Contact Cannot be created" });
    }

    const createdContactId = createdContact.id;
    console.log(createdContactId, "id of created contact");

    const addressObj = {
      addressLine1: wholeUserData.addressLine1,
      addressLine2: wholeUserData.addressLine2,
      state: wholeUserData.state,
      country: wholeUserData.country,
      contactId: createdContactId,
    };

    const createdAddress = await db.Address.create(addressObj, { transaction });
    if (!createdAddress) {
      await transaction.rollback();
      return res.status(200).json({ message: "Address Cannot be created" });
    }

    console.log("success");
    await transaction.commit();

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log("error");
    if (transaction) {
      await transaction.rollback();
    }
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    // const user = await db.User.findAll({
    //   include: [db.Contact],
    // });

    const user = await db.User.findAll({
      include: [{ model: db.Contact, include: [db.Address] }],
    });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

exports.simpleList = async (req, res) => {
  try {
    const user = await db.User.findAll();
    console.log(user);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

exports.listSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await db.User.findByPk(id, {
      include: [db.Contact],
    });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};
