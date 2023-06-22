import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useId } from 'react';
import axios from 'axios';



function AddFerm(props) {

    const ref = React.useRef(null)
    useEffect(() => {
        
        // console.log("value " + ref.current.value);
      }, []);

    const id = useId();

    const [input, setInput] = useState(0);

    const handleChange = (event) => {
        setInput(event.target.value)
        // console.log("value " + ref.current.value);
        // console.log("value " + ref.current.value);
        // console.log(input)
    }

   
// ----------------------------------------------------------------------------

    const [fermentable, setFermentable] = useState([]);

    const [value, setValue] = useState(0);

    const updateValue = (event) => {
        setValue(event.target.value)
    }



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
// -----------------------------------------------------------------------------
    return (
        <div name={id}>
            <input id={id} value={input} onChange={handleChange} name="amount" type='number' placeholder='0'></input><span>lb</span>
            <select name="fermentables" id="fermentables">
                {fermentable.map(outputFermentables)}
            </select>
            <p name="percentOutput">%</p>
        </div>
    )

};

export default (AddFerm);