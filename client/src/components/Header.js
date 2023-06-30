import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import axios from "axios";
import { BsNewspaper } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";
import logo from '../images/logo.png';

function Header(props) {


  const [showRecipes, setShowRecipes] = useState(false);

  const dropdown = () => {
    setShowRecipes(!showRecipes);
  }


  const navigate = useNavigate()

  const logout = async (event) => {
    event.preventDefault();

    await axios.get('/auth/logout')
    props.setUser(null)
    navigate('/')
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  
   

  return (


    <header className="header">
      <nav>
        {/* <a href="/"><img src={logo} className="logoNav" alt="logo" /></a> */}




        {/* Desktop Nav */}
        <ul className="">
          {props.user && <li>Welcome {props.user.username}</li>}


          <li>
            {props.user ? (
              <NavLink onClick={logout} to="/auth/logout" >Logout</NavLink>
            ) : (
              <div>
                <NavLink to='/login'>Login</NavLink><span> | </span> <NavLink to='/register'>Register</NavLink>
              </div>
            )}
          </li>
          <li>
                {/* <BsNewspaper onclick={dropdown}/> */}
                {/* <button onclick={dropdown}></button> */}
          </li>
          <div className="dropdown">
      {props.user && <button onClick={handleOpen}>My Recipes</button>}
      {open ? (
        
         <div class="menu-container dropdown">
            <BsXSquareFill onClick={handleOpen} />
            <h2 className="text-center">My Recipes</h2>
                {props.user.myRecipes.map((recipe) => (
                    <div className="recipe" key={recipe._id}>
                        <h3>{recipe.name}</h3>
                        <div>
                        <h5>{'OG: ' + recipe.og}</h5>
                        <h5>{'FG: ' + recipe.fg}</h5>
                        <h5>{'ABV: ' + recipe.abv + '%'}</h5>
                        <h5>{'SRM: ' + recipe.color}</h5>
                        <h5>{'IBUs: ' + recipe.ibus}</h5>
                        </div>
                        <div className='recipe-collapse'>

                        </div>
                        {/* <span>{recipe.fermentables[0].amount} lbs</span><h5>{recipe.fermentables[0].name}</h5>
                        <span>{recipe.fermentables.forEach(ferm => ferm.amount)} lbs</span><p>{recipe.fermentables.forEach(ferm => ferm.name)}</p> */}
                        
                    </div>
                ))}
            </div>
       
      ) : null}
     
    </div>
          
        
        </ul>

      </nav>
      {showRecipes && (
            <div class="menu-container dropdown">
            <BsXSquareFill onClick={dropdown} />
            <h2 className="text-center">My Recipes</h2>
                {props.user.myRecipes.map((recipe) => (
                    <div className="recipe" key={recipe._id}>
                        <h3>{recipe.name}</h3>
                        <div>
                        <h5>{'OG: ' + recipe.og}</h5>
                        <h5>{'FG: ' + recipe.fg}</h5>
                        <h5>{'ABV: ' + recipe.abv + '%'}</h5>
                        <h5>{'SRM: ' + recipe.color}</h5>
                        <h5>{'IBUs: ' + recipe.ibus}</h5>
                        </div>
                        <div className='recipe-collapse'>

                        </div>
                        {/* <span>{recipe.fermentables[0].amount} lbs</span><h5>{recipe.fermentables[0].name}</h5>
                        <span>{recipe.fermentables.forEach(ferm => ferm.amount)} lbs</span><p>{recipe.fermentables.forEach(ferm => ferm.name)}</p> */}
                        
                    </div>
                ))}
            </div>
         ) }

    </header>
  )

};

export default Header;