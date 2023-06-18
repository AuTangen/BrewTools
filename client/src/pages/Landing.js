import { useState, useEffect } from 'react';
import { NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';


import logo from '../images/logo.png';
import cap from '../images/cap.png';

function Landing(props) {



    return (
        <section className='landing-wrap'>
            <img src={logo} className="logo responsive" alt="logo" />
            <div className='button-wrap'>
            
           <NavLink to="/login"><img src={cap} className="start" id='start' alt="start" /></NavLink>
           <h2 id='start-text' className='start-text centered'>Start</h2>
           </div>
        </section>
    )
}


export default Landing;