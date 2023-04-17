export default function CompostItem(){
    return(
        <div className="product-list-small animated animated">
        <article className="row align-items-center hover-up">
          <figure className="col-md-4 mb-0">
            <a href="/products/all-natural-italian-style-chicken-meatballs">
              <img src="/assets/imgs/shop/product-12-1.jpg" alt="" />
            </a>
          </figure>
          <div className="col-md-8 mb-0">
            <h6>
              <a href="/products/all-natural-italian-style-chicken-meatballs">
                All Natural Italian-Style Chicken Meatballs
              </a>
            </h6>
            <div className="product-rate-cover">
              <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
              <span className="font-small ml-5 text-muted"> (4.0)</span>
            </div>
            <div className="product-price">
              <span>$73 </span>
              <span className="old-price"></span>
            </div>
          </div>
        </article>
      </div>
    );
}