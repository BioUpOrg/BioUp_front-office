import { useDispatch } from "react-redux";
import {
  sortCompostsByPriceHighToLow,
  sortCompostsByPriceLowToHigh,
  sortCompostsByName_Aa_To_Zz,
  sortCompostsByName_Zz_To_Aa,
} from "../../store/composts";

import {AiOutlineCamera} from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function TopFilter() {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    switch (event.target.value) {
      case "Low_To_High":
        dispatch(sortCompostsByPriceLowToHigh());
        break;
      case "High_To_Low":
        dispatch(sortCompostsByPriceHighToLow());
        break;
      case "Aa__Zz":
        dispatch(sortCompostsByName_Aa_To_Zz());
        break;
      case "Zz__Aa":
        dispatch(sortCompostsByName_Zz_To_Aa());
        break;
      default:
        // handle default case
        break;
    }
  };
  return (
    <>
      <div class="shop-product-fillter">
        <div class="totall-product">
          <p>
            We found<strong class="text-brand">20</strong>items for you!
          </p>
        </div>
        <div class="sort-by-product-area">
        <div class="sort-by-cover mr-10">
            <div class="sort-by-product-wrap">
              <div class="sort-by">
              <NavLink to={"/AIWebCam"}>
                <AiOutlineCamera style={{ fontSize: "1.5rem" }}/>
              </NavLink>
              </div>
            </div>
          </div>
          <div class="sort-by-cover mr-10">
            <div class="sort-by-product-wrap">
              <div class="sort-by">
                <span>
                  <i class="fi-rs-apps"></i>Show:
                </span>
              </div>
              <div class="sort-by-dropdown-wrap custom-select">
                <select>
                  <option value="12">20</option>
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>
          <div class="sort-by-cover">
            <div class="sort-by-product-wrap">
              <div class="sort-by">
                <span>
                  <i class="fi-rs-apps-sort"></i>Sort by:
                </span>
              </div>
              <div class="sort-by-dropdown-wrap custom-select">
                <select onChange={handleSortChange}>
                  <option value="">Defaults</option>
                  <option value="Low_To_High">Price (Low To High)</option>
                  <option value="High_To_Low">Price (High To Low)</option>
                  <option value="Aa__Zz">Name (Aa -- Zz)</option>
                  <option value="Zz__Aa">Name (Zz -- Aa)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
