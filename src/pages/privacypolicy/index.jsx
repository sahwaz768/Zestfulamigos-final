import React from 'react';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { IoLibraryOutline } from 'react-icons/io5';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { MdOutlineSecurity } from 'react-icons/md';
import { CiMedicalClipboard } from 'react-icons/ci';
import { RiLinksLine } from 'react-icons/ri';
import { TbRating18Plus } from 'react-icons/tb';
import Footer from '@/components/Footer';
import Masterheader from '@/components/Masterheader';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      <div className="md:mx-14 mx-4">
        <h1 className="text-2xl text-center font-bold">Privacy Policy</h1>
        <h1 className="text-center font-bold ">Our terms and conditions</h1>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <AiOutlineSecurityScan color="pink" size={25} />
            <p className='font-bold'>Our Commitment To You</p>
          </div>
          <p className="text-sm my-2">
            At Zestful Amigos, we are committed to protecting the privacy and
            security of your personal information. This Privacy Policy outlines
            how we collect, use, disclose, and protect the information you
            provide when using our platform and services. By accessing or using
            Zestful Amigos, you consent to the terms and practices described in
            this policy
          </p>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            
            <IoLibraryOutline color="pink" size={20} />
            <p className='font-bold'>Information we collect</p>
          </div>
          <h1 className="text-sm my-2">
            Personal Information : When you register an account with Zestful
            Amigos, we may collect personal information, such as your name,
            email address, and demographic details.
          </h1>
          <h1 className="text-sm my-2">
            Communication Data : We may collect information related to your
            interactions with other users on our platform, including messages
            and conversations.
          </h1>
          <h1 className="text-sm my-2">
            Usage Data : We automatically collect certain information about your
            use of Zestful Amigos, such as your IP address, device type, browser
            information, and website usage statistics.
          </h1>
          <h1 className="text-sm my-2">
            Cookies and Similar Technologies : We may use cookies and similar
            technologies to enhance your experience and gather information about
            your preferences.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <IoIosInformationCircleOutline color="pink" size={20} />
            <p className='font-bold'>Use of Information </p>
          </div>
          <h1 className="text-sm my-2">
            Personalization : We use the information you provide to personalize
            your experience on Zestful Amigos, including matching you with
            compatible individuals and suggesting relevant content.
          </h1>

          <h1 className="text-sm my-2">
            Communication : We may use your email address or other contact
            information to send you important updates, service-related
            notifications, and marketing communications with your consent.
          </h1>
          <h1 className="text-sm my-2">
            Analytics and Improvements : We analyze user data to understand user
            behavior, improve our platform and services, and optimize user
            experience.
          </h1>
          <h1 className="text-sm my-2">
            Legal Compliance: We may process your information to comply with
            applicable laws, regulations, legal processes, or enforceable
            governmental requests.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
                <MdOutlineSecurity color="pink" size={20} />
            <p className='font-bold'>Information Sharing </p>
        
          </div>
          <h1 className="text-sm my-2">
            User-to-User Interaction : Your interactions and communications with
            other users on Zestful Amigos are at your own discretion. We do not
            control the content or actions of other users.
          </h1>

          <h1 className="text-sm my-2">
            Third-Party Service Providers : We may share your information with
            trusted third-party service providers who assist us in operating our
            platform and delivering services, subject to strict confidentiality
            obligations.
          </h1>
          <h1 className="text-sm my-2">
            {' '}
            Legal Obligations : We may disclose your information if required to
            do so by law, or if we believe such disclosure is necessary to
            protect our rights, safety, or the rights and safety of others.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <CiMedicalClipboard color="pink" size={20} />
            <p className='font-bold'>Data Security </p>
            
          </div>
          <h1 className="text-sm my-2">
            Ensuring Robust Security : We implement industry-standard security
            measures to protect your personal information from unauthorized
            access, disclosure, alteration, or destruction.
          </h1>

          <h1 className="text-sm my-2">Your Choices :</h1>
          <h1 className="text-sm my-2">
            {' '}
            Manage Your Personal Information : You may access, update, or delete
            your personal information by managing your account settings or
            contacting us directly.
          </h1>
          <h1 className="text-sm my-2">
            {' '}
            Opt-Out Freedom : You have the right to opt-out of receiving
            marketing communications from us at any time.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <RiLinksLine color="pink" size={20} />
            <p className='font-bold'>Third-Party Links </p>
            
          </div>
          <h1 className="text-sm my-2">
            Third-Party Links Disclaimer : Our platform may contain links to
            third-party websites or services. We are not responsible for the
            privacy practices or content of these third parties.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            
            <TbRating18Plus color="pink" size={20} />
            <p className='font-bold'>Children's Privacy</p>
          </div>
          <h1 className="text-sm my-2">
            Age Restriction Policy : Zestful Amigos is intended for users who
            are at least 18 years old. We do not knowingly collect personal
            information from individuals under the age of 18.
          </h1>
          <h1 className="text-sm my-2">Changes to this Policy :</h1>
          <h1 className="text-sm my-2">
            Privacy Policy Updates : We may update this Privacy Policy from time
            to time. The revised version will be effective as of the date stated
            at the beginning of this policy.
          </h1>
          <h1 className="text-sm my-2">Contact Us :</h1>
          <h1 className="text-sm my-2">
            Contacting Us About Privacy : If you have any questions, concerns,
            or requests regarding this Privacy Policy or our privacy practices,
            please write your query at contact us page.
          </h1>
        </div>
      </div>
      
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
