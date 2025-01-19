'use client';
import React, { useEffect, useState } from 'react';
import { CiShoppingBasket } from 'react-icons/ci';
// import { FaPersonHiking } from 'react-icons/fa6';
// import { FaRoad } from 'react-icons/fa';
// import { GiCampingTent } from 'react-icons/gi';
import Image from 'next/image';
import Link from 'next/link';
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';
// import Profile1 from 'src/app/Rectangle 10.png';
// import Profile2 from 'src/app/Rectangle 11.png';
// import Profile3 from 'src/app/Rectangle 12.png';
// import Profile4 from 'src/app/Rectangle 14.png';
import { companionDetailsService } from 'src/services/user/companionDetails.service';
import { BASEURL } from '@/Constants/services.constants';

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

  if (!Object.keys(companionDetails).length) return <p>Loading...</p>;

  return (
    <>
      <Chatheader rightElement={<Notification />} />
      <h1 className="text-2xl font-semibold mx-6 my-4 profile-text">
        Full Profile detail
      </h1>
      <div className="detailbox ">
        <div className="detail">
          <div className=" flex flex-wrap gap-3">
            <div className="horizontalimg flex gap-2">
              <Image
                src={BASEURL + `/` + companionDetails.images[0]}
                width={500}
                height={300}
                alt="profile"
              />
            </div>
            <div className="vertical img ">
              <Image
                src={BASEURL + `/` + companionDetails.images[1]}
                width={500}
                height={300}
                alt="profile"
              />
              {companionDetails.images[2] && (
                <Image
                  src={BASEURL + `/` + companionDetails.images[2]}
                  className="md:mt-3"
                  width={500}
                  height={300}
                  alt="profile"
                />
              )}
            </div>
            <div className="horizontalimg-2 flex gap-2 ">
              {companionDetails.images[3] && (
                <Image
                  src={BASEURL + `/` + companionDetails.images[3]}
                  width={500}
                  height={300}
                />
              )}
            </div>
          </div>
          <div className="flex mt-10">
            <div className="tag">
              <p>
                charge: <span>{companionDetails.bookingrate} per hour</span>
              </p>
            </div>
            <div className="tag">
              <p>
                My age / height:{' '}
                <span>
                  {companionDetails.age} /{' '}
                  {parseFloat(companionDetails.height / 30.48).toFixed(2)} feet
                </span>
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
                      <p>{desc.split('_').join(' ').toLowerCase()}</p>
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
            <div className=" cntbtn2">
              <Link href={'./timeslote'}>
                {' '}
                <div>Countinue</div>{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
