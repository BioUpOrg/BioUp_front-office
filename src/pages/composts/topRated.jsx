import { useEffect, useState } from "react";
import { getTopRatedComposts } from "../../services/compostService";

import CompostItem from "./compostItem";

export default function TopRated() {
  const [topComposts, setTopComposts] = useState([]);
  useEffect(() => {
    async function fetchTopComposts() {
      const response = await getTopRatedComposts();
      setTopComposts(response);
    }

    fetchTopComposts();
  }, []);

  return (
    <div className="col-md-3 offset-md-1">
      <h4 className="section-title style-1 mb-30">
        Top Rated
      </h4>
      {topComposts.map((compost) => (
        <CompostItem key={compost._id} compost={compost} />
      ))}
    </div>
  );
}
