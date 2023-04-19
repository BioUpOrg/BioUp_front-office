import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {   getContracts } from '../../store/contracts';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { set } from 'date-fns';
 import {acceptContract}  from '../../services/contractService'

const ManageDeliveryAgentContracts = () => {
  const contracts = useSelector((state) => state.entities.contracts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContracts());
  }, [dispatch]);

  const handleAcceptContract=(id)=>{
    acceptContract(id);
    
  }



  return (
    <section className="mt-50 mb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-40">
            <h1 className="heading-2 mb-10">List Of Contracts</h1>
            <div className="d-flex justify-content-between"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive shopping-summery">
              <table className="table table-wislist">
                <thead>
                  <tr className="main-heading">
                    
                    <th className="col">Type Contract</th>
                    <th className="col">Vehicle Brand</th>
                    <th className="col">Vehicle Matricule</th>
                    <th className="col">User Full Name</th>
                    <th className="col">Salary Unit (100km)</th>
                    <th className="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts &&
                    contracts.list.map((contract) => (
                      <tr key={contract._id}>
                        <td>{contract.typeContract}</td>
                        <td>{contract.vehicle.marque}</td>
                        <td>{contract.vehicle.matricule}</td>
                        <td>{contract.user.firstName} {contract.user.lastName}</td>
                        <td>{contract.salary}</td>
                        <td>
                        <Container>
                          <Row className="justify-content-center">
                            <Col sm={6}>
                               <Button  onClick={()=>{handleAcceptContract(contract._id)}}>Accept</Button>
                            </Col>
                          </Row>
                          </Container>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="divider center_icon mt-50 mb-50">
          <i className="fi-rs-fingerprint"></i>
        </div>
        <div className="row"></div>
      </div>
    </section>
  );
  
}

export default ManageDeliveryAgentContracts;
