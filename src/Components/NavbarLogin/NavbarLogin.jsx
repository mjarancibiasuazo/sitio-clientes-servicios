import React from 'react'
import './NavbarLogin.css'
import logo from '../Assets/img/logo-nazar.png'
import { Link } from 'react-router-dom';


const NavbarLogin = () => {
  return (
    <div className='navbarlogin'>
        <div className='nav-logo'>
            <img src={ logo } alt=''/>
        </div>
         <ul className='nav-menu-login'>
            <li><Link to='/'>Login</Link></li>
        </ul> 
    </div>
  )
}

export default NavbarLogin
