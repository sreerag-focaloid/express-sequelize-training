const express = require("express");
const {
  listAllUsers,
  listSingleUser,
  simpleList,
  createWholeUser,
} = require("../controller/user.controller");
const router = express.Router();

router.get("/", listAllUsers);
router.get("/:id", listSingleUser);
router.get("/all", simpleList);
router.post("/whole", createWholeUser);

module.exports = router;
