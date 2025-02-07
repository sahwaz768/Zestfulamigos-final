import React from 'react';
import Link from 'next/link';
import Notify from './Notify';
import { CgProfile } from 'react-icons/cg';
import Login from './Login';

const Masterheader = ({
  isLogin,
  backgroundColor = 'white',
  navLinks = []
}) => {
  return (
    <div>
      <div className="swipeheader">
        <header className="header" style={{ backgroundColor }}>
          <div className="logo ">zestful amigos</div>
          <nav className="nav">
            <ul className="nav-list text-black text-sm">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <p className="mx-3">{link.name}</p>
                </Link>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            {isLogin ? (
              <Login />
            ) : (
              <div className="flex gap-2 mr-4">
                <Notify backgroundColor="black" color="white" />
                <div className="bellicon">
                  <Link href={'/user/profile'}>
                    <CgProfile color="white" size={20} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Masterheader;
