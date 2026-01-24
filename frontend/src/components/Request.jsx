import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { removeoneRequest } from "../utils/requestSlice";


const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest=async (status,_id)=>{

    try{

      await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});

      dispatch(removeoneRequest(_id));

    }catch(err)
    {
      console.log(err);
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/recieved",
        { withCredentials: true }
      );

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {requests?.length === 0 && (
          <p className="text-center text-gray-500">
            No pending requests
          </p>
        )}

        {requests?.map((user) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow-md p-4 flex flex-row items-center gap-4"
          >
            {/* Profile Photo */}
            <img
              src={user.photoUrl}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border"
            />

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-sm text-gray-500">
                {user.age} yrs • {user.gender}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge badge-outline badge-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-sm mt-2 text-gray-600">
                {user.about}
              </p>
            </div>

            
            <div className="flex flex-col gap-2">
              <button className="btn btn-success btn-sm" onClick={()=>{reviewRequest("accept",user._id)}}>
                Accept
              </button>
              <button className="btn btn-error btn-sm" onClick={()=>{reviewRequest("reject",user._id)}}>
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
