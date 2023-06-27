import React, { useState, useEffect, useId } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import AddFerm from '../components/AddFerm';
import AddHops from '../components/AddHops';






function RecipeCalc(props) {



    const [volume, setVolume] = useState(5)
    const [grainTotal, setGrainTotal] = useState()
    const [gristPercent, setGristPercent] = useState()
    const [fermAmounts, setFermAmounts] = useState([])
    const [fermData, setFermData] = useState([])
    const [gravity, setGravity] = useState()
    const [finGravity, setFinGravity] = useState()
    const [abv, setABV] = useState(0.0)
    const [srm, setSRM] = useState()
    const [IBUs, setIBUs] = useState(0)
    const [efficiency, setEfficiency] = useState(75)
    const [attenuation, setAttenuation] = useState(75)
    
    const [showErr, setShowErr] = useState(false);

    const ref = React.useRef(null)

    const hopref = React.useRef(null)


    useEffect(() => {
        fetchData()
    }, [fermData])

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
              
                divObject[i].children[4].innerHTML = percentArray[i] + '%'
            }


        });


        setGrainTotal(sum)
        setFermAmounts(arrayNumbers)

        

       



    }
    const fetchData = async () => {
        let fermDataArray = []
        for (let i = 0; i < ref.current.children.length; i++) {
            let response = await axios.get(`/api/fermentable/${ref.current.children[i].children[2].value}`)

            
             
            fermDataArray.push(response.data)
                
           


        }

        setFermData(fermDataArray)

    }
    // -----------run calc------------------------------------
    
    const calculate = async () => {
       handleGrainChange();
        await fetchData();
// SRM CALC
        
        const MCU = [];
        let MCUsum = 0;
        let SRM = 0;

        for (let i = 0; i < fermAmounts.length; i++) {
            if (!fermData[i].color) {

                setShowErr(!showErr)
                return;
            }
            else {
                setShowErr(false)
            MCU.push((fermAmounts[i] * fermData[i].color) / volume);
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
            
            var slice = String(fermData[i].extractPot).slice(3)
            var effPerc = efficiency * .01
            var gravPot = (slice * effPerc)
            gravityArray.push((fermAmounts[i] * gravPot));
            gravitySum = gravityArray.reduce((pv, cv) => pv + cv, 0);

        }
        
        OG =((gravitySum / volume) * .001) + 1
        var OGslice = String(OG).slice(0,5)
        var OGwhole = String(OGslice).slice(2)
      
        FG = ((OGwhole * .001) * ((100 - attenuation) * .01)) + 1
        var FGslice = String(FG).slice(0,5)
        
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
           
                gravFactor = (1.65 * 0.000125)**(OGslice - 1)
                boilFactor = (1-2.718**(-0.04 * hopref.current.children[i].children[5].value)) / 4.15

                utilization = (gravFactor * boilFactor)

                AAU = (hopref.current.children[i].children[0].value * hopref.current.children[i].children[2].value)

                IBU = (AAU * utilization *75)/volume

                ibuArray.push(IBU.toFixed(1))
               
                                        
        }
        
        ibuSum = ibuArray.map(Number).reduce((pv, cv) => pv + cv) ;
     
            setIBUs(ibuSum)
         
    }



    // -------------------Volume Change------------------------------------------------------

    const handleVolChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setVolume(event.target.value)


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

    // ---------------------------get all fermentables on page load-------------------------------------------------------
    const [fermentable, setFermentable] = useState([]);

    useEffect(() => {
        axios.get('/api/fermentables')
            .then(res => {
                setFermentable(res.data);
            });
    }, []);

    const outputFermentables = (fermentable) => {
        return (
            <option key={fermentable._id} name={fermentable.name}>{fermentable.name}</option>
        )
    }
//   ---------------------------------------------------------------------------------------------------------------------

    return (
        <section className='calc-container' >
            <form>
                <div className='calc-header-wrap'>
                    <div className='calc-header'>
                        <h3>Recipe Calculator</h3>
                        {/* <button id="savebtn">Save</button> */}
                    </div>

                    <div>
                        <label for="recipename">Recipe Name:</label>
                        <input id="recipename" type='text' placeholder='recipe name' className='recipe-input'></input>
                    </div>

                    <div>
                        <label for="batchvol">Batch Volume:</label>
                        <input name="batchvol" id="batchvol" type='numeric' className='recipe-input' onChange={handleVolChange} value={volume}></input><span>gal</span>
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
                        <input onChange={handleEffChange} value={efficiency} id="efficiency" type='number' className='recipe-input'></input><span>%</span>
                    </div>
                    <h2 onClick={calculate}>Calculate!</h2>
                </div>
                <section className='stats-output'>
                    <h3>OG: {gravity}</h3>
                    <h3>FG: {finGravity}</h3>
                    <h3>ABV: {abv} %</h3>
                    <h3>Color: {srm} SRM</h3><span>*image output*</span>
                    <h3>IBUs: {IBUs}</h3>
                    



                </section>
                {showErr && (<h2>You must select a grain type!</h2>)}
                <div className='calc-ferm' onClick={handleGrainChange} onBlur={handleGrainChange}>
                    <h2>Fermentables</h2>

                    <div id="fermlist" ref={ref}>
                        {inputList}
                    </div>



                </div>
                <h2 onClick={addFerm}>+</h2>

                <div>
                    <h3>Total Grain {grainTotal} lbs</h3>
                </div>
          


                <div className='hop-calc'>
                    <h2>Hops</h2>
                    <div id="hop-list" ref={hopref}>
                    {hopInputList}
                    </div>
                    <h2 onClick={addHop}>+</h2>
                </div>

                <div className='calc-yeast'>

                </div>

            </form>


                    

        </section>
    )
}


export default RecipeCalc;