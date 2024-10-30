"use client";
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { BsArrowReturnRight } from "react-icons/bs";





const page = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [photoError, setPhotoError] = useState(""); // State to track photo upload error
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? value : "") : value,
    });
  };

  // Handle photo upload change
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });
      setPhotoError(""); // Clear the error if a file is selected
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (10 digits required).";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 50) {
      newErrors.age = "Age must be between 18 and 50.";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender selection is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the photo upload in the modal
    if (!formData.photo) {
      setPhotoError("Profile photo is required.");
      return; // Do not submit if photo validation fails
    }

    // If photo and form are valid, submit the form
    if (validateForm()) {
      console.log("Signup successful:", formData);
      // Form submission logic here

      // Reset the form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        age: "",
        gender: "",
        photo: null,
      });
      setIsModalOpen(false); // Close modal after submit
    }
  };

  // Handle continue click to open modal
  const handleContinue = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true); // Open modal when form is valid
    }
  };



  return (
    <>
      <div className="flex">
        <div className="rightbox">
          <h1>this is image box</h1>
        </div>
        <div className="leftbox ">
          <div className="flex justify-center items-center my-1">
            <h1>Get started with </h1>{" "}
            <p className="zest ml-3">zestful amigos</p>
          </div>
          <div className="flex justify-center items-center glgbtn2">
            <FcGoogle size={20} />
            <h1>signup with google</h1>
          </div>
          <h4 className="hrline mx-3 my-3 text-gray-600"> or </h4>

          <div>
            <form>
              <div className="flex ">
                <div>
                  <label className="text-sm text-black">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="inputfield2"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <span className="text-xs text-pink-700">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label className="text-sm text-black ">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="inputfield2 ml-2"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <span className="text-xs text-pink-700">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="my-2">
                <label className="text-sm text-black">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="inputfield2"
                  placeholder="Enter your Phone number"
                />
                {errors.phone && (
                  <span className="text-xs text-pink-700">{errors.phone}</span>
                )}
              </div>

              <div>
                <label className="text-sm text-black">Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="inputfield2"
                  placeholder="Enter your Password"
                />
                {errors.password && (
                  <span className="text-xs text-pink-700">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="my-2">
                <label className="text-sm text-black">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="inputfield2"
                  placeholder="Enter your Age"
                />
                {errors.age && (
                  <span className="text-xs text-pink-700">{errors.age}</span>
                )}
              </div>

              <div>
                <label className="text-sm text-black">Gender</label>
                <div className="my-2">
                  <label className="text-sm">
                    <input
                      type="checkbox"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="mx-2"
                    />
                    Male
                  </label>
                  <label className="text-sm ml-8 ">
                    <input
                      type="checkbox"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Female
                  </label>
                  <label className="text-sm ml-8 ">
                    <input
                      type="checkbox"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
                {errors.gender && (
                  <span className="text-xs text-pink-700">{errors.gender}</span>
                )}
              </div>

              <div
                className=" flex  cntbtn justify-center"
                onClick={handleContinue}
              >
                <h3 className="mt-1 mx-3"> Continue</h3>
                <div className="arrowbtn">
                  <BsArrowReturnRight color="white" size={20} />
                </div>
              </div>
              <div className="flex justify-center my-3">
                <p className="text-sm">Already have an account ? </p>
                <p className="text-pink-700 text-sm ml-2">login</p>
              </div>
              <p></p>
            </form>

            {/* Custom Modal for photo upload */}
            {isModalOpen && (
              <div className="custom-modal">
                <div className="custom-modal-content">
                  <span
                    className="close-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    &times;
                  </span>
                  <h2>Upload your photo</h2>
                  <p>photo will show to your profile and amigo</p>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-800 border-solid rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-6 w-6 text-black"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer  rounded-md font-medium text-black  focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span className="mx-10">
                            click to upload or drag your photo
                          </span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-center">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Atque
                      </p>
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
      </div>
    </>
  );
};

export default page; 