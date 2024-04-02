import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/img/logo-nazar.png'
import { Link } from 'react-router-dom';


const Navbar = () => {

    const [ menu, setMenu ] = useState("mis-servicios");
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={ logo } alt=''/>
        </div>
        <ul className='nav-menu'>
            <li onClick={ () => { setMenu("mis-servicios")}}><Link to="/mis-servicios" >Portal de Clientes</Link></li>
        </ul>
    </div>
  )
}

export default Navbar
