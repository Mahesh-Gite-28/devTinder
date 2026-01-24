import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addconnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const userconnection = useSelector((store) => store.connections);

  const myconnections = async () => {
    try {
      const getconnections = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );

      dispatch(addconnections(getconnections?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    myconnections();
  }, []);

  if (!userconnection) return null;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Connections
      </h2>

      {/* Wrapper to keep cards in middle */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {userconnection.length === 0 && (
          <p className="text-center text-gray-500">
            No connections yet
          </p>
        )}

        {userconnection.map((connection) => (
          <div
            key={connection._id}
            className="card bg-base-100 shadow-md p-4 flex flex-row items-center gap-4"
          >
            {/* Profile Image */}
            <img
              src={connection.photoUrl}
              alt="profile"
              className="w-16 h-16 rounded-full object-cover border"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {connection.firstName} {connection.lastName}
              </h3>

              <p className="text-sm text-gray-500">
                {connection.age} yrs • {connection.gender}
              </p>

              {/* Skills */}
              {connection.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {connection.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline badge-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* About */}
              {connection.about && (
                <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                  {connection.about}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
