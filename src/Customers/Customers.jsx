import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import { Button, Table, Modal } from "react-bootstrap";
const axios = require("axios");

const Customers = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const getCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);
  console.log(selectedCustomer);

  // const getCustomersEmail = async () => {
  //   const from_acc = document.getElementById("from_acc");

  //   for (var i = 0; i < customers.length; i++) {
  //     var option = document.createElement("OPTION");
  //     option.innerHTML = await customers[i].email;
  //     option.value = await customers[i].fname;
  //     from_acc.appendChild(option);
  //   }
  // };
  // console.log(customers[0].email);

  const showCustomers = customers.map((customer, index) => (
    <tr key={index} style={{ textAlign: "center" }}>
      <td>{index + 1}</td>
      <td>{customer.fname}</td>
      <td>{customer.lname}</td>
      <td>{customer.email}</td>
      <td>{customer.currentBalance}</td>
      <td>
        <Button
          value={customer.email}
          onClick={(e) => {
            setSelectedCustomer(e.target.value);
            handleShow();
          }}
        >
          Select
        </Button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>Transfer Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h1>From</h1>
              <select id="from_acc">
                <option>Open this select menu</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Navigation />
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>S.no.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Transfer From</th>
            </tr>
          </thead>
          <tbody>{showCustomers}</tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default Customers;
