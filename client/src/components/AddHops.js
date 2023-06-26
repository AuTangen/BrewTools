import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useId } from 'react';
import axios from 'axios';
import { BsFillTrash3Fill } from "react-icons/bs";



function AddHops(props) {

    
    const ref = React.useRef(null)
  

    const id = useId();

    const [input, setInput] = useState(0);
    const [alpha, setAlpha] = useState(0)
    const [selectedHop, setSelectedHop] = useState({})
    const [duration, setDuration] = useState(0)


    const fetchData = async () => {
       
        await axios.get(`/api/hops/${ref.current.children[4].value}`)
            .then(res => {
                setAlpha(res.data.alphaAcid)
                
            });
            
           
    }


// -----------Manual Alpha Adjustment--------------------------------------

const handleAlphaChange = (event) => {
    setAlpha(event.target.value)
}

const handleDurChange = (event) => {
    setDuration(event.target.value)
}
   
// ----------------------------------------------------------------------------

    const [hop, setHop] = useState([]);

   
    useEffect(() => {
        axios.get('/api/hops')
            .then(res => {
                setHop(res.data);
            });
    }, []);

    const outputHops = (hop) => {
        return (
            <option key={hop._id} name={hop.name}>{hop.name}</option>
        )
    }
// -----------------delete ferm----------------------------------------------------

    const deleteHop = () => {
        ref.current.remove();
    }


    return (
        <div name={id} ref={ref}>
            <input id={id} name="amount" type='numeric' placeholder='0'></input><span>oz</span>
            <input name="alpha" type="numeric" value={alpha} onChange={handleAlphaChange}></input><span> %aa</span>
            <select name="hop" id="hop" onChange={fetchData} >
                <option>Select Hop</option>
                {hop.map(outputHops)}
            </select>
            <input name="duration" type="numeric" value={duration} onChange={handleDurChange}></input><span>min</span>            
            
            <BsFillTrash3Fill onClick={deleteHop}/>
            
        </div>
    )

};

export default (AddHops);