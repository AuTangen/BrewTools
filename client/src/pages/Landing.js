import { useState, useEffect } from 'react';
import { NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';


import logo from '../images/logo.png';
import cap from '../images/cap.png';

function Landing(props) {



    return (
        <section className='landing-wrap'>
            <img src={logo} className="logo responsive" alt="logo" />
        
            <h3>BrewTools is an online brewing calculator created with one mission in mind: to take the guesswork out of brewing. Build your recipe from our library of malts and hops and generate vital stats like alcohol content, bitterness, and approximate color. Create an account and save your recipes for future use - it's 100% free.</h3>
            <h3>Happy Brewing!</h3>
            
            
           <NavLink to="/recipecalc"><button className="start" id='start' alt="start">Get Started</button></NavLink>
           

           <NavLink to="/apitesting"><h2>To API Testing Ground</h2></NavLink>
        </section>
    )
}


export default Landing;