import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';




function RecipeCalc(props) {



    return (
        <section className='calc-container'>
            <form>
            <div className='calc-header-wrap'>
                <div className='calc-header'>
                    <h3>Recipe Calculator</h3>
                    <button id="savebtn">Save</button>
                </div>
                
                    <div>
                        <label for="recipename">Recipe Name:</label>
                        <input id="recipename" type='text' placeholder='recipe name' className='recipe-input'></input>
                    </div>

                    <div>
                        <label for="batchvol">Batch Volume:</label>
                        <input id="batchvol" type='number' placeholder='gallons' className='recipe-input'></input><span>gal</span>
                    </div>

                    <div>
                        <label for="beerstyle">Beer Style:</label>
                        <input id="beerstyle" type='text' placeholder='ex: Stout' className='recipe-input'></input>
                    </div>

                    <div>
                        <label for="boildur">Boil Duration:</label>
                        <input id="boildur" type='number' placeholder='minutes' className='recipe-input'></input><span>minutes</span>
                    </div>

                    <div>
                        <label for="efficiency">Efficiency:</label>
                        <input id="efficiency" type='number' className='recipe-input'></input><span>%</span>
                    </div>
                </div>



            </form>
        </section>
    )
}


export default RecipeCalc;