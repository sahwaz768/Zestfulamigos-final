import React from 'react';
import { CiShoppingBasket } from 'react-icons/ci';
import { FaPersonHiking } from 'react-icons/fa6';
import { FaRoad } from 'react-icons/fa';
import { GiCampingTent } from 'react-icons/gi';
import { Chatheader } from '../chat/page';
import Link from 'next/link';
import Image from 'next/image';
import Model1 from 'src/app/Rectangle 10.png';
import Model2 from 'src/app/Rectangle 11.png';
import Model3 from 'src/app/Rectangle 12.png';
import Model4 from 'src/app/Rectangle 14.png';

const page = () => {
  return (
    <>
    <Chatheader />
      <h1 className="text-2xl font-semibold ml-4 my-4 profile-text-heading">Full Profile detail</h1>
      <div className="detailbox ">
        <div className="detail">
          <div className= "flex flex-wrap">
            <div className=" flex gap-2">
            <div className='horizontalimg-1'>
              <Image
                src={Model1}
              />
              </div>
              
            </div>
            <div className="vertical img ml-2">
              <Image
                src={Model2}
              />
              <Image
                src={Model3}
              />
            </div>
            <div className='mt-2 ml-2 last-img'>
            <Image
              src={Model4}
            />

            </div>
          </div>
          <div className="flex mt-10">
            <div className="tag">
              <p>
                charge: <span>2000 per hour</span>
              </p>
            </div>
            <div className="tag">
              <p>
                My age / height: <span>27 / 5.8 feet</span>
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-3xl font-bold">My self Intro</h1>
            <div className="toppr mt-5">
              <div className="prtag flex">
                <CiShoppingBasket size={20} color="black" />
                <p>Shopping Buddy</p>
              </div>
              <div className="prtag flex">
                <FaPersonHiking color="black" size={20} />
                <p>Hiking buddy</p>
              </div>
              <div className="prtag flex">
                <FaRoad color="black" size={20} />
                <p>Road trip</p>
              </div>
              <div className="prtag flex">
                <GiCampingTent color="black" size={20} />
                <p>Camping</p>
              </div>
            </div>
            <h1 className="text-center text-2xl font-bold my-8">
              If she is your favourite then
            </h1>
            <div className=" cntbtn2">
             <Link href={'./timeslote'}> <div>Countinue</div> </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
