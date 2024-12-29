'use client';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Chatheader,Chatsideicon} from '../chat/page';
import withAuth from '@/app/hoc/wihAuth';
import { Secondsidebaruser } from '../chat/page';


const Page = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
   const file = e.target.files[0];
    if (file) {
     const url = URL.createObjectURL(file);
     setImageUrl(url);
    }
  }
 
  return (
    <>
      <Chatheader/>
      <div className="profilebox">
        <Secondsidebaruser/>
        <div className="profiledetail">
          <div className="userprofile">
            <div className="profile-containerx">
              <label
                htmlFor="file-input"
                className="profile-picturex"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
             {!imageUrl && (
                  <span className="userx ">
                    <CgProfile size={30} />
                  </span>
           )  }
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-inputx"
              />
            </div>
            <button className="chgprofilebtn">change picture</button>
          </div>
          <div className="userprofile-detail ">
            <div>
              <p className="text-sm my-1">Profile name</p>
              <input
                type="text"
                className="userprofile-input-text"
                placeholder="Olavia"
                disabled
              />
            </div>
            <div>
              <p className="text-sm my-1">User name</p>
              <input
                type="text"
                className="userprofile-input-text"
                placeholder="Olavia"
                disabled
              />
            </div>
          </div>
          <div className="userprofile-detail my-2">
            <div>
              <p className="text-sm my-1">Email address</p>
              <input
                type="text"
                className=" disabled"
                disabled
                placeholder="Olavia123@gmail.com"
              />
            </div>
            <div>
              <p className="text-sm my-1">Phone number</p>
              <input
                type="text"
                className="userprofile-input-text"
                placeholder="1234567890"
                disabled
              />
            </div>
          </div>
          <button className="savechgbtn">save change</button>
        </div>
      </div>
    </>
  );
};

export default Page;
