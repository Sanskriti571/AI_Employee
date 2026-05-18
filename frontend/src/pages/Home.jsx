import { useEffect, useState } from "react";

import API from "../services/api";

import EmployeeForm from "../components/EmployeeForm";

import EmployeeList from "../components/EmployeeList";

import SearchFilter from "../components/SearchFilter";

import Navbar from "../components/Navbar";

const Home = () => {

  const [employees, setEmployees] = useState([]);

  const [editEmployee, setEditEmployee] =
    useState(null);

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const res = await API.get("/employees");

      setEmployees(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const searchEmployee = async (
    department
  ) => {

    try {

      const res = await API.get(

        `/employees/search?department=${department}`
      );

      setEmployees(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="
    min-h-screen
    bg-gray-100
    ">

      <Navbar />

      <div className="
      max-w-7xl
      mx-auto
      p-8
      ">

        <EmployeeForm
          fetchEmployees={fetchEmployees}
          editEmployee={editEmployee}
          setEditEmployee={setEditEmployee}
        />

        <SearchFilter
          searchEmployee={searchEmployee}
        />

        <div className="mt-8">

          <EmployeeList
            employees={employees}
            fetchEmployees={fetchEmployees}
            setEditEmployee={setEditEmployee}
          />

        </div>

      </div>

    </div>
  );
};

export default Home;