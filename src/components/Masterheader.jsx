import React from 'react'
import Link from 'next/link';


const Masterheader = ({ rightElement }) => {
  return (
    <div>
    <div className="swipeheader">
       <header className="header2 ">
         
          <div className="logo2 ">zestful amigos</div>

          <nav className="nav2">
            <ul className="nav-list2 text-black text-sm">
           <Link  href={'/'}>  <li>
                <p >Home</p>
              </li>
              </Link> 
             <Link href={'./aboutus'}><li>
                <p >About</p>
              </li>
              </Link> 
           <Link href={'./privacypolicy'}> <li>
                <p >Privacy policy</p>
              </li>
              </Link>  
              <Link href={'./contactus'}>  <li>
                <p >Contact</p>
              </li> </Link >
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

export default Masterheader
