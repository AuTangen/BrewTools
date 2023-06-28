import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useId } from 'react';
import axios from 'axios';
import { BsFillTrash3Fill } from "react-icons/bs";



function AddFerm(props) {

    
    const ref = React.useRef(null)
   
    const id = useId();

    const [input, setInput] = useState(0);

    const handleChange = (event) => {
        setInput(event.target.value)
        // console.log("value " + ref.current.value);
        // console.log("value " + ref.current.value);
        // console.log(input)
    }

   
// ----------grain type fetch on change---------------------------------------------------------

    const [fermentable, setFermentable] = useState([]);
    const [SRM, setSRM] = useState(0)
    const [extractPot, setExtractPot] = useState(0)

    const fetchData = async () => {
       console.log(ref.current.children[2].value)
        await axios.get(`/api/fermentable/${ref.current.children[1].value}`)
            .then(res => {
                setSRM(res.data.color)
                setExtractPot(res.data.extractPot)
                console.log(SRM)
                console.log(extractPot)
                
            });
            
           
    }
  
// ---------------------------------------------------------------------------------------------------
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
// -------------------------------------------------------------------



    return (
        <div name={id} ref={ref}  className='calc-grid form-item'>
            <input className='input-small' id={id} value={input} onChange={handleChange} name="amount" type='numeric' placeholder='0'></input>
            <select name="fermentables" id="fermentables" onChange={fetchData}>
                <option>Select Fermentable</option>
                {fermentable.map(outputFermentables)}
            </select>
            <p name="percentOutput">%</p>
            <input value={SRM} className='hidden' readOnly></input>
            <input value={extractPot} className='hidden' readOnly></input>
            
            <BsFillTrash3Fill className='interact' onClick={deleteFerm}/>
            
        </div>
    )

};

export default (AddFerm);