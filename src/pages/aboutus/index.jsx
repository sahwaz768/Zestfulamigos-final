import React from 'react';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import { GiHealthPotion } from 'react-icons/gi';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { FaHandshake } from 'react-icons/fa6';
import Footer from '@/components/Footer';
import Masterheader from '@/components/Masterheader';


const AboutUsPage = () => {
  console.log('About us Page');
  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      <div className="md:mx-14 mx-4 ">
        <h1 className="text-2xl text-center font-bold">About us </h1>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">Revolutionizing Connections</p>
            <BsEmojiHeartEyes color="pink" size={20} />
          </div>
          <p className="text-sm my-2">
            Welcome to Zestful Amigos, a pioneering platform dedicated to
            alleviating loneliness,fostering meaningful connections, and
            bringing lively interactions to your life. In today's world of
            social media, where everyone seems to have a multitude of friends,
            we understand that true companionship and genuine connections can
            often feel elusive.
          </p>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">Vibrant Connections</p>
            <GiHealthPotion color="pink" size={20} />
          </div>
          <p className="text-sm my-2">
            At Zestful Amigos, we believe that it's not just about having a
            large number of online friends; it's about having real people around
            you who can make you feel truly alive. Our mission is to bridge the
            gap between the digital and physical world, connecting you with
            individuals who are available to hang out and bring vibrant energy
            to your life whenever you desire
          </p>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">Connection Catalysts</p>
            <IoHeartDislikeOutline color="pink" size={20} />
          </div>
          <p className="text-sm my-2">
            Our passionate team at Zestful Amigos is dedicated to helping you
            combat the sense of isolation and experience the joy of genuine
            human connections. Whether you're craving a spontaneous outing, an
            engaging conversation, or simply a friendly face to share
            experiences with, our platform provides a safe and inclusive space
            to meet like-minded individuals who are ready to infuse your life
            with liveliness.
          </p>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">Zestful Connections</p>
            <GiHealthPotion color="pink" size={20} />
          </div>
          <p className="text-sm my-2">
            Through our user-friendly platform, you can explore diverse profiles
            and connect with people who share your interests, passions, and
            availability. No longer will you have to settle for scrolling
            through a feed filled with superficial interactions. With Zestful
            Amigos, you can find real people who are eager to meet, laugh, and
            make memories with you at any time you desire.
          </p>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">Secure Commitment</p>
            <FaHandshake color="pink" size={20} />
          </div>
          <p className="text-sm my-2">
            Your privacy and security are of utmost importance to us. We have
            implemented robust measures to protect your personal information and
            ensure a safe environment for all our users. Rest assured that your
            conversations and hangouts will remain confidential, and you have
            complete control over the connections you make.
          </p>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold">Amigo Alliance</p>
            <FaHandshake color="pink" size={20} />
          </div>
          <p className="text-sm my-2">
            Join our ever-growing community of Zestful Amigos and let's find the
            perfect partner for everyone. Together, we'll create a world where
            vibrant connections and meaningful companionship are accessible to
            all.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default AboutUsPage;
