import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCompostDetails } from "../../store/composts";

export default function CompostCard({ compost }) {
//
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const handleClick = (compost) => {
    dispatch(setCompostDetails(compost));
    navigate("/compost-details/Description");
  };


  return (
    <div className="col-lg-1-5 col-md-4 col-12 col-sm-6"  onClick={()=>{handleClick(compost)}}>
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            {/* <a href="/products/seeds-of-change-organic-quinoe"> */}
            <img className="default-img" src={compost.image} alt="" />
            <img className="hover-img" src={compost.image} alt="" />
            {/* </a> */}
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
            <a href="/products/seeds-of-change-organic-quinoe">
              {compost.name}
            </a>
          </h2>
          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted"> (90)</span>
          </div>
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
                ${compost.discountOffered
                  ? (
                      (compost.quantityWeight * compost.unitPrice) -
                      (compost.quantityWeight * compost.unitPrice) /
                        (100 * compost.discountOffered)
                    ).toFixed(2)
                  : (compost.quantityWeight * compost.unitPrice)}
              </span>
              {compost.discountOffered && (
                <span className="old-price">
                  ${compost.quantityWeight * compost.unitPrice}
                </span>
              )}
            </div>
            <div className="add-cart">
              <a className="add" href="/">
                <i className="fi-rs-shopping-cart mr-5"> </i> Add
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
