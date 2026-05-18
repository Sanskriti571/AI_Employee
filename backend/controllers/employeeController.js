const Employee = require("../models/Employee");

// ADD EMPLOYEE

exports.addEmployee = async (req, res) => {

  try {

    const employee = await Employee.create(req.body);

    res.status(201).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL EMPLOYEES

exports.getEmployees = async (req, res) => {

  try {

    const employees = await Employee.find();

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// SEARCH EMPLOYEE

exports.searchEmployee = async (req, res) => {

  try {

    const { department } = req.query;

    const employees = await Employee.find({

      department: {

        $regex: department,

        $options: "i"
      }
    });

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE EMPLOYEE

exports.deleteEmployee = async (req, res) => {

  try {

    await Employee.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Employee deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE EMPLOYEE

exports.updateEmployee = async (req, res) => {

  try {

    const updatedEmployee =
      await Employee.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }
      );

    res.status(200).json(updatedEmployee);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};