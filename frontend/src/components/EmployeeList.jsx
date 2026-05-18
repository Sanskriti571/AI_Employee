import API from "../services/api";

const EmployeeList = ({
  employees,
  fetchEmployees,
  setEditEmployee
}) => {

  const deleteEmployee = async (id) => {

    try {

      await API.delete(`/employees/${id}`);

      fetchEmployees();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="
    grid
    md:grid-cols-3
    gap-6
    ">

      {employees.map((emp) => (

        <div
          key={emp._id}
          className="
          bg-white
          p-6
          rounded-2xl
          shadow-lg
          "
        >

          <h2 className="
          text-3xl
          font-bold
          ">
            {emp.name}
          </h2>

          <p className="
          text-gray-500
          ">
            {emp.department}
          </p>

          <p className="
          mt-3
          text-xl
          ">
            Score:
            <span className="
            text-green-600
            font-bold
            ">
              {" "}
              {emp.performanceScore}
            </span>
          </p>

          <p className="
          text-lg
          ">
            Experience:
            <span className="
            font-bold
            ">
              {" "}
              {emp.experience} years
            </span>
          </p>

          <div className="
          flex
          gap-2
          flex-wrap
          mt-4
          ">

            {emp.skills.map((skill, index) => (

              <span
                key={index}
                className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                "
              >
                {skill}
              </span>

            ))}

          </div>

          <div className="
          flex
          gap-3
          mt-5
          ">

            <button
              onClick={() =>
                setEditEmployee(emp)
              }
              className="
              bg-yellow-500
              text-white
              px-4
              py-2
              rounded-lg
              "
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteEmployee(emp._id)
              }
              className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-lg
              "
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
};

export default EmployeeList;