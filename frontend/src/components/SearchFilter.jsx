import { useState } from "react";
import API from "../services/api";

const SearchFilter = ({ setEmployees }) => {

  const [department, setDepartment] = useState("");

  const handleSearch = async () => {

    const res = await API.get(
      `/employees/search?department=${department}`
    );

    setEmployees(res.data);
  };

  return (

    <div className="flex gap-4">

      <input
        type="text"
        placeholder="Search Department"
        className="border p-2"
        onChange={(e) => setDepartment(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-green-600 text-white px-4 py-2"
      >
        Search
      </button>

    </div>
  );
};

export default SearchFilter;