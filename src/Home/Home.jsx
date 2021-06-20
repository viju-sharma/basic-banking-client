import React from 'react';
import Navigation from '../Navbar/Navbar';
import classes from './home.module.css'

const Homepage = () => {
    return (
      <React.Fragment>
        <div className={classes.navbar}>
          <Navigation/>
        </div>
        <div className={classes.homepageBody}>

        </div>
      </React.Fragment>
    );
}
 
export default Homepage