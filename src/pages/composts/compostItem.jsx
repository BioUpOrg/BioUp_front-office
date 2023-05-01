import { Rating } from "@mui/material";

export default function CompostItem({ compost }) {
  return (
    <div className="product-list-small animated animated">
      <article className="row align-items-center hover-up">
        <figure className="col-md-4 mb-0">
          <a href="/products/all-natural-italian-style-chicken-meatballs">
            <img src={compost.image} alt="" />
          </a>
        </figure>
        <div className="col-md-8 mb-0">
          <h6>
            <a href="/products/all-natural-italian-style-chicken-meatballs">
              {compost.name}
            </a>
          </h6>
          <Rating
            value={compost.rating}
            readOnly
            sx={{
              fontSize: 18,
            }} 
          />
          <div className="product-price">
            <span>
              $
              {compost.discountOffered
                ? (
                    compost.quantityWeight * compost.unitPrice -
                    ((compost.quantityWeight * compost.unitPrice) / 100) *
                      compost.discountOffered
                  ).toFixed(2)
                : compost.quantityWeight * compost.unitPrice}
            </span>
            {compost.discountOffered && (
              <span className="old-price">
                ${compost.quantityWeight * compost.unitPrice}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}