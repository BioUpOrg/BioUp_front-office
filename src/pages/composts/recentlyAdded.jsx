import { useEffect, useState } from "react";
import { getRecentlyAddedComposts } from "../../services/compostService";

import CompostItem from "./compostItem";

export default function RecentlyAdded() {
  const [recentlyAddedComposts, setRecentlyAddedComposts] = useState([]);
  useEffect(() => {
    async function fetchRecentlyAddedComposts() {
      const response = await getRecentlyAddedComposts();
      setRecentlyAddedComposts(response);
    }

    fetchRecentlyAddedComposts();
  }, []);
  return (
    <div className="col-md-3">
      <h4 className="section-title style-1 mb-30">
      Recently Added
      </h4>
      {recentlyAddedComposts.map((compost) => (
        <CompostItem key={compost._id} compost={compost} />
      ))}
    </div>
  );
}
