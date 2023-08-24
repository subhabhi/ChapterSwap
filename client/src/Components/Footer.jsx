import React from 'react'
import '../Styles/Footer.css'
import logo from '../Images/logo.jpeg'
export const Footer = () => {
  return (
    <>
      <footer className='footer-container'>
        <div className="foot-left">
          <img src={logo} alt="logo" />
          Chapter<span id="medi">Swap</span>
        </div>
        <div className="foot-right">
          <span id="privacy">Privacy policy?</span><br />
          Copyright &copy; 2023 ChapterSwap.  All rights reserved.
        </div>
      </footer>
    </>
  )
}
