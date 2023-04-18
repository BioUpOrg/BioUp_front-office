import { NavLink, Outlet } from "react-router-dom";

export default function ProductCompostDetails() {
  return (
    <div className="product-info">
      <div className="tab-style3">
        <ul className="nav nav-tabs text-uppercase">
          <li className="nav-item">
            <NavLink  to="/Dashboard/product-details/Description"
              className="nav-link"
            >
              Description
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/Dashboard/product-details/Additional-Info"
              className="nav-link"
            >
              Additional info
            </NavLink>
          </li>
          <li className="nav-item" >
            <NavLink className="nav-link" to="/Dashboard/product-details/Reviews">
              Reviews (3)
            </NavLink>
          </li>
        </ul>
        <div className="tab-content shop_info_tab entry-main-content">
            <Outlet/>
        </div>
      </div>
    </div>
  );
}
