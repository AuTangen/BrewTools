import axios from "axios";
import { useEffect, useState } from "react";




function Dashboard(props) {
    const [errMessage, setErrMessage] = useState('')

    const [formState, setFormState] = useState({
        name: '',
        category: '',
        ingredients: '',
        instructions: ''
    })

    const handleChange = (event) => {
        const prop = event.target.name
        setFormState({
            ...formState,
            [prop]: event.target.value
        });
    }

    const createDrink = async (event) => {
        event.preventDefault();
        console.log('submitted!')
        try {
            const res = await axios.post('/api/drinks', formState);

            props.setUser(res.data.user);

            setFormState({
                name: '',
                category: '',
                ingredients: '',
                instructions: ''
            })

        } catch (err) {
            if (err.code === 402) {
                setErrMessage(err.response.data.error)
            }
        }
    }

    const deleteFav = async (drinkID) => {
       
        try{
            const res = await axios.put(`/api/fav/${drinkID}`)
            props.setUser(res.data.user)
        } catch (err) {
            if (err.code === 402) {
                setErrMessage(err.response.data.error)
            }
        }
        
    }




    return (
        <main>
            <h1>Welcome {props.user.username}</h1>

            <form onSubmit={createDrink}>
                <h2>Add a Drink</h2>
                {errMessage && <p>{errMessage}</p>}
                <input name='name' value={formState.name} onChange={handleChange} type="text" placeholder="Enter the name of your drink"></input>
                <input name='category' value={formState.category} onChange={handleChange} type="text" placeholder="Enter a category"></input>
                <input name='ingredients' value={formState.ingredients} onChange={handleChange} type="text" placeholder="Enter the ingredients"></input>
                <textarea name='instructions' value={formState.instructions} onChange={handleChange} type="text" placeholder="Instructions"></textarea>
                <button>Save Drink</button>
            </form>

            {props.user && props.user.favorites.length && <h2 className="text-center">Favorites</h2>}
            <div className="favorites">
                {props.user.favorites.map((fav) => (
                    <div className="fav" key={fav._id}>
                        <p>{fav.name}</p>
                        <p>Category: {fav.category}</p>
                        <p>Ingredients: {fav.ingredents}</p>
                        <p>Instructions: {fav.instructions}</p>
                        <p>Created by: {fav.user.username}</p>
                        <button onClick={() => deleteFav(fav._id)}>Remove from Favorites</button>
                    </div>
                ))}
            </div>


        </main>
    )
};

export default Dashboard


