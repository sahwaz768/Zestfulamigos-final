'use client';
import React, { useState, useEffect } from 'react';
import Chatheader from '@/components/Masterheader';
import Notify from '@/components/Notify';
import { Mastersidebar } from '@/components/MasterSidebar';
import {
  descriptionData,
  drinkingHabitsData,
  eatingHabitsData,
  // GenderData,
  getBodyTypes,
  SkinToneData,
  smokingHabitsData
} from '@/shared/data/companion.data';
import { convertCompanionData } from '@/utils/location';
import { BASEURL } from '@/Constants/services.constants';
import { validateCompanion } from '@/shared/validations/companion.validation';

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

  const handleImageUpload = (images) => {
    setFormData({ ...formData, images });
  };

  const validateForm = () => {
    const errors = validateCompanion(formData)
    if(Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      const companionetails = new FormData();
      const previousImages = [];
      for (let key in formData) {
        if (key === 'images') {
          formData[key].forEach((img) => {
            if (typeof img === 'string') {
              previousImages.push(img);
            } else {
              companionetails.append('images', img.file);
            }
          });
        } else if (key === 'description') {
          companionetails.append(key, JSON.stringify(formData[key]));
        } else if (key !== 'id') {
          companionetails.append(key, formData[key]);
        }
      }
      if (previousImages.length > 0) {
        companionetails.append(
          'previousImages',
          JSON.stringify(previousImages)
        );
      }
      const { updateCompanionProfileService } = await import(
        '@/services/user/userprofile.service'
      );
      const { toast } = await import('@/utils/reduxtrigger.utils');
      const { data, error } = await updateCompanionProfileService(
        companionetails,
        formData.id
      );
      if (data) {
        toast.success('Profile has been requested for approval');
      } else {
        toast.error(error);
      }
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
        <Mastersidebar isCompanion={true} className='sbar-height-companionprofile'/>
        <div className='margin-box'>
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
            <div className="grid md:grid-cols-4 md:gap-3  gap-2  grid-cols-2">
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
                  <span className='md:text-sm text-xs'>{desc}</span>
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
      </div>
    </>
  );
};

// ImageUploader Component (Provided by you)
const ImageUploader = ({ images, onUpload }) => {
  const [localImages, setLocalImages] = useState(() => images);
  const maxImages = 4;

  useEffect(() => {
    if (images.length > 0 && images !== localImages) {
      setLocalImages(() => images);
    }
  }, [images]);

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
            className="remove-button-4"
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
