import React, { useState, useEffect, useId } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import AddFerm from '../components/AddFerm';
import AddHops from '../components/AddHops';
import AddYeast from '../components/AddYeast';
import Header from '../components/Header';


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






function RecipeCalc(props) {


    const [recipeName, setRecipeName] = useState('My Recipe')
    const [volume, setVolume] = useState(5)
    const [grainTotal, setGrainTotal] = useState()
    const [gristPercent, setGristPercent] = useState()
    const [fermAmounts, setFermAmounts] = useState([])
    const [fermentables, setFermentables] = useState([])
    const [gravity, setGravity] = useState(0)
    const [finGravity, setFinGravity] = useState(0)
    const [abv, setABV] = useState(0.0)
    const [srm, setSRM] = useState(0)
    const [IBUs, setIBUs] = useState(0)
    const [efficiency, setEfficiency] = useState(75)
    
    



    useEffect(() => {
        srmCheck()
    }, [srm])

    const srmCheck = () => {
        let srmCheck = ""
        if (srm === 0) {
            srmCheck = srm0
        } else if (srm <= 3) {
            srmCheck = srm3
        } else if (srm <= 5) {
            srmCheck = srm5
        }
        else if (srm <= 8) {
            srmCheck = srm8
        }
        else if (srm <= 12) {
            srmCheck = srm12
        }
        else if (srm <= 15) {
            srmCheck = srm15
        }
        else if (srm <= 18) {
            srmCheck = srm18
        }
        else if (srm <= 21) {
            srmCheck = srm21
        }
        else if (srm <= 24) {
            srmCheck = srm24
        }
        else if (srm <= 30) {
            srmCheck = srm30
        }
        else if (srm <= 35) {
            srmCheck = srm35
        }
        else if (srm >= 35) {
            srmCheck = srm40
        } else {
            srmCheck = srm0
        }
        return srmCheck
    }


    const [showErr, setShowErr] = useState(false);

    const ref = React.useRef(null)

    const hopref = React.useRef(null)

    const yeastRef = React.useRef(null)

    

    // useEffect(() => {
    //     fetchData();

    // }, [fermData])

    useEffect(() => {
        handleGrainChange()
    }, [grainTotal])


    const handleEffChange = (event) => {
        setEfficiency(event.target.value)
    }

    const handleGrainChange = (event) => {


        var divObject = ref.current.children
        var grainInput = Array.from(ref.current.children)

        const valueArray = []
        let sum = 0
        for (let i = 0; i < grainInput.length; i++) {

            valueArray.push(grainInput[i].children[0].value);
            var numbers = valueArray.map(Number)

            sum = numbers.reduce((pv, cv) => pv + cv, 0);


        }


        let percentArray = [];

        var arrayNumbers = valueArray.map(Number)
        arrayNumbers.forEach(function (num) {
            percentArray.push((num / sum * 100).toFixed(2))
            for (let i = 0; i < percentArray.length; i++) {

                divObject[i].children[2].innerHTML = percentArray[i] + '%'
            }


        });


        setGrainTotal(sum)
        setFermAmounts(arrayNumbers)







    }

    // -----------run calc------------------------------------

    const calculate = async () => {
      
        handleGrainChange();
        let fermDataArray = []

        for (let i = 0; i < ref.current.children.length; i++) {
            var grainData = {
                "amount": ref.current.children[i].children[0].value,
                "name": ref.current.children[i].children[1].value,
                "color": ref.current.children[i].children[3].value,
                "extractPot": ref.current.children[i].children[4].value
            }

            console.log("data object  " + grainData.color)
            fermDataArray.push(grainData)




        }
        
        setFermentables(fermDataArray)
        console.log(fermentables)
        // SRM CALC

        const MCU = [];
        let MCUsum = 0;
        let SRM = 0;

        for (let i = 0; i < fermAmounts.length; i++) {
            console.log(fermDataArray[i].color)
            if (!fermDataArray[i].color) {
                console.log('error handling')
                setShowErr(true)
                return;
            }
            else {
                setShowErr(false)
                MCU.push((fermAmounts[i] * fermDataArray[i].color) / volume);
                MCUsum = MCU.reduce((pv, cv) => pv + cv, 0);
            }
        }
        SRM = (1.4922 * (MCUsum ** 0.6859)).toFixed(2)

        console.log("SRM " + SRM)
        setSRM(SRM)



        // GRAVITY & ABV CALC
        const gravityArray = []
        let OG = 0
        let FG = 0
        let gravitySum = 0
        for (let i = 0; i < fermAmounts.length; i++) {

            var slice = String(fermDataArray[i].extractPot).slice(3)
            var effPerc = efficiency * .01
            var gravPot = (slice * effPerc)
            gravityArray.push((fermAmounts[i] * gravPot));
            gravitySum = gravityArray.reduce((pv, cv) => pv + cv, 0);

        }

        OG = ((gravitySum / volume) * .001) + 1
        var OGslice = String(OG).slice(0, 5)
        var OGwhole = String(OGslice).slice(2)
        const attenuation = yeastRef.current.children[0].children[1].value
       
        FG =((OGwhole * .001) * ((100 - attenuation) * .01)) + 1
        var FGslice = String(FG).slice(0, 5)

        var abvCalc = (OGslice - FGslice) * 133
        var abvSlice = abvCalc.toFixed(2)

        setGravity(OGslice)
        setFinGravity(FGslice)
        setABV(abvSlice)

        //   IBU CALC
        let ibuArray = []
        let IBU = 0
        let AAU = 0
        let gravFactor = 0
        let boilFactor = 0
        let utilization = 0
        let ibuSum = 0

        for (let i = 0; i < hopref.current.children.length; i++) {

            gravFactor = (1.65 * 0.000125) ** (OGslice - 1)
            boilFactor = (1 - 2.718 ** (-0.04 * hopref.current.children[i].children[3].value)) / 4.15

            utilization = (gravFactor * boilFactor)

            AAU = (hopref.current.children[i].children[0].value * hopref.current.children[i].children[1].value)

            IBU = (AAU * utilization * 75) / volume

            ibuArray.push(IBU.toFixed(1))


        }

        ibuSum = ibuArray.map(Number).reduce((pv, cv) => pv + cv);

        setIBUs(ibuSum)

    }



    // -------------------Volume Change------------------------------------------------------

    const handleVolChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setVolume(event.target.value)

    }

    // -------------------Name Change----------------------------------
    const handleNameChange = (event) => {
        event.preventDefault();
        setRecipeName(event.target.value)
    }

    // -----------------------Add Fermentable to Recipe List-----------------------------------------------------

    const [inputList, setInputList] = useState([<AddFerm key={0} />]);

    const addFerm = (event) => {
        setInputList(inputList.concat(<AddFerm key={inputList.length} />));


    };


    // ---------------------Add hop to Recipe List----------------------------------------------------------------------------------

    const [hopInputList, setHopInputList] = useState([<AddHops key={0} />]);

    const addHop = (event) => {
        setHopInputList(hopInputList.concat(<AddHops key={hopInputList.length} />));


    };



    // ----------SAVE RECIPE----------------------------------------------------

    const [recipeFormState, setRecipeFormState] = useState({
        name: '',
        style: '',
        og: 0,
        fg: 0,
        abv: 0,
        srm: 0,
        ibus: 0,
        fermentables: [],
        hops: [],
        yeast: ''

    })


    const handleFormChange = (event) => {
        console.log('form change')
        
        setRecipeFormState({
            name: recipeName,
            style: '',
            og: gravity,
            fg: finGravity, 
            abv: abv,
            color:  srm ,
            ibus: IBUs ,
            fermentables: getfermdata(),
            hops: getHopData(),
            yeast: getYeastData()
        })
        console.log(recipeFormState)
    }



    const getfermdata = () => {
        let fermDataArray = []
        console.log( ref.current.children.length)
        for (let i = 0; i < ref.current.children.length; i++) {
            var grainData = {
                
                "name": ref.current.children[i].children[1].value,
                "amount": ref.current.children[i].children[0].value,
                "color": ref.current.children[i].children[3].value,
                "extractPot": ref.current.children[i].children[4].value
            }

            console.log("data object  " + grainData.color)
            fermDataArray.push(grainData)
            
    }
    return fermDataArray;
}

