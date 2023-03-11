import { Link } from 'react-router-dom';

export default function LandingPageNav(){
    return(
        <div className="header-bottom header-bottom-bg-color sticky-bar">
      <div className="container">
        <div className="header-wrap header-space-between position-relative">
          <div className="logo logo-width-1 d-block d-lg-none">
            <Link to="index.html">
              <img src="" alt="logo" />
            </Link>
          </div>
          <div className="header-nav d-none d-lg-flex">
            <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
              <nav>
                <ul>
                  <li className="hot-deals">
                    <img
                      src=""
                      alt="bioup logo"
                    />
                    <Link to="products">Hot Deals</Link>
                  </li>
                  <li>
                    <Link className="active" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/About"}>About</Link>
                  </li>
                  <li>
                    <Link to={"/Services"}>
                      Our Services
                    </Link>
                  </li>
                  <li>
                    <Link to={"/Products"}>
                      Bio Products
                    </Link>
                  </li>
                  <li className="position-static">
                    <Link to={"/Composts"}>
                      Composts
                    </Link>
                  </li>
                  <li>
                    <Link to={"/Blog"}>
                      Our Blog
                    </Link>
                  </li>
                  <li>
                    <Link to={"/Contact"}>Contact</Link>
                  </li>
                  <li>
                  <button className='btn'>
                    <Link to={"/Register"} style={{color:"#ffffff"}}>register</Link>
                  </button>
                  </li>
                  <li>
                  <button className='btn'>
                    <Link to={"/Login"} style={{color:"#ffffff"}}>login</Link>
                  </button>
                  </li>
                </ul>
                
              </nav>
            </div>
          </div>
          {/* <div className="hotline d-none d-lg-flex">
            <img
              src="assets/imgs/theme/icons/icon-headphone.svg"
              alt="hotline"
            />
            <p>
              1900 - 888<span>24/7 Support Center</span>
            </p>
          </div>
          <div className="header-action-icon-2 d-block d-lg-none">
            <div className="burger-icon burger-icon-white">
              <span className="burger-icon-top"></span>
              <span className="burger-icon-mid"></span>
              <span className="burger-icon-bottom"></span>
            </div>
          </div>
          <div className="header-action-right d-block d-lg-none">
            <div className="header-action-2">
              <div className="header-action-icon-2">
                <Link to="shop-wishlist">
                  <img
                    alt="Evara"
                    src="assets/imgs/theme/icons/icon-heart.svg"
                  />
                  <span className="pro-count white">0</span>
                </Link>
              </div>
              <div className="header-action-icon-2">
                <Link className="mini-cart-icon" to="shop-cart">
                  <img
                    alt="Evara"
                    src="assets/imgs/theme/icons/icon-cart.svg"
                  />
                  <span className="pro-count white">0</span>
                </Link>
                <div className="cart-dropdown-wrap cart-dropdown-hm2">
                  <ul>
                    <li>
                      <div className="shopping-cart-img">
                        <Link to="shop-grid-right">
                          <img
                            alt="Evara"
                            src="assets/imgs/shop/thumbnail-3.jpg"
                          />
                        </Link>
                      </div>
                      <div className="shopping-cart-title">
                        <h4>
                          <Link to="shop-grid-right">Plain StriolLink Shirts</Link>
                        </h4>
                        <h3>
                          <span>1 × </span>$800.00
                        </h3>
                      </div>
                      <div className="shopping-cart-delete">
                        <Link to="index.html#">
                          <i className="fi-rs-cross-small"></i>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="shopping-cart-img">
                        <Link to="shop-grid-right">
                          <img
                            alt="Evara"
                            src="assets/imgs/shop/thumbnail-4.jpg"
                          />
                        </Link>
                      </div>
                      <div className="shopping-cart-title">
                        <h4>
                          <Link to="shop-grid-right">Macbook Pro 2022</Link>
                        </h4>
                        <h3>
                          <span>1 × </span>$3500.00
                        </h3>
                      </div>
                      <div className="shopping-cart-delete">
                        <Link to="index.html#">
                          <i className="fi-rs-cross-small"></i>
                        </Link>
                      </div>
                    </li>
                  </ul>
                  <div className="shopping-cart-footer">
                    <div className="shopping-cart-total">
                      <h4>
                        Total<span>$383.00</span>
                      </h4>
                    </div>
                    <div className="shopping-cart-button">
                      <Link to="shop-cart">View cart</Link>
                      <Link to="shop-checkout">Checkout</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    )
}