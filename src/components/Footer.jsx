'use client'

import React from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { CiPhone } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/shared/Assets/ZAlogo.png';


const Footer = () => {
  return (
    <div>
       <div className="footer text-white">
        <div className="  py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 ">
            <div>
              <h2 className="footerzest"><Image src={Logo} alt="logo" /></h2>
              <p className="text-white">Connect,Engage,Enjoy.</p>
            </div>

            <div>
              <div className="flex mt-6">
                <CiLocationOn color="white" size={20} />
                <h1 className="ml-3 text-white">Mumbai, India.</h1>
              </div>
              <div className="flex mt-4">
                <CiMail color="white" size={20} className="" />
                <h1 className="ml-3 text-white">zestfulamigos@gmail.com</h1>
              </div>
              <div className="flex mt-4">
                <CiPhone color="white" size={20} />
                <h1 className="ml-3 text-white">+91 9632587144</h1>
              </div>
              <div></div>
            </div>
            <div className="mt-4 ">
           <Link href={'/'}>  <p className="mt-1">Home</p> </Link> 
            <Link href={'/aboutus'}>  <p className="mt-1">AboutUs</p> </Link>
           <Link href={'/privacypolicy'}>   <p className="mt-1">Privacy Policy</p> </Link>
           <Link href={'/contactus'}>   <p className="mt-1">Contact Us</p> </Link>
            </div>

            <div className="mt-4">
              <Link href={'/companionsignup'}>
                {' '}
                <h1>Companion registration </h1>
              </Link>
              {/* <Link href={'/user/concern'}>
                {' '}
                <h1 className="mt-2">Raise a concern</h1>
              </Link> */}
            </div>
          </div>
        </div>
        <hr className="mx-16" />
        <div className="flex justify-center items-center mt-8 gap-6">
          <FaWhatsapp color="white" size={26} />
          <FiFacebook color="white" size={26} />
          <FaInstagram color="white" size={26} />
          <FaXTwitter color="white" size={26} />
          <CiLinkedin color="white" size={26} />
        </div>
        <div className="pt-14 py-7 text-center">
          Copyright 2025.All right reserve
        </div>
      </div>
    </div>
  )
}

export default Footer
