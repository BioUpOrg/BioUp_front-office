import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (

    <div className="home-slider position-relative mb-65 mt-65">
      <div className="container">
        <div className="home-slide-cover mt-30">
          <Slider {...settings}>
            <div>
              <div
                className="single-hero-slider single-animation-wrap p-65"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/slider.png)`,
                }}
              >
                <div className="single-hero-slider single-animation-wrap">
                  <h1 className="display-2 mb-40">
                    Don't miss amazing grocery deals
                  </h1>
                  <p className="mb-65">Sign up for the daily newsletter</p>
                  <form className="form-subcriber d-flex">
                    <input type="email" placeholder="Your emaill address" style={{"width":"500px"}}/>
                    <button className="btn" type="submit">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <div className="single-hero-slider single-animation-wrap p-65" style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/slider1.png)`,
                }}>
                <div className="slider-content">
                  <h1 className="display-2 mb-40">
                    Bio Composts, Big discounts
                  </h1>
                  <p className="mb-65">
                    Save up to 50% off on your first order
                  </p>
                  <form className="form-subcriber d-flex">
                    <input type="email" placeholder="Your emaill address" style={{"width":"500px"}}/>
                    <button className="btn" type="submit">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
