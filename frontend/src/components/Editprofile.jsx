import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [skills, setSkills] = useState(user.skills || []);
  const [skillsInput, setSkillsInput] = useState(
    (user.skills || []).join(", "),
  );

  const saveProfile = async () => {
    setError(""); //clear the error before save
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, about, gender, skills },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setToast(true);

      setInterval(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      const backendError =
        err.response?.data?.error || "Profile update failed. Please try again.";

      setError(backendError);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="mx-15">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="card w-[380px] bg-base-200 shadow-xl p-6">
            <h2 className="text-3xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Edit Profile
              </span>
            </h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">FirstName</span>
              </label>
              <input
                type="text"
                value={firstName}
                className="input input-bordered bg-base-300"
                onChange={(e) => setfirstName(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">lastName</span>
              </label>
              <input
                type="text"
                value={lastName}
                className="input input-borde red bg-base-300"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">PhotoUrl</span>
              </label>
              <input
                type="text"
                value={photoUrl}
                className="input input-borde red bg-base-300"
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">Age</span>
              </label>
              <input
                type="text"
                value={age}
                className="input input-borde red bg-base-300"
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">Gender</span>
              </label>

              <select
                value={gender}
                className="select select-bordered bg-base-300"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">Skills</span>
              </label>

              <input
                type="text"
                value={skillsInput}
                className="input input-bordered bg-base-300"
                placeholder="e.g. React, Node, MongoDB"
                onChange={(e) => {
                  const value = e.target.value;
                  setSkillsInput(value);

                  const skillsArray = value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);

                  setSkills(skillsArray);
                }}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-sm">About</span>
              </label>
              <textarea
                value={about}
                rows={4}
                className="textarea textarea-bordered bg-base-300 resize-none"
                placeholder="Write something about yourself..."
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <p className="text-red-500">{error}</p>

            {toast && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <span>Profile saved successfully.</span>
                </div>
              </div>
            )}

            <button
              className="btn btn-primary w-full mt-5 my-2"
              onClick={saveProfile}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <UserCard
        data={{ firstName, lastName, photoUrl, age, about, gender, skills }}
      />
    </div>
  );
};

export default Editprofile;
