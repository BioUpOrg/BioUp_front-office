function MobileHeader() {
  return (
    <div className="mobile-header-active mobile-header-wrapper-style">
      <div className="mobile-header-wrapper-inner">
        <div className="mobile-header-top">
          <div className="mobile-header-logo">
            <a href="index.html">
              <img src="assets/imgs/theme/logo.svg" alt="logo" />
            </a>
          </div>
          <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
            <button className="close-style search-close">
              <i className="icon-top"></i>
              <i className="icon-bottom"></i>
            </button>
          </div>
        </div>
        <div className="mobile-header-content-area">
          <div className="mobile-search search-style-3 mobile-header-border">
            <form action="#">
              <input type="text" placeholder="Search for items…" />
              <button type="submit">
                <i className="fi-rs-search"></i>
              </button>
            </form>
          </div>
          <div className="mobile-menu-wrap mobile-header-border">
            <div className="main-categori-wrap mobile-header-border">
              <a className="categori-button-active-2" href="index.html#">
                <span className="fi-rs-apps"></span> Browse Categories
              </a>
              <div className="categori-dropdown-wrap categori-dropdown-active-small">
                <ul>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-dress"></i>Women&#x27;s Clothing
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-tshirt"></i>Men&#x27;s Clothing
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-smartphone"></i>
                      Cellphones
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-desktop"></i>Computer &amp; Office
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-cpu"></i>Consumer Electronics
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-home"></i>Home &amp; Garden
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-high-heels"></i>Shoes
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-teddy-bear"></i>Mother &amp; Kids
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-right">
                      <i className="evara-font-kite"></i>Outdoor fun
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <nav>
              <ul className="mobile-menu">
                <li className="menu-item-has-children">
                  <span className="menu-expand">
                    <i className="fi-rs-angle-small-down"></i>
                  </span>
                  <a href="index">Home</a>
                  <ul className="d-none">
                    <li>
                      <a href="index">Home 1</a>
                    </li>
                    <li>
                      <a href="index-2">Home 2</a>
                    </li>
                    <li>
                      <a href="index-3">Home 3</a>
                    </li>
                    <li>
                      <a href="index-4">Home 4</a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <span className="menu-expand">
                    <i className="fi-rs-angle-small-down"></i>
                  </span>
                  <a href="shop-grid-right">shop</a>
                  <ul className="d-none">
                    <li>
                      <a href="shop-grid-right">Shop Grid – Right Sidebar</a>
                    </li>
                    <li>
                      <a href="404-4">Shop Grid – Left Sidebar</a>
                    </li>
                    <li>
                      <a href="shop-list-right">Shop List – Right Sidebar</a>
                    </li>
                    <li>
                      <a href="shop-list-left">Shop List – Left Sidebar</a>
                    </li>
                    <li>
                      <a href="shop-fullwidth">Shop - Wide</a>
                    </li>
                    <li>
                      <a href="shop-filter">Shop – Filter</a>
                    </li>
                    <li>
                      <a href="shop-wishlist">Shop – Wishlist</a>
                    </li>
                    <li>
                      <a href="shop-cart">Shop – Cart</a>
                    </li>
                    <li>
                      <a href="shop-checkout">Shop – Checkout</a>
                    </li>
                    <li>
                      <a href="shop-compare">Shop – Compare</a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <span className="menu-expand">
                    <i className="fi-rs-angle-small-down"></i>
                  </span>
                  <a href="index.html#">Mega menu</a>
                  <ul className="d-none">
                    <li className="menu-item-has-children">
                      <span className="menu-expand"></span>
                      <a href="index.html#">Women&#x27;s Fashion</a>
                      <ul className="dropdown">
                        <li>
                          <a href="404">Dresses</a>
                        </li>
                        <li>
                          <a href="404">Blouses &amp; Shirts</a>
                        </li>
                        <li>
                          <a href="404">Hoodies &amp; Sweatshirts</a>
                        </li>
                        <li>
                          <a href="404">Women&#x27;s Sets</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <span className="menu-expand"></span>
                      <a href="index.html#">Men&#x27;s Fashion</a>
                      <ul className="dropdown">
                        <li>
                          <a href="404">Jackets</a>
                        </li>
                        <li>
                          <a href="404">Casual Faux Leather</a>
                        </li>
                        <li>
                          <a href="404">Genuine Leather</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <span className="menu-expand"></span>
                      <a href="index.html#">Technology</a>
                      <ul className="dropdown">
                        <li>
                          <a href="404">Gaming Laptops</a>
                        </li>
                        <li>
                          <a href="404">Ultraslim Laptops</a>
                        </li>
                        <li>
                          <a href="404">Tablets</a>
                        </li>
                        <li>
                          <a href="404">Laptop Accessories</a>
                        </li>
                        <li>
                          <a href="404">Tablet Accessories</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <span className="menu-expand">
                    <i className="fi-rs-angle-small-down"></i>
                  </span>
                  <a href="blog-category-fullwidth">Blog</a>
                  <ul className="d-none">
                    <li>
                      <a href="blog-category-grid">Blog Category Grid</a>
                    </li>
                    <li>
                      <a href="blog-category-list">Blog Category List</a>
                    </li>
                    <li>
                      <a href="blog-category-big">Blog Category Big</a>
                    </li>
                    <li>
                      <a href="blog-category-fullwidth">Blog Category Wide</a>
                    </li>
                    <li className="menu-item-has-children">
                      <span className="menu-expand"></span>
                      <a href="index.html#">Single Product Layout</a>
                      <ul className="dropdown">
                        <li>
                          <a href="blog-post-left">Left Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-post-right">Right Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-post-fullwidth">No Sidebar</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <span className="menu-expand">
                    <i className="fi-rs-angle-small-down"></i>
                  </span>
                  <a href="index.html#">Pages</a>
                  <ul className="d-none">
                    <li>
                      <a href="page-about">About Us</a>
                    </li>
                    <li>
                      <a href="page-contact">Contact</a>
                    </li>
                    <li>
                      <a href="page-account">My Account</a>
                    </li>
                    <li>
                      <a href="404-2">login/register</a>
                    </li>
                    <li>
                      <a href="page-purchase-guide">Purchase Guide</a>
                    </li>
                    <li>
                      <a href="page-privacy-policy">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="page-terms">Terms of Service</a>
                    </li>
                    <li>
                      <a href="404-3">404 Page</a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <span className="menu-expand">
                    <i className="fi-rs-angle-small-down"></i>
                  </span>
                  <a href="index.html#">Language</a>
                  <ul className="d-none">
                    <li>
                      <a href="index.html#">English</a>
                    </li>
                    <li>
                      <a href="index.html#">French</a>
                    </li>
                    <li>
                      <a href="index.html#">German</a>
                    </li>
                    <li>
                      <a href="index.html#">Spanish</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mobile-header-info-wrap mobile-header-border">
            <div className="single-mobile-header-info mt-30">
              <a href="page-contact"> Our location </a>
            </div>
            <div className="single-mobile-header-info">
              <a href="404-2">Log In / Sign Up </a>
            </div>
            <div className="single-mobile-header-info">
              <a href="index.html#">(+01) - 2345 - 6789 </a>
            </div>
          </div>
          <div className="mobile-social-icon">
            <h5 className="mb-15 text-grey-4">Follow Us</h5>
            <a href="index.html#">
              <img src="assets/imgs/theme/icons/icon-facebook.svg" alt="" />
            </a>
            <a href="index.html#">
              <img src="assets/imgs/theme/icons/icon-twitter.svg" alt="" />
            </a>
            <a href="index.html#">
              <img src="assets/imgs/theme/icons/icon-instagram.svg" alt="" />
            </a>
            <a href="index.html#">
              <img src="assets/imgs/theme/icons/icon-pinterest.svg" alt="" />
            </a>
            <a href="index.html#">
              <img src="assets/imgs/theme/icons/icon-youtube.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MobileHeader;
