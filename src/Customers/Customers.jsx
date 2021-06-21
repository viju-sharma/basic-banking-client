import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import { Button, Table, Modal, InputGroup, Form } from "react-bootstrap";
import classes from "./Customers.module.css";
const axios = require("axios");

const Customers = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allEmails, setAllEmails] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [values, setValues] = useState({ to_acc: "", balance: "" });
  const [isDisabled, setDisabled] = useState(true);
  const [availableBalance, setAvailableBalance] = useState("");
  const getCustomers = async () => {
    try {
      const res = await axios.get("https://basic-banking-server.herokuapp.com/api/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomersEmails();
    getCustomers();
  }, []);

  useEffect(() => {
    if (values.to_acc !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [values, selectedCustomer]);

  const getCustomersEmails = async () => {
    try {
      const res = await axios.get("https://basic-banking-server.herokuapp.com/api/allemail");
      setAllEmails(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const showEmails = allEmails.map((email, index) => (
    <option key={index}>{email.email}</option>
  ));

  const showCustomers = customers
    .filter((customer) => customer.email !== selectedCustomer)
    .map((customer, index) => (
      <tr key={index} style={{ textAlign: "center" }}>
        <td>{index + 1}</td>
        <td>{customer.fname}</td>
        <td>{customer.lname}</td>
        <td>{customer.email}</td>
        <td>{customer.currentBalance}</td>
        <td>
          <Button
            onClick={(e) => {
              setSelectedCustomer(customer.email);
              setAvailableBalance(customer.currentBalance);
              handleShow();
            }}
          >
            Select
          </Button>
        </td>
      </tr>
    ));

  const handleSubmit = async () => {
    const { to_acc, balance } = values;
    const from_acc = selectedCustomer;
    const transaction = { from_acc, to_acc, balance };
    try {
      await axios.post("https://basic-banking-server.herokuapp.com/api/transfer", transaction);
      window.location.href = "/transfers";
    } catch (error) {
      console.log(error);
    }
    try {
      await axios.post("https://basic-banking-server.herokuapp.com/api/updateBalance", transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered={true}
          className={classes.modal}
          size="lg"
          animation={false}
        >
          <Modal.Header className={classes.modalHeader}>
            <Modal.Title>Transfer Money</Modal.Title>
          </Modal.Header>
          <Modal.Body className={classes.modalBody}>
            <div>
              <form onSubmit={handleSubmit}>
                <h3>From Account :</h3>

                <select className="form-select" name="from_acc">
                  <option>{selectedCustomer}</option>
                </select>
                <h3>To Account :</h3>
                <select
                  name="to_acc"
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value=""> -- Select An Existing Account -- </option>
                  {showEmails}
                </select>
                <Form.Label>Balance</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    required
                    name="balance"
                    placeholder="Balance"
                    type="number"
                    min="0"
                    onChange={handleChange}
                    max={availableBalance}
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
                <Button variant="primary" type="submit" disabled={isDisabled}>
                  Transfer
                </Button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
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
