import axios from "axios";
import { useEffect, useState } from "react";




function Register({ setUser }) {

    const [showMessage, setShowMessage] = useState(true)

    useEffect(() => {
setShowMessage(true)
    },[])

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        const prop = event.target.name
        setFormState({
            ...formState,
            [prop]: event.target.value
        });
    }

    const submitRegister = async (event) => {
        event.preventDefault();
        console.log('submitted!')
        try {
            const res = await axios.post('/auth/register', formState);
            setUser(res.data.user)
            console.log(res.data.user)
        } catch (err) {
            if (err.code === 402) {
                console.log()
            }
        }
    }

    const handleMessageOK = () => {
        setShowMessage(false)
        }
    



    return (
        <section className="login">
            {showMessage && ( <div className="login-message">
            <h2>Hello!</h2>
            <p className="accent-red message-brk">We welcome you to create a free account with us, however please take the time to read this brief disclaimer:</p>
            <p>This app is intended to be a portfolio piece and although we've taken steps to encrypt and secure your passwords, <span className="accent-red">we strongly advise you not store any personal passwords</span> when using BrewTools. You can even use a fake email if you'd like, there's no authorization or account activation required - just don't forget your login credentials.</p>
            <h3>Happy Brewing!</h3>
            <button onClick={handleMessageOK}>OK</button>
            </div>
        )}
        <form onSubmit={submitRegister}>

            <h1>Register</h1>
            <input name='username' value={formState.userName} onChange={handleChange} type="text" placeholder="Create your username"></input>
            <input name='email' value={formState.email} onChange={handleChange} type="email" placeholder="Enter your email"></input>
            <input name='password' value={formState.password} onChange={handleChange} type="password" placeholder="Enter your password"></input>
            <div>
            <button>Register Account</button>
            </div>
        </form>
        </section>
    )
};

export default Register