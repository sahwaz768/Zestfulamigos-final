'use client';
import React, { useState } from 'react';
import Header from '@/components/Masterheader';
import Link from 'next/link';
import Login from '@/components/Login';

const page = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    profilePictures: []
  };

  const [formData, setFormData] = useState(initialFormData);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required.';
    if (!formData.age || formData.age < 1 || formData.age > 120)
      newErrors.age = 'Age must be between 1 and 120.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be a 10-digit number.';
    }
    if (formData.profilePictures.length !== 2) {
      newErrors.profilePictures = 'Exactly 2 profile pictures are required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(
      0,
      2 - formData.profilePictures.length
    );
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData({
      ...formData,
      profilePictures: [...formData.profilePictures, ...files]
    });
    setPreviewImages([...previewImages, ...filePreviews]);
  };

  const handleRemoveImage = (index) => {
    const updatedProfilePictures = formData.profilePictures.filter(
      (_, i) => i !== index
    );
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);

    setFormData({ ...formData, profilePictures: updatedProfilePictures });
    setPreviewImages(updatedPreviewImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { requestforCompanionService } = await import(
          '@/services/user/userprofile.service'
        );
        const { toast } = await import('@/utils/reduxtrigger.utils');
        const userData = new FormData();
        userData.append('firstname', formData.firstName);
        userData.append('lastname', formData.lastName);
        userData.append('email', formData.email);
        userData.append('age', formData.age);
        userData.append('phoneno', formData.phone);
        userData.append('gender', formData.gender?.toUpperCase());
        formData.profilePictures.forEach((l) => {
          userData.append('images', l);
        });
        const { data, error } = await requestforCompanionService(userData);
        if (data) {
          toast.success(
            'Successfully requested for companion Will contact you soon!!'
          );
        } else {
          toast.error(error);
        }
      } catch (error) {
      } finally {
        setFormData(initialFormData);
        setPreviewImages([]);
        setErrors({});
      }
      // Clear the form
    }
  };
  return (
    <div>
      <Header backgroundColor="rgba(250, 236, 236, 0.8)" isLogin />
      <h1 className=" font-bold my-5 text-2xl ml-10">Be a companion</h1>
      <div className="flex md:justify-center ml-4">
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-wrap">
            <div className="">
              <label className="text-sm ">First Name</label>
              <br />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="inputfield-glg-be"
                placeholder="first name"
              />
              {errors.firstName && (
                <p className="text-xs">{errors.firstName}</p>
              )}
            </div>

            <div className="md:mx-2">
              <label className="text-sm">Last Name</label>
              <br />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="inputfield-glg-be"
                placeholder="last name"
              />
              {errors.lastName && <p className="text-xs">{errors.lastName}</p>}
            </div>
          </div>
          <div className="flex flex-wrap mt-2">
            <div className="">
              <label className="text-sm">Age</label>
              <br />
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="inputfield-glg-be"
                placeholder="Age"
              />
              {errors.age && <p className="text-xs">{errors.age}</p>}
            </div>
            <div className="md:ml-2">
              <label className="text-sm">Phone Number</label>
              <br />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="inputfield-glg-be"
                placeholder="Phone number"
              />
              {errors.phone && <p className="text-xs">{errors.phone}</p>}
            </div>
          </div>
          <div className="flex flex-wrap mt-2">
            <div className="">
              <label className="text-sm">Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="inputfield-glg-be"
                placeholder="email"
              />
              {errors.email && <p className="text-xs">{errors.email}</p>}
            </div>

            <div className="">
              <label className="text-sm ml-2">Gender</label>
              <br />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="select-gender-be ml-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-xs">{errors.gender}</p>}
            </div>
          </div>
          <p className="text-sm my-2">upload photo(two photo must)</p>
          <div className="uploader-container">
            {previewImages.map((src, index) => (
              <div key={index} className="image-thumbnail">
                <img src={src} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  className="remove-image-button"
                  onClick={() => handleRemoveImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
            {formData.profilePictures.length < 2 && (
              <label className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <span>+</span>
              </label>
            )}
          </div>
          {errors.profilePictures && (
            <p className="text-xs">{errors.profilePictures}</p>
          )}
          <div className="my-3">
            <button type="submit" className="sbtbtm ">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Link href={'/'}>
        <h1 className="text-sm text-center font-bold">login as a companion</h1>
      </Link>
    </div>
  );
};

export default page;
