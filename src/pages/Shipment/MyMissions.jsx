import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Table, Row, Col } from 'react-bootstrap';
import { setUserId } from "../../store/users";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { getMyMission } from '../../services/shipmentService';
import { getMymissionCommands } from '../../services/shipmentService';
import { fetchProducts } from '../../store/slices/productSlice';

const MyMissions = () => {
  const dispatch = useDispatch();
  const [mission, setMission] = useState({});
  const [commands, setCommands] = useState({});
   const [userDetail,setUserDetail]=useState({});
  const token = localStorage.getItem("TOKEN_KEY");
  const decoded = jwt_decode(token);
  const userId = decoded._id; 
  const { products } = useSelector((state) => state.entities.products); // get products from store
  const [bioprod,setbioprod]=useState({});

  

  useEffect(() => {
    async function fetchMission() {
      dispatch(setUserId(userId));
      const m = await getMyMission(userId);
      setMission(m);
      dispatch(fetchProducts()); // fetch products on mount

     
      // Fetch command details for all commands in the shipment
      const commandIds = m.shipment_items.map(item => item.commande_id);
      const commandPromises = commandIds.map(commandId => getMymissionCommands(commandId));
      const commandDetails = await Promise.all(commandPromises);

      // Map command details to their corresponding command IDs
      const commandMap = {};
      commandDetails.forEach(command => {
        commandMap[command._id] = command;
      });
      setCommands(commandMap);

    }
    fetchMission();
  }, []);
  const handleClickDetails = (product) => {
    console.log("product:", product);
console.log("products:", products);
    console.log(`Product clicked is !`,product);
    if (product.type === "bioprod") {
      const biop = products.find((p) => p._id === product.product);
      if (biop) {
        console.log(`Bioprod:`, biop);
        setUserDetail('lotfi detail');
setbioprod(biop)   ;
   } else {
        console.log("No bioprod found with matching name and type");
      }
    }
  };
  return (
    <>
      <h3 className='justify-content-center'>My Mission</h3>

      {mission && mission.shipment_items && // Check if shipment_items exists
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Shipment Location</th>
                  <th>Product Details</th>
                </tr>
              </thead>
              <tbody>
                {mission.shipment_items.map((item) => (
                  <tr key={item._id}>
                    <td>{commands[item.commande_id] ? commands[item.commande_id].totalPrice : "-"}</td>
                    <td>{commands[item.commande_id] ? commands[item.commande_id].deliveryPlace : "-"}</td>
                    <td>
                      {commands[item.commande_id] ? (
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Owner</th>
                              <th>image</th>
                              <th>Type</th>
                              <th>Quantity</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {commands[item.commande_id].products.map((product) => (
                              <tr key={product.product}>
                               <td>{product.type === "bioprod" && product.product === bioprod._id ? bioprod.name : "-"}</td>
                               <td>{product.type === "bioprod" && product.product === bioprod._id ? userDetail : "-"}</td>
                               <td>{product.type === "bioprod" && product.product === bioprod._id ? <img src={bioprod.pic}/> : "-"}</td>

                                <td>{product.type}</td>
                                <td>{product.quantity}</td>
                                <td>
                                <Button  onClick={() => handleClickDetails(product)}>Details</Button>

                                  
                                  </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      }
    </>
  );
};

export default MyMissions;
