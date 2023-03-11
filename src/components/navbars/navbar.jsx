import HeaderBottom from "./headerBottom";
import HeaderMiddle from "./headerMiddle";
import HeaderTop from "./headerTop";
import MobileHeader from "./mobileHeader";
import MobilePromotion from "./mobilePromotion";

function Navbar() {
  return (
    <>
        <header class="header-area header-style-1 header-height-2">
        <MobilePromotion/>
        <HeaderTop/>
        <HeaderMiddle/>
        <HeaderBottom/>
        </header>
        <MobileHeader/>
    </>
  );
}
export default Navbar;
