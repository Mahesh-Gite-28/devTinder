import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addfeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getfeed = async () => {

    try {
      const userfeed = await axios.get(
        BASE_URL + "/feed",
        { withCredentials: true }
      );

      dispatch(addfeed(userfeed.data));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (feed.length === 0) {
      getfeed();
    }
  }, [feed.length]);

  if (feed.length === 0) {
    return <p>Loading feed...</p>;
  }

  return (
    <div>
      <UserCard data={feed[0]} />
    </div>
  );

};


export default Feed;
