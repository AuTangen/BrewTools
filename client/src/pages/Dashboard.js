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


    // SEED

    const fermSeeds = [
        {
            "name": "Pale Malt",
            "category": "base malt",
            "color": 4,
            "extractPot": 1.037
        },
        {
            "name": "Vienna Malt",
            "category": "base malt",
            "color": 4,
            "extractPot": 1.037
        },
        {
            "name": "Pilsner Malt",
            "category": "base malt",
            "color": 3,
            "extractPot": 1.036
        },
        {
            "name": "Munich Malt",
            "category": "base malt",
            "color": 8,
            "extractPot": 1.038
        },
        {
            "name": "Maris Otter Malt",
            "category": "base malt",
            "color": 5,
            "extractPot": 1.038
        },
        {
            "name": "Caramel/Crystal Malt",
            "category": "specialty malt",
            "color": 75,
            "extractPot": 1.033
        },
        {
            "name": "Carapils Malt",
            "category": "specialty malt",
            "color": 2,
            "extractPot": 1.034
        },
        {
            "name": "Melanoidin Malt",
            "category": "specialty malt",
            "color": 20,
            "extractPot": 1.031
        },
        {
            "name": "Chocolate Malt",
            "category": "specialty malt",
            "color": 400,
            "extractPot": 1.029
        },
        {
            "name": "Biscuit Malt",
            "category": "specialty malt",
            "color": 30,
            "extractPot": 1.037
        },
        {
            "name": "Honey Malt",
            "category": "specialty malt",
            "color": 10,
            "extractPot": 1.022
        },
        {
            "name": "Carafa I Malt",
            "category": "specialty malt",
            "color": 450,
            "extractPot": 1.034
        },
        {
            "name": "Smoked Malt",
            "category": "specialty malt",
            "color": 4,
            "extractPot": 1.036
        },
        {
            "name": "Amber Malt",
            "category": "specialty malt",
            "color": 25,
            "extractPot": 1.033
        },
        {
            "name": "Wheat Malt",
            "category": "base malt",
            "color": 2,
            "extractPot": 1.039
        },
        {
            "name": "Flaked Barley",
            "category": "specialty malt",
            "color": 1.5,
            "extractPot": 1.032
        },
        {
            "name": "Flaked Oats",
            "category": "specialty malt",
            "color": 2.5,
            "extractPot": 1.032
        },
        {
            "name": "Rye Malt",
            "category": "specialty malt",
            "color": 8,
            "extractPot": 1.034
        },
        {
            "name": "Torrified Wheat",
            "category": "specialty malt",
            "color": 0,
            "extractPot": 1.035
        },
        {
            "name": "Chocolate Rye Malt",
            "category": "specialty malt",
            "color": 500,
            "extractPot": 1.027
        },
        {
            "name": "Raw Wheat",
            "category": "specialty malt",
            "color": 2,
            "extractPot": 1.035
        },
        {
            "name": "Rice Hulls",
            "category": "specialty malt",
            "color": 0,
            "extractPot": 1.000
        },
        {
            "name": "Aromatic Malt",
            "category": "specialty malt",
            "color": 25,
            "extractPot": 1.030
        },
        {
            "name": "Honey Malt",
            "category": "specialty malt",
            "color": 8,
            "extractPot": 1.023
        },
        {
            "name": "Chit Malt",
            "category": "specialty malt",
            "color": 1,
            "extractPot": 1.040
        },
        {
            "name": "Special B Malt",
            "category": "specialty malt",
            "color": 180,
            "extractPot": 1.034
        }
        ]

        const hopSeeds = [
            {
                "name": "Ahtanum",
                "alphaAcid": 4.8
            },
            {
                "name": "Amarillo",
                "alphaAcid": 9.5
            },
            {
                "name": "Aurora",
                "alphaAcid": 7
            },
            {
                "name": "Cascade",
                "alphaAcid": 5
            },
            {
                "name": "Centennial",
                "alphaAcid": 10
            },
            {
                "name": "Chinook",
                "alphaAcid": 12.5
            },
            {
                "name": "Citra",
                "alphaAcid": 12.3
            },
            {
                "name": "Columbus",
                "alphaAcid": 14
            },
            {
                "name": "El Dorado",
                "alphaAcid": 16
            },
            {
                "name": "Fuggle",
                "alphaAcid": 4.5
            },
            {
                "name": "Galaxy",
                "alphaAcid": 13.4
            },
            {
                "name": "Hallertau",
                "alphaAcid": 4.3
            }, 
            {
                "name": "Horizon",
                "alphaAcid": 11.8
            },
            {
                "name": "Melba",
                "alphaAcid": 7.5
            },
            {
                "name": "Mosaic",
                "alphaAcid": 10.5
            },
            {
                "name": "Nugget",
                "alphaAcid": 11.75
            },
            {
                "name": "Perle",
                "alphaAcid": 7.5
            },
            {
                "name": "Saaz",
                "alphaAcid": 3.5
            },
            {
                "name": "Simcoe",
                "alphaAcid": 12.25
            },
            {
                "name": "Summit",
                "alphaAcid": 16.8
            },
            {
                "name": "Warrior",
                "alphaAcid": 15
            },
            {
                "name": "Willamette",
                "alphaAcid": 4.5
            },
            {
                "name": "Zeus",
                "alphaAcid": 16
            }
        ]

        const yeastSeeds = [
            {
                "name": "American Ale",
                "style": "American/IPA",
                "attenuation": 78
            },
            {
                "name": "Belgian Ale",
                "style": "Belgian/Specialty",
                "attenuation": 77
            }, 
            {
                "name": "British Ale",
                "style": "English Ale",
                "attenuation": 75
            }, 
            {
                "name": "California Ale",
                "style": "American/IPA",
                "attenuation": 74
            }, 
            {
                "name": "Dry English",
                "style": "English Ale",
                "attenuation": 90
            },
            {
                "name": "English Ale",
                "style": "Dry Yeast",
                "attenuation": 79
            },
            {
                "name": "French Saison",
                "style": "Saison",
                "attenuation": 81
            },
            {
                "name": "German Lager",
                "style": "Lager",
                "attenuation": 77
            },
            {
                "name": "Kölsch Ale",
                "style": "Lager",
                "attenuation": 73
            },
            {
                "name": "Neutral Ale",
                "style": "American/IPA",
                "attenuation": 76
            },
            {
                "name": "Trappist Ale",
                "style": "Belgian/Specialty",
                "attenuation": 78
            },
            {
                "name": "Wheat Beer",
                "style": "Hefeweizen",
                "attenuation": 74
            }
        ]

    const seedDatabase = async () => {
        await axios.post('/api/seedferm', fermSeeds);
        await axios.post('/api/seedhops', hopSeeds);

        await axios.post('/api/seedyeast', hopSeeds);

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


            <button onClick={seedDatabase}>super secret seed</button>
        </main>
    )
};

export default Dashboard


