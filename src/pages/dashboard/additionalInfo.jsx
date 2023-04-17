import { useSelector } from "react-redux";

export default function AdditionalInfo() {
  const compostDetails = useSelector((state) => state.entities.composts.compostDetails);

    return (
        <div>
            <table className="font-md">
              <tbody>
              {compostDetails.name &&
                <tr className="stand-up">
                  <th>name</th>
                  <td>
                   <p>{compostDetails.name}</p>
                  </td>
                </tr>
                }
                {compostDetails.type && 
                <tr className="folded-wo-wheels">
                  <th>type</th>
                  <td>
                  <p>{compostDetails.type}</p>
                  </td>
                </tr>}
                {compostDetails.brandName && 
                <tr className="folded-w-wheels">
                  <th>brand name</th>
                  <td>
                    <p>{compostDetails.brandName}</p>
                  </td>
                </tr>}
                {compostDetails.quantityWeight &&
                <tr className="door-pass-through">
                  <th>quantity</th>
                  <td>
                    <p>{compostDetails.quantityWeight}</p>
                  </td>
                </tr>}
                {compostDetails.unitPrice && 
                <tr className="frame">
                  <th>unitPrice</th>
                  <td>
                    <p>{compostDetails.unitPrice}</p>
                  </td>
                </tr>
                }
                {compostDetails.availability && 
                <tr className="weight-wo-wheels">
                  <th>availability</th>
                  <td>
                    <p>{compostDetails.availability}</p>
                  </td>
                </tr>
                }
                {compostDetails.manufacturer && 
                <tr className="weight-capacity">
                  <th>manufacturer</th>
                  <td>
                    <p>{compostDetails.manufacturer}</p>
                  </td>
                </tr>}
                {compostDetails.nutrientContent && 
                <tr className="width">
                  <th>nutrient content</th>
                  <td>
                    <p>{compostDetails.nutrientContent}</p>
                  </td>
                </tr>}
                {compostDetails.certification && 
                <tr className="handle-height-ground-to-handle">
                  <th>certification</th>
                  <td>
                    <p>{compostDetails.certification}</p>
                  </td>
                </tr>}
                {compostDetails.countryOfOrigin && 
                <tr className="wheels">
                  <th>country of origin</th>
                  <td>
                    <p>{compostDetails.countryOfOrigin}</p>
                  </td>
                </tr>}
                {compostDetails.packagingType && 
                <tr className="seat-back-height">
                  <th>packaging type</th>
                  <td>
                    <p>{compostDetails.packagingType}</p>
                  </td>
                </tr>}
                {compostDetails.discountOffered && 
                <tr className="head-room-inside-canopy">
                  <th>discount offered</th>
                  <td>
                    <p>{compostDetails.discountOffered}</p>
                  </td>
                </tr>}
                {compostDetails.expirationDate && 
                <tr className="pa_color">
                  <th>expiration date</th>
                  <td>
                    <p>{compostDetails.expirationDate}</p>
                  </td>
                </tr>}
                {/* <tr className="pa_size">
                  <th>seller</th>
                  <td>
                    
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
    )
}