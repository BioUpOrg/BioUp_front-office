export default function Reviews() {
    return (
        <div >
            <div className="comments-area">
              <div className="row">
                <div className="col-lg-8">
                  <h4 className="mb-30">Customer questions &amp; answers</h4>
                  <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                      <div className="user justify-content-between d-flex">
                        <div className="thumb text-center">
                          <img src="/assets/imgs/blog/author-2.png" alt="" />
                          <h6>
                            <a href="#">Jacky Chan</a>
                          </h6>
                          <p className="font-xxs">Since 2012</p>
                        </div>
                        <div className="desc">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{ "width": "90%" }}
                            ></div>
                          </div>
                          <p>
                            Thank you very fast shipping from Poland only 3days.
                          </p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <p className="font-xs mr-30">
                                December 4, 2020 at 3:12 pm
                              </p>
                              <a href="#" className="text-brand btn-reply">
                                Reply<i className="fi-rs-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="single-comment justify-content-between d-flex">
                      <div className="user justify-content-between d-flex">
                        <div className="thumb text-center">
                          <img src="/assets/imgs/blog/author-3.png" alt="" />
                          <h6>
                            <a href="#">Ana Rosie</a>
                          </h6>
                          <p className="font-xxs">Since 2008</p>
                        </div>
                        <div className="desc">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{ "width": "90%" }}
                            ></div>
                          </div>
                          <p>Great low price and works well.</p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <p className="font-xs mr-30">
                                December 4, 2020 at 3:12 pm
                              </p>
                              <a href="#" className="text-brand btn-reply">
                                Reply<i className="fi-rs-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="single-comment justify-content-between d-flex">
                      <div className="user justify-content-between d-flex">
                        <div className="thumb text-center">
                          <img src="/assets/imgs/blog/author-4.png" alt="" />
                          <h6>
                            <a href="#">Steven Keny</a>
                          </h6>
                          <p className="font-xxs">Since 2010</p>
                        </div>
                        <div className="desc">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{ "width": "90%" }}
                            ></div>
                          </div>
                          <p>
                            Authentic and Beautiful, Love these way more than
                            ever expected They are Great earphones
                          </p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <p className="font-xs mr-30">
                                December 4, 2020 at 3:12 pm
                              </p>
                              <a href="#" className="text-brand btn-reply">
                                Reply<i className="fi-rs-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <h4 className="mb-30">Customer reviews</h4>
                  <div className="d-flex mb-30">
                    <div className="product-rate d-inline-block mr-15">
                      <div
                        className="product-rating"
                        style={{ "width": "90%" }}
                      ></div>
                    </div>
                    <h6>4.8 out of 5</h6>
                  </div>
                  <div className="progress">
                    <span>5 star</span>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{"width": "50%"}}
                    >
                      50%
                    </div>
                  </div>
                  <div className="progress">
                    <span>4 star</span>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ "width": "25%" }}
                    >
                      25%
                    </div>
                  </div>
                  <div className="progress">
                    <span>3 star</span>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="45"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ "width": "45%" }}
                    >
                      45%
                    </div>
                  </div>
                  <div className="progress">
                    <span>2 star</span>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="65"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ "width": "65%" }}
                    >
                      65%
                    </div>
                  </div>
                  <div className="progress mb-30">
                    <span>1 star</span>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="85"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ "width": "85%" }}
                    >
                      85%
                    </div>
                  </div>
                  <a href="#" className="font-xs text-muted">
                    How are ratings calculated?
                  </a>
                </div>
              </div>
            </div>
            <div className="comment-form">
              <h4 className="mb-15">Add a review</h4>
              <div className="product-rate d-inline-block mb-30"></div>
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <form
                    className="form-contact comment_form"
                    action="#"
                    id="commentForm"
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <textarea
                            className="form-control w-100"
                            name="comment"
                            id="comment"
                            cols="30"
                            rows="9"
                            placeholder="Write Comment"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="website"
                            id="website"
                            type="text"
                            placeholder="Website"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="button button-contactForm"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    )
}