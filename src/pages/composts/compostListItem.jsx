import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setCompostDetails } from "../../store/composts";
// import { addItemToCart } from "../../store/cart";
// import { addItemToWishList } from "../../store/wishlist";
import { Rating } from "@mui/material";

export default function CompostListItem({ compost }) {
  return (
    <div className="product-list mb-30">
      <div className="product-cart-wrap">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <div className="product-img-inner">
              <img
                className="default-img"
                src={compost.image}
                alt=""
              />
            </div>
          </div>
          <div className="product-action-1">
            <a
              aria-label="Quick view"
              className="action-btn hover-up"
              data-bs-toggle="modal"
            >
              <i className="fi-rs-eye"></i>
            </a>
            <a aria-label="Add To Wishlist" className="action-btn hover-up">
              <i className="fi-rs-heart"></i>
            </a>
            <a aria-label="Compare" className="action-btn hover-up">
              <i className="fi-rs-shuffle"></i>
            </a>
          </div>
          <div className="product-badges product-badges-position product-badges-mrg">
            <span className="hot">Hot</span>
            <span className="sale">Sale</span>
            <span className="hot">14%</span>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <a href="/products">armani</a>
          </div>
          <h2>
            <a href="/1">{compost.name}</a>
          </h2>
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (4.0)</span>
            <span className="ml-30">500g</span>
          </div>
          <p className="mt-15 mb-15">
          {compost.description}
          </p>
          <div className="product-price">
            <span>$238.85 </span>
            <span className="old-price">$ 245.8</span>
          </div>
          <p className="mt-15">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
            rem officia, corrupti reiciendis minima nisi modi, quasi, odio minus
            dolore impedit fuga eum eligendi? Officia doloremque facere quia.
            Voluptatum, accusantium!
          </p>
          <div className="mt-30 d-flex align-items-center">
            <a aria-label="Add To Cart" className="btn">
              <i className="fi-rs-shopping-bag-add"></i>Add to Cart
            </a>
            <a className="add-wishlish ml-30 text-body font-sm font-heading font-weight-bold">
              <i className="fi-rs-shuffle mr-5"></i>Add Compare
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
