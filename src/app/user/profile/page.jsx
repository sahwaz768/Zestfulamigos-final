'use client';
import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import Chatheader from '@/components/Masterheader';
import { Mastersidebar } from '@/components/MasterSidebar';
import Notify from '@/components/Notify';

const Page = () => {
  const preExistingData = {
    profilePicture: '', // Pre-existing profile picture URL, if available
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '1234567890',
    age: '30',
    gender: 'male'
  };

  const [formData, setFormData] = useState(preExistingData);
  const [imageUrl, setImageUrl] = useState(preExistingData.profilePicture);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    import('../../../services/user/userprofile.service')
      .then(({ userProfileDetailsService }) => userProfileDetailsService())
      .then(({ data, error }) => {
        if (data) {
          console.log(data);
        } else {
          console.log(error);
        }
      });
  }, []);
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (
      !formData.email.trim() ||
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = 'Valid Email is required';
    }

    if (
      !formData.phoneNumber.trim() ||
      !/^\d{10}$/.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = 'Valid Phone Number is required';
    }

    if (
      !formData.age.trim() ||
      isNaN(formData.age) ||
      formData.age < 1 ||
      formData.age > 100
    ) {
      newErrors.age = 'Age must be between 1 and 100';
    }

    if (!formData.gender.trim()) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data submitted:', formData);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];

  return (
    <>
      <Chatheader
        backgroundColor="rgba(250, 236, 236, 0.8)"
        navLinks={navLinks}
      />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>
      <div className="profilebox">
        <Mastersidebar />
        <div className="profiledetail ">
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="profile-containerx">
                <label
                  htmlFor="file-input"
                  className="profile-picturex"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  {!imageUrl && (
                    <span className="userx">
                      <CgProfile size={30} />
                    </span>
                  )}
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-inputx"
                />
              </div>
            </div>
            <div className="userprofile-detail mt-3">
              <div className="">
                <label className="text-sm my-1">Full Name</label>
                <br />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="userprofile-input-text"
                />
                {errors.fullName && (
                  <span className="text-sm">{errors.fullName}</span>
                )}
              </div>

              <div className="">
                <label className="text-sm ">Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="userprofile-input-text"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="userprofile-detail ">
              <div className="">
                <label className="text-sm my-1">Phone Number</label>
                <br />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  className="userprofile-input-text"
                />
                {errors.phoneNumber && (
                  <span className="text-sm">{errors.phoneNumber}</span>
                )}
              </div>

              <div className="">
                <label className="text-sm my-1">Age</label>
                <br />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="1"
                  max="100"
                  className="userprofile-input-text"
                  disabled
                />
                {errors.age && <span className="text-sm">{errors.age}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="text-sm my-1">Gender</label>
              <br />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="userprofile-input-text"
                disabled
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-sm">{errors.gender}</span>
              )}
            </div>
            <button type="submit" className="savechgbtn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
