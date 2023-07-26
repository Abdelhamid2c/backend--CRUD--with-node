const express = require("express");
const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/verifyToken");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);

module.exports = router;
