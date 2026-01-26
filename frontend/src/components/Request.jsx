import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeoneRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const [loading, setLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeoneRequest(_id));
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/recieved",
        { withCredentials: true }
      );

      dispatch(addRequests(res?.data?.data || []));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-200 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">

        {requests.length === 0 && (
          <p className="text-center text-gray-500">
            No pending requests
          </p>
        )}

        {requests.map((user) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow-md p-4 flex flex-row items-center gap-4"
          >
            <img
              src={user.photoUrl}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-sm text-gray-500">
                {user.age} yrs • {user.gender}
              </p>

              {user.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline badge-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {user.about && (
                <p className="text-sm mt-2 text-gray-600">
                  {user.about}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() =>
                  reviewRequest("accept", user._id)
                }
              >
                Accept
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() =>
                  reviewRequest("reject", user._id)
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Request;
