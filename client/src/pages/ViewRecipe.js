import { NavLink, useNavigate, useParams, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsFillArrowLeftSquareFill } from "react-icons/bs";

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
    const [fermentables, setFermentables] = useState([])
    const [hops, setHops] = useState([])

    useEffect(() => {

        axios.get(`/api/recipe/${id}`)
            .then(res => {
                console.log('res', res.data)
                setRecipe(res.data);
                setFermentables(res.data.fermentables)
                setHops(res.data.hops)
            });
    }, []);


    console.log(fermentables)
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

    const mapFerms = (fermentables) => {
        return (
            <div className='calc-grid form-item'>
                <input className='input-small' value={fermentables.amount} name="amount" type='numeric' readOnly></input>
                <input name="fermentables" id="fermentables" value={fermentables.name} readOnly></input>


            </div>


        )
    }
    const mapHops = (hops) => {
        return (
            <div className='calc-grid-hop form-item'>
                <input className='input-small' name="amount" type='numeric' value={hops.amount} readOnly></input>
                <input className='input-small' name="alpha" type="numeric" value={hops.alphaAcid} readOnly></input>
                <input className='input-hop' name="amount" type='numeric' value={hops.name} readOnly></input>
                <input className='input-small' name="duration" type="numeric" value={hops.boilDur} readOnly></input>



            </div>


        )
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
            <div className="one-recipe-section">


                <div key={recipe._id} className="one-recipe">
                    <div>
                        <h1 className="one-recipe-title">{recipe.name}</h1>
                    </div>

                    <div className="recipe-info">
                        <div className='calc-header-wrap'>




                            <div className='calc-header-left'>
                                <div>
                                    <label htmlFor="batchvol">Batch Volume (gal)</label>
                                    <input name="batchvol" id="batchvol" type='numeric' className='recipe-input' value={recipe.volume} readOnly></input>

                                </div>
                                <div>
                                    <label htmlFor="beerstyle">Beer Style</label>
                                    <input name="style" id="beerstyle" type='text' placeholder='ex: Stout' className='recipe-input' value={recipe.style} readOnly></input>
                                </div>
                            </div>

                            <div className='calc-header-right'>
                                <label htmlFor="boildur">Boil Duration</label>
                                <input id="boildur" type='number' placeholder='minutes' className='recipe-input' value={recipe.boilDur} readOnly></input>

                                <label htmlFor="efficiency">Efficiency %</label>
                                <input value={75} id="efficiency" type='number' className='recipe-input' readOnly></input>
                            </div>

                        </div>

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

                    </div>


                </div>
            </div>
        );
    }



    return (
        <>
            <NavLink className={'nav-link back'} to={`/recipecalc`}><BsFillArrowLeftSquareFill /><span> go back</span></NavLink>
            <section className='calc-container'>

                <OutputRecipe recipe={recipe} />

                <div className='calc-section'>
                    <h2>Fermentables</h2>
                    <div className='calc-grid form-header'>
                        <h4>Qty &#40;lb&#41;</h4>
                        <h4>Type</h4>

                    </div>
                    {fermentables.map(mapFerms)}

                </div>

                <div className='calc-section'>
                    <h2>Hops</h2>
                    <div className='calc-grid-hop form-header'>
                        <h4>Qty &#40;oz&#41;</h4>
                        <h4>AA%</h4>
                        <h4>Type</h4>
                        <h4>Boil Duration &#40;min&#41;</h4>


                    </div>
                    {hops.map(mapHops)}

                </div>
                <div>
                    <div className='calc-grid form-item'>
                        <div></div>
                        <h2>Yeast</h2>
                        <div className='calc-grid-yeast form-header'>

                            <input name="yeast" type="text" value={recipe.yeast} ></input>

                        </div>
                    </div>


                </div>

            </section>

        </>
    )
};

export default ViewRecipe;