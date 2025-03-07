'use client';
import React, { useEffect, useState } from 'react';
import { CiShoppingBasket } from 'react-icons/ci';
import Image from 'next/image';
import Link from 'next/link';
import Chatheader from '@/components/Masterheader';
import { companionDetailsService } from 'src/services/user/companionDetails.service';
import { BASEURL } from '@/Constants/services.constants';
import { capitalizedWord } from '@/utils/common.utils';
import { Threeline } from '../swipepage/page';
import Loadingbar from '@/components/Loadingbar';

const page = () => {
  const [companionDetails, setCompanionDetails] = useState({});

  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let companionId = params.get('companionId');
    if (companionId) {
      companionDetailsService({ companionId }).then((response) => {
        if (response.data) {
          setCompanionDetails(response.data?.data);
          console.log(response.data.data);
        }
      });
    }
  }, []);

  if (!Object.keys(companionDetails).length) return <Loadingbar/>;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];

  return (
    <>
      <Threeline />
      <Chatheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <h1 className="text-2xl font-semibold mx-6 my-4 profile-text">
        Full Profile detail
      </h1>
      <div className="detailbox ">
        <div className="detail">
          <div className=" flex flex-wrap gap-3">
            <div className="horizontalimg flex gap-2">
              <Image
                src={BASEURL + `/` + companionDetails?.images[0]}
                width={500}
                height={300}
                alt="profile"
              />
            </div>
            <div className="horizontalimg-2 flex gap-2 ">
              {companionDetails.images[1] && (
                <Image
                  src={BASEURL + `/` + companionDetails?.images[1]}
                  width={500}
                  height={300}
                  alt="profile"
                />
              )}
            </div>
            <div className="vertical-img ">
              {companionDetails.images[2] && (
                <Image
                  src={BASEURL + `/` + companionDetails?.images[2]}
                  width={500}
                  height={300}
                  alt="profile"
                  className="mt-3"
                />
              )}
              {companionDetails.images[3] && (
                <Image
                  src={BASEURL + `/` + companionDetails?.images[3]}
                  className="md:mt-3"
                  width={500}
                  height={300}
                  alt="profile"
                />
              )}
            </div>
          </div>
          <div style={{ fontSize: '2rem' }}>
            <b>{companionDetails.firstname}</b>
          </div>
          <div className="flex flex-wrap gap-4 mt-10">
            <div className="tag">
              <p>
                Gender: <span>{capitalizedWord(companionDetails?.gender)}</span>
              </p>
            </div>
            <div className="tag">
              <p>
                charge: <span>{companionDetails?.bookingrate} per hour</span>
              </p>
            </div>
            <div className="tag">
              <p>
                My age / height:{' '}
                <span>
                  {companionDetails?.age} /{' '}
                  {parseFloat(companionDetails?.height / 30.48).toFixed(2)} feet
                </span>
              </p>
            </div>
            <div className="tag">
              <p>
                Skin Tone:{' '}
                <span>{capitalizedWord(companionDetails?.Skintone)}</span>
              </p>
            </div>
            <div className="tag">
              <p>
                Body Type:{' '}
                <span>{capitalizedWord(companionDetails?.bodytype)}</span>
              </p>
            </div>
            <div className="tag">
              <p>
                Drinking Habits:{' '}
                <span>{capitalizedWord(companionDetails.drinkinghabits)}</span>
              </p>
            </div>
            <div className="tag">
              <p>
                Eating Habits:{' '}
                <span>{capitalizedWord(companionDetails.eatinghabits)}</span>
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-3xl font-bold">My self Intro</h1>
            <div className="toppr mt-5">
              {companionDetails.description &&
              companionDetails.description.length
                ? companionDetails.description.map((desc, i) => (
                    <div className="prtag flex" key={i * 300}>
                      <CiShoppingBasket size={20} color="black" />
                      <p>{capitalizedWord(desc)}</p>
                    </div>
                  ))
                : null}
              {/* <div className="prtag flex">
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
              </div> */}
            </div>
            <h1 className="text-center text-2xl font-bold my-8">
              If she is your favourite then
            </h1>
            <Link href={`./timeslote?companionId=${companionDetails.id}`}>
              <div className=" cntbtn2">
                {' '}
                <div>Countinue</div>{' '}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
