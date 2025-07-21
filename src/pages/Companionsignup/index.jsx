import React, { useState } from 'react';
import Masterheader from '@/components/Masterheader';
import Footer from '@/components/Footer';
import LocationAccess from '@/components/Locationaccess';

const Companionsignup = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, SetformData] = useState({
    Profilepicture: [],
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: '',
    skinTone: '',
    bodyType: '',
    height: '',
    eatingHabits: '',
    smokingHabit: '',
    drinkingHabit: '',
    bookingRate: '',
    // Payment Methods Array
    paymentMethods: [
      { method: '', accountNumber: '', ifscCode: '', upiId: '', wallet: '' },
      { method: '', accountNumber: '', ifscCode: '', upiId: '', wallet: '' },
      { method: '', accountNumber: '', ifscCode: '', upiId: '', wallet: '' }
    ],
    // Primary payment method selection (index of the array)
    primaryPaymentMethodIndex: -1,
    baseLocation1: '',
    baseLocation2: '',
    baseLocation3: '',
    baseLocation4: '',
    description: []
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = 4 - images.length;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    const previewsToAdd = filesToAdd.map((file) => URL.createObjectURL(file));

    const updatedImages = [...images, ...filesToAdd];
    setImages(updatedImages);
    setPreviewImages((prev) => [...prev, ...previewsToAdd]);

    SetformData((prev) => ({ ...prev, Profilepicture: updatedImages }));

    // Clear image error when files are added
    if (updatedImages.length >= 4) {
      setErrors((prev) => ({ ...prev, Profilepicture: '' }));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
    SetformData((prev) => ({ ...prev, Profilepicture: updatedImages }));
  };

  const Description = [
    'CASUAL_COMPANIONSHIP',
    'COFFEE_AND_CONVERSATIONS',
    'MOVIES',
    'CITY_TOURS',
    'DINING_PARTNER',
    'ADVENTURE_COMPANIONSHIP',
    'HIKING_BUDDY',
    'BEACH_AND_WATER_SPORTS',
    'CAMPING_TRIPS',
    'ROAD_TRIPS',
    'SOCIAL_COMPANIONSHIP',
    'EVENT_PLUS_ONE',
    'PARTY_PARTNER',
    'BUSINESS_NETWORKING',
    'CULTURAL_OUTINGS',
    'LIFESTYLE_COMPANIONSHIP',
    'FITNESS_PARTNER',
    'SHOPPING_BUDDY',
    'COOKING_COMPANION',
    'LANGUAGE_EXCHANGE',
    'PERSONALIZED_EXPERIENCE',
    'TRAVEL_BUDDY',
    'PET_LOVER_COMPANION',
    'UNIQUE_REQUESTS'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'description') {
      SetformData((prev) => {
        const updatedDescriptions = checked
          ? [...prev.description, value]
          : prev.description.filter((desc) => desc !== value);
        return { ...prev, description: updatedDescriptions };
      });

      // Clear description error when at least 2 are selected
      if (checked && formData.description.length >= 1) {
        setErrors((prev) => ({ ...prev, description: '' }));
      }
    } else if (name.includes('paymentMethod') || name.includes('accountNumber') || name.includes('ifscCode') || name.includes('upiId') || name.includes('wallet')) {
      // Handle payment method array updates
      const baseFieldName = name.replace(/\d+$/, ''); // Remove number suffix
      const index = parseInt(name.match(/\d+$/)[0]) - 1; // Get index (subtract 1 for 0-based array)
      
      // Map field names correctly
      let fieldName;
      if (baseFieldName === 'paymentMethod') {
        fieldName = 'method';
      } else {
        fieldName = baseFieldName; // accountNumber, ifscCode, upiId, wallet remain the same
      }
      
      SetformData((prev) => {
        const updatedPaymentMethods = [...prev.paymentMethods];
        updatedPaymentMethods[index] = {
          ...updatedPaymentMethods[index],
          [fieldName]: value
        };
        return { ...prev, paymentMethods: updatedPaymentMethods };
      });

      // Clear specific field error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    } else {
      SetformData((prev) => ({ ...prev, [name]: value }));

      // Clear specific field error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validation = () => {
    const newErrors = {};

    // Profile pictures validation
    if (images.length < 4) {
      newErrors.Profilepicture = 'Minimum 4 profile pictures are required';
    }

    // Personal details validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        'Please enter a valid 10-digit Indian phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Appearance validation
    if (!formData.gender) {
      newErrors.gender = 'Gender selection is required';
    }

    if (!formData.skinTone) {
      newErrors.skinTone = 'Skin tone selection is required';
    }

    if (!formData.bodyType) {
      newErrors.bodyType = 'Body type selection is required';
    }

    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (formData.height < 120 || formData.height > 250) {
      newErrors.height = 'Height must be between 120-250 cm';
    }

    // Habits validation
    if (!formData.eatingHabits) {
      newErrors.eatingHabits = 'Eating habits selection is required';
    }

    if (!formData.smokingHabit) {
      newErrors.smokingHabit = 'Smoking habit selection is required';
    }

    if (!formData.drinkingHabit) {
      newErrors.drinkingHabit = 'Drinking habit selection is required';
    }

    // Booking rate validation
    if (!formData.bookingRate) {
      newErrors.bookingRate = 'Booking rate is required';
    } else if (formData.bookingRate <= 0) {
      newErrors.bookingRate = 'Booking rate must be greater than 0';
    }

    // Payment methods validation (at least one method must be provided)
    const filledPaymentMethods = formData.paymentMethods.filter(pm => pm.method !== '');

    if (filledPaymentMethods.length === 0) {
      newErrors.paymentMethod1 = 'At least one payment method is required';
    }

    // Validate each filled payment method
    formData.paymentMethods.forEach((paymentMethod, index) => {
      const suffix = (index + 1).toString();
      
      if (paymentMethod.method) {
        if (paymentMethod.method === 'bank-transfer') {
          if (!paymentMethod.accountNumber.trim()) {
            newErrors[`accountNumber${suffix}`] = 'Account number is required';
          } else if (paymentMethod.accountNumber.length < 9 || paymentMethod.accountNumber.length > 18) {
            newErrors[`accountNumber${suffix}`] = 'Account number must be between 9-18 digits';
          }

          const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
          if (!paymentMethod.ifscCode.trim()) {
            newErrors[`ifscCode${suffix}`] = 'IFSC code is required';
          } else if (!ifscRegex.test(paymentMethod.ifscCode)) {
            newErrors[`ifscCode${suffix}`] = 'Please enter a valid IFSC code';
          }
        }

        if (paymentMethod.method === 'UPI') {
          const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
          if (!paymentMethod.upiId.trim()) {
            newErrors[`upiId${suffix}`] = 'UPI ID is required';
          } else if (!upiRegex.test(paymentMethod.upiId)) {
            newErrors[`upiId${suffix}`] = 'Please enter a valid UPI ID';
          }
        }

        if (paymentMethod.method === 'wallet') {
          if (!paymentMethod.wallet.trim()) {
            newErrors[`wallet${suffix}`] = 'Wallet number is required';
          }
        }
      }
    });

    // Primary payment method validation
    if (filledPaymentMethods.length > 1 && formData.primaryPaymentMethodIndex === -1) {
      newErrors.primaryPaymentMethodIndex = 'Please select a primary payment method';
    }

    // Validate that primary payment method index is valid
    if (formData.primaryPaymentMethodIndex !== -1) {
      const primaryMethod = formData.paymentMethods[formData.primaryPaymentMethodIndex];
      if (!primaryMethod || !primaryMethod.method) {
        newErrors.primaryPaymentMethodIndex = 'Primary payment method must be one of the filled payment methods';
      }
    }

    // Base location validation (all 4 required)
    if (!formData.baseLocation1) {
      newErrors.baseLocation1 = 'Base Location 1 is required';
    }
    if (!formData.baseLocation2) {
      newErrors.baseLocation2 = 'Base Location 2 is required';
    }
    if (!formData.baseLocation3) {
      newErrors.baseLocation3 = 'Base Location 3 is required';
    }
    if (!formData.baseLocation4) {
      newErrors.baseLocation4 = 'Base Location 4 is required';
    }

    // Description validation
    if (formData.description.length < 2) {
      newErrors.description = 'Please select at least 2 description options';
    }

    return newErrors;
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const validationErrors = validation();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement =
        document.querySelector(`[name="${firstErrorField}"]`) ||
        document.querySelector(`#${firstErrorField}`) ||
        document.querySelector('.error-message');

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return;
    }

    // Clear all errors if validation passes
    setErrors({});

    // Prepare submission data - only include filled payment methods
    const submissionData = { ...formData };
    
    // Filter out empty payment methods and clean up unused fields
    submissionData.paymentMethods = formData.paymentMethods
      .filter(pm => pm.method !== '')
      .map(pm => {
        const cleanedMethod = {};
        
        // Always add method if it exists
        if (pm.method && pm.method.trim()) {
          cleanedMethod.method = pm.method;
        }
        
        if (pm.method === 'bank-transfer') {
          // For bank transfer, include both fields even if some are blank
          cleanedMethod.accountNumber = pm.accountNumber || '';
          cleanedMethod.ifscCode = pm.ifscCode || '';
        } else if (pm.method === 'UPI') {
          // For UPI, only include non-empty fields
          if (pm.upiId && pm.upiId.trim()) {
            cleanedMethod.upiId = pm.upiId;
          }
        } else if (pm.method === 'wallet') {
          // For wallet, only include non-empty fields
          if (pm.wallet && pm.wallet.trim()) {
            cleanedMethod.wallet = pm.wallet;
          }
        }
        
        return cleanedMethod;
      });

    console.log('Form submitted successfully:', submissionData);
    // Add your form submission logic here
  };

  const renderPaymentMethod = (methodNumber) => {
    const index = methodNumber - 1; // Convert to 0-based index
    const paymentMethod = formData.paymentMethods[index];

    return (
      <div key={methodNumber} className="my-6 p-4 border border-gray-200 rounded-lg">
        <h4 className="font-bold mb-3">Payment Method {methodNumber}:</h4>
        <div className="my-3">
          <label htmlFor={`payment-method-${methodNumber}`}>Payment Method:</label>
          <br />
          <select
            id={`payment-method-${methodNumber}`}
            className="inputfield-glg-be"
            name={`paymentMethod${methodNumber}`}
            value={paymentMethod.method}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="wallet">Wallet</option>
            <option value="UPI">UPI</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
          {errors[`paymentMethod${methodNumber}`] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[`paymentMethod${methodNumber}`]}
            </p>
          )}
        </div>

        {paymentMethod.method === 'bank-transfer' && (
          <div className="my-3 flex gap-5 flex-wrap">
            <div>
              <label htmlFor={`account-number-${methodNumber}`}>Account Number:</label>
              <br />
              <input
                type="text"
                id={`account-number-${methodNumber}`}
                name={`accountNumber${methodNumber}`}
                value={paymentMethod.accountNumber}
                onChange={handleChange}
                placeholder="Enter your account number"
                className="inputfield-glg-be"
              />
              {errors[`accountNumber${methodNumber}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`accountNumber${methodNumber}`]}
                </p>
              )}
            </div>
            <div>
              <label htmlFor={`ifsc-code-${methodNumber}`}>IFSC Code:</label>
              <br />
              <input
                type="text"
                id={`ifsc-code-${methodNumber}`}
                name={`ifscCode${methodNumber}`}
                value={paymentMethod.ifscCode}
                onChange={handleChange}
                placeholder="Enter your IFSC code"
                className="inputfield-glg-be"
              />
              {errors[`ifscCode${methodNumber}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`ifscCode${methodNumber}`]}
                </p>
              )}
            </div>
          </div>
        )}

        {paymentMethod.method === 'UPI' && (
          <div className="my-3">
            <label htmlFor={`upi-id-${methodNumber}`}>UPI ID:</label>
            <br />
            <input
              type="text"
              id={`upi-id-${methodNumber}`}
              name={`upiId${methodNumber}`}
              value={paymentMethod.upiId}
              onChange={handleChange}
              placeholder="Enter your UPI ID"
              className="inputfield-glg-be"
            />
            {errors[`upiId${methodNumber}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`upiId${methodNumber}`]}
              </p>
            )}
          </div>
        )}

        {paymentMethod.method === 'wallet' && (
          <div className="my-3">
            <label htmlFor={`wallet-${methodNumber}`}>Wallet Number:</label>
            <br />
            <input
              type="text"
              id={`wallet-${methodNumber}`}
              name={`wallet${methodNumber}`}
              value={paymentMethod.wallet}
              onChange={handleChange}
              placeholder="Enter your wallet number"
              className="inputfield-glg-be"
            />
            {errors[`wallet${methodNumber}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`wallet${methodNumber}`]}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  // Get filled payment methods for primary selection
  const getFilledPaymentMethods = () => {
    return formData.paymentMethods
      .map((method, index) => ({ ...method, index }))
      .filter(method => method.method !== '')
      .map(method => ({
        index: method.index,
        label: `Payment Method ${method.index + 1} (${method.method})`
      }));
  };

  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      <form onSubmit={handlesubmit}>
        <div className="md:w-[80rem] w-[90%] mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl text-center font-bold">
            Register as companion
          </h1>

          <div>
            <div>
              <p className="font-bold my-4">Profile picture(4 required):</p>
              <div className="image-uploader">
                {previewImages.map((src, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="uploaded-image"
                    />
                    <button
                      type="button"
                      className="remove-button-4"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {images.length < 4 && (
                  <label className="add-image">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <span className="text-2xl text-gray-500">+</span>
                  </label>
                )}
              </div>
              {errors.Profilepicture && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Profilepicture}
                </p>
              )}
            </div>
          </div>
          <p className="font-bold mt-4">Personal Detail:</p>
          <div className="flex gap-5 flex-wrap my-3">
            <div>
              <label>first name:</label>
              <br />
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className="inputfield-glg-be"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label>last name:</label>
              <br />
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="inputfield-glg-be"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label>Email address:</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="inputfield-glg-be"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex gap-5 flex-wrap my-3">
            <div>
              <label>Phone Number:</label>
              <br />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="inputfield-glg-be"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div>
              <label>Password:</label>
              <br />
              <input
                type="password"
                name="password"
                className="inputfield-glg-be"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <p className="font-bold mt-4">Appearance:</p>
          <div className="flex gap-5 flex-wrap my-3">
            <div>
              <label>Gender:</label>
              <br />
              <select
                name="gender"
                className="inputfield-glg-be"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
            <div>
              <label>Skin Tone:</label>
              <br />
              <select
                className="inputfield-glg-be"
                name="skinTone"
                value={formData.skinTone}
                onChange={handleChange}
              >
                <option value="">Select Skin Tone</option>
                <option value="fair">FAIR</option>
                <option value="dark">DARK</option>
                <option value="brown">BROWN</option>
              </select>
              {errors.skinTone && (
                <p className="text-red-500 text-sm mt-1">{errors.skinTone}</p>
              )}
            </div>
            <div>
              <label>Body Type:</label>
              <br />
              <select
                className="inputfield-glg-be"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
              >
                <option value="">Select Body Type</option>
                <option value="athletic">ATHLETIC</option>
                <option value="muscular">MUSCULAR</option>
                <option value="slim">SLIM</option>
              </select>
              {errors.bodyType && (
                <p className="text-red-500 text-sm mt-1">{errors.bodyType}</p>
              )}
            </div>
          </div>
          <div className="flex gap-5 flex-wrap my-3">
            <div>
              <label>Height:</label>
              <br />
              <input
                name="height"
                value={formData.height}
                onChange={handleChange}
                type="number"
                placeholder="Enter your height in CM"
                className="inputfield-glg-be"
              />
              {errors.height && (
                <p className="text-red-500 text-sm mt-1">{errors.height}</p>
              )}
            </div>
          </div>

          <p className="font-bold mt-4">Habits:</p>
          <div className="flex gap-5 flex-wrap my-3">
            <div>
              <label>Eating Habits:</label>
              <br />
              <select
                className="inputfield-glg-be"
                name="eatingHabits"
                value={formData.eatingHabits}
                onChange={handleChange}
              >
                <option value="">Select Eating Habits</option>
                <option value="veg">VEG</option>
                <option value="nonveg">NON VEG</option>
                <option value="jain">JAIN</option>
                <option value="eggeterian">EGGETERIAN</option>
                <option value="vegan">VEGAN</option>
              </select>
              {errors.eatingHabits && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eatingHabits}
                </p>
              )}
            </div>
            <div>
              <label>Smoking Habit:</label>
              <br />
              <select
                className="inputfield-glg-be"
                name="smokingHabit"
                value={formData.smokingHabit}
                onChange={handleChange}
              >
                <option value="">Select Smoking Habit</option>
                <option value="passivesmoker">PASSIVE SMOKER</option>
                <option value="activesmoker">ACTIVE SMOKER</option>
                <option value="nonsmoker">NON SMOKER</option>
                <option value="occasionally">OCCASIONALLY</option>
              </select>
              {errors.smokingHabit && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.smokingHabit}
                </p>
              )}
            </div>
            <div>
              <label>Drinking Habit:</label>
              <br />
              <select
                className="inputfield-glg-be"
                name="drinkingHabit"
                value={formData.drinkingHabit}
                onChange={handleChange}
              >
                <option value="">Select Drinking Habit</option>
                <option value="dailydrinker">DAILY DRINKER</option>
                <option value="nondrinker">NON DRINKER</option>
                <option value="occasionallydrinker">OCCASIONAL DRINKER</option>
              </select>
              {errors.drinkingHabit && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.drinkingHabit}
                </p>
              )}
            </div>
          </div>

          <p className="font-bold mt-4">Other Details:</p>
          <div className="my-3">
            <div>
              <label>Booking Rate(per Hour):</label>
              <br />
              <input
                type="number"
                placeholder="Enter booking rate"
                className="inputfield-glg-be"
                name="bookingRate"
                value={formData.bookingRate}
                onChange={handleChange}
              />
              {errors.bookingRate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bookingRate}
                </p>
              )}
            </div>
          </div>

          <p className="font-bold mt-4">Payments Details:</p>
          {[1, 2, 3].map(methodNumber => renderPaymentMethod(methodNumber))}

          {/* Primary Payment Method Selection */}
          {getFilledPaymentMethods().length > 1 && (
            <div className="my-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-bold mb-3">Select Primary Payment Method:</p>
              {getFilledPaymentMethods().map(method => (
                <label key={method.index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="primaryPaymentMethodIndex"
                    value={method.index}
                    checked={formData.primaryPaymentMethodIndex === method.index}
                    onChange={(e) => {
                      if (e.target.checked) {
                        SetformData(prev => ({ ...prev, primaryPaymentMethodIndex: method.index }));
                        setErrors(prev => ({ ...prev, primaryPaymentMethodIndex: '' }));
                      } else {
                        SetformData(prev => ({ ...prev, primaryPaymentMethodIndex: -1 }));
                      }
                    }}
                    className="mr-2"
                  />
                  {method.label}
                </label>
              ))}
              {errors.primaryPaymentMethodIndex && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.primaryPaymentMethodIndex}
                </p>
              )}
            </div>
          )}

          <p className="font-bold mt-4">
            Baselocation Details (All 4 required):
          </p>
          <div>
            <div className="my-3">
              <div>
                <label htmlFor="base-location">Base Location 1:</label>
                <br />
                <LocationAccess
                  mapkey={1}
                  setLocation={(value) =>
                    SetformData((prev) => ({ ...prev, baseLocation1: value }))
                  }
                />
                {errors.baseLocation1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.baseLocation1}
                  </p>
                )}
              </div>
            </div>
            <div className="my-3">
              <div>
                <label htmlFor="base-location">Base Location 2:</label>
                <br />
                <LocationAccess
                  mapkey={2}
                  setLocation={(value) =>
                    SetformData((prev) => ({ ...prev, baseLocation2: value }))
                  }
                />
                {errors.baseLocation2 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.baseLocation2}
                  </p>
                )}
              </div>
            </div>
            <div className="my-3">
              <div>
                <label htmlFor="base-location">Base Location 3:</label>
                <br />
                <LocationAccess
                  mapkey={3}
                  setLocation={(value) =>
                    SetformData((prev) => ({ ...prev, baseLocation3: value }))
                  }
                />
                {errors.baseLocation3 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.baseLocation3}
                  </p>
                )}
              </div>
            </div>
            <div className="my-3">
              <div>
                <label htmlFor="base-location">Base Location 4:</label>
                <br />
                <LocationAccess
                  mapkey={4}
                  setLocation={(value) =>
                    SetformData((prev) => ({ ...prev, baseLocation4: value }))
                  }
                />
                {errors.baseLocation4 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.baseLocation4}
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="font-bold mt-4">Description (Select at least 2):</p>
          <div className="my-1">
            <div className="grid md:grid-cols-4 md:gap-3  gap-2  grid-cols-2">
              {Description.map((item, index) => (
                <label
                  key={index}
                  htmlFor={item}
                  className="md:text-sm text-xs"
                >
                  <input
                    type="checkbox"
                    name="description"
                    value={item}
                    onChange={handleChange}
                    checked={formData.description.includes(item)}
                    className="mx-2"
                    id={item}
                  />
                  {item}
                </label>
              ))}
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-400 text-white px-4 py-2 rounded mt-4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Companionsignup;