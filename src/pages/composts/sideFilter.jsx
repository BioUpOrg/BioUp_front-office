import { useState } from "react";
import GreenSlider from "../../components/filters/greenSlider";
import { useDispatch } from "react-redux";
import {
  filterCompostsByCategory,
  filterCompostsByNutrients,
  filterCompostsByPrice,
} from "../../store/composts";
import { NavLink } from "react-router-dom";
export default function SideFilter() {
  const dispatch = useDispatch();

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    dispatch(
      filterCompostsByPrice({ minPrice: newValue[0], maxPrice: newValue[1] })
    );
  };

  const handleCategoryClick = (type) => {
    dispatch(filterCompostsByCategory({ type }));
  };

  const [selectedNutrients, setSelectedNutrients] = useState([]);

  const handleNutrientSelection = (event) => {
    const selectedNutrient = event.target.value;
    setSelectedNutrients((prevSelectedNutrients) => [
      ...prevSelectedNutrients,
      selectedNutrient,
    ]);
    dispatch(filterCompostsByNutrients({ nutrients: selectedNutrients }));
  };

  //   const handleFilterComposts = () => {
  //     dispatch(filterCompostsByNutrients({ nutrients: selectedNutrients }));
  //   };

  return (
    <>
      <div class="col-lg-1-5 primary-sidebar sticky-sidebar">
        <div class="sidebar-widget widget-category-2 mb-30">
          <h5 class="section-title style-1 mb-30">Category</h5>
          <ul>
            <li onClick={() => handleCategoryClick("all")}>
              <NavLink>All</NavLink>
            </li>
            <li onClick={() => handleCategoryClick("compost")}>
              <NavLink>Composts</NavLink>
              <span class="count">30</span>
            </li>
            <li onClick={() => handleCategoryClick("fertilizer")}>
              <NavLink>Fertilizers</NavLink>
              <span class="count">35</span>
            </li>
            <li onClick={() => handleCategoryClick("organic")}>
              <NavLink>Organic</NavLink>
              <span class="count">42</span>
            </li>
            <li onClick={() => handleCategoryClick("non-organic")}>
              <NavLink>Non Organic</NavLink>
              <span class="count">42</span>
            </li>
          </ul>
        </div>
        <div class="sidebar-widget price_range range mb-30">
          <h5 class="section-title style-1 mb-30">Fill by price</h5>
          <GreenSlider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
          />
          <div class="list-group">
            <div class="list-group-item mb-10 mt-10">
              <label class="fw-900">Nutrients</label>
              <div className="custom-checkbox">
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nitrogen"
                    value="nitrogen"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="nitrogen"
                    style={{ textTransform: "capitalize" }}
                  >
                    Nitrogen (N)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="phosphorus"
                    value="phosphorus"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="phosphorus"
                    style={{ textTransform: "capitalize" }}
                  >
                    Phosphorus (P)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="potassium"
                    value="potassium"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="potassium"
                    style={{ textTransform: "capitalize" }}
                  >
                    Potassium (K)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="calcium"
                    value="calcium"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="calcium"
                    style={{ textTransform: "capitalize" }}
                  >
                    Calcium (Ca)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="magnesium"
                    value="magnesium"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="magnesium"
                    style={{ textTransform: "capitalize" }}
                  >
                    Magnesium (Mg)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sulfur"
                    value="sulfur"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="sulfur"
                    style={{ textTransform: "capitalize" }}
                  >
                    Sulfur (S)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="iron"
                    value="iron"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="iron"
                    style={{ textTransform: "capitalize" }}
                  >
                    Iron (Fe)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="manganese"
                    value="manganese"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="manganese"
                    style={{ textTransform: "capitalize" }}
                  >
                    Manganese (Mn)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Zinc"
                    value="Zinc"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    class="form-check-label"
                    for="Zinc"
                    style={{ "text-transform": "capitalize" }}
                  >
                    Zinc (Zn)
                  </label>
                  <br />
                </div>

                <div>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Copper"
                    value="Copper"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    class="form-check-label"
                    for="Copper"
                    style={{ "text-transform": "capitalize" }}
                  >
                    Copper (Cu)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Boron"
                    value="Boron"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    class="form-check-label"
                    for="Boron"
                    style={{ "text-transform": "capitalize" }}
                  >
                    Boron (B)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Molybdenum"
                    value="Molybdenum"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    class="form-check-label"
                    for="Molybdenum"
                    style={{ "text-transform": "capitalize" }}
                  >
                    Molybdenum (Mo)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Chlorine"
                    value="Chlorine"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    class="form-check-label"
                    for="Chlorine"
                    style={{ "text-transform": "capitalize" }}
                  >
                    Chlorine (Cl)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Nickel"
                    value="Nickel"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    class="form-check-label"
                    for="Nickel"
                    style={{ "text-transform": "capitalize" }}
                  >
                    Nickel (Ni)
                  </label>
                  <br />
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="Other"
                    value="Other"
                    onChange={handleNutrientSelection}
                  />
                  <label
                    class="form-check-label"
                    for="Other"
                    style={{ "text-transform": "capitalize" }}
                  >
                    Other
                  </label>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
