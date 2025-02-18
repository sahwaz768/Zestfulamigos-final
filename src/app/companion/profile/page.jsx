'use client';
import React, { useState, useEffect } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import {
  descriptionData,
  drinkingHabitsData,
  eatingHabitsData,
  GenderData,
  getBodyTypes,
  SkinToneData,
  smokingHabitsData
} from '@/shared/data/companion.data';
import { convertCompanionData } from '@/utils/location';
import { BASEURL } from '@/Constants/services.constants';

const initialFormData = {
  images: [],
  firstname: '',
  lastname: '',
  age: 18,
  state: '',
  phoneno: '',
  gender: '',
  skintone: '',
  bodytype: '',
  eatinghabits: '',
  smokinghabits: '',
  drinkinghabits: '',
  city: '',
  description: [],
  bookingrate: 0,
  height: 160
};

const Page = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  // Initialize formData with existing data when the component mounts
  useEffect(() => {
    import('@/services/user/userprofile.service').then(
      ({ getCompanionProfileDetails }) =>
        getCompanionProfileDetails().then(({ data }) => {
          if (data) {
            setFormData(convertCompanionData(data));
          }
        })
    );
  }, []);

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

    if (!formData.firstname.trim())
      newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.skintone) newErrors.skintone = 'Skin tone is required';
    if (!formData.bodytype) newErrors.bodytype = 'Body type is required';
    if (!formData.eatinghabits)
      newErrors.eatinghabits = 'Eating habit is required';
    if (!formData.smokinghabits)
      newErrors.smokinghabits = 'Smoking habit is required';
    if (!formData.drinkinghabits)
      newErrors.drinkinghabits = 'Drinking habit is required';
    if (formData.description.filter((checked) => checked).length < 2)
      newErrors.description = 'Select at least 2 checkboxes';

    // Profile picture validation: At least 4 images must be uploaded
    // if (formData.images.length < 4) {
    //   newErrors.images = 'Upload at least 4 profile pictures';
    // }

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

  return (
    <>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>

      <div className="profilebox">
        <Mastersidebar isCompanion={true} />
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
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.firstname && (
                <span className="text-xs">{errors.firstname}</span>
              )}
            </div>
            {/* Last Name */}
            <div className="form-group">
              <label className="text-sm">Last Name</label>
              <br />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.lastname && (
                <span className="text-xs">{errors.lastname}</span>
              )}
            </div>
          </div>
          {/* Gender */}
          <div className="userprofile-detail">
            {/* Skin Tone */}
            <div className="form-group">
              <label className="text-sm">Skin Tone</label>
              <br />
              <select
                name="skintone"
                value={formData.skintone}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                {SkinToneData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {errors.skintone && (
                <span className="text-xs">{errors.skintone}</span>
              )}
            </div>

            <div className="form-group">
              <label className="text-sm">Height</label>
              <br />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.height && <span className="error">{errors.height}</span>}
            </div>
          </div>
          {/* Body Type */}
          <div className="userprofile-detail">
            <div className="form-group">
              <label className="text-sm">Body Type</label>
              <br />
              <select
                name="bodytype"
                value={formData.bodytype}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Body Type</option>
                {getBodyTypes(formData.gender).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.bodytype && (
                <span className="text-xs">{errors.bodytype}</span>
              )}
            </div>

            {/* Eating Habit */}
            <div className="form-group">
              <label className="text-sm">Eating Habit</label>
              <br />
              <select
                name="eatinghabits"
                value={formData.eatinghabits}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Eating Habit</option>
                {eatingHabitsData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {errors.eatinghabits && (
                <span className="text-xs">{errors.eatinghabits}</span>
              )}
            </div>
          </div>
          {/* Smoking Habit */}
          <div className="userprofile-detail">
            <div className="form-group">
              <label className="text-sm">Smoking Habit</label>
              <br />
              <select
                name="smokinghabits"
                value={formData.smokinghabits}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Smoking Habit</option>
                {smokingHabitsData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {errors.smokinghabits && (
                <span className="text-xs">{errors.smokinghabits}</span>
              )}
            </div>

            {/* Drinking Habit */}
            <div className="form-group">
              <label className="text-sm">Drinking Habit</label>
              <br />
              <select
                name="drinkinghabits"
                value={formData.drinkinghabits}
                onChange={handleInputChange}
                className="userprofile-input-text"
              >
                <option value="">Select Drinking Habit</option>
                {drinkingHabitsData.map((l, i) => (
                  <option key={i * 20} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {errors.drinkinghabits && (
                <span className="text-xs">{errors.drinkinghabits}</span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="userprofile-detail">
            <div className="form-group">
              <label className="text-sm">City</label>
              <br />
              <input
                type="text"
                name="city"
                disabled
                value={formData.city}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label className="text-sm">State</label>
              <br />
              <input
                type="text"
                name="state"
                disabled
                value={formData.state}
                onChange={handleInputChange}
                className="userprofile-input-text"
              />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
          </div>

          {/* Description Checkboxes */}
          <div className="form-group mt-2">
            <label className="text-sm ">Description (Select at least 2)</label>
            <div className="grid grid-cols-3 gap-2">
              {descriptionData.map((desc) => (
                <div key={desc} className="flex items-center">
                  <input
                    type="checkbox"
                    id={desc}
                    name="description"
                    value={desc}
                    checked={formData.description.includes(desc)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        description: checked
                          ? [...prev.description, value]
                          : prev.description.filter((d) => d !== value)
                      }));
                    }}
                    className="mr-2"
                  />
                  <span>{desc}</span>
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
  const [localImages, setLocalImages] = useState(() => images);
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
            src={typeof img === 'object' ? img.url : BASEURL + '/' + img}
            alt={`Uploaded ${index + 1}`}
            className="uploaded-image"
          />
          {/* {img.isMain ? (
            <span className="main-label">Main</span>
          ) : (
            <span className="index-label" onClick={() => setMainImage(index)}>
              {index + 1}
            </span>
          )} */}
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

export default Page;
