import React from 'react'
import Link from 'next/link';

const Homeheader = ({ rightElement }) => {
  return (
    <div>
    <div className="swipeheader">
       <header className="header ">
         
          <div className="logo ">zestful amigos</div>

          <nav className="nav">
            <ul className="nav-list text-sm text-black">
            <Link  href={'/'}>   <li>
                <p >Home</p>
              </li> </Link>
              <Link href={'./user/aboutus'}>  <li>
                <p >About</p>
              </li> </Link>
              <Link href={'./user/privacypolicy'}>     <li>
                <p >Privacy policy</p>
              </li>
              </Link>
              <Link href={'./user/contactus'}>    <li>
                <p >Contact</p>
              </li>
              </Link>
            </ul>
          </nav>
          <div className="nav-right">
          {rightElement}
           
          </div>
        </header>
        </div>
    </div>
  )
}

export default Homeheader
