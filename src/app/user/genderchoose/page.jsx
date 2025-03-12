'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { LocationaccessModel } from '@/components/Models';

const Page = () => {
  const [isLoading, setisLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [locationModel, setLocationModel] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setError(''); // Clear error on selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(() => true);

    const localstoragelocation = window.localStorage.getItem('userlocation');
    if (!gender || !localstoragelocation) {
      setError('Please select a gender.');
    } else {
      const location = JSON.parse(localstoragelocation);
      const values = {
        lng: location?.lng,
        lat: location?.lat,
        city: location?.city,
        state: location?.state,
        address: location?.formataddress,
        gender: gender.toLocaleUpperCase()
      };
      const { companionFindService } = await import(
        '../../../services/user/companionfind.service'
      );
      const { data, error } = await companionFindService(values);
      const { datafetched } = await import(
        '../../../Redux/companionfindReducer/companionFinReducer'
      );
      if (data) {
        dispatch(datafetched(data));
        console.log(data);
        setisLoading(() => false);

        router.push('/user/swipepage');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      {locationModel ? (
        <LocationaccessModel closeModal={() => setLocationModel(false)} />
      ) : null}
      <div className="genderbox">
        <h1 className=" text-xl font-extrabold sm:ml-3">
          Choose your companion gender
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          By tapping and selecting the gender that you want, you will get
          results from our Cast lists.
        </p>
        <div className="imgbox gap-5 flex">
          <div className="leftimg">
            <button
              type="button"
              name="male"
              onClick={() => handleGenderSelect('Male')}
              className={`malegender ${gender === 'Male' ? 'selected-male' : ''}`}
              aria-label="Select Male"
            ></button>
          </div>
          <div className="rightimg">
            <button
              type="button"
              name="female"
              onClick={() => handleGenderSelect('Female')}
              className={`femalegender ${gender === 'Female' ? 'selected-female' : ''}`}
              aria-label="Select Female"
            ></button>
          </div>
        </div>

        <div className="gendercntbtn flex justify-center mt-4">
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
            disabled={isLoading}

          >
            {isLoading ? 'Please wait....' : 'Countinue'}
          </button>
        </div>
        {error && (
          <p className="text-xs text-pink-700 mb-2 text-center mt-3">{error}</p>
        )}

        <div className="genderbottomdesign  ">
          <div className="gender-quarter-circle1"></div>
          <div className="gender-quarter-circle2"></div>
        </div>
      </div>
    </>
  );
};

export default Page;
