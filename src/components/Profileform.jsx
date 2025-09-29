'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  descriptionData,
  drinkingHabitsData,
  eatingHabitsData,
  GenderData,
  getBodyTypes,
  skinToneData,
  smokingHabitsData,
  AccountType,
  walletProviders,
  upiProviders
} from '@/shared/data/companion.data';

import { validateCompanion } from '@/shared/validations/companion.validation';
import LocationAccess from '@/components/Locationaccess';


const Profileform = ({ initialValues = {}, onSubmit, mode = 'signup' }) => {
  const [paymentForms, setPaymentForms] = useState([
    {
      type: '',
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
      walletIdentifier: '',
      isDefault: false
    }
  ]);
  const [formData, setFormData] = useState({
    images: initialValues?.Images || [],
    firstname: initialValues.firstname || '',
    lastname: initialValues.lastname || '',
    email: initialValues.email || '',
    age: initialValues.age || '',
    password: '',
    phoneno: initialValues.phoneno || '',
    gender: initialValues.gender || '',
    skintone: initialValues.Companion?.[0]?.Skintone || '',
    bodytype: initialValues.Companion?.[0]?.bodytype || '',
    eatinghabits: initialValues.Companion?.[0]?.eatinghabits || '',
    smokinghabits: initialValues.Companion?.[0]?.smokinghabits || '',
    drinkinghabits: initialValues.Companion?.[0]?.drinkinghabits || '',
    description: Array.isArray(initialValues.Companion?.[0]?.description)
      ? [...initialValues.Companion[0].description]
      : [],
    bookingrate: '',
    height: initialValues.Companion?.[0]?.height || '',
    baselocations: initialValues.Companion?.[0]?.baselocation || [],
    paymentmethods: [],
    isPrimary: 'false'
  });
  const [errors, setErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const [selectedButton, setSelectedButton] = useState(
    Array.from({ length: 4 }, () => null)
  );

  const addPaymentMethod = () => {
    setPaymentForms((prev) => [
      ...prev,
      {
        type: '',
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
        walletIdentifier: '',
        isDefault: false
      }
    ]);
  };

  const removePaymentMethod = (index) => {
    setPaymentForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setPaymentForms((prev) => {
      const updated = [...prev];

      // special check only for type switch
      if (name === 'type') {
        const currentForm = updated[index];

        // Define type-specific fields
        const typeFields = {
          Bankmethod: [
            'accountHolderName',
            'accountNumber',
            'ifscCode',
            'bankName',
            'branchName',
            'accountType'
          ],
          UPI: ['upiId', 'upiProvider'],
          WALLET: ['walletProvider', 'walletIdentifier']
        };

        const currentFields = typeFields[currentForm.type] || [];
        const hasFilledFields = currentFields.some(
          (field) => currentForm[field]?.trim() !== ''
        );

        if (hasFilledFields && currentForm.type && currentForm.type !== value) {
          setPaymentErrors((prevErr) => ({
            ...prevErr,
            [index]: `Please clear all ${currentForm.type} fields before switching to ${value}`
          }));
          return prev;
        } else {
          setPaymentErrors((prevErr) => {
            const newErr = { ...prevErr };
            delete newErr[index];
            return newErr;
          });
        }
      }

      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      paymentmethods: paymentForms
    }));
  }, [paymentForms]);

  const normalizePayment = (pm) =>
    Object.fromEntries(Object.entries(pm).map(([k, v]) => [k, v ?? '']));

  useEffect(() => {
    if (initialValues?.userpaymentmethods?.length > 0) {
      setPaymentForms(initialValues.userpaymentmethods.map(normalizePayment));
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
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
      const payload = {
        ...formData,
        paymentmethods: paymentForms
      };

      await onSubmit(payload);
    } else {
      console.log('Form has errors');
    }
  };

  const setMapBaseLocation = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.baselocations]; // copy old array
      updated[index] = value; // set new value at index
      return { ...prev, baselocations: updated };
    });
  };

  const handleChangeLocation = (e, index) => {
    e.preventDefault();
    const buttons = [...selectedButton];
    buttons[index] = true;
    setSelectedButton(buttons);
  };

  const handlePrimaryChange = (index) => {
    setPaymentForms((prev) =>
      prev.map((form, i) => ({
        ...form,
        isDefault: i === index ? true : false
      }))
    );
  };



  return (
    <>
      <div className="profilebox">
        <div className="margin-box-">
          {/* Image Uploader */}
          <div className="form-group mt-2 mb-3">
            <h1 className="font-bold mb-2">Profile Picture(4 required)</h1>
            <ImageUploader
              images={formData.images}
              onUpload={handleImageUpload}
            />
            {errors.images && <span className="text-xs">{errors.images}</span>}
          </div>

          {/* First Name */}
          <div className="">
            <div className=" mt-3">
              <h1 className="font-bold">Personal Detail:</h1>
              <div className="flex gap-5 flex-wrap">
                {/* First Name */}
                <div className="form-group">
                  <label className="text-sm">First Name</label>
                  <br />
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter first name"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
                    placeholder="Enter last name"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {errors.lastname && (
                    <span className="text-xs">{errors.lastname}</span>
                  )}
                </div>
                {/* Email */}
{ mode === 'signup' && (
                
                <div className="form-group">
                  <label className="text-sm">Email:</label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />

                  {errors.email && (
                    <span className="text-xs">{errors.email}</span>
                  )}
                </div>
)}
              </div>
            </div>
            {/* password */}
            <div className="flex gap-5 flex-wrap">
              {mode === 'signup' && (
              <div className="form-group">
                <label className="text-sm">Password:</label>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />

                {errors.password && (
                  <span className="text-xs">{errors.password}</span>
                )}
              </div>
              )}
              {/* age */}
              <div className="form-group">
                <label className="text-sm">Age:</label>
                <br />
                <input
                  type="text"
                  name="age"
                  placeholder="Enter new password"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />

                {errors.password && (
                  <span className="text-xs">{errors.password}</span>
                )}
              </div>
              {/* phoneno */}
              <div className="form-group">
                <label className="text-sm">Phoneno:</label>
                <br />
                <input
                  type="text"
                  name="phoneno"
                  placeholder="Enter your phone no"
                  value={formData.phoneno}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />

                {errors.phoneno && (
                  <span className="text-xs">{errors.phoneno}</span>
                )}
              </div>
            </div>

            <h1 className="font-bold">Appearance:</h1>
            <div className="flex gap-5 flex-wrap">
              {/* gender */}
              <div className="form-group">
                <label className="text-sm">Gender:</label>
                <br />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="">Select Your Gender</option>
                  {GenderData.map((l, i) => (
                    <option key={i * 20} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <span className="text-xs">{errors.gender}</span>
                )}
              </div>

              {/* Skin Tone */}
              <div className="form-group">
                <label className="text-sm">Skin Tone</label>
                <br />
                <select
                  name="skintone"
                  value={formData.skintone}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="">Select Skin Tone</option>
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
              {/* Body Type */}
              <div className="form-group">
                <label className="text-sm">Body Type</label>
                <br />
                <select
                  name="bodytype"
                  value={formData.bodytype}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
            </div>

            <div className="form-group">
              <label className="text-sm">Height</label>
              <br />
              <input
                type="text"
                name="height"
                placeholder='Enter your height in cm (e.g., "170 cm")'
                value={formData.height}
                onChange={handleInputChange}
                className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
              {errors.height && <span className="error">{errors.height}</span>}
            </div>
            <h1 className="font-bold">Habbits:</h1>
            <div className="flex gap-5 flex-wrap">
              {/* Eating Habit */}
              <div className="form-group">
                <label className="text-sm">Eating Habit</label>
                <br />
                <select
                  name="eatinghabits"
                  value={formData.eatinghabits}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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

              {/* Smoking Habit */}

              <div className="form-group">
                <label className="text-sm">Smoking Habit</label>
                <br />
                <select
                  name="smokinghabits"
                  value={formData.smokinghabits}
                  onChange={handleInputChange}
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
                  className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
            {/* booking rate */}
            <h1 className="font-bold">Other Details:</h1>
            <div className="form-group">
              <label className="text-sm">Booking rate:</label>
              <br />
              <input
                type="text"
                name="bookingrate"
                placeholder="Enter your booking rate"
                value={formData.bookingrate}
                onChange={handleInputChange}
                className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />

              {errors.bookingrate && (
                <span className="text-xs">{errors.bookingrate}</span>
              )}
            </div>

            {/* Location */}
            <div>
              <div className="flex flex-col gap-2 mt-3">
                <div>
                  <label className="font-bold my-2">Base location Details:(4 Required)</label>
                  <br />

                  <div className=" mt-2">
                    <div className="w-7/8">
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
                                If you want to update your base location {i + 1}{' '}
                                check here
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
                      {mode === 'signup' && (
                        <>
                          {[0, 1, 2, 3].map((idx) => (
                            <div key={idx} className="my-3">
                              <label className="text-sm">
                                Base Location {idx + 1}
                              </label>
                              <br />
                              <LocationAccess
                                mapkey={idx}
                                setLocation={(l) => setMapBaseLocation(idx, l)}
                              />
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {errors.baselocations && (
                <span className="text-xs">{errors.baselocations}</span>
              )}
            </div>

            <div>
              <label className="font-bold ">Payment (Atleast 1 required)</label>
              <div></div>
            </div>

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
                  <div className="flex items-center gap-2 my-2">
                    <input
                      type="radio"
                      name="primaryPayment" // ensures only one can be selected
                      checked={form.isDefault === true}
                      onChange={() => handlePrimaryChange(index)}
                    />
                    <label className="text-sm">Set as Primary</label>
                  </div>

                  {/* Payment Type */}
                  <div className='flex gap-5 flex-wrap'>
                     
                    <div className=''>
                      <label className="block text-sm font-medium text-gray-700">
                      Select Payment Method Type
                      </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={(e) => handleChange(index, e)}
                    className="inputfield-glg-be mt-1 block w-full mb-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Bankmethod">Bank Method</option>
                    <option value="UPI">UPI</option>
                    <option value="WALLET">Wallet</option>
                  </select>
                  </div>

                  {/* Common fields */}
                  
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
                  {paymentErrors[index] && (
                    <span className="text-xs text-red-500">
                      {paymentErrors[index]}
                    </span>
                  )}

                  {/* Bank Method Fields */}
                  {form.type === 'Bankmethod' && (
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
                  {form.type === 'UPI' && (
                    <div className="flex gap-5 flex-wrap my-3">
                      <input
                        type="text"
                        name="upiId"
                        value={form.upiId || ''}
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
                  {form.type === 'WALLET' && (
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
            </div>

            {/* Description Checkboxes */}
            <div className="form-group mt-2">
              <label className="font-bold mb-2">
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
            className="savechgbtn"
            //  disabled={isLoading}
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
};

// ImageUploader Component
const ImageUploader = ({ images, onUpload }) => {
  const previewImages = useMemo(() => {
    if (!images?.length) return [];
    return images.map((i) => (i?.file ? URL.createObjectURL(i.file) : ''));
  }, [images]);

  useEffect(() => {
    // Revoke object URLs on unmount/update
    return () => {
      previewImages.forEach((src) => src && URL.revokeObjectURL(src));
    };
  }, [previewImages]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const currentCount = images?.length || 0;
    const remaining = Math.max(0, 4 - currentCount);

    const filesToAdd = selectedFiles.slice(0, remaining).map((file, idx) => ({
      file,
      url: URL.createObjectURL(file),
      isMain: currentCount === 0 && idx === 0 // make first image main by default
    }));

    const updated = [...(images || []), ...filesToAdd];
    onUpload(updated);

    // Reset input so same file can be chosen again if removed
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const updated = (images || []).filter((_, i) => i !== index);
    onUpload(updated.length ? updated : null);
  };

  return (
    <div className="image-uploader flex gap-3 flex-wrap">
      {images.map((src, index) => (
        <div key={index} className="image-container">
          {src && (
            <img
              src={typeof src === 'object' ? src.url : src}
              alt={`Preview ${index + 1}`}
              className="uploaded-image"
            />
          )}
          <button
            type="button"
            className="remove-button-4 "
            onClick={() => handleRemoveImage(index)}
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      ))}

      {(images?.length || 0) < 4 && (
        <label className="add-image">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-2xl text-gray-500">+</span>
        </label>
      )}
    </div>
  );
};

export default Profileform;
