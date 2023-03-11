function HeaderMiddle() {
  return (
    <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
      <div className="container">
        <div className="header-wrap">
          <div className="logo logo-width-1">
            <a href="index.html">
              <img src="assets/imgs/theme/logo.svg" alt="logo" />
            </a>
          </div>
          <div className="header-right">
            <div className="search-style-2">
              <form>
                <select className="select-active">
                  <option>All Categories</option>
                  <option>Women&#x27;s</option>
                  <option>Men&#x27;s</option>
                  <option>Cellphones</option>
                  <option>Computer</option>
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Home &amp; Garden</option>
                  <option>Luggage</option>
                  <option>Shoes</option>
                  <option>Mother &amp; Kids</option>
                </select>
                <input type="text" placeholder="Search" value="" />
              </form>
            </div>
            <div className="header-action-right">
              <div className="header-action-2">
                <div className="search-location">
                  <form action="#">
                    <select className="select-active">
                      <option>Your Location</option>
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>Arizona</option>
                      <option>Delaware</option>
                      <option>Florida</option>
                      <option>Georgia</option>
                      <option>Hawaii</option>
                      <option>Indiana</option>
                      <option>Maryland</option>
                      <option>Nevada</option>
                      <option>New Jersey</option>
                      <option>New Mexico</option>
                      <option>New York</option>
                    </select>
                  </form>
                </div>
                <div className="header-action-icon-2">
                  <a href="shop-compare">
                    <img
                      className="svgInject"
                      alt="Evara"
                      src="assets/imgs/theme/icons/icon-compare.svg"
                    />
                    <span className="pro-count blue">0</span>
                  </a>
                  <a href="shop-compare">
                    <span className="lable ml-0">Compare</span>
                  </a>
                </div>
                <div className="header-action-icon-2">
                  <a href="shop-wishlist">
                    <img
                      className="svgInject"
                      alt="Evara"
                      src="assets/imgs/theme/icons/icon-heart.svg"
                    />
                    <span className="pro-count blue">0</span>
                  </a>
                  <span className="lable">Wishlist</span>
                </div>
                <div className="header-action-icon-2">
                  <a className="mini-cart-icon" href="shop-cart">
                    <img
                      alt="Evara"
                      src="assets/imgs/theme/icons/icon-cart.svg"
                    />
                    <span className="pro-count blue">0</span>
                  </a>
                  <a href="shop-cart">
                    <span className="lable">Cart</span>
                  </a>
                </div>
                <div className="header-action-icon-2">
                  <a href="page-account">
                    <img
                      className="svgInject"
                      alt="Nest"
                      src="assets/imgs/theme/icons/icon-user.svg"
                    />
                  </a>
                  <a href="page-account">
                    <span className="lable ml-0">Account</span>
                  </a>
                  <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                    <ul>
                      <li>
                        <a href="page-account">
                          <i className="fi fi-rs-user mr-10"></i>My Account
                        </a>
                      </li>
                      <li>
                        <a href="page-account">
                          <i className="fi fi-rs-location-alt mr-10"></i>Order
                          Tracking
                        </a>
                      </li>
                      <li>
                        <a href="page-account">
                          <i className="fi fi-rs-label mr-10"></i>My Voucher
                        </a>
                      </li>
                      <li>
                        <a href="shop-wishlist">
                          <i className="fi fi-rs-heart mr-10"></i>My Wishlist
                        </a>
                      </li>
                      <li>
                        <a href="page-account">
                          <i className="fi fi-rs-settings-sliders mr-10"></i>Setting
                        </a>
                      </li>
                      <li>
                        <a href="page-login">
                          <i className="fi fi-rs-sign-out mr-10"></i>Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMiddle;
