

function Modal() {
  return (
    <>
      <div className="modal fade custom-modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" className="btn-close"></button>
            <div className="modal-body">
              <div
                className="deal"
                // style="background-image: url(%27assets/imgs/banner/404)"
              >
                <div className="deal-top">
                  <h2 className="text-brand">Deal of the Day</h2>
                  <h5>Limited quantities.</h5>
                </div>
                <div className="deal-content detail-info">
                  <h6 className="product-title">
                    <a className="text-heading" href="404">
                      Organic fruit for your family&#x27;s health
                    </a>
                  </h6>
                  <div className="clearfix product-price-cover">
                    <div className="product-price primary-color float-left">
                      <span className="current-price text-brand">$38</span>
                      <span>
                        <span className="save-price font-md color3 ml-15">
                          26% Off
                        </span>
                        <span className="old-price font-md ml-15">$52</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="deal-bottom">
                  <p className="mb-20">Hurry Up! Offer End In:</p>
                  <div className="deals-countdown pl-5">
                    <span className="countdown-section">
                      <span className="countdown-amount hover-up">1</span>
                      <span className="countdown-period"> days </span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount hover-up">23</span>
                      <span className="countdown-period"> hours </span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount hover-up">59</span>
                      <span className="countdown-period"> mins </span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount hover-up">59</span>
                      <span className="countdown-period"> sec </span>
                    </span>
                  </div>
                  <div className="product-detail-rating">
                    <div className="product-rate-cover text-end">
                      <div className="product-rate d-inline-block">
                        <div className="product-rating" style={{"width": "90%"}}></div>
                      </div>
                      <span className="font-small ml-5 text-muted">(32 rates)</span>
                    </div>
                  </div>
                  <a className="btn hover-up" href="shop-grid-right">
                    Shop Now
                    <i className="fi-rs-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default Modal;
