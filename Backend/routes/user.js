const express = require("express");
const { createUser, updateUser, deleteUser, getUser, getAllUser } = require("../Controller/UserController");

const {verifyUser, verifyAdmin} = require("../utils/verifyToken")

const router = express.Router();

router.post("/", createUser);

router.put("/:id",verifyUser, updateUser);

router.delete("/:id",verifyUser, deleteUser);

router.get("/:id",verifyUser, getUser);

router.get("/", verifyAdmin,getAllUser);

module.exports = router;