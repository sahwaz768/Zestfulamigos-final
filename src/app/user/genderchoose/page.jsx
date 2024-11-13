'use client';
import React, { useState } from 'react';

const Page = () => {
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setError(''); // Clear error on selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gender) {
      setError('Please select a gender.');
    } else {
      console.log(`Gender selected: ${gender}`);
    }
  };

  return (
    <div className="genderbox">
      <h1 className="pt-10 text-xl font-extrabold sm:ml-3">
        Choose your companion gender
      </h1>
      <p className="mt-2 text-sm text-gray-700">
        By tapping and selecting the gender that you want, you will get results
        from our Cast lists.
      </p>

      <form onSubmit={handleSubmit} className="gender-form">
        <div className="imgbox gap-5 flex">
          <div className="leftimg">
            <button
              type="button"
              name="male"
              onClick={() => handleGenderSelect('Male')}
              className={`malegender ${gender === 'Male' ? 'selected-male' : ''}`}
              aria-label="Select Male"
            >
              
            </button>
          </div>
          <div className="rightimg">
            <button
              type="button"
              name="female"
              onClick={() => handleGenderSelect('Female')}
              className={`femalegender ${gender === 'Female' ? 'selected-female' : ''}`}
              aria-label="Select Female"
            >
            
            </button>
          </div>
        </div>

        <div className="gendercntbtn flex justify-center mt-4">
          {error && <p className="text-xs text-pink-700 mb-2">{error}</p>}
          <button type="submit" className="submit-button">
            Continue
          </button>
        </div>
      </form>

      <div className="genderbottomdesign  ">
        <div className="gender-quarter-circle1"></div>
        <div className="gender-quarter-circle2"></div>
      </div>
    </div>
  );
};

export default Page;

