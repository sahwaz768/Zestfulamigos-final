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
  skinToneData,
  smokingHabitsData,
  AccountType,
  walletProviders,
  upiProviders
} from '@/shared/data/companion.data';
import { convertCompanionData } from '@/utils/location';
import { validateCompanion } from '@/shared/validations/companion.validation';
import LocationAccess from '@/components/Locationaccess';

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
  height: 160,
  baselocations: [],
  paymentMethods: []
};

{
  /*const initialPaymentData = [
  {
    
    recipientName: 'John Doe',
    nickname: 'Personal Bank',
    accountNumber: '123456789',
    ifscCode: 'SBIN0001234',
    bankName: 'SBI',
    branchName: 'Mumbai',
    accountType: 'Saving',
    upiId: '',
    upiProvider: '',
    walletProvider: '',
    walletIdentifier: ''
  },
  {
    
    recipientName: 'wallo hill',
    nickname: 'Personal Bank',
    accountNumber: '123456789',
    ifscCode: 'SBIN0001234',
    bankName: 'SBI',
    branchName: 'Mumbai',
    accountType: 'Saving',
    upiId: '',
    upiProvider: '',
    walletProvider: '',
    walletIdentifier: ''
  }
]; */
}

const Page = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setisLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(
    Array.from({ length: 4 }, () => null)
  );
  const [errors, setErrors] = useState({});
  const [finalPaymentData, setFinalPaymentData] = useState([]);
  const [RecievedPaymentdata, setRecievedPaymentData] = useState([]);

  // Initialize formData with existing data when the component mounts
  useEffect(() => {
    import('@/services/user/userprofile.service').then(
      ({ getCompanionProfileDetails }) =>
        getCompanionProfileDetails().then(({ data }) => {
          if (data) {
            console.log('Existing companion data:', data.userpaymentmethods);
            setRecievedPaymentData(data.userpaymentmethods);

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
    const errors = validateCompanion(formData);
    if (Object.keys(errors).length > 0) {
      console.log('Errors', errors);
      setErrors(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setisLoading(() => true);
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
        } else if (key === 'description' || key === 'baselocations') {
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
      setisLoading(() => false);
      // Submit form data to backend or perform further actions
    } else {
      console.log('Form has errors');
    }
  };

  const handleChangeLocation = (e, index) => {
    e.preventDefault();
    const buttons = [...selectedButton];
    buttons[index] = true;
    setSelectedButton(buttons);
  };

  const handlePaymentData = (data) => {
    console.log('data received:', data);
    setFinalPaymentData(JSON.stringify(data)); // save it into state
  };

  return (
    <>
      <Chatheader backgroundColor="rgba(250, 236, 236, 0.8)" />
      <div className="notifymbsecond">
        <Notify backgroundColor="transparent" color="black" />
      </div>

      <div className="profilebox">
        <Mastersidebar
          isCompanion={true}
          className="sbar-height-companionprofile"
        />
        <div className="margin-box">
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
          <div className="companion-leftgap">
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
                  {skinToneData.map((l, i) => (
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
                {errors.height && (
                  <span className="error">{errors.height}</span>
                )}
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
            {/* <div className="userprofile-detail">
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
            </div> */}
            <div>
              <div className="flex flex-col gap-2 mt-3">
                {formData.baselocations.map((l, i) => (
                  <div key={i + 200}>
                    <label className="text-sm mt-2">
                      Base location {i + 1}
                    </label>
                    <br />
                    <button
                      onClick={(e) => handleChangeLocation(e, i)}
                      className={`border-2 w-3/4  cursor-pointer text-start p-3 text-sm rounded-lg  
                     ${selectedButton[i] ? 'border-pink-600' : 'border-gray-500'}`}
                    >
                      {(l && l.formattedaddress) ||
                        '1600 Pennsylvania Avenue NW Washington, DC 20500 United States'}
                    </button>
                    {selectedButton[i] && (
                      <div className=" mt-2">
                        <p className="text-sm mb-2 ">
                          If you want to update your base location {i + 1} check
                          here
                        </p>
                        <div className="w-5/6">
                          <LocationAccess
                            mapkey={i}
                            setLocation={(l) => {
                              const baseloc = [...formData.baselocations];
                              baseloc[i] = l;
                              setFormData((p) => ({
                                ...p,
                                baselocations: baseloc
                              }));
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {errors.baselocations && (
                <span className="text-xs">{errors.baselocations}</span>
              )}
            </div>
            <div>
              <label className="text-sm ">Payment (Atleast 1 required)</label>
              <div>
                <PaymentMethods
                  onPaymentDataChange={handlePaymentData}
                  initialData={RecievedPaymentdata}
                />
              </div>
            </div>

            <button
              onClick={() =>
                console.log('recieved payment data:', RecievedPaymentdata)
              }
            >
              Show Payment Data
            </button>

            {/* Description Checkboxes */}
            <div className="form-group mt-2">
              <label className="text-sm ">
                Description (Select at least 2)
              </label>
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
                    <span className="md:text-sm text-xs">{desc}</span>
                  </div>
                ))}
              </div>
              {errors.description && (
                <span className="text-xs">{errors.description}</span>
              )}
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="savechgbtn"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? 'Requesting' : 'Update Profile'}
          </button>
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

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files || []);
    const { toast } = await import('@/utils/reduxtrigger.utils');
    const maxImages = 4;
    if (files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images.`);
      return;
    }
    const validTypes = ['image/jpeg', 'image/png'];
    for (let i = 0; i < files.length; i += 1) {
      if (
        !validTypes.includes(files[i].type) ||
        files[i].size > 2 * 1024 * 1024
      ) {
        toast.error('Invalid Image');
        return;
      }
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
            src={typeof img === 'object' ? img.url : img}
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

const PaymentMethods = ({ onPaymentDataChange, initialData = [] }) => {
  const [paymentForms, setPaymentForms] = useState([initialData]);

  // handle input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setPaymentForms((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  // add new payment method
  const addPaymentMethod = () => {
    setPaymentForms((prev) => [
      ...prev,
      {
        PaymentMethodType: '',
        recipientName: '',
        nickname: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        branchName: '',
        accountType: '',
        upiId: '',
        upiProvider: '',
        walletProvider: '',
        walletIdentifier: ''
      }
    ]);
  };

  // remove a payment method
  const removePaymentMethod = (index) => {
    setPaymentForms((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = () => {
    console.log('payment data submited', paymentForms);
  };

  useEffect(() => {
    onPaymentDataChange(paymentForms);
  }, [paymentForms, onPaymentDataChange]);

  return (
    <div>
      {paymentForms.map((form, index) => (
        <div
          key={index}
          className="border p-4 my-4 rounded-lg shadow-sm bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg mb-2">
              Payment Method {index + 1}
            </h3>

            {/* Show remove button only if more than 1 form */}
            {paymentForms.length > 1 && (
              <button
                onClick={() => removePaymentMethod(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {/* Payment Type */}
          <select
            name="PaymentMethodType"
            value={form.PaymentMethodType}
            onChange={(e) => handleChange(index, e)}
            className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            <option value="">Select Payment Method</option>
            <option value="Bankmethod">Bank Method</option>
            <option value="UPI">UPI</option>
            <option value="wallet">Wallet</option>
          </select>

          {/* Common fields */}
          <div className="flex gap-5 flex-wrap my-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                value={form.recipientName}
                onChange={(e) => handleChange(index, e)}
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Enter recipient name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nickname
              </label>
              <input
                type="text"
                name="nickname"
                value={form.nickname}
                onChange={(e) => handleChange(index, e)}
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Enter nickname"
              />
            </div>
          </div>

          {/* Bank Method Fields */}
          {form.PaymentMethodType === 'Bankmethod' && (
            <div className="flex gap-5 flex-wrap my-3">
              <input
                type="text"
                name="accountHolderName"
                value={form.accountHolderName}
                onChange={(e) => handleChange(index, e)}
                placeholder="Account Holder Name"
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={(e) => handleChange(index, e)}
                placeholder="Account Number"
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="text"
                name="ifscCode"
                value={form.ifscCode}
                onChange={(e) => handleChange(index, e)}
                placeholder="IFSC Code"
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={(e) => handleChange(index, e)}
                placeholder="Bank Name"
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <input
                type="text"
                name="branchName"
                value={form.branchName}
                onChange={(e) => handleChange(index, e)}
                placeholder="Branch Name"
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <select
                name="accountType"
                value={form.accountType}
                onChange={(e) => handleChange(index, e)}
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Select Account Type</option>
                <option value="Saving">Savings</option>
                <option value="Current">Current</option>
              </select>
            </div>
          )}

          {/* UPI Fields */}
          {form.PaymentMethodType === 'UPI' && (
            <div className="flex gap-5 flex-wrap my-3">
              <input
                type="text"
                name="upiId"
                value={form.upiId}
                onChange={(e) => handleChange(index, e)}
                placeholder="UPI ID"
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <select
                name="upiProvider"
                value={form.upiProvider}
                onChange={(e) => handleChange(index, e)}
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Select UPI Provider</option>
                {upiProviders.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Wallet Fields */}
          {form.PaymentMethodType === 'wallet' && (
            <div className="flex gap-5 flex-wrap my-3">
              <select
                name="walletProvider"
                value={form.walletProvider}
                onChange={(e) => handleChange(index, e)}
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Select Wallet Provider</option>
                {walletProviders.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="walletIdentifier"
                value={form.walletIdentifier}
                onChange={(e) => handleChange(index, e)}
                placeholder="Wallet ID / Phone Number"
                className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          )}
        </div>
      ))}

      {/* Add More Button */}
      <button
        onClick={addPaymentMethod}
        className="mt-3 px-4 py-2 bg-red-400 text-white rounded-lg"
      >
        + Add More Payment Method
      </button>

      <button onClick={submit}>submit</button>
    </div>
  );
};

export default Page;
