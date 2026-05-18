import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

const Recommendations = () => {

  const [employees, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [singleResult, setSingleResult] = useState("");

  const [rankingResult, setRankingResult] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchEmployees();

  }, []);

  // FETCH EMPLOYEES

  const fetchEmployees = async () => {

    try {

      const res = await API.get("/employees");

      setEmployees(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // SINGLE EMPLOYEE AI RECOMMENDATION

  const getSingleRecommendation = async () => {

    try {

      if (!selectedEmployee) {

        alert("Please select an employee");

        return;
      }

      setLoading(true);

      // remove ranking section
      setRankingResult("");

      const employee = employees.find(
        (emp) => emp._id === selectedEmployee
      );

      const res = await API.post(
        "/ai/recommend",
        { employee }
      );

      setSingleResult(
        res.data.choices[0].message.content
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // ALL EMPLOYEE RANKINGS

  const getEmployeeRankings = async () => {

    try {

      setLoading(true);

      // remove single recommendation
      setSingleResult("");

      const res = await API.post(
        "/ai/recommend-all",
        { employees }
      );

      setRankingResult(
        res.data.choices[0].message.content
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        {/* TOP CARD */}

        <div className="
        bg-white
        p-8
        rounded-2xl
        shadow-xl
        ">

          <h1 className="
          text-4xl
          font-bold
          mb-6
          ">
            AI Employee Analytics
          </h1>

          {/* EMPLOYEE SELECT */}

          <select
            className="
            w-full
            border
            p-3
            rounded-lg
            mb-6
            "
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(e.target.value)
            }
          >

            <option value="">
              Select Employee
            </option>

            {employees.map((emp) => (

              <option
                key={emp._id}
                value={emp._id}
              >
                {emp.name}
              </option>

            ))}

          </select>

          {/* BUTTONS */}

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={getSingleRecommendation}
              className="
              bg-gradient-to-r
              from-purple-600
              to-pink-600
              text-white
              px-6
              py-3
              rounded-xl
              shadow-lg
              hover:scale-105
              transition
              "
            >
              Generate Employee Recommendation
            </button>

            <button
              onClick={getEmployeeRankings}
              className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              shadow-lg
              hover:scale-105
              transition
              "
            >
              Generate Employee Rankings
            </button>

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="
          mt-6
          bg-white
          p-6
          rounded-2xl
          shadow-lg
          text-xl
          font-semibold
          ">
            Generating AI Analysis...
          </div>

        )}

        {/* SINGLE EMPLOYEE RESULT */}

        {singleResult && (

          <div className="
          bg-white
          mt-8
          p-8
          rounded-2xl
          shadow-xl
          ">

            <h2 className="
            text-3xl
            font-bold
            mb-6
            text-purple-700
            ">
              Employee Recommendation
            </h2>

            <p className="
            whitespace-pre-line
            text-lg
            leading-9
            ">
              {singleResult}
            </p>

          </div>

        )}

        {/* ALL EMPLOYEE RANKINGS */}

        {rankingResult && (

          <div className="
          bg-white
          mt-8
          p-8
          rounded-2xl
          shadow-xl
          ">

            <h2 className="
            text-3xl
            font-bold
            mb-6
            text-blue-700
            ">
              Employee Rankings & Analysis
            </h2>

            <p className="
            whitespace-pre-line
            text-lg
            leading-9
            ">
              {rankingResult}
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Recommendations;