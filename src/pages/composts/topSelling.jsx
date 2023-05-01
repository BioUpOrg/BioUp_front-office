import { useEffect, useState } from "react";
import { getTopSelledComposts } from "../../services/compostService";

import CompostItem from "./compostItem";

export default function TopSelled() {
  const [topSelledComposts, setTopSelledComposts] = useState([]);
  useEffect(() => {
    async function fetchTopSelledComposts() {
      const response = await getTopSelledComposts();
      console.log("response: ", response);
      setTopSelledComposts(response);
    }

    fetchTopSelledComposts();
  }, []);

  return (
    <div className="col-md-3 offset-md-1">
      <h4 className="section-title style-1 mb-30">
        Top Selling
      </h4>
      {topSelledComposts.map((compost) => (
        <CompostItem key={compost._id} compost={compost} />
      ))}
    </div>
  );
}
