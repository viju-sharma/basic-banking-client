import React from 'react';
import Navigation from '../Navbar/Navbar';
import classes from './home.module.css'
import {Card, Button} from 'react-bootstrap'
const Homepage = () => {
    return (
      <React.Fragment>
        <div className={classes.navbar}>
          <Navigation />
        </div>
        <div className={classes.homepageBody}>
          <h1>The Sparks Bank</h1>
          <h5>a platform to transfer money for one account to another.</h5>
        </div>
        <div style={{ width: "100%", margin: "0 15rem" }}>
          <div className={classes.cards}>
            <Card
              style={{
                width: "15rem",
                backgroundColor: "#2F5D62",
                textAlign: "center",
              }}
            >
              <Card.Img variant="top" src="/img/sign-up.png" style={{}} />
              <Card.Body>
                <Card.Text>Add New Account.</Card.Text>
                <form action="/create-new">

                <Button variant="primary" type="submit">Add</Button>
                </form>
              </Card.Body>
            </Card>
          </div>
          <div className={classes.cards}>
            <Card
              style={{
                width: "15rem",
                backgroundColor: "#2F5D62",
                textAlign: "center",
              }}
            >
              <Card.Img variant="top" src="/img/people.png" style={{}} />
              <Card.Body>
                <Card.Text>See all the customers.</Card.Text>
                <form action="customers">

                <Button type="submit" variant="primary">Customers</Button>
                </form>
              </Card.Body>
            </Card>
          </div>
          <div className={classes.cards}>
            <Card
              style={{
                width: "15rem",
                backgroundColor: "#2F5D62",
                textAlign: "center",
              }}
            >
              <Card.Img variant="top" src="/img/lending.png" style={{}} />
              <Card.Body>
                <Card.Text>See All Transfer History.</Card.Text>
                <form action="/transfers">

                <Button
                  variant="primary"
                  type="submit"
                >
                  History
                </Button>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
}
 
export default Homepage