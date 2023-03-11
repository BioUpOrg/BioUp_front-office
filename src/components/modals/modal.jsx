import "./App.css";

function Modal() {
  return (
    <>
      <div class="modal fade custom-modal show d-block">
        <div class="modal-dialog">
          <div class="modal-content">
            <button type="button" class="btn-close"></button>
            <div class="modal-body">
              <div
                class="deal"
                style="background-image: url(%27assets/imgs/banner/404)"
              >
                <div class="deal-top">
                  <h2 class="text-brand">Deal of the Day</h2>
                  <h5>Limited quantities.</h5>
                </div>
                <div class="deal-content detail-info">
                  <h6 class="product-title">
                    <a class="text-heading" href="404">
                      Organic fruit for your family&#x27;s health
                    </a>
                  </h6>
                  <div class="clearfix product-price-cover">
                    <div class="product-price primary-color float-left">
                      <span class="current-price text-brand">$38</span>
                      <span>
                        <span class="save-price font-md color3 ml-15">
                          26% Off
                        </span>
                        <span class="old-price font-md ml-15">$52</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="deal-bottom">
                  <p class="mb-20">Hurry Up! Offer End In:</p>
                  <div class="deals-countdown pl-5">
                    <span class="countdown-section">
                      <span class="countdown-amount hover-up">1</span>
                      <span class="countdown-period"> days </span>
                    </span>
                    <span class="countdown-section">
                      <span class="countdown-amount hover-up">23</span>
                      <span class="countdown-period"> hours </span>
                    </span>
                    <span class="countdown-section">
                      <span class="countdown-amount hover-up">59</span>
                      <span class="countdown-period"> mins </span>
                    </span>
                    <span class="countdown-section">
                      <span class="countdown-amount hover-up">59</span>
                      <span class="countdown-period"> sec </span>
                    </span>
                  </div>
                  <div class="product-detail-rating">
                    <div class="product-rate-cover text-end">
                      <div class="product-rate d-inline-block">
                        <div class="product-rating" style="width: 90%"></div>
                      </div>
                      <span class="font-small ml-5 text-muted">(32 rates)</span>
                    </div>
                  </div>
                  <a class="btn hover-up" href="shop-grid-right">
                    Shop Now
                    <i class="fi-rs-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </>
  );
}

export default Modal;
