import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeonefeed } from "../utils/feedSlice";

const UserCard = ({ data, onAction }) => {
  if (!data) return null;

  const {
    firstName,
    lastName,
    photoUrl,
    about,
    skills = [],
    gender,
    age,
    _id,
    membershipType,
  } = data;

  const dispatch = useDispatch();

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      // 🔥 If Search page
      if (onAction) {
        onAction();
      }
      // 🔥 If Feed page
      else {
        dispatch(removeonefeed(_id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center pt-12">
      <div
        className={`card w-80 bg-base-300 shadow-md transition-all duration-300 overflow-hidden rounded-2xl
  ${
    membershipType === "Gold"
      ? "border-2 border-yellow-400 shadow-yellow-500/30"
      : membershipType === "Silver"
        ? "border-2 border-gray-300 shadow-gray-400/20"
        : "border border-neutral-700"
  }`}
      >
        {/* Badge Top Right */}
        {membershipType === "Gold" && (
          <img
            src="/Gold.png"
            alt="Gold Badge"
            className="absolute top-2 right-2 w-10"
          />
        )}

        {membershipType === "Silver" && (
          <img
            src="/Silver.png"
            alt="Silver Badge"
            className="absolute top-2 right-2 w-10"
          />
        )}

        <figure className="h-56">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title flex items-center gap-2 flex-wrap">
            {firstName} {lastName}
            {membershipType === "Gold" && (
              <span className="text-yellow-400 font-bold text-sm">
                Gold Member
              </span>
            )}
            {membershipType === "Silver" && (
              <span className="text-gray-400 font-bold text-sm">
                Silver Member
              </span>
            )}
            {age && <div className="badge badge-secondary">{age}</div>}
          </h2>

          {gender && (
            <p className="text-sm capitalize text-gray-300">{gender}</p>
          )}

          {about && <p className="text-sm text-gray-300">{about}</p>}

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {skills.map((skill, index) => (
                <span key={index} className="badge badge-outline">
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
