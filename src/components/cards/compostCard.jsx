import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setCompostDetails } from "../../store/composts";
import { addItemToCart } from "../../store/cart";
import { addItemToWishList } from "../../store/wishlist";
import { Rating } from "@mui/material";

export default function CompostCard({ compost }) {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailsOnClick = (compost) => {
    dispatch(setCompostDetails(compost));
    // navigate("/compost-details/Description");
  };

  const addToCartOnClick = (compost) => {
    const cartItem = { cartItem: { ...compost }, quantity: 0, type: "compost" };
    console.log("cartItem: ", cartItem);
    dispatch(addItemToCart(cartItem));
  };

  const handleAddToWishListOnClick = (compost) => {
    dispatch(addItemToWishList(compost));
    // navigate("/compost-details/Description");
  };

  return (
    <div className="col-md-3">
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            {/* <a href="/products/seeds-of-change-organic-quinoe"> */}
            <img className="default-img" src={compost.image} alt="" />
            <img className="hover-img" src={compost.image} alt="" />
            {/* </a> */}
          </div>
          <div className="product-action-1">
            <NavLink
              to={"/compost-details/Description"}
              onClick={() => {
                handleDetailsOnClick(compost);
              }}
              aria-label="Quick view"
              className="action-btn hover-up"
              data-bs-toggle="modal"
            >
              <i className="fi-rs-eye"></i>
            </NavLink>
            <NavLink
            to={"/wishlist"}
            onClick={() => {
              handleAddToWishListOnClick(compost);
            }}
              aria-label="Add To Wishlist"
              className="action-btn hover-up"
            >
              <i className="fi-rs-heart"></i>
            </NavLink>
            <NavLink aria-label="Compare" className="action-btn hover-up">
              <i className="fi-rs-shuffle"></i>
            </NavLink>
          </div>
          <div className="product-badges product-badges-position product-badges-mrg">
            {compost.type && <span className="hot">{compost.type}</span>}
            {compost.availability && (
              <span className="sale">{compost.availability}</span>
            )}
            {compost.discountOffered && (
              <span className="hot">{compost.discountOffered}%</span>
            )}
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <a href="#">armani</a>
          </div>
          <h2>
            <NavLink
              to={"/compost-details/Description"}
              onClick={() => {
                handleDetailsOnClick(compost);
              }}>
              {compost.name}
            </NavLink>
          </h2>
          <Rating
            value={compost.rating}
            readOnly
            sx={{
              fontSize: 18,
            }} 
          />
          <div>
            {compost.brandName ? (
              <span className="font-small text-muted">
                By <a href="#">{compost.brandName}</a>
              </span>
            ) : (
              <span className="font-small text-muted">Unknown brand</span>
            )}
          </div>
          <div className="product-card-bottom">
            <div className="product-price">
              <span>
                $
                {compost.discountOffered
                  ? (
                      compost.quantityWeight * compost.unitPrice -
                      compost.quantityWeight * compost.unitPrice / 100 *
                        compost.discountOffered
                    ).toFixed(2)
                  : compost.quantityWeight * compost.unitPrice}
              </span>
              {compost.discountOffered && (
                <span className="old-price">
                  ${compost.quantityWeight * compost.unitPrice}
                </span>
              )}
            </div>
            <div
              className="add-cart"
              onClick={() => {
                addToCartOnClick(compost);
              }}
            >
              <NavLink className="add" to={"/cart"}>
                <i className="fi-rs-shopping-cart mr-5"> </i> Add
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
