const express = require("express");

const router = express.Router();

const {
  addEmployee,
  getEmployees,
  searchEmployee,
  deleteEmployee,
  updateEmployee
} = require("../controllers/employeeController");

router.post("/", addEmployee);

router.get("/", getEmployees);

router.get("/search", searchEmployee);

router.delete("/:id", deleteEmployee);

router.put("/:id", updateEmployee);

module.exports = router;