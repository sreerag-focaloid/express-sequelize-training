const express = require("express");
const {
  createAddress,
  listAllAddress,
  listSingleAddress,
} = require("../controller/address.controller");
const router = express.Router();

router.post("/", createAddress);
router.get("/", listAllAddress);
router.get("/id", listSingleAddress);

module.exports = router;
