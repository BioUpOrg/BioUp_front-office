import React from 'react';

export default function Home() {
  return (
    <div>
      <header className="header"></header>
      <main className="main">
        <div className="page-header breadcrumb-wrap d-none">
          <div className="container">
            <div className="breadcrumb">
              <a href="index.html"></a>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <section className="home-slider position-relative mb-30">
          <div className="container">
            <div className="home-slide-cover mt-30">
              <div className="swiper hero-slider-1 style-4 dot-style-1 dot-style-1-position-1">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div
                      className="single-hero-slider single-animation-wrap"
                      
                    >
                      <div className="slider-content">
                        <h1 className="display-2 mb-40">
                          Don’t miss amazing
                          <br />
                          grocery deals
                        </h1>
                        <p className="mb-65">
                          Sign up for the daily newsletter
                        </p>
                        <form className="form-subcriber d-flex">
                          <input
                            type="email"
                            placeholder="Your emaill address"
                          />
                          <button className="btn" type="submit">
                            Subscribe
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div
                      className="single-hero-slider single-animation-wrap"
                      
                    >
                      <div className="slider-content">
                        <h1 className="display-2 mb-40">
                          Fresh Vegetables
                          <br />
                          Big discount
                        </h1>
                        <p className="mb-65">
                          Save up to 50% off on your first order
                        </p>
                        <form className="form-subcriber d-flex">
                          <input
                            type="email"
                            placeholder="Your emaill address"
                          />
                          <button className="btn" type="submit">
                            Subscribe
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              <div className="slider-arrow hero-slider-1-arrow">
                <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
                  <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_i1">
                  <i className="fi-rs-angle-right"></i>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="popular-categories section-padding">
          <div className="container wow animate__fadeIn animate__animated">
            <div className="section-title">
              <div className="title">
                <h3>Featured Categories</h3>
                <ul className="list-inline nav nav-tabs links">
                  <li className="list-inline-item nav-item">
                    <a className="nav-link" href="products">
                      Cake &amp; Milk
                    </a>
                  </li>
                  <li className="list-inline-item nav-item">
                    <a className="nav-link" href="products">
                      Coffes &amp; Teas
                    </a>
                  </li>
                  <li className="list-inline-item nav-item">
                    <a className="nav-link active" href="products">
                      Pet Foods
                    </a>
                  </li>
                  <li className="list-inline-item nav-item">
                    <a className="nav-link" href="products">
                      Vegetables
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="carausel-10-columns-cover position-relative">
              <div className="carausel-10-columns" id="carausel-10-columns">
                <div className="swiper custom-className">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="card-2 bg-9 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-13.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Cake &amp; Milk</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-10 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-12.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Oganic Kiwi</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-11 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-11.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Peach</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-12 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-9.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Red Apple</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-13 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-3.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Snack</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-14 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-1.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Vegetables</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-15 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-2.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Strawberry</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-12 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-4.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Black plum</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-10 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-5.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Custard apple</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-12 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-14.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Coffe &amp; Tea</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="card-2 bg-11 wow animate__animated animate__fadeInUp">
                        <figure className="img-hover-scale overflow-hidden">
                          <a>
                            <img src="assets/imgs/shop/cat-15.png" alt="" />
                          </a>
                        </figure>
                        <h6>
                          <a>Headphone</a>
                        </h6>
                        <span>26 items</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"
                  id="carausel-10-columns-arrows"
                >
                  <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-arrow-small-left"></i>
                  </span>
                  <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-arrow-small-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="banners mb-25">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div
                  className="banner-img wow animate__animated animate__fadeInUp"
                  data-wow-delay="0"
                >
                  <img src="assets/imgs/banner/banner-1.png" alt="" />
                  <div className="banner-text">
                    <h4>
                      Everyday Fresh &amp;
                      <br />
                      Clean with Our
                      <br />
                      Products
                    </h4>
                    <a className="btn btn-xs" href="products">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div
                  className="banner-img wow animate__animated animate__fadeInUp"
                  data-wow-delay=".2s"
                >
                  <img src="assets/imgs/banner/banner-2.png" alt="" />
                  <div className="banner-text">
                    <h4>
                      Make your Breakfast
                      <br />
                      Healthy and Easy
                    </h4>
                    <a className="btn btn-xs" href="products">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-md-none d-lg-flex">
                <div
                  className="banner-img mb-sm-0 wow animate__animated animate__fadeInUp"
                  data-wow-delay=".4s"
                >
                  <img src="assets/imgs/banner/banner-3.png" alt="" />
                  <div className="banner-text">
                    <h4>
                      The best Organic
                      <br />
                      Products Online
                    </h4>
                    <a className="btn btn-xs" href="products">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="product-tabs section-padding position-relative">
          <div className="container">
            <div className="col-lg-12">
              <div className="section-title style-2 wow animate__animated animate__fadeIn">
                <h3>Popular Products</h3>
                <ul className="nav nav-tabs links" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active">All</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link">Featured</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link">Popular</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link">New added</button>
                  </li>
                </ul>
              </div>
              <div className="tab-content wow fadeIn animated">
                <div className="tab-pane fade show active">
                  <div className="product-grid-4 row"></div>
                </div>
                <div className="tab-pane fade">
                  <div className="product-grid-4 row"></div>
                </div>
                <div className="tab-pane fade">
                  <div className="product-grid-4 row"></div>
                </div>
                <div className="tab-pane fade">
                  <div className="product-grid-4 row"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding pb-5">
          <div className="container">
            <div className="section-title wow animate__animated animate__fadeIn">
              <h3 className="">Daily Best Sells</h3>
              <ul className="nav nav-tabs links" id="myTab-1" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active">Featured</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link">Popular</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link">New added</button>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-lg-3 d-none d-lg-flex wow animate__animated animate__fadeIn">
                <div className="banner-img style-2">
                  <div className="banner-text">
                    <h2 className="mb-100">Bring nature into your home</h2>
                    <a className="btn btn-xs" href="products">
                      Shop Now <i className="fi-rs-arrow-small-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-12">
                <div
                  className="tab-content wow fadeIn animated"
                  id="myTabContent"
                >
                  <div className="tab-pane fade show active">
                    <div className="carausel-4-columns-cover card-product-small arrow-center position-relative">
                      <div className="swiper custom-className">
                        <div className="swiper-wrapper"></div>
                      </div>
                      <div className="slider-arrow slider-arrow-2 carausel-4-columns-arrow">
                        <span className="slider-btn slider-prev slick-arrow custom_prev_f">
                          <i className="fi-rs-arrow-small-left"></i>
                        </span>
                        <span className="slider-btn slider-next slick-arrow custom_next_f">
                          <i className="fi-rs-arrow-small-right"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade">
                    <div className="carausel-4-columns-cover card-product-small arrow-center position-relative">
                      <div className="swiper custom-className">
                        <div className="swiper-wrapper"></div>
                      </div>
                      <div className="slider-arrow slider-arrow-2 carausel-4-columns-arrow">
                        <span className="slider-btn slider-prev slick-arrow custom_prev_t">
                          <i className="fi-rs-arrow-small-left"></i>
                        </span>
                        <span className="slider-btn slider-next slick-arrow custom_next_t">
                          <i className="fi-rs-arrow-small-right"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade">
                    <div className="carausel-4-columns-cover card-product-small arrow-center position-relative">
                      <div className="swiper custom-className">
                        <div className="swiper-wrapper"></div>
                      </div>
                      <div className="slider-arrow slider-arrow-2 carausel-4-columns-arrow">
                        <span className="slider-btn slider-prev slick-arrow custom_prev_n">
                          <i className="fi-rs-arrow-small-left"></i>
                        </span>
                        <span className="slider-btn slider-next slick-arrow custom_next_n">
                          <i className="fi-rs-arrow-small-right"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding pb-5">
          <div className="container">
            <div
              className="section-title wow animate__animated animate__fadeIn"
              data-wow-delay="0"
            >
              <h3 className="">Deals Of The Day</h3>
              <a className="show-all" href="products">
                All Deals<i className="fi-rs-angle-right"></i>
              </a>
            </div>
            <div className="row"></div>
          </div>
        </section>
        <section className="section-padding mb-30">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 wow animate__animated animate__fadeInUp"
                data-wow-delay="0"
              >
                <h4 className="section-title style-1 mb-30 animated animated">
                  Top Selling
                </h4>
                <div className="product-list-small animated animated"></div>
              </div>
              <div
                className="col-xl-3 col-lg-4 col-md-6 mb-md-0 wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
              >
                <h4 className="section-title style-1 mb-30 animated animated">
                  Trending Products
                </h4>
                <div className="product-list-small animated animated"></div>
              </div>
              <div
                className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-lg-block wow animate__animated animate__fadeInUp"
                data-wow-delay=".2s"
              >
                <h4 className="section-title style-1 mb-30 animated animated">
                  Recently added
                </h4>
                <div className="product-list-small animated animated"></div>
              </div>
              <div
                className="col-xl-3 col-lg-4 col-md-6 mb-sm-5 mb-md-0 d-none d-xl-block wow animate__animated animate__fadeInUp"
                data-wow-delay=".3s"
              >
                <h4 className="section-title style-1 mb-30 animated animated">
                  Top Rated
                </h4>
                <div className="product-list-small animated animated"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
