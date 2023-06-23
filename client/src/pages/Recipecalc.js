import React, { useState, useEffect, useId } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import AddFerm from '../components/AddFerm';






function RecipeCalc(props) {

    const [volume, setVolume] = useState(5)
    const [grainTotal, setGrainTotal] = useState()
    const [gristPercent, setGristPercent] = useState()
    const [fermAmounts, setFermAmounts] = useState([])
    const [fermData, setFermData] = useState([])
    const [srm, setSRM] = useState()

    const ref = React.useRef(null)


    const handleVolChange = (event) => {
        console.log(event.target.value)
        setVolume(event.target.value)
    }

    const handleGrainChange = () => {

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
            percentArray.push(num / sum * 100);
            for (let i = 0; i < percentArray.length; i++) {
                console.log('row ' + i + ' ' + percentArray[i])
                divObject[i].children[3].innerHTML = percentArray[i] + '%'
            }
            
        
        });

        
        setGrainTotal(sum)
        setFermAmounts(arrayNumbers)

        getFermData();

            
        
        
        
       
       

    }

    // -----------------------------------------------------------

  const getFermData = async () => {
    let fermDataArray = []
        for (let i = 0; i < ref.current.children.length; i++) {
        axios.get(`/api/fermentable/${ref.current.children[i].children[2].value}`).then(res => {
            fermDataArray.push(res.data)
            
        })
    }
        setFermData(fermDataArray)
        console.log(fermData)
        const MCU = [];
        let MCUsum = 0;
        let SRM = 0;

        for (let i = 0; i < fermAmounts.length; i++) {
          MCU.push((fermAmounts[i] * fermData[i].color)/volume);
          MCUsum = MCU.reduce((pv, cv) => pv + cv, 0);
        }
          SRM = 1.4922 * (MCUsum ** 0.6859)
          console.log(SRM)

          setSRM(SRM)
          
        //    if (SRM.isNAN) {console.log(SRM)}
        //    else {console.log("not a number")}
         
  }



    // -----------------------Add Fermentable to Recipe List-----------------------------------------------------
    const [inputList, setInputList] = useState([<AddFerm key={0} />]);

    const addFerm = (event) => {
        setInputList(inputList.concat(<AddFerm key={inputList.length} />));


    };


    // ---------------------------------------------------------------------------------------------------------

    const [amount, setAmount] = useState(0)

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
    // -------------------------add new fermentable to database----------------------------------------------------------------
    const [errMessage, setErrMessage] = useState('')

    const [formState, setFormState] = useState({
        name: '',
        category: '',
        color: '',
        extractPot: ''
    })

    const handleNewFerm = (event) => {
        const prop = event.target.name
        setFormState({
            ...formState,
            [prop]: event.target.value
        });
    }



    const createFermentable = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('/api/fermentables', formState);



            setFormState({
                name: '',
                category: '',
                color: '',
                extractPot: ''
            })
            console.log('New Fermentable Created')
            console.log(formState)

        } catch (err) {
            if (err.code === 402) {
                setErrMessage(err.response.data.error)
            }
        }
    }

    //  -------------------------------------------------------------------------------------------
    
   


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
                        <input id="efficiency" type='number' className='recipe-input'></input><span>%</span>
                    </div>
                </div>
                {/* Select expects a string, cant use variable object. store value as a name or id# and make an axios request to fineOne() to get the full object*/}
                <div className='calc-ferm' onClick={handleGrainChange}>
                    <h2>Fermentables</h2>

                    <div id="fermlist" ref={ref}>
                        {inputList}
                    </div>



                </div>
                <h2 onClick={addFerm}>+</h2>
                <div>
                    <h3>Total Grain {grainTotal} lbs</h3>
                </div>
                <div>
                    <h3>Color: {srm} SRM</h3>
                   
                </div>


                <div className='calc-hops'>

                </div>

                <div className='calc-yeast'>

                </div>

            </form>


            <form onSubmit={createFermentable}>
                <h2>Create New Fermentable Object</h2>
                <h4>for testing purposes only</h4>
                {errMessage && <p>{errMessage}</p>}
                <input name='name' value={formState.name} onChange={handleNewFerm} type="text" placeholder="Enter Fermentable name"></input>
                <input name='category' value={formState.category} onChange={handleNewFerm} type="text" placeholder="Enter a category"></input>
                {/* <select onChange={handleNewFerm} name="category" id="category">
                    <option>Select Fermentable Type</option>
                    <option value="Grain">Grain</option>
                    <option value="Adjunct">Adjunct</option>
                    <option value="Malt Extract">Malt Extract</option>
                </select> */}
                <input name='color' value={formState.color} onChange={handleNewFerm} type="number" placeholder="Color (Lovibond)"></input>
                <input name='extractPot' value={formState.extractPot} onChange={handleNewFerm} type="number" placeholder="Extract Potential (SG)"></input>
                <button>Create Fermentable</button>
            </form>

        </section>
    )
}


export default RecipeCalc;