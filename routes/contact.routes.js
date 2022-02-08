const express = require("express");
const {
  createContact,
  listAllContacts,
  listSingleContact,
} = require("../controller/contact.controller");
const router = express.Router();

router.post("/", createContact);
router.get("/", listAllContacts);
router.get("/:id", listSingleContact);

module.exports = router;
