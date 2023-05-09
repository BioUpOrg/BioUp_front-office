import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { increment } from "../../store/slices/cartSlice";
import { deleteProduct, getProducts } from "../../../src/services/api";
import { Icon } from '@iconify/react';
import { addItemToWishList } from "../../store/wishlist";
import { addItemToCart } from "../../store/cart";

function Product(props) {
  const [product,] = useState(props.product);
  const [likes, setLikes] = useState(props.product.like);
  const dispatch = useDispatch();
  const like = () => {
    setLikes(likes + 1);
  };
  const deleteProd = async (id) => {
    const result = window.confirm("Are you sure you want to delete?");
  if (result) {
    await deleteProduct(id);
    getProducts();
   }
}
  const addToCart = (p) => {
    dispatch(increment(p));
  };
  useEffect(() => {
    console.log("Likes Update");
  }, []);
  const className = likes > 5 ?"bestProduct mx-auto my-2":"mx-auto my-2" ;
  
  //add to cart and wishlist
  const handleAddToWishListOnClick = (product) => {
    dispatch(addItemToWishList(product));
  };

  const addToCartOnClick = (product) => {
    const cartItem = { cartItem: { ...product }, quantity: 0, type: "product" };
    console.log("cartItem: ", cartItem);
    dispatch(addItemToCart(cartItem));
  };

  return (
    <div className="col-lg-1-5 col-md-4 col-12 col-sm-6"  >
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            {/* <a href="/products/seeds-of-change-organic-quinoe"> */}
            <img className="default-img" src={product.pic} alt="" />
            <img className="hover-img" src={product.pic} alt="" />
            {/* </a> */}
          </div>
          <div className="product-action-1">
            <NavLink to={`/products/${product._id}`}
              aria-label="Quick view"
              className="action-btn hover-up"
              data-bs-toggle="modal"
            >
              <i className="fi-rs-eye"></i>
            </NavLink>
            <NavLink
            to={"/wishlist"}
            onClick={() => {
              handleAddToWishListOnClick(product);
            }}
              aria-label="Add To Wishlist"
              className="action-btn hover-up"
            >
              <i className="fi-rs-heart"></i>
            </NavLink>             
            <a aria-label="Compare" className="action-btn hover-up">
              <i className="fi-rs-shuffle"></i>
            </a>
          </div>
          <div className="product-badges product-badges-position product-badges-mrg">
            {product.type && <span className="hot">{product.type}</span>}
            {product.availability && (
              <span className="sale">{product.availability}</span>
            )}
            {product.discountOffered && (
              <span className="hot">{product.discountOffered}%</span>
            )}
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <a href="#">armani</a>
          </div>
          <h2>
          <Link to={`/products/${product._id}`}>{product.name}</Link>

          </h2>
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (90)</span>
          </div>
          <div>
            {product.brandName ? (
              <span className="font-small text-muted">
                By <a href="#">{product.brandName}</a>
              </span>
            ) : (
              <span className="font-small text-muted">Unknown brand</span>
            )}
          </div>
          <div className="product-card-bottom">
            <div className="product-unitunitPrice">
              <span>
                ${product.discountOffered
                  ? (
                      (product.quantityWeightWeight * product.unitunitunitPrice) -
                      (product.quantityWeightWeight * product.unitunitunitPrice) /
                        (100 * product.discountOffered)
                    ).toFixed(2)
                  : (product.quantityWeightWeight * product.unitunitunitPrice)}
              </span>
              {product.discountOffered && (
                <span className="old-unitunitPrice">
                  ${product.quantityWeightWeight * product.unitunitunitPrice}
                </span>
              )}
            </div>
            <div
              className="add-cart"
              onClick={() => {
                addToCartOnClick(product);
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

export default Product;
