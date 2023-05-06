import React from "react";
import { shallow, configure  } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import CompostCard from "../../components/cards/compostCard";
import { setCompostDetails } from "../../store/composts";
import { addItemToCart } from "../../store/cart";
import { addItemToWishList } from "../../store/wishlist";
configure({ adapter: new Adapter() });

describe("CompostCard component", () => {
  const compost = {
    name: "Test compost",
    image: "test-image.jpg",
    rating: 4,
    quantityWeight: 1,
    unitPrice: 10,
    discountOffered: 20,
    type: "Organic",
    availability: "In stock",
    brandName: "Test brand",
  };

  it("renders compost name", () => {
    const wrapper = shallow(<CompostCard compost={compost} />);
    expect(wrapper.find("h2").text()).toEqual(compost.name);
  });

  it("dispatches setCompostDetails on details button click", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<CompostCard compost={compost} dispatch={dispatch} />);
    wrapper.find(".fi-rs-eye").simulate("click");
    expect(dispatch).toHaveBeenCalledWith(setCompostDetails(compost));
  });

  it("dispatches addItemToCart on add to cart button click", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<CompostCard compost={compost} dispatch={dispatch} />);
    wrapper.find(".add-cart").simulate("click");
    expect(dispatch).toHaveBeenCalledWith(
      addItemToCart({ cartItem: { ...compost }, quantity: 0, type: "compost" })
    );
  });

  it("dispatches addItemToWishList on add to wishlist button click", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<CompostCard compost={compost} dispatch={dispatch} />);
    wrapper.find(".fi-rs-heart").simulate("click");
    expect(dispatch).toHaveBeenCalledWith(addItemToWishList(compost));
  });
});
