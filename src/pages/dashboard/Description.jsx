import { useSelector } from "react-redux";

export default function Description() {
  const compostDetails = useSelector(
    (state) => state.entities.composts.compostDetails
  );

  console.log({ compostDetails });
  return (
    <div className="">
      <div className="">
        <img
          src={compostDetails.image}
          alt="compost"
          width={250}
          height={250}
        />
        <p>{compostDetails.description}</p>

        <ul className="product-more-infor mt-30">
          {compostDetails.packagingType && (
            <li>
              <span>Type Of Packing</span> {compostDetails.packagingType}
            </li>
          )}
          {compostDetails.quantityWeight && (
            <li>
              <span>Quantity</span> {compostDetails.quantityWeight}
            </li>
          )}
        </ul>
        {compostDetails.usageInstructions && (
          <>
            <hr className="wp-block-separator is-style-dots" />
            <h4 className="mt-30">usage Instructions</h4>
            <hr className="wp-block-separator is-style-wide" />
            <p>{compostDetails.usageInstructions}</p>
          </>
        )}
      </div>
    </div>
  );
}
