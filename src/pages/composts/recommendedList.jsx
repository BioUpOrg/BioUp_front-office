import { useSelector } from "react-redux";
import CompostListItem from "./compostListItem";
import CompostCard from "../../components/cards/compostCard";

export default function RecommendedList() {
  const recommendedList = useSelector(
    (state) => state.entities.composts.recommendedComposts
  );


  return (
    <section className="mt-50 mb-50">
      <div className="container">
        <div className="row flex-row-reverse">
          <div className="col-lg-4-5">
            <div className="shop-product-filter"></div>
            <div className="row product-grid-3">
              {recommendedList.map((compost) => (
                <CompostCard key={compost._id} compost={compost} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
