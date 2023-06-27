import React, { useState, useEffect, useId } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import AddFerm from '../components/AddFerm';
import AddHops from '../components/AddHops';



function ApiTesting(props) {

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

    // ----------------------Add new Hop to database---------------------------------------------

    const [hopFormState, setHopFormState] = useState({
        name: '',
        alphaAcid: ''
    })

    const handleNewHop = (event) => {
        const hop = event.target.name
        setHopFormState({
            ...hopFormState,
            [hop]: event.target.value
        });
    }



    const createHop = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('/api/hops', hopFormState);



            setHopFormState({
                name: '',
                alphaAcid: ''
            })
            console.log('New Hop Created')
            console.log(hopFormState)

        } catch (err) {
            if (err.code === 402) {
                setErrMessage(err.response.data.error)
            }
        }
    }





    return (
        <>
            <form onSubmit={createFermentable}>
                <h2>Create New Fermentable Object</h2>
                <h4>for testing purposes only</h4>
                {errMessage && <p>{errMessage}</p>}
                <input name='name' value={formState.name} onChange={handleNewFerm} type="text" placeholder="Enter Fermentable name"></input>
                <input name='category' value={formState.category} onChange={handleNewFerm} type="text" placeholder="Enter a category"></input>

                <input name='color' value={formState.color} onChange={handleNewFerm} type="number" placeholder="Color (Lovibond)"></input>
                <input name='extractPot' value={formState.extractPot} onChange={handleNewFerm} type="number" placeholder="Extract Potential (SG)"></input>
                <button>Create Fermentable</button>
            </form>


            <form onSubmit={createHop}>
                <h2>Create New Hop Object</h2>
                <h4>for testing purposes only</h4>
                {errMessage && <p>{errMessage}</p>}
                <input name='name' value={hopFormState.name} onChange={handleNewHop} type="text" placeholder="Enter Hop name"></input>
                <input name='alphaAcid' value={hopFormState.alphaAcid} onChange={handleNewHop} type="numeric" placeholder="Enter alpha acid %"></input>

                <button>Create Hop</button>
            </form>
        </>
    )
}

export default ApiTesting;
