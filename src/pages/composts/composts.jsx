import React from "react";
import { Container, Col } from "react-bootstrap";
import CompostCard from "../../components/cards/compostCard";
import { getComposts } from "../../services/compostService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./banner";
import { populateComposts } from "../../store/composts";

function Composts() {
  const dispatch = useDispatch();
  
  useEffect( () => {
    getAllCompost()
  }, []);
  
  const getAllCompost=async()=>{
    await getComposts().then((res)=>dispatch(populateComposts(res)));
  }

  const composts = useSelector((state) => state.entities.composts.list);

  return (
    <>
      <Banner />
      <Container>
        <Col className="col-lg-12">
          <div className="section-title style-2 wow animate__animated animate__fadeIn">
            <h3>All Composts</h3>
          </div>

          <div className="tab-content wow fadeIn animated">
            <div className="tab-pane fade show active">
              <div className="compost-grid-4 row">
                {composts.map((compost) => (
                  <CompostCard key={compost._id} compost={compost} />
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default Composts;
