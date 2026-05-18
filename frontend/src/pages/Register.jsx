import { useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: ""
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(

        "/auth/signup",

        formData
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message

        || "Registration Failed"
      );
    }
  };

  return (

    <div className="
    flex
    justify-center
    items-center
    min-h-screen
    bg-gray-100
    ">

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        w-[400px]
        "
      >

        <h2 className="
        text-3xl
        font-bold
        mb-6
        text-center
        ">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="
          border
          p-3
          w-full
          mb-4
          rounded-lg
          "
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="
          border
          p-3
          w-full
          mb-4
          rounded-lg
          "
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="
          border
          p-3
          w-full
          mb-4
          rounded-lg
          "
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="
          bg-green-600
          hover:bg-green-700
          transition
          text-white
          w-full
          py-3
          rounded-lg
          "
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;