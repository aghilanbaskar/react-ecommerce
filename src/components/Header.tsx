import React from 'react'
import 'src/scss/header.scss'
import logo from 'src/assets/logo.jpg'

const Header = () => {
  return (
    <div className='header'>
        <div className='logo'><img src={logo} alt='logo' /></div>
    </div>
  )
}

export default Header