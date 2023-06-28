import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import axios from "axios";

import logo from '../images/logo.png';

function Header(props) {
    const [nav, setNav] = useState(false);

    const handleClick = () => setNav(!nav);

    const { toggleView } = props

    const navigate = useNavigate()

    const logout = async (event) => {
      event.preventDefault();

      await axios.get('/auth/logout')
      props.setUser(null)
      navigate('/')
  }

  console.log(props.username)

    return (

        
        <header className="header">
            <nav>
          {/* <a href="/"><img src={logo} className="logoNav" alt="logo" /></a> */}
         
          


            {/* Desktop Nav */}
            <ul className="">
            {props.user &&<li>Welcome {props.user.username}</li>}
             
             
               <li>
               {props.user ? (
                  <NavLink onClick={logout} to="/auth/logout" >Logout</NavLink>
                ) : (
                  <div>
                  <NavLink to='/login'>Login</NavLink><span> | </span> <NavLink to='/register'>Register</NavLink>
                  </div>
                )}
               </li>

            </ul>

            </nav>
           
        </header>
    )

};

export default Header;