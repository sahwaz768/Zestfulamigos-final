import Masterheader from '@/components/Masterheader';
import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import Footer from '@/components/Footer';

const ContactUsPage = () => {
  return (
    <div>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      <div>
     
      <div>
      <h1 className='text-2xl font-bold mt-6 ml-6'>Get in touch</h1>
      <p className='ml-6 mt-2'>Please use the contact information provided to get in touch with us. We look forward to assisting you.</p>
      <p className='ml-6 mt-1 mb-3'>Feel free to contact us.</p>
      <hr className='mx-5' />
      <div className='flex items-center p-4 gap-3'>
        <div>
        <FaLocationDot  color='pink' size={25}/>
        </div>
        <div>
          <h1 className='font-bold'>Our office location</h1>
          <p>Mumbai</p>
        </div>
      </div>
      <div className='flex items-center p-4 gap-3'>
        <div>
        <FaPhoneAlt color='pink' size={25}/>
        </div>
        <div>
          <h1 className='font-bold'>Phone</h1>
          <p>916372516545</p>
        </div>
      </div>
      <div className='flex items-center p-4 gap-3'>
        <div>
        <MdOutlineMarkEmailUnread  color='pink' size={25}/>
        </div>
        <div>
          <h1 className='font-bold'>Email</h1>
          <p>zestfulamigos@gmail.com</p>
        </div>
      </div>
      <div className='mt-8'>
      <Footer/>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ContactUsPage;
