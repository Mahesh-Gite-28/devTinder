import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setemailID] = useState("");
  const [password, setpassword] = useState("");

  // 🔹 Signup-only states
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const [isLogin, setisLogin] = useState(true);
  const [error, Seterror] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      Seterror("");

      if (isLogin) {
        const res = await axios.post(
          BASE_URL + "/login",
          { emailID, password },
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
        navigate("/profile");
      } else {
        // 🔹 SIGNUP API (backend tu baad me handle karega)
        const res = await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, emailID, password },
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
        navigate("/profile");
      }
    } catch (error) {
      Seterror(error?.response?.data || "something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="card w-[380px] bg-base-200 shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </span>{" "}
          👋
        </h2>

        {/* 🔹 SIGNUP EXTRA FIELDS */}
        {!isLogin && (
          <>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className="input input-bordered bg-base-300"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="input input-bordered bg-base-300"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
          </>
        )}

        {/* 🔹 EMAIL */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-sm">Email</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="input input-bordered bg-base-300"
            value={emailID}
            onChange={(e) => setemailID(e.target.value)}
          />
        </div>

        {/* 🔹 PASSWORD */}
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-sm">Password</span>
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered bg-base-300"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <p className="text-red-500">{error}</p>

        <button
          className="btn btn-primary w-full mt-5 my-2"
          onClick={onSubmitHandler}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {/* 🔹 TOGGLE LINK */}
        <p className="text-center text-sm mt-3">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span
            className="text-indigo-400 cursor-pointer hover:underline"
            onClick={() => {
              setisLogin(!isLogin);
              Seterror("");
            }}
          >
            {isLogin ? "Create an account" : "Login instead"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
