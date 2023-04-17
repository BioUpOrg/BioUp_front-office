export default function Banner() {
  return (
    <div className="home-slider position-relative mb-30">
      <div className="container">
        <div className="home-slide-cover mt-30">
          <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events hero-slider-1 style-4 dot-style-1 dot-style-1-position-1 swiper-backface-hidden">
            <div className="swiper-wrapper">
              <div
                className="swiper-slide swiper-slide-active"
                style={{ width: "1495px" }}
              >
                <div className="single-hero-slider single-animation-wrap">
                  <div className="slider-content">
                    <h1 className="display-2 mb-40">
                      Don t miss amazing grocery deals
                    </h1>
                    <p className="mb-65">Sign up for the daily newsletter</p>
                    <form className="form-subcriber d-flex">
                      <input type="email" placeholder="Your emaill address" />
                      <button className="btn" type="submit">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className="swiper-slide swiper-slide-next"
                style={{ width: "1495px" }}
              >
                <div className="single-hero-slider single-animation-wrap">
                  <div className="slider-content">
                    <h1 className="display-2 mb-40">
                      Fresh Vegetables Big discount
                    </h1>
                    <p className="mb-65">
                      Save up to 50% off on your first order
                    </p>
                    <form className="form-subcriber d-flex">
                      <input type="email" placeholder="Your emaill address" />
                      <button className="btn" type="submit">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal">
              <span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
              <span className="swiper-pagination-bullet"></span>
            </div>
          </div>
          <div className="slider-arrow hero-slider-1-arrow">
            <span className="slider-btn slider-prev slick-arrow custom_prev_i1 swiper-button-disabled">
              <i className="fi-rs-angle-left"></i>
            </span>
            <span className="slider-btn slider-next slick-arrow custom_next_i1">
              <i className="fi-rs-angle-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
