import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import {
  addItemToCart,
  decrement,
  getCompostQuantityInCart,
  increment,
} from "../../store/cart";

export default function CompostDetails() {
  const compostDetails = useSelector(
    (state) => state.entities.composts.compostDetails
  );
  const dispatch = useDispatch();

  const handleIncrementOnClick = (compost) => {
    const cartItem = { cartItem: { ...compost }, quantity: 0, type: "compost" };
    dispatch(increment(cartItem));
  };
  const handleDecrementOnClick = (compost) => {
    const cartItem = { cartItem: { ...compost }, quantity: 0, type: "compost" };
    dispatch(decrement(cartItem));
  };
  const addToCartOnClick = (compost) => {
    const cartItem = { cartItem: { ...compost }, quantity: 0, type: "compost" };
    dispatch(addItemToCart(cartItem));
  };

  const quantity = useSelector(getCompostQuantityInCart);

  return (
    <div className="container">
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-xl-10 col-lg-12 m-auto">
              <div className="product-detail accordion-detail">
                <div className="row mb-50 mt-30">
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <img className="img-fluid" src={compostDetails.image} />
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-info pr-30 pl-30">
                      <span
                        className="stock-status out-stock"
                        style={{ backgroundColor: "#ffffff" }}
                      >
                        <h2 className="title-detail">{compostDetails.name}</h2>
                        <div className="product-detail-rating">
                          <div className="product-rate-cover text-end">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (32 reviews)
                            </span>
                          </div>
                        </div>
                        <div className="clearfix product-price-cover">
                          <div className="product-price primary-color float-left">
                            <span className="current-price text-brand">
                              $
                              {compostDetails.discountOffered
                                ? (
                                    compostDetails.quantityWeight *
                                      compostDetails.unitPrice -
                                    (compostDetails.quantityWeight *
                                      compostDetails.unitPrice) /
                                      (100 * compostDetails.discountOffered)
                                  ).toFixed(2)
                                : compostDetails.quantityWeight *
                                  compostDetails.unitPrice}
                            </span>
                            <span>
                              <span className="save-price font-md color3 ml-15">
                                {compostDetails.discountOffered &&
                                  compostDetails.discountOffered}
                                % Off
                              </span>
                              <span className="old-price font-md ml-15"></span>
                              {compostDetails.discountOffered && (
                                <span className="old-price">
                                  $
                                  {compostDetails.quantityWeight *
                                    compostDetails.unitPrice}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="short-desc mb-30">
                          <p className="font-lg">
                            {compostDetails.description}
                          </p>
                        </div>
                        <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                        <div className="detail-extralink">
                          <div className="detail-qty border radius">
                            <NavLink
                              className="qty-down"
                              onClick={() => {
                                handleDecrementOnClick(compostDetails);
                              }}
                            >
                              <i className="fi-rs-angle-small-down"></i>
                            </NavLink>
                            <div className="qty-val">{quantity}</div>
                            <NavLink
                              className="qty-up"
                              onClick={() => {
                                handleIncrementOnClick(compostDetails);
                              }}
                            >
                              <i className="fi-rs-angle-small-up"></i>
                            </NavLink>
                          </div>
                          <div className="product-extra-link2">
                            <button
                              className="button button-add-to-cart"
                              onClick={() => {
                                addToCartOnClick(compostDetails);
                              }}
                            >
                              Add to cart
                            </button>
                            <a
                              aria-label="Add To Wishlist"
                              className="action-btn hover-up"
                            >
                              <i className="fi-rs-heart"></i>
                            </a>
                            <a
                              aria-label="Compare"
                              className="action-btn hover-up"
                            >
                              <i className="fi-rs-shuffle"></i>
                            </a>
                          </div>
                        </div>
                        <ul className="product-meta font-xs color-grey mt-50">
                          {compostDetails.brandName && (
                            <li className="mb-5">
                              brand name:
                              <a href="#"> {compostDetails.brandName}</a>
                            </li>
                          )}
                          {compostDetails.type && (
                            <li className="mb-5">
                              Type:
                              <a href="#" rel="tag" className="me-1">
                                {compostDetails.type}
                              </a>
                            </li>
                          )}
                          {compostDetails.availability && (
                            <li>
                              Availability:
                              <span className="in-stock text-success ml-5">
                                {compostDetails.availability}
                              </span>
                            </li>
                          )}
                        </ul>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <div className="tab-style3">
                    <ul className="nav nav-tabs text-uppercase">
                      <li className="nav-item">
                        <NavLink
                          to="/compost-Details/Description"
                          className="nav-link"
                        >
                          Description
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          to="/compost-Details/Additional-Info"
                          className="nav-link"
                        >
                          Additional info
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/compost-Details/Reviews"
                        >
                          Vendor
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/compost-Details/Reviews"
                        >
                          Reviews (3)
                        </NavLink>
                      </li>
                    </ul>
                    <div className="tab-content shop_info_tab entry-main-content">
                      <Outlet />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
