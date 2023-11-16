import { useState, useEffect } from 'react'
import './App.css'
import InitPage from './components/InitPAge/IinitPage';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';
import NavBar from './components/NavBar/NavBar';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';

function App() {
  const [access, setAccess]= useState(false);  
  const location=useLocation();
  const navigate=useNavigate();
 
  const login=(bool)=>{
    setAccess(bool);
  }
 
 useEffect(()=>{
   if(access){
    navigate("/home");
  }else{
    navigate("/");
  }    
 },[access]);
  
  
  return (
    <>
      {
        location.pathname!=='/'
        ? <NavBar/>
        : null
      }
      <Routes>
        <Route path='/' element={<InitPage login={login}/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='home/form' element={<Form/>}/>
        <Route path='/detail/:detailId' element={<Detail/>}/>
      </Routes>
    </>
  )
}

export default App
