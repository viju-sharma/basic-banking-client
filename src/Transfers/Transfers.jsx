import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navbar";
import { Table } from "react-bootstrap";
import axios from "axios";
const TransfersHistory = () => {
  const [transfers, setTransfers] = useState([]);

  const getTransfers = async () => {
    try {
      const res = await axios.get("https://basic-banking-server.herokuapp.com/api/transfer");
      setTransfers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransfers();
  }, []);

  const showTransfers = transfers.map((transfer, index) => {
      
    return (
      <tr style={{ textAlign: "center" }} key={index}>
        <th>{index + 1}</th>
        <th>{transfer.from_acc}</th>
        <th>{transfer.to_acc}</th>
        <th>{"$" + transfer.balance}</th>
        <th>{transfer.transfer_time.toString()}</th>
      </tr>
    );
  });
  return (
    <React.Fragment>
      <Navigation />
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>S.no.</th>
              <th>From Account</th>
              <th>To Account</th>
              <th>Balance</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          {showTransfers}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default TransfersHistory;
