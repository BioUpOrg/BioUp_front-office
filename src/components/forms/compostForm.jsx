
import React, { useState } from "react";
import { useRef } from "react";
import {
  createCompost,
  updateCompost,
  getCompost,
  SuccessAlert,
} from "../../services/compostService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function CompostForm() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const { id } = useParams();

  const [compost, setCompost] = useState({
    _id: "",
    image: "",
    name: "",
    description: "",
    quantityWeight: 0,
    unitPrice: 0,
    totalPrice: 0,
    discountOffered: "",
    type: "compost",
    nutrientContent: [],
    brandName: "",
    manufacturer: "",
    certification: "",
    usageInstructions: "",
    expirationDate: "",
    countryOfOrigin: "",
    packagingType: "",
  });

  useEffect(() => {
    if (id) {
      getCompost(id).then((data) => {
        console.log("data: ", data);
        setCompost(data);
      });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "quantityWeight") {
      setCompost((prevCompost) => ({
        ...prevCompost,
        quantityWeight: value,
        totalPrice: prevCompost.unitPrice * value,
      }));
    } else if (name === "unitPrice") {
      setCompost((prevCompost) => ({
        ...prevCompost,
        unitPrice: value,
        totalPrice: prevCompost.quantityWeight * value,
      }));
    } else if (name === "totalPrice") {
      setCompost((prevCompost) => ({
        ...prevCompost,
        totalPrice: value,
        unitPrice:
          prevCompost.quantityWeight !== 0
            ? value / prevCompost.quantityWeight
            : prevCompost.unitPrice,
      }));
    }
    setCompost((prevCompost) => ({ ...prevCompost, [name]: value }));
  };

  const clickFileInput = () => {
    fileInputRef.current.click();
  };
  const handleChangeFile = (event) => {
    setCompost((prevCompost) => ({
      ...prevCompost,
      image: event.target.files[0],
    }));
  };


  const [selectedNutrients, setSelectedNutrients] = useState([]);
  const handleNutrientSelection = (event) => {
    const selectedNutrient = event.target.value;
    setSelectedNutrients((prevSelectedNutrients) => {
      if (prevSelectedNutrients.includes(selectedNutrient)) {
        return prevSelectedNutrients.filter((nutrient) => nutrient !== selectedNutrient);
      } else {
        return [...prevSelectedNutrients, selectedNutrient];
      }
    });
  };

  useEffect(() => {
    // update nutrientContent of compost whenever selectedNutrients changes
    setCompost((prevCompost) => ({
      ...prevCompost,
      nutrientContent: selectedNutrients,
    }));
  }, [selectedNutrients]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("compost form ", compost);
    if (id) {
      await updateCompost(compost._id, compost);
      SuccessAlert("Your compost has been successfully updated");
      navigate("/Dashboard/stats");
    } else {
      await createCompost(compost);
      SuccessAlert("Your compost has been successfully saved");
      navigate("/Dashboard/stats");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="mb-0">Sell your Compost</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="image"
              type="file"
              ref={fileInputRef}
              onChange={handleChangeFile}
              style={{ display: "none" }}
            />

            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <img
                onClick={clickFileInput}
                src={
                  compost.image && typeof compost.image === "object"
                    ? URL.createObjectURL(compost.image)
                    : compost.image
                }
                alt="Compost"
                style={{
                  width: "20rem",
                  height: "20rem",
                  objectFit: "cover",
                  margin: "2rem",
                  border: "1px dashed black",
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={compost.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              type="text"
              name="description"
              value={compost.description}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>quantity or Weight:</label>
                <input
                  type="number"
                  name="quantityWeight"
                  value={compost.quantityWeight}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Unit Price:</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={compost.unitPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Total Price:</label>
                <input
                  type="number"
                  name="totalPrice"
                  value={compost.totalPrice}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>discount Offered:</label>
                <input
                  type="number"
                  max={99}
                  min={1}
                  name="discountOffered"
                  value={compost.discountOffered}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Type:</label>
                <select
                  name="type"
                  value={compost.type}
                  onChange={handleChange}
                >
                  <option value="compost">Compost</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="organic">Organic</option>
                  <option value="non-organic">Non-Organic</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className="form-group"> */}
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
          {/* </div> */}

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="brandName">brandName</label>
                <input
                  type="text"
                  name="brandName"
                  value={compost.brandName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="certification">organic Certification</label>
                <input
                  type="text"
                  name="certification"
                  value={compost.certification}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="usageInstructions">usage Instructions</label>
            <textarea
              type="text"
              name="usageInstructions"
              value={compost.usageInstructions}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="expirationDate">expiration Date</label>
                <input
                  type="Date"
                  name="expirationDate"
                  value={compost.expirationDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="manufacturer">manufacturer</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={compost.manufacturer}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="packagingType">packaging Type</label>
                <input
                  type="text"
                  name="packagingType"
                  value={compost.packagingType}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="countryOfOrigin">country Of Origin</label>
                <input
                  type="text"
                  name="countryOfOrigin"
                  value={compost.countryOfOrigin}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-heading btn-block hover-up"
              name="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
