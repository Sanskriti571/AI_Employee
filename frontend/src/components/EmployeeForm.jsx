import { useState, useEffect } from "react";

import API from "../services/api";

const EmployeeForm = ({
  fetchEmployees,
  editEmployee,
  setEditEmployee
}) => {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: ""
  });

  useEffect(() => {

    if (editEmployee) {

      setFormData({

        name: editEmployee.name,
        email: editEmployee.email,
        department: editEmployee.department,
        skills: editEmployee.skills.join(","),
        performanceScore:
          editEmployee.performanceScore,
        experience: editEmployee.experience
      });
    }

  }, [editEmployee]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const employeeData = {

        ...formData,

        skills: formData.skills.split(",")
      };

      // UPDATE

      if (editEmployee) {

        await API.put(

          `/employees/${editEmployee._id}`,

          employeeData
        );

        setEditEmployee(null);
      }

      // ADD

      else {

        await API.post(
          "/employees",
          employeeData
        );
      }

      setFormData({

        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: ""
      });

      fetchEmployees();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="
      bg-white
      p-6
      rounded-2xl
      shadow-lg
      mb-8
      "
    >

      <div className="
      grid
      md:grid-cols-2
      gap-4
      ">

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          className="
          border
          p-3
          rounded-lg
          "
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="
          border
          p-3
          rounded-lg
          "
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="
          border
          p-3
          rounded-lg
          "
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="React,Node,MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="
          border
          p-3
          rounded-lg
          "
          required
        />

        <input
          type="number"
          name="performanceScore"
          placeholder="Performance Score"
          value={formData.performanceScore}
          onChange={handleChange}
          className="
          border
          p-3
          rounded-lg
          "
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="
          border
          p-3
          rounded-lg
          "
          required
        />

      </div>

      <button
        type="submit"
        className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        mt-5
        "
      >
        {editEmployee
          ? "Update Employee"
          : "Add Employee"}
      </button>

    </form>
  );
};

export default EmployeeForm;