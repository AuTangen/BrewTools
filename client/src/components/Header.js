import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import axios from "axios";

import { BsFillCaretDownFill } from "react-icons/bs";
import { BsNewspaper } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import logo from '../images/logo.png';
import { BsFillCalculatorFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import { BsBoxArrowUpRight } from "react-icons/bs";

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


  const [subOpen, setSubOpen] = React.useState(false);

  const handleSubOpen = () => {
    setSubOpen(!subOpen);
  };




  return (


    <header className="header">
      <nav>





        {props.user && <h3 className='mobile-hidden'>Welcome {props.user.username}</h3>}

        {props.user && <div className="myrecipe-div interact" onClick={handleOpen}>
          <p>My Recipes </p>
          <BsList size={'20px'} />
        </div>}
        {open ? (
          <div className="dropdown">
            <div class="menu-container">
              <div className='close interact'>
              <BsXSquareFill size={'30px'} onClick={handleOpen} />
              </div>
              <h2 className="text-center">{props.user.username}'s Recipes</h2>
              {props.user.myRecipes.map((recipe) => (
                <NavLink to={`/recipe/${recipe._id}`} className={'nav-link recipe-navlink interact'}><div className="myrecipe interact"  onClick={handleOpen} key={recipe._id}>
                  <h3>{recipe.name}</h3>
                  
                  <div className='myrecipe-stats'>
                  {/* <h4>Style: {recipe.style}</h4> */}
                    <h5>{'ABV: ' + recipe.abv + '%'}</h5>
                   
                 
                  </div>
                  <BsBoxArrowUpRight/>
                  {/* <span>{recipe.fermentables[0].amount} lbs</span><h5>{recipe.fermentables[0].name}</h5>
                        <span>{recipe.fermentables.forEach(ferm => ferm.amount)} lbs</span><p>{recipe.fermentables.forEach(ferm => ferm.name)}</p> */}

                </div></NavLink>
              ))}
            </div>
          </div>
        ) : null}




        {props.user ? (
          <NavLink className={"nav-link"} onClick={logout} to="/auth/logout" >Logout</NavLink>
        ) : (
          <div className='login-form'>
            <NavLink className={"nav-link"} to='/login'>Login</NavLink><span className={"nav-link"}> | </span> <NavLink className={"nav-link"} to='/register'>Register</NavLink>
          </div>
        )}



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
      )}

    </header>
  )

};

export default Header;