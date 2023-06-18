import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";





function Login(props) {



    const [formState, setFormState] = useState({
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

    const submitLogin = async (event) => {
        event.preventDefault();
        console.log('submitted!')
        try {
            const res = await axios.post('/auth/login', formState);
            props.setUser(res.data.user)
            console.log(res.data.user)
        } catch (err) {
            if (err.code === 402) {
                console.log()
            }
        }
    }



    return (
        <section class="login">
        <form onSubmit={submitLogin}>

            <h1>Returning user?</h1>
            <h3>sign in here</h3>
            <input name='email' value={formState.email} onChange={handleChange} type="email" placeholder="Enter your email"></input>
            <input name='password' value={formState.password} onChange={handleChange} type="password" placeholder="Enter your password"></input>
            <button>Login</button>
        </form>
        <h3>don't have an account?</h3>
        <NavLink to="/register"><button>Register</button></NavLink>
        </section>
    )
};

export default Login