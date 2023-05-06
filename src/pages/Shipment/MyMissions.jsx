import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Table, Row, Col } from 'react-bootstrap';
import { setUserId } from "../../store/users";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { getMyMission } from '../../services/shipmentService';
import { getMymissionCommands } from '../../services/shipmentService';
import { fetchProducts } from '../../store/slices/productSlice';
import { getUserById } from '../../services/shipmentService';
import { getComposts } from '../../services/compostService';
import { populateComposts } from '../../store/composts';
import { updateShipment } from '../../store/shipment';
import Swal from 'sweetalert2';

const MyMissions = () => {
  const dispatch = useDispatch();
  const [mission, setMission] = useState({});
  const [commands, setCommands] = useState({});
   const [userDetailbio,setUserDetailbio]=useState({});
    const [userDetailcomposte,setUserDetailcomposte]=useState({});
   const [showDetails, setShowDetails] = useState(true);
   const [shipmentAdresses, setShipmentAdresses] = useState({
    shipmentLocations: [],
    pickupFroms: [],
  });
  const token = localStorage.getItem("TOKEN_KEY");
  const decoded = jwt_decode(token);
  const userId = decoded._id; 
  const { products } = useSelector((state) => state.entities.products); // get products from store
  const composts = useSelector((state) => state.entities.composts.list);
  
  const [bioprod,setbioprod]=useState({});
  const [compostDetails,setCompostDetails]=useState({});
  

  useEffect(() => {
    async function fetchMission() {
      dispatch(setUserId(userId));
      const m = await getMyMission(userId);
      setMission(m);
      dispatch(fetchProducts()); // fetch products on mount
      getAllCompost();

     
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
  const getAllCompost=async()=>{
    await getComposts().then((res)=>dispatch(populateComposts(res)));
  }


const handleClickDetails = (product) => {
  console.log("product:", product);
  console.log("products:", products);
  console.log(`Product clicked is !`,product);
  setShowDetails(false);

  if (product.type === "bioprod") {
    const biop = products.find((p) => p._id === product.product);
    if (biop) {
      console.log(`Bioprod:`, biop);
      getUserById(biop.user).then((res) => {
        console.log("userd",res.data);
        setUserDetailbio(res.data);
      }); 
      setbioprod(biop);
    } else {
      console.log("No bioprod found with matching name and type");
    }
  }
  else if (product.type === "compost") {
    const comp = composts.find((p) => p._id === product.product);
    if (comp) {
      console.log(`Compost:`, comp);
      getUserById(comp._idSeller).then((res) => {
        console.log("userd",res.data);
       
        setUserDetailcomposte(res.data);
      }); 
      setCompostDetails(comp);
    } else {
      console.log("No compost found with matching ID");
    }
  } else {
    console.log("Unknown product type:", product.type);
  }
};
const MakeendOfShipment = async () => {
  const updatedMission = { ...mission, /* any properties you want to update */ };

  await Swal.fire({
    title: 'Are you sure?',
    text: 'You will lose your current mission!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, end my mission!',
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(updateShipment(updatedMission));
      window.location.reload();
    }
  });
};

  return (
    <div  className='product-info' style={{marginBottom:'6%'}}>
<Container>
      {mission && mission.shipment_items && (// use parentheses to wrap multiple lines of code
        <Card>
          <Card.Body >
            
            <Table bordered hover>
         
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
                              <th hidden={showDetails}>Name</th>
                              <th hidden={showDetails}>Owner</th>
                              <th hidden={showDetails}>Contact</th>
                              <th hidden={showDetails}>PickUp Adress </th>
                              <th hidden={showDetails}>Image</th>
                              <th>Type</th>
                              <th>Quantity</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                       {commands[item.commande_id].products.map((product) => (
                          <tr key={product.product} >
                            <td hidden={showDetails}> {product.type === "bioprod" && product.product === bioprod._id ? bioprod.name : (product.type === "compost" && product.product === compostDetails._id ? compostDetails.name : "-")}</td>
                            <td hidden={showDetails}>{product.type === "bioprod" && product.product === bioprod._id && userDetailbio ? userDetailbio.firstName + " " + userDetailbio.lastName : (product.type === "compost" && product.product === compostDetails._id ? userDetailcomposte.firstName+""+userDetailcomposte.lastName : "-")}</td>
                            <td hidden={showDetails}>
  {product.type === "bioprod" && product.product === bioprod._id && userDetailbio ? 
    (userDetailbio.email ? userDetailbio.email : userDetailbio.phone)
    : (product.type === "compost" && product.product === compostDetails._id ? 
        (userDetailcomposte.email ? userDetailcomposte.email : userDetailcomposte.phone) 
        : "-")
  }
</td>                            <td hidden={showDetails}>{product.type === "bioprod" && product.product === bioprod._id && userDetailbio ? userDetailbio.adress : (product.type === "compost" && product.product === compostDetails._id ? userDetailcomposte.adress : "-")}</td>
                            <td hidden={showDetails}>{product.type === "bioprod" && product.product === bioprod._id ? <img style={{ width: '100%' }} src={bioprod.pic} alt={bioprod.name} /> : (product.type === "compost" && product.product === compostDetails._id ? <img src={compostDetails.image}/> : "-")}</td>
                            <td>{product.type}</td>
                            <td>{product.quantity}</td>
                            <td>
                              <Button onClick={() => handleClickDetails(product)} variant="info">Details</Button>
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
            <Button onClick={MakeendOfShipment}>Make End Of This Mission</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
    </div>
    
  );
                            }
 export default MyMissions  




 


 

 