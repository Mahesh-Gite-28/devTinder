import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeonefeed } from "../utils/feedSlice";
import toast from "react-hot-toast";

const UserCard = ({ data }) => {
  if (!data) return null;

  const { firstName, lastName, photoUrl, about, skills = [], gender, age, _id } = data;
  const dispatch = useDispatch();

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeonefeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
   
    <div className="flex justify-center pt-12">
      <div className="card w-80 bg-base-300 shadow-sm">

        <figure className="h-56">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-full object-cover"
          />
        </figure>

       
        <div className="card-body">

          <h2 className="card-title">
            {firstName} {lastName}
            {age && <div className="badge badge-secondary">{age}</div>}
          </h2>

          {gender && (
            <p className="text-sm capitalize text-gray-300">
              {gender}
            </p>
          )}

          {about && (
            <p className="text-sm text-gray-300">
              {about}
            </p>
          )}

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="card-actions justify-between pt-4">
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleRequest("interested", _id)}
            >
              Interested
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserCard;
