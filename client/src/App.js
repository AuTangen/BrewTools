import { useEffect, useState } from "react";
import {Route, Routes, Navigate} from 'react-router-dom'
import axios from 'axios'


import Landing from "./pages/Landing.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Recipecalc from "./pages/Recipecalc.js";
import ApiTesting from "./pages/APItesting.js";
import ViewRecipe from "./pages/ViewRecipe.js";

import Header from './components/Header';

import './App.css';

function App(props) {


  
const [user, setUser] = useState(null)

useEffect(() => {
  axios.get('/auth/authenticated').then(res => {
    setUser(res.data.user)
  })
}, []);

  return (

    <>
  
  <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Landing user={user} setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" /> } />
        <Route path="/login" element={!user ? <Login user={user} setUser={setUser}/> : <Navigate to="/recipecalc" /> } />
        <Route path="/register" element={!user ? <Register setUser={setUser}/> : <Navigate to="/recipecalc" />} />
        <Route path="/recipecalc" element={<Recipecalc user={user} setUser={setUser} />} />
        <Route path="/apitesting" element={<ApiTesting user={user} setUser={setUser} />} />
        <Route path='/recipe/:id' element={<ViewRecipe user={user} setUser={setUser}/> } />
      </Routes>
      
    </>

   
        
        
  );
}

export default App;
