import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShipment, loadShipment } from "../../store/shipment";
import { Button, Col, Container, Row } from "react-bootstrap";
import { setUserId } from "../../store/users";
import { fetchProducts, selectProduct } from "../../store/slices/productSlice";
import jwt_decode from "jwt-decode";
import { populateComposts } from "../../store/composts";
import { getComposts } from "../../services/compostService";
import Swal from 'sweetalert2';
import { getMyMission } from '../../services/shipmentService';

function GetListCommandeNotShipped() {
  const dispatch = useDispatch();
 
  const [selectedOrders, setSelectedOrders] = useState([]);
  const { list } = useSelector((state) => state.entities.shipment);
  const { products } = useSelector((state) => state.entities.products); // get products from store
  const composts = useSelector((state) => state.entities.composts.list);

  const token =  localStorage.getItem("TOKEN_KEY");

  const decoded = jwt_decode(token);
  const userId = decoded._id; 

  useEffect(() => {
    dispatch(loadShipment());
    dispatch(fetchProducts()); // fetch products on mount
    getAllCompost();

  }, [dispatch]);
 
  const getAllCompost=async()=>{
    await getComposts().then((res)=>dispatch(populateComposts(res)));
  }


  const handleCreateShipment = async () => {
    dispatch(setUserId(userId));
    console.log(userId);
    const mission=getMyMission(userId).then(async (res)=>{
      if(!res){
        try {
          await dispatch(
            addShipment({
              shipment_agent: userId,
              shipment_items: selectedOrders.map((orderId) => ({
                commande_id: orderId,
              })),
            })
          );
          console.log("Shipment created successfully");
          setSelectedOrders([]);
          window.location.reload(); // add this line
        } catch (error) {
          console.log("Error creating shipment", error);
        }
      }else{
        Swal.fire({
          title: "Confirmation",
          text: "You have already Create a shipment , You Must end it Befor create another one",
          icon: "info",
          timer: 3000, // 2 seconds
          showConfirmButton: false
        });   
        }
    })
 
  };
  return (
    <Container style={{ margin: "5%" }}>
      <Row className=" justify-content-center">
        <Col>
          <div className="sidebar-widget widget-category-2 mb-30">
            <h5 className="section-title style-1 mb-30">Non Shipped Orders</h5>

            {list.length > 0 ? (
              
              <ul>
                {list.map((item) => (
                  <li key={item._id}>
                    <Container>
                      <Row>
                        <Col sm={1}>
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(item._id)}
                            onChange={async () => {
                              if (selectedOrders.includes(item._id)) {
                                await setSelectedOrders(
                                  selectedOrders.filter((id) => id !== item._id)
                                );
                              } else {
                                await setSelectedOrders(
                                  (prevSelectedOrders) => [
                                    ...prevSelectedOrders,
                                    item._id,
                                  ]
                                );
                              }
                            }}
                          />
                        </Col>
                        <Col style={{marginTop:'2%',fontStyle:'italic',fontFamily:'monospace',fontSize:'20em'}}
                         sm={11}>
                          <a><h5 style={{colorRendering:'auto'}}>Delivery location: {item.place_livraison}</h5></a>
                        </Col>
                      </Row>
                      <Row>
                        <h4>Products And Composts</h4>
                      </Row>

                      <div className="carausel-10-columns-cover position-relative">
                        <div
                          className="carausel-10-columns"
                          id="carausel-10-columns"
                        >
                          <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events custom-class">
                            <div
                              className="swiper-wrapper"
                              style={{
                                margin: "2%",
                                transform: "translate3d(0px, 0px, 0px)",
                                transitionDuration: "0ms",
                              }}
                            >
                              {item.products.map((product) => {
                                console.log("product1", product.product);
                                console.log("prodtype1",product.type);
                                console.log("pro",product);
                                console.log("p",products);
                                console.log("compostttttttttttttttttttttttttt",composts);
                                // Find the product with the matching ID in the `products` list
                                //change bioprod with product
                                if(product.type==="product"||product.type==="bioprod"){
                                  const pr = products.find(
                                    (p) => p._id === product.product
                                  );
                                  
                                  console.log(pr);
                                  console.log("p.p",product.product)
                                  console.log("p2",products);

                                  if (pr) {
                                    console.log("pic",pr.pic)
                                    return (
                                      <div
                                        className="swiper-slide"
                                        style={{ width: 200 }}
                                        key={product.product}
                                      >
                                        <div className="card-2 bg-9 wow animate__animated animate__fadeInUp">
                                          <figure className="img-hover-scale overflow-hidden">
                                            <img
                                              src={pr.pic}
                                              alt=""
                                              style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "cover",
                                              }}
                                            />
                                          </figure>
                                          <h6 style={{ margin: "20%" }}>
                                            <a> Name:{pr.name}</a>

                                            <a>Type: {product.type}</a>
                                            <a>Quantity : {product.quantity}</a>
                                          </h6>
                                        </div>
                                      </div>
                                    );
                                  }
                                }
                               
                                if(product.type==="compost"){
                                  const pc = composts.find(
                                    (p) => p._id === product.product
                                  );
                                  if (pc) {
                                    console.log("picffffff",pc.image)
                                    return (
                                      <div
                                        className="swiper-slide"
                                        style={{ width: 200 }}
                                        key={product.product}
                                      >
                                        <div className="card-2 bg-9 wow animate__animated animate__fadeInUp">
                                          <figure className="img-hover-scale overflow-hidden">
                                            <img
                                              src={pc.image}
                                              alt=""
                                              style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "cover",
                                              }}
                                            />
                                          </figure>
                                          <h6 style={{ margin: "20%" }}>
                                            <a> Name:{pc.name}</a>

                                            <a>Type: {product.type}</a>
                                            <a>Quantity : {product.quantity}</a>
                                          </h6>
                                        </div>
                                      </div>
                                    );
                                  }
                                }
                            
                              })}
                            </div>
                          </div>
                          <div
                            className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"
                            id="carausel-10-columns-arrows"
                          >
                            <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                              <i className="fi-rs-arrow-small-left" />
                            </span>
                            <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                              <i className="fi-rs-arrow-small-right" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Container>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders to ship</p>
            )}
          </div>
          <Button
            disabled={selectedOrders.length === 0}
            onClick={handleCreateShipment}
          >
            Create shipment
          </Button>
        </Col>
      </Row>
    </Container>
  );
            }  

export default GetListCommandeNotShipped;
