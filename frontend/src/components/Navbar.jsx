import { Link } from "react-router-dom";

const Navbar = () => {

  return (

    <nav className="bg-black text-white px-8 py-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        EmployeeAI
      </h1>

      <div className="flex gap-6">

        <Link to="/">Home</Link>

        <Link to="/recommendations">
          AI Recommendations
        </Link>

        <Link to="/login">
          Login
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;