const getHopData = () => {
    let hopDataArray = []
    console.log( hopref.current.children.length)
    for (let i = 0; i < hopref.current.children.length; i++) {
        var hopData = {
            
            "name": hopref.current.children[i].children[2].value,
            "amount": hopref.current.children[i].children[0].value,
            "alphaAcid": hopref.current.children[i].children[1].value,
            "boilDur": hopref.current.children[i].children[3].value
        }

        hopDataArray.push(hopData)
        
}
return hopDataArray;

}

const getYeastData = () => {
    let yeastData = ""
     yeastRef.current.children[0].children[0].value ? yeastData = yeastRef.current.children[0].children[0].value : yeastData = ''
  

      console.log('yeast data ' + yeastData)

return yeastData;

}



    const saveRecipe = async (event) => {
        event.preventDefault();
        console.log('submitted!')
        
        await calculate();
        
        
        
        console.log(recipeFormState)
        if (props.user) try {
            const res = await axios.post('/api/myrecipes', recipeFormState);

            props.setUser(res.data.user);

            setRecipeFormState({
                name: recipeName,
                style: '',
                og: '',
                fg: '',
                abv:  abv ,
                color: srm ,
                ibus: IBUs ,
                fermentables: getfermdata(),
                hops: getHopData(),
                yeast: getYeastData()
            })

        } catch (err) {
            if (err.code === 402) {
                // setErrMessage(err.response.data.error)
                console.log('error!')
            }
        }
        else {
            console.log('you must be signed in to save a recipe!')
        }
    }


    //   ---------------------------------------------------------------------------------------------------------------------

    return (
        <>

            <section  >
                <h1>All-Grain Recipe Calculator</h1>
                <form onSubmit={saveRecipe} onChange={handleFormChange} className='calc-container'>
                    <button onClick={handleFormChange}>Save</button>
                    <div className='calc-header-wrap'>
                        <div className='calc-header'>

                            {/* <button id="savebtn">Save</button> */}
                        </div>

                        <div>
                            <label htmlFor="recipename">Recipe Name:</label>
                            <input name="name" id="recipename" type='text' placeholder='recipe name' className='recipe-input' onChange={handleNameChange} value={recipeName}></input>
                        </div>

                        <div>
                            <label htmlFor="batchvol">Batch Volume:</label>
                            <input name="batchvol" id="batchvol" type='numeric' className='recipe-input' onChange={handleVolChange} value={volume}></input><span>gal</span>
                        </div>

                        <div>
                            <label htmlFor="beerstyle">Beer Style:</label>
                            <input name="style" id="beerstyle" type='text' placeholder='ex: Stout' className='recipe-input'></input>
                        </div>

                        <div>
                            <label htmlFor="boildur">Boil Duration:</label>
                            <input id="boildur" type='number' placeholder='minutes' className='recipe-input'></input><span>minutes</span>
                        </div>

                        <div>
                            <label htmlFor="efficiency">Efficiency:</label>
                            <input onChange={handleEffChange} value={efficiency} id="efficiency" type='number' className='recipe-input'></input><span>%</span>
                        </div>
                        
                    </div>
                    <section className='stats-output'>
                    <label htmlFor="og">OG:</label>
                        <input name="og" className='stat' type="numeric" value={gravity} onChange={handleFormChange} onInput={() => console.log('input capture')}></input>
                        <label htmlFor="fg">FG:</label>
                        <input name="fg" className='stat' type="numeric" value={finGravity} onChange={handleFormChange}></input>
                        <label htmlFor="abv">ABV:</label>
                        <input name="abv" className='stat' type="numeric" value={abv} onChange={handleFormChange}></input>
                        <label htmlFor="srm">SRM:</label>
                        <input name="srm" className='stat' type="numeric" value={srm} onChange={handleFormChange}></input>
                        <img src={srmCheck()} />
                        <label htmlFor="ibus">IBUs:</label>
                        <input name="ibus" className='stat' type="numeric" value={IBUs} onChange={handleFormChange}></input>
                        
                        {/* <h3>OG: {gravity}</h3>
                        <h3>FG: {finGravity}</h3>
                        <h3>ABV: {abv} %</h3>
                        <h3>Color: {srm} SRM</h3>
                        <img src={srmCheck()} />

                        <h3>IBUs: {IBUs}</h3> */}




                    </section>
                    {showErr && (<h3>You must select a grain type!</h3>)}
                    <div className='ferm-calc' onClick={handleGrainChange} onBlur={handleGrainChange}>
                        <div>
                            <h2 className='form-header-main'>Fermentables</h2>
                            <div className='calc-grid form-header'>
                                <h4>Qty &#40;lb&#41;</h4>
                                <h4>Type</h4>
                                <h4>% Total</h4>
                            </div>

                        </div>
                        <div id="fermlist" ref={ref}>
                            {inputList}
                        </div>

                        <h3 className='interact' onClick={addFerm}>add fermentable +</h3>
                        <h3>Total Grain {grainTotal} lbs</h3>
                    </div>


                    <div>

                    </div>



                    <div className='hop-calc'>
                        <h2 className='form-header-main'>Hops</h2>
                        <div className='calc-grid-hop form-header'>
                            <h4>Qty &#40;oz&#41;</h4>
                            <h4>Alpha Acid%</h4>
                            <h4>Type</h4>
                            <h4>Boil Duration &#40;min&#41;</h4>


                        </div>
                        <div id="hop-list" ref={hopref}>
                            {hopInputList}
                        </div>
                        <h3 className='interact' onClick={addHop}>add hop +</h3>
                    </div>

                    <div className='calc-yeast'>
                    <h2 className='form-header-main'>Yeast</h2>
                        <div className='calc-grid-hop form-header'>
                            <h4>Name</h4>
                            {/* <h4>Style</h4> */}
                            <h4>Attenuation%</h4>
                           
                        </div>
                        <div id="yeast-list" ref={yeastRef}>
                            {<AddYeast/>}
                        </div>
                    </div>
                    <h2 onClick={calculate}>Calculate!</h2>
                </form>


            
            </section>
        </>
    )
}


export default RecipeCalc;