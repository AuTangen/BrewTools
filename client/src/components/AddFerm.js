import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useId } from 'react';
import axios from 'axios';
import { BsFillTrash3Fill } from "react-icons/bs";



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
// -----------------delete ferm----------------------------------------------------

    const deleteFerm = () => {
        ref.current.remove();
    }
// ---------------grain type fetch----------------------------------------------------

// const handleSelectChange = async () => {
//     console.log(ref.current.children[2].value)
//     axios.get(`/api/fermentable/${ref.current.children[2].value}`).then(res => {
//         console.log("res ", res.data);
//         console.log(ref.current)
//     }
            
//         )
   
//     };

    return (
        <div name={id} ref={ref}>
            <input id={id} value={input} onChange={handleChange} name="amount" type='numeric' placeholder='0'></input><span>lb</span>
            <select name="fermentables" id="fermentables" >
                <option>Select Fermentable</option>
                {fermentable.map(outputFermentables)}
            </select>
            <p name="percentOutput">%</p>
            
            <BsFillTrash3Fill onClick={deleteFerm}/>
            
        </div>
    )

};

export default (AddFerm);