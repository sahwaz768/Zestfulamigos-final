'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';

const Page = ({ existingData }) => {
  const [formData, setFormData] = useState({
    firstName: 'sahwaz',
    lastName: 'yaser',
    gender: 'male',
    skinTone: 'fair',
    bodyType: 'Muscular',
    eatingHabit: 'nonveg',
    smokingHabit: 'non-smoker',
    drinkingHabit: 'occasionally',
    location: 'New York',
    height: "6'0",
    description: [true, true], // Updated to 24 checkboxes
    images: []
  });

  const [errors, setErrors] = useState({});

  // Initialize formData with existing data when the component mounts
  useEffect(() => {
    if (existingData) {
      setFormData({
        ...existingData,
        description: existingData.description || new Array(24).fill(false), // Ensure description is initialized
        images: existingData.images || [] // Ensure images are initialized
      });
    }
  }, [existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const handleCheckboxChange = (index) => {
    const updatedDescription = [...formData.description];
    updatedDescription[index] = !updatedDescription[index];
    setFormData({ ...formData, description: updatedDescription });
  };

  const handleImageUpload = (images) => {
    setFormData({ ...formData, images });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.skinTone) newErrors.skinTone = 'Skin tone is required';
    if (!formData.bodyType) newErrors.bodyType = 'Body type is required';
    if (!formData.eatingHabit)
      newErrors.eatingHabit = 'Eating habit is required';
    if (!formData.smokingHabit)
      newErrors.smokingHabit = 'Smoking habit is required';
    if (!formData.drinkingHabit)
      newErrors.drinkingHabit = 'Drinking habit is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.height.trim()) newErrors.height = 'Height is required';
    if (formData.description.filter((checked) => checked).length < 2)
      newErrors.description = 'Select at least 2 checkboxes';

    // Profile picture validation: At least 4 images must be uploaded
    if (formData.images.length < 4) {
      newErrors.images = 'Upload at least 4 profile pictures';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Submit form data to backend or perform further actions
    } else {
      console.log('Form has errors');
    }
  };

  const bodyTypes = {
    male: ['Muscular', 'Athletic', 'Slim'],
    female: [
      'Rectangular',
      'Triangular',
      'Spoon',
      'Hourglass',
      'Top Hourglass'
    ],
    other: [
      'Muscular',
      'Athletic',
      'Slim',
      'Rectangular',
      'Triangular',
      'Spoon',
      'Hourglass',
      'Top Hourglass'
    ]
  };

  // Updated checkbox labels
  const checkboxLabels = [
    'Casual Companionship',
    'City Tour',
    'Hiking Buddy',
    'Road Trips',
    'Party Partner',
    'Lifestyle Companionship',
    'Cooking Companionship',
    'Coffee and Conversation',
    'Travel Buddy',
    'Dining Partner',
    'Beach and Water Sports',
    'Social Companionship',
    'Business Networking',
    'Fitness Partner',
    'Language Exchange',
    'Pet Lover Companion',
    'Movie',
    'Adventure Companionship',
    'Camping Trips',
    'Event Plus One',
    'Cultural Outing',
    'Shopping Buddy',
    'Personalized Experience',
    'Last Unique Request'
  ];

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
        <Mastersidebar isCompanion={true}/>
        <form onSubmit={handleSubmit}>
          {/* Image Uploader */}
          <div className="form-group mt-2 mb-3">
            <label className="text-sm mb-3">Profile Pictures</label>
            <ImageUploader
              images={formData.images}
              onUpload={handleImageUpload}
            />
            {errors.images && <span className="text-xs">{errors.images}</span>}
          </div>
          {/* First Name */}
          <div className="userprofile-detail mt-3">
            <div className="form-group">
              <label className="text-sm">First Name</label>
              <br />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.firstName && (
                <span className="text-xs">{errors.firstName}</span>
              )}
            </div>
            {/* Last Name */}
            <div className="form-group">
              <label className="text-sm">Last Name</label>
              <br />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.lastName && (
                <span className="text-xs">{errors.lastName}</span>
              )}
            </div>
          </div>
          {/* Gender */}
          <div className="userprofile-detail">
            <div className="form-group">
              <label className="text-sm">Gender</label>
              <br />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="userprofile-input-text"
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

            {/* Skin Tone */}
            <div className="form-group">
              <label className="text-sm">Skin Tone</label>
              <br />
              <select
                name="skinTone"
                value={formData.skinTone}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Skin Tone</option>
                <option value="fair">Fair</option>
                <option value="brown">Brown</option>
                <option value="dark">Dark</option>
              </select>
              {errors.skinTone && (
                <span className="text-xs">{errors.skinTone}</span>
              )}
            </div>
          </div>
          {/* Body Type */}
          <div className="userprofile-detail">
            <div className="form-group">
              <label className="text-sm">Body Type</label>
              <br />
              <select
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Body Type</option>
                {formData.gender &&
                  bodyTypes[formData.gender].map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
              {errors.bodyType && (
                <span className="text-xs">{errors.bodyType}</span>
              )}
            </div>

            {/* Eating Habit */}
            <div className="form-group">
              <label className="text-sm">Eating Habit</label>
              <br />
              <select
                name="eatingHabit"
                value={formData.eatingHabit}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Eating Habit</option>
                <option value="veg">Veg</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="nonveg">Non-Veg</option>
                <option value="jain">Jain</option>
                <option value="vegan">Vegan</option>
              </select>
              {errors.eatingHabit && (
                <span className="text-xs">{errors.eatingHabit}</span>
              )}
            </div>
          </div>
          {/* Smoking Habit */}
          <div className="userprofile-detail">
            <div className="form-group">
              <label className="text-sm">Smoking Habit</label>
              <br />
              <select
                name="smokingHabit"
                value={formData.smokingHabit}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Smoking Habit</option>
                <option value="non-smoker">Non-Smoker</option>
                <option value="passive-smoker">Passive Smoker</option>
                <option value="active-smoker">Active Smoker</option>
                <option value="occasionally">Occasionally</option>
              </select>
              {errors.smokingHabit && (
                <span className="text-xs">{errors.smokingHabit}</span>
              )}
            </div>

            {/* Drinking Habit */}
            <div className="form-group">
              <label className="text-sm">Drinking Habit</label>
              <br />
              <select
                name="drinkingHabit"
                value={formData.drinkingHabit}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Drinking Habit</option>
                <option value="non-drinker">Non-Drinker</option>
                <option value="drinker">Drinker</option>
                <option value="occasionally">Occasionally</option>
              </select>
              {errors.drinkingHabit && (
                <span className="text-xs">{errors.drinkingHabit}</span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="userprofile-detail">
            <div className="form-group">
              <label className="text-sm">Location</label>
              <br />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.location && (
                <span className="error">{errors.location}</span>
              )}
            </div>

            {/* Height */}
            <div className="form-group">
              <label className="text-sm">Height</label>
              <br />
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.height && <span className="error">{errors.height}</span>}
            </div>
          </div>

          {/* Description Checkboxes */}
          <div className="form-group mt-2">
            <label className="text-sm ">Description (Select at least 2)</label>
            <div className="grid grid-cols-4 gap-1 mt-3">
              {checkboxLabels.map((label, index) => (
                <div key={index}>
                  <label className="md:text-sm text-xs">
                    <input
                      type="checkbox"
                      checked={formData.description[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    {label}
                  </label>
                </div>
              ))}
            </div>
            {errors.description && (
              <span className="text-xs">{errors.description}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="savechgbtn">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

// ImageUploader Component (Provided by you)
const ImageUploader = ({ images, onUpload }) => {
  const [localImages, setLocalImages] = useState(images);
  const maxImages = 4;

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (localImages.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      isMain: localImages.length === 0 && files.length === 1
    }));
    const updatedImages = [...localImages, ...newImages];
    setLocalImages(updatedImages);
    onUpload(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    onUpload(updatedImages);
  };

  const setMainImage = (index) => {
    const updatedImages = localImages.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    setLocalImages(updatedImages);
    onUpload(updatedImages);
  };

  return (
    <div className="image-uploader">
      {localImages.map((img, index) => (
        <div key={index} className="image-container">
          <img
            src={img.url}
            alt={`Uploaded ${index + 1}`}
            className="uploaded-image"
          />
          {img.isMain ? (
            <span className="main-label">Main</span>
          ) : (
            <span className="index-label" onClick={() => setMainImage(index)}>
              {index + 1}
            </span>
          )}
          <button
            className="remove-button"
            onClick={() => handleRemoveImage(index)}
          >
            &times;
          </button>
        </div>
      ))}
      {localImages.length < maxImages && (
        <label className="add-image">
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <span>+</span>
        </label>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  images: PropTypes.array.isRequired,
  onUpload: PropTypes.func.isRequired
};

Page.propTypes = {
  existingData: PropTypes.object
};

export default Page;
