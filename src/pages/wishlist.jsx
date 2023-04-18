import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, remove, selectWishList } from "../store/wishlist";
import { addItemToCart } from "../store/cart";
import { NavLink } from "react-router-dom";

function WishList() {
  const dispatch = useDispatch();

  const wishListItems = useSelector(selectWishList);

  const handleAddToCartOnClick = (compost) => {
    const cartItem = { cartItem: { ...compost }, quantity: 0, type: "compost" };
    dispatch(addItemToCart(cartItem));
  };

  const handleRemoveOnClick = (e) => {
    dispatch(remove(e));
  };
  const handleClearOnClick = () => {
    dispatch(clear());
  };

  return (
    <section class="mt-50 mb-50">
      <div class="container">
        <div class="row">
          <div class="col-xl-10 col-lg-12 m-auto">
            <div class="table-responsive shopping-summery">
              <table class="table table-wishlist">
                <thead>
                  <tr class="main-heading">
                    <th class="custome-checkbox start pl-30" colspan="2">
                      Product
                    </th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock Status</th>
                    <th scope="col">Action</th>
                    <th scope="col" class="end">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishListItems &&
                    wishListItems.map((e) => (
                      <tr class="pt-30">
                        <td class="image product-thumbnail pt-40">
                          <img src={e.image} />
                        </td>
                        <td class="product-des product-name">
                          <h6 class="product-name mb-10">
                            <a>{e.name}</a>
                          </h6>
                          <div class="product-rate-cover">
                            <div class="product-rate d-inline-block">
                              <div
                                class="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span class="font-small ml-5 text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                        </td>
                        <td class="price" data-title="Price">
                          <h3 class="text-brand">${e.unitPrice}</h3>
                        </td>
                        <td class="text-center detail-info" data-title="Stock">
                          <span class="stock-status in-stock mb-0">
                            {e.availability}
                          </span>
                        </td>
                        <td class="text-right" data-title="Cart">
                          <button
                            class="btn btn-sm"
                            onClick={() => {
                              handleAddToCartOnClick(e);
                            }}
                          >
                            Add to cart
                          </button>
                        </td>
                        <td class="action" data-title="Remove">
                          <NavLink
                            onClick={() => {
                              handleRemoveOnClick(e);
                            }}
                            
                          >
                            <i class="fi-rs-trash" ></i>
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div class="text-right">
                <span
                  class="clear-btn"
                  onClick={() => {
                    handleClearOnClick();
                  }}
                >
                  Clear All
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WishList;
