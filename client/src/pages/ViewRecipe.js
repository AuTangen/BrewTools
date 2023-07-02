import { NavLink, useNavigate, useParams, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import srm0 from '../images/srm0.png'
import srm3 from '../images/srm3.png'
import srm5 from '../images/srm5.png'
import srm8 from '../images/srm8.png'
import srm12 from '../images/srm12.png'
import srm15 from '../images/srm15.png'
import srm18 from '../images/srm18.png'
import srm21 from '../images/srm21.png'
import srm24 from '../images/srm24.png'
import srm30 from '../images/srm30.png'
import srm35 from '../images/srm35.png'
import srm40 from '../images/srm40.png'


function ViewRecipe(props) {


    const navigate = useNavigate();
    const { id } = useParams();

    const [recipe, setRecipe] = useState({});

    useEffect(() => {

        axios.get(`/api/recipe/${id}`)
            .then(res => {
                console.log('res', res.data)
                setRecipe(res.data);

            });
    }, []);



    const deleteRecipe = async (recipeID) => {

        try {
            const res = await axios.delete(`/api/recipe/${recipeID}`)
            console.log('deleted')
            console.log(res.data)
            setRecipe({});
            navigate('/recipecalc')
        } catch (err) {
            if (err.code === 402) {
                console.log(err)
            }
        }

    }


    const OutputRecipe = ({ recipe }) => {
        console.log('recipe', recipe)
        const srmCheck = () => {
            let srmCheck = ""
            if (recipe.color === 0) {
                srmCheck = srm0
            } else if (recipe.color <= 3) {
                srmCheck = srm3
            } else if (recipe.color <= 5) {
                srmCheck = srm5
            }
            else if (recipe.color <= 8) {
                srmCheck = srm8
            }
            else if (recipe.color <= 12) {
                srmCheck = srm12
            }
            else if (recipe.color <= 15) {
                srmCheck = srm15
            }
            else if (recipe.color <= 18) {
                srmCheck = srm18
            }
            else if (recipe.color <= 21) {
                srmCheck = srm21
            }
            else if (recipe.color <= 24) {
                srmCheck = srm24
            }
            else if (recipe.color <= 30) {
                srmCheck = srm30
            }
            else if (recipe.color <= 35) {
                srmCheck = srm35
            }
            else if (recipe.color >= 35) {
                srmCheck = srm40
            } else {
                srmCheck = srm0
            }
            return srmCheck
        }


        return (
            <div className="one-artist-section">
                <div key={recipe._id} className="one-recipe">


                    <div className="recipe-info">

                        <h4>{recipe.name}</h4>
                        <section className='stats-output'>
                            <label htmlFor="og">OG:</label>
                            <input name="og" className='stat' type="numeric" value={recipe.og}></input>
                            <label htmlFor="fg">FG:</label>
                            <input name="fg" className='stat' type="numeric" value={recipe.fg}></input>
                            <label htmlFor="abv">ABV:</label>
                            <input name="abv" className='stat' type="numeric" value={recipe.abv}></input>
                            <label htmlFor="srm">SRM:</label>
                            <input name="srm" className='stat' type="numeric" value={recipe.color}></input>
                            <img className='mobile-hidden' src={srmCheck()} />
                            <label htmlFor="ibus">IBUs:</label>
                            <input name="ibus" className='stat' type="numeric" value={recipe.ibus}></input>
                            
                        </section>
                        <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>

            <section className='one-recipe-container'>

                <OutputRecipe recipe={recipe} />





            </section>

        </>
    )
};

export default ViewRecipe;