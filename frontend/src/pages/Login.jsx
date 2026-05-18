import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

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

      const res = await API.post(

        "/auth/login",

        formData
      );

      console.log(res.data);

      // SAVE TOKEN

      localStorage.setItem(

        "token",

        res.data.token
      );

      alert("Login Successful");

      // REDIRECT

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message

        || "Login Failed"
      );
    }
  };

  return (

    <div className="
    min-h-screen
    flex
    justify-center
    items-center
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
          Login
        </h2>

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
          bg-blue-600
          hover:bg-blue-700
          transition
          text-white
          w-full
          py-3
          rounded-lg
          "
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;