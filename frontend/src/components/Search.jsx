import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const res = await axios.get(BASE_URL + `/user/search?query=${query}`, {
          withCredentials: true,
        });
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  return (
    <div className="pt-24 px-6 min-h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-400">No users found.</p>
      )}

      <div className="flex flex-wrap gap-6 justify-center">
        {results.map((user) => (
          <UserCard
            key={user._id}
            data={user}
            onAction={() =>
              setResults((prev) => prev.filter((u) => u._id !== user._id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
