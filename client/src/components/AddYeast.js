import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useId } from 'react';
import axios from 'axios';
import { BsFillTrash3Fill } from "react-icons/bs";



function AddYeast(props) {

    
    const yeastRef = React.useRef(null)
  

    const id = useId();

    const [input, setInput] = useState(0);
    const [attenuation, setAttenuation] = useState(75)
  
    const [style, setStyle] = useState(0)


    const fetchData = async () => {
       
        await axios.get(`/api/yeast/${yeastRef.current.children[0].value}`)
            .then(res => {
                setAttenuation(res.data.attenuation)
                
            });
            
           
    }


// -----------Manual Alpha Adjustment--------------------------------------

const handleAttenChange = (event) => {
    setAttenuation(event.target.value)
}


// ----------------------------------------------------------------------------

    const [yeast, setYeast] = useState([]);

   
    useEffect(() => {
        axios.get('/api/yeast')
            .then(res => {
                setYeast(res.data);
            });
    }, []);

    const outputYeast = (yeast) => {
        return (
            <option key={yeast._id} name={yeast.name}>{yeast.name}</option>
        )
    }
// -----------------delete ferm----------------------------------------------------

  


    return (
        <div name={id} ref={yeastRef} className='calc-grid-yeast form-item'>
            
            
            <select name="yeast" id="yeast" onChange={fetchData} >
                <option>Select Yeast</option>
                {yeast.map(outputYeast)}
            </select>
            {/* <input className='input-small' name="style" type="text" value={style} readOnly></input>           */}
            <input className='input-small' name="attenuation" type="numeric" value={attenuation} onChange={handleAttenChange}></input>
            
        </div>
    )

};

export default (AddYeast);