
import React,{useState} from "react";
import Navigation from "../Navbar/Navbar";
import { Form, Button, InputGroup } from "react-bootstrap";
import classes from "./CreateUser.module.css";
import axios from "axios";
const CreateUser = () => {


    const [values, setValues] = useState({ fname : "", lname:"", email:"" , currentBalance:"" });
   const handleSubmit = async (e) => {
       console.log(values)
        const {fname, lname, email, currentBalance} = values;
        const user = {fname, lname, email, currentBalance}
        console.log(user)
     try {
         await axios.post("http://localhost:4000/api/addCustomer", user);
         window.location.href = "/customers";
     } catch (error) {
       console.log(error);
     }
   };


   const handleChange = ((e) =>{
     setValues({
       ...values,
       [e.target.name]:e.target.value,
      })
   })


  return (
    <React.Fragment>
      <Navigation />
      <div className={classes.userForm}>
        <Form
          id="create-user"
          className={classes.createUser}
          onSubmit={handleSubmit}
        >
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            name="fname"
            placeholder="First name"
            onChange={handleChange}
            type="text"
          />

          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            name="lname"
            placeholder="Last name"
            onChange={handleChange}
            type="text"
          />

          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            name="email"
            placeholder="Email"
            onChange={handleChange}
            type="email"
          />

          <Form.Label>Balance</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              required
              name="currentBalance"
              placeholder="Balance"
              onChange={handleChange}
              type="number"
              min="0"
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>

          <Button className={classes.createButton} type="submit">
            Create User
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default CreateUser;
