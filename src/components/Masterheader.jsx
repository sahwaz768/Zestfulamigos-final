import React from 'react'
import Link from 'next/link';

const Masterheader = ({ rightElement, backgroundColor = "white",navLinks = []  }) => {
  return (
    <div>
    <div className="swipeheader">
       <header className="header" style={{ backgroundColor }}>
          <div className="logo ">zestful amigos</div>
          <nav className="nav">
            <ul className="nav-list text-black text-sm">
            {navLinks.map((link, index) => (
          <Link key={index} href={link.href} passHref>
            <p className='mx-3'>{link.name}</p>
          </Link>
        ))}
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
