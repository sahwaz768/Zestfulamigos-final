'use client';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { IoCloudUploadOutline } from 'react-icons/io5';
import Image from 'next/image';
import Pikasho from '@/app/Pikasobg.png';
import { useGoogleLogin } from '@react-oauth/google';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    gender: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  const [photoError, setPhotoError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? value : '') : value
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Handle photo upload change
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file
      });
      setPhotoError('');
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required).';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required.';
    } else if (
      isNaN(Number(formData.age)) ||
      Number(formData.age) < 18 ||
      Number(formData.age) > 50
    ) {
      newErrors.age = 'Age must be between 18 and 50.';
    }
    if (!formData.gender) newErrors.gender = 'Gender selection is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.photo) {
      setPhotoError('Profile photo is required.');
      return;
    }
    if (validateForm()) {
      console.log('Signup successful:', formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        age: '',
        gender: '',
        photo: null
      });
      setIsModalOpen(false);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      handlePhotoUpload(e);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        photo: file
      });
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse)
  });

  return (
    <>
      <div className="flex">
        <div className="rightbox">
          <h1 className="zestful text-center mt-8 text-white font-light">
            zestful amigos
          </h1>
          <Image src={Pikasho} alt="Picture of the signup" />
        </div>
        <div className="leftbox">
          <div>
            <div className="flex justify-center items-center my-1">
              <h1 className="text-xl font-bold">Get started with </h1>{' '}
              <p className="zest ml-3">zestful amigos</p>
            </div>
            <div className=" glgbtn2" onClick={() => login()}>
              <FcGoogle size={20} />
              <h1>signup with google</h1>
            </div>
            <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>
            <form>
              <div>
                <label className="text-sm text-black">Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="inputfield2"
                />

                {errors.name && (
                  <span className="text-xs text-pink-700">{errors.name}</span>
                )}
              </div>
              <div className="my-2">
                <label className="text-sm text-black">Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="inputfield2"
                />

                {errors.email && (
                  <span className="text-xs text-pink-700">{errors.email}</span>
                )}
              </div>
              <div className="my-2">
                <label className="text-sm text-black">Phone Number</label>
                <br />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your Phone number"
                  className="inputfield2"
                />

                {errors.phone && (
                  <span className="text-xs text-pink-700">{errors.phone}</span>
                )}
              </div>
              <div className="my-2">
                <label className="text-sm text-black">Password</label>
                <br />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your Password"
                  className="inputfield2"
                />

                <label className="text-xs ">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />{' '}
                  Show Password
                </label>
                <br />
                {errors.password && (
                  <span className="text-xs text-pink-700">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="my-2">
                <label className="text-sm text-black">Age</label>
                <br />
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your Age"
                  className="inputfield2"
                />

                {errors.age && (
                  <span className="text-xs text-pink-700">{errors.age}</span>
                )}
              </div>
              <div>
                <label className="text-sm text-black">Gender</label>
                <br />
                <label className="text-sm">
                  <input
                    type="checkbox"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                  />{' '}
                  Male
                </label>
                <label className="text-sm ml-4">
                  <input
                    type="checkbox"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                  />{' '}
                  Female
                </label>
                <label className="text-sm ml-4">
                  <input
                    type="checkbox"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleInputChange}
                  />{' '}
                  Other
                </label>
                <br />
                {errors.gender && (
                  <span className="text-xs text-pink-700">{errors.gender}</span>
                )}
              </div>
              <div
                className=" flex  cntbtn justify-center mt-3"
                onClick={handleContinue}
              >
                <h3 className="mt-1 mx-3"> Continue</h3>
              </div>
              <div className="flex justify-center my-3">
                <p className="text-sm">Already have an account ? </p>
                <p className="text-pink-700 text-sm ml-2">login</p>
              </div>
            </form>
          </div>
          {isModalOpen && (
            <div className="custom-modal">
              <div className="custom-modal-content">
                <span
                  onClick={() => setIsModalOpen(false)}
                  className="close-btn"
                >
                  &times;
                </span>
                <h2 className="font-bold">Preview your Image</h2>
                <div className="containerdrop">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`dropArea ${isDragging ? 'dropAreaDragging' : ''}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="fileInput"
                    />
                    {imagePreview ? (
                      <div className="previewContainer">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={500}
                          height={300}
                          unoptimized
                        />
                        <button
                          onClick={() => setImagePreview(null)}
                          className="closeButton"
                        >
                          ❌
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="dragicon">
                          <div>
                            <div className="flex justify-center">
                              <IoCloudUploadOutline size={30} />
                            </div>
                            <p className="text-sm text-gray-700">
                              Click to upload or Drag and Drop
                            </p>
                            <p className="text-xs text-gray-700">
                              use portrait image for better show
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {photoError && (
                  <span className="text-xs text-pink-700">{photoError}</span>
                )}
                <button onClick={handleSubmit} className="sbtbtm">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
