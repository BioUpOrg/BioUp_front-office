function HeaderTop() {
  return (
    <div className="header-top header-top-ptb-1 d-none d-lg-block">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-4">
            <div className="header-info">
              <ul>
                <li>
                  <a href="page-about">About Us</a>
                </li>
                <li>
                  <a href="page-account">My Account</a>
                </li>
                <li>
                  <a href="shop-wishlist">Wishlist</a>
                </li>
                <li>
                  <a href="page-account">Order Tracking</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-6 col-lg-4">
            <div className="text-center">
              <div id="news-flash" className="d-inline-block">
                <ul>
                  <li>
                    Get great devices up to 50% off
                    <a href="shop-grid-right">View details</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <div className="header-info header-info-right">
              <ul>
                <li>
                  Need help? Call Us:
                  <strong className="text-brand"> + 1800 900</strong>
                </li>
                <li>
                  <a className="language-dropdown-active" href="index.html#">
                    <i className="fi-rs-world"></i>English
                    <i className="fi-rs-angle-small-down"></i>
                  </a>
                  <ul className="language-dropdown">
                    <li>
                      <a href="index.html#">
                        <img src="assets/imgs/theme/flag-fr.png" alt="" />
                        Français
                      </a>
                    </li>
                    <li>
                      <a href="index.html#">
                        <img src="assets/imgs/theme/flag-dt.png" alt="" />
                        Deutsch
                      </a>
                    </li>
                    <li>
                      <a href="index.html#">
                        <img src="assets/imgs/theme/flag-ru.png" alt="" />
                        Pусский
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="language-dropdown-active" href="#">
                    USD
                    <i className="fi-rs-angle-small-down"></i>
                  </a>
                  <ul className="language-dropdown">
                    <li>
                      <a href="#">
                        <img src="assets/imgs/theme/flag-fr.png" alt="" />
                        INR
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/imgs/theme/flag-dt.png" alt="" />
                        MBP
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/imgs/theme/flag-ru.png" alt="" />
                        EU
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
