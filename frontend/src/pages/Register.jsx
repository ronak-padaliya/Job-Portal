import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const Register = () => {
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();

  const postSignUp = async (values) => {
    const { userName, email, password,is_company } = values;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/user/sign-up`,
        {
          method: "POST",
          body: JSON.stringify({
            user_name: userName,
            email,
            password,
            is_company
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (!result.success) {
        setResponseMsg(result.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      is_company: false,
    },
    validationSchema: yup.object({
      userName: yup.string().required("Required"),
      email: yup.string().email("Invalid email").required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: postSignUp,
  });

  const { handleChange, handleSubmit, errors, touched, values } = formik;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-6 text-2xl font-semibold">Register</h2>

          <div className={`${errors.userName ? "mb-0" : "mb-2"}`}>
            <label className="mb-2 text-sm font-medium text-gray-600">
              Username <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="userName"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={values.userName}
              onChange={handleChange}
            />
            {errors.userName && touched.userName && (
              <p className="text-end text-sm font-semibold text-red-700">
                {errors.userName}
              </p>
            )}
          </div>

          <div className={`${errors.email ? "mb-0" : "mb-2"}`}>
            <label className="mb-2 text-sm font-medium text-gray-600">
              Email <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <p className="text-end text-sm font-semibold text-red-700">
                {errors.email}
              </p>
            )}
          </div>

          <div className={`${errors.password ? "mb-0" : "mb-2"}`}>
            <label className="mb-2 text-sm font-medium text-gray-600">
              Password <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <p className="text-end text-sm font-semibold text-red-700">
                {errors.password}
              </p>
            )}
          </div>

          <div className="mt-1">
            <input type="checkbox" name="is_company" id="is_company" value={values.is_company} onChange={handleChange}/>
            <label htmlFor="is_company" className="ml-2">Is Company</label>
          </div>

          <div className="!mt-8">
            {responseMsg && (
              <p className="text-center text-red-500 pb-5">{responseMsg}</p>
            )}
            <button
              type="submit"
              className="capitalize w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
              Sign Up
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?
              <Link className="text-blue-500" to="/">
                {" "}
                Sign-In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
