import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const Login = () => {
  let [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  const { resetForm, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup.string().email("Invalid email").required("Required"),
        password: yup.string().required("Required"),
      }),
      onSubmit: () => {
        postSignIn();
      },
    });
  const postSignIn = async () => {
    let { email, password } = values;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/user/sign-in`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let result = await response.json();
      if (result.success === false) {
        setResponseMsg(result.message);
      } else {
        resetForm();
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setResponseMsg("");
        navigate("/create-project");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <form onSubmit={handleSubmit} className="">
          <h2 className="mb-6 text-2xl font-semibold capitalize">Login</h2>

          <div className={`${errors.email ? "mb-0" : "mb-2"}`}>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Email <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={values?.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <p className="text-end text-sm font-semibold text-red-700">
                {errors.email}
              </p>
            )}
          </div>
          <div className={`${errors.password ? "mb-0" : "mb-2"}`}>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={values?.password}
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <p className="text-end text-sm font-semibold text-red-700">
                {errors.password}
              </p>
            )}
          </div>

          <div className="!mt-4">
            <p
              className={`text-center text-red-500 py-5 ${
                responseMsg !== "" ? "block" : "hidden"
              }`}
            >
              {responseMsg}
            </p>
            <button
              type="submit"
              className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue capitalize"
            >
              <span className="mx-auto">Sign In</span>
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Not Registered ?
              <Link className="text-blue-500" to="/sign-up">
                Sing-Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
