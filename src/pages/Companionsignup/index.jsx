'use client';
import React, { useEffect, useMemo, useState } from 'react';
import LocationAccess from '@/components/Locationaccess';
import Masterheader from '@/components/Masterheader';
import {
  descriptionData,
  drinkingHabitsData,
  eatingHabitsData,
  GenderData,
  getBodyTypes,
  skinToneData,
  smokingHabitsData,
  PaymentMethodType,
  AccountType,
  GenderEnum,
  walletProviders,
  upiProviders
} from '@/shared/data/companion.data';
import { validateCompanion } from '@/shared/validations/companion.validation';

const CompanionSkinToneEnum = skinToneData;
//const Description = descriptionData;

const initialForm = {
  images: /** @type {Array<{file: File}> | null} */ (null),
  firstname: '',
  lastname: '',
  age: 18,
  phoneno: '',
  gender: GenderEnum,
  skintone: CompanionSkinToneEnum,
  bodytype: '',
  eatinghabits: '',
  smokinghabits: '',
  drinkinghabits: '',
  email: '',
  password: '',
  description: [],
  bookingrate: '',
  height: '',
  baselocations: [],
  paymentMethods: []
};

// Image Uploader (keeps previews in sync with parent `images`)
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
    const filesToAdd = selectedFiles
      .slice(0, remaining)
      .map((file) => ({ file }));
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
      {previewImages.map((src, index) => (
        <div key={index} className="image-container">
          {src && (
            <img
              src={src}
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

export default function Companionsignup({
  initialForm: initialValues,
  buttonText = 'Create Companion'
}) {
  const [form, setForm] = useState(
    initialValues ? { ...initialForm, ...initialValues } : initialForm
  );
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Normalize number inputs to numbers
    const numericFields = new Set(['age', 'bookingrate', 'height']);
    const nextValue = numericFields.has(name)
      ? value === ''
        ? ''
        : Number(value)
      : value;

    if (type === 'checkbox' && name === 'description') {
      setForm((prev) => {
        const updatedDescriptions = checked
          ? [...prev.description, value]
          : prev.description.filter((desc) => desc !== value);
        return { ...prev, description: updatedDescriptions };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: nextValue }));
    }

    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const setMapBaseLocation = (index, value) => {
    const baselocations = [...(form.baselocations || [])];
    baselocations[index] = value;
    setForm((l) => ({ ...l, baselocations }));
  };

  // Payment methods
  const addPaymentMethod = () => {
    if ((form.paymentMethods || []).length >= 3) {
      alert('Maximum 3 payment methods allowed');
      return;
    }
    const newPaymentMethod = {
      type: PaymentMethodType.BANK_ACCOUNT,
      recipientName: '',
      nickname: '',
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      accountType: AccountType.SAVINGS
    };
    setForm((prev) => ({
      ...prev,
      paymentMethods: [...(prev.paymentMethods || []), newPaymentMethod]
    }));
  };

  const removePaymentMethod = (index) => {
    setForm((prev) => ({
      ...prev,
      paymentMethods: (prev.paymentMethods || []).filter((_, i) => i !== index)
    }));
  };

  const updatePaymentMethodType = (index, type) => {
    const updated = [...(form.paymentMethods || [])];
    const current = updated[index] || {};
    const base = {
      type,
      recipientName: current.recipientName || '',
      nickname: current.nickname || ''
    };

    if (type === PaymentMethodType.BANK_ACCOUNT) {
      Object.assign(base, {
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        branchName: '',
        accountType: AccountType.SAVINGS
      });
    } else if (type === PaymentMethodType.UPI) {
      Object.assign(base, { upiId: '', upiProvider: '' });
    } else if (type === PaymentMethodType.WALLET) {
      Object.assign(base, { walletProvider: '', walletIdentifier: '' });
    }

    updated[index] = base;
    setForm((prev) => ({ ...prev, paymentMethods: updated }));
  };

  const updatePaymentMethodField = (index, field, value) => {
    const updated = [...(form.paymentMethods || [])];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, paymentMethods: updated }));
  };

  const renderPaymentMethodForm = (method, index) => (
    <div className="">
      <div className="flex gap-5 flex-wrap my-3">
        <div>
          <label
            htmlFor={`recipient-name-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Recipient Name
          </label>
          <input
            type="text"
            value={method.recipientName}
            onChange={(e) =>
              updatePaymentMethodField(index, 'recipientName', e.target.value)
            }
            className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Enter recipient name"
            required
          />
        </div>
        <div>
          <label
            htmlFor={`nickname-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Nickname
          </label>
          <input
            type="text"
            value={method.nickname}
            onChange={(e) =>
              updatePaymentMethodField(index, 'nickname', e.target.value)
            }
            className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            placeholder="Enter nickname for this payment method"
            required
          />
        </div>
      </div>

      {method.type === PaymentMethodType.BANK_ACCOUNT && (
        <div className="flex gap-5 flex-wrap my-3">
          <div>
            <label
              htmlFor={`account-holder-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Account Holder Name
            </label>
            <input
              type="text"
              value={method.accountHolderName || ''}
              onChange={(e) =>
                updatePaymentMethodField(
                  index,
                  'accountHolderName',
                  e.target.value
                )
              }
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="Enter account holder name"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`account-number-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Account Number
            </label>
            <input
              type="text"
              value={method.accountNumber || ''}
              onChange={(e) =>
                updatePaymentMethodField(index, 'accountNumber', e.target.value)
              }
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="Enter account number"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`ifsc-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              IFSC Code
            </label>
            <input
              type="text"
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={method.ifscCode || ''}
              onChange={(e) =>
                updatePaymentMethodField(index, 'ifscCode', e.target.value)
              }
              placeholder="Enter IFSC code"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`bank-name-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Bank Name
            </label>
            <input
              type="text"
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={method.bankName || ''}
              onChange={(e) =>
                updatePaymentMethodField(index, 'bankName', e.target.value)
              }
              placeholder="Enter bank name"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`branch-name-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Branch Name
            </label>
            <input
              type="text"
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={method.branchName || ''}
              onChange={(e) =>
                updatePaymentMethodField(index, 'branchName', e.target.value)
              }
              placeholder="Enter branch name"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`account-type-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Account Type
            </label>
            <select
              value={method.accountType || AccountType.SAVINGS}
              onChange={(e) =>
                updatePaymentMethodField(index, 'accountType', e.target.value)
              }
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            >
              <option value={AccountType.SAVINGS}>Savings</option>
              <option value={AccountType.CURRENT}>Current</option>
            </select>
          </div>
        </div>
      )}

      {method.type === PaymentMethodType.UPI && (
        <div className="flex gap-5 flex-wrap my-3">
          <div>
            <label
              htmlFor={`upi-id-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              UPI ID
            </label>
            <input
              type="text"
              value={method.upiId || ''}
              onChange={(e) =>
                updatePaymentMethodField(index, 'upiId', e.target.value)
              }
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="Enter UPI ID (e.g., user@paytm)"
              required
            />
          </div>
          <div>
            <label
              htmlFor={`upi-provider-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              UPI Provider
            </label>
            <select
              value={method.upiProvider || ''}
              onChange={(e) =>
                updatePaymentMethodField(index, 'upiProvider', e.target.value)
              }
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            >
              <option value="">Select UPI Provider</option>
              {upiProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {method.type === PaymentMethodType.WALLET && (
        <div className="flex gap-5 flex-wrap my-3">
          <div>
            <label
              htmlFor={`wallet-provider-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Wallet Provider
            </label>
            <select
              value={method.walletProvider || ''}
              onChange={(e) =>
                updatePaymentMethodField(
                  index,
                  'walletProvider',
                  e.target.value
                )
              }
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            >
              <option value="">Select Wallet Provider</option>
              {walletProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor={`wallet-id-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Wallet Identifier
            </label>
            <input
              type="text"
              className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={method.walletIdentifier || ''}
              onChange={(e) =>
                updatePaymentMethodField(
                  index,
                  'walletIdentifier',
                  e.target.value
                )
              }
              placeholder="Enter wallet ID/phone number"
              required
            />
          </div>
        </div>
      )}
    </div>
  );

  const debug  = error;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { toast } = await import('@/utils/reduxtrigger.utils');

    const errors = validateCompanion(form);

    if (Object.keys(errors).length > 0) {
      setError(errors);
      console.log('debug value of error:', debug);
      
      
      console.log('error in companion signupform:', errors.description);

      toast.error(errors);
      return;
    }

    setIsLoading(true);

    try {
      const userData = new FormData();

      // Append primitives
      Object.keys(form).forEach((key) => {
        if (!form[key]) return;

        if (
          ['images', 'description', 'baselocations', 'paymentMethods'].includes(
            key
          )
        )
          return;

        userData.append(key, String(form[key]));
      });

      // Arrays / complex
      userData.append('description', JSON.stringify(form.description || []));
      userData.append(
        'baselocations',
        JSON.stringify(form.baselocations || [])
      );

      // Format payment methods for backend key `paymentmethods`
      const formattedPaymentMethods = (form.paymentMethods || []).map(
        (method) => {
          const base = {
            type: method.type,
            recipientName: method.recipientName,
            nickname: method.nickname
          };
          if (method.type === PaymentMethodType.UPI) {
            return {
              ...base,
              upiId: method.upiId,
              upiProvider: method.upiProvider
            };
          }
          if (method.type === PaymentMethodType.BANK_ACCOUNT) {
            return {
              ...base,
              accountHolderName: method.accountHolderName,
              accountNumber: method.accountNumber,
              ifscCode: method.ifscCode,
              bankName: method.bankName,
              branchName: method.branchName,
              accountType: method.accountType
            };
          }
          if (method.type === PaymentMethodType.WALLET) {
            return {
              ...base,
              walletProvider: method.walletProvider,
              walletIdentifier: method.walletIdentifier
            };
          }
          return base;
        }
      );
      userData.append(
        'paymentmethods',
        JSON.stringify(formattedPaymentMethods)
      );

      // Images
      if (form.images?.length) {
        form.images.forEach((obj) => {
          if (obj && typeof obj === 'object' && obj.file instanceof File) {
            userData.append('images', obj.file);
          }
        });
      }

      // Call the service (previously missing)
      const { companionRegisterService } = await import(
        '@/services/auth/companionregister.service'
      );
      const { data, error: serviceError } =
        await companionRegisterService(userData);
      const { toast } = await import('@/utils/reduxtrigger.utils');

      if (serviceError) {
        alert(`Failed to create companion: ${serviceError}`);
        return;
      }

      toast.success(
        'Successfully requested for companion Will contact you soon!!'
      );

      setForm(initialForm);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      <div className="md:w-[80rem] w-[100%]  mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-center font-bold text-xl">
              Create your Companion Profile
            </h1>
            <p className="text-sm font-bold text-center text-gray-500">
              Fill in the details to create a new companion profile.
            </p>
          </div>

          <div className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Personal Details
              </h3>

              <div>
                <p className="font-bold my-4">
                  Profile picture (Minimum 2 required):
                </p>
                <ImageUploader
                  images={form.images}
                  onUpload={(images) => setForm((l) => ({ ...l, images }))}
                />
                {error?.images && (
                  <p className="text-red-500 text-sm mt-1">{error.images}</p>
                )}
              </div>
              <div className="flex gap-5 flex-wrap my-3">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {error?.firstname && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.firstname}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {error?.lastname && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.lastname}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phoneno"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    name="phoneno"
                    value={form.phoneno}
                    onChange={handleChange}
                    required
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {error?.phoneno && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.phoneno}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Appearance</h3>
              <div className="flex gap-5 flex-wrap my-3">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="">Select Gender</option>
                    {GenderData.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                  {error?.gender && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.gender}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="skintone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Skin Tone
                  </label>
                  <select
                    name="skintone"
                    value={form.skintone}
                    onChange={handleChange}
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="">Select Skin Tone</option>
                    {skinToneData.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                  {error?.skintone && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.skintone}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="bodytype"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Body Type
                  </label>
                  <select
                    name="bodytype"
                    value={form.bodytype}
                    onChange={handleChange}
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="">Select Body Type</option>

                    {getBodyTypes(form.gender).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {error?.bodytype && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.bodytype}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Habits */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Habits</h3>
              <div className="flex gap-5 flex-wrap my-3">
                <div>
                  <label
                    htmlFor="eatinghabits"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Eating Habits
                  </label>
                  <select
                    name="eatinghabits"
                    value={form.eatinghabits}
                    onChange={handleChange}
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="">Select Eating Habits</option>
                    {eatingHabitsData.map((habit) => (
                      <option key={habit} value={habit}>
                        {habit}
                      </option>
                    ))}
                  </select>
                  {error?.eatinghabits && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.eatinghabits}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="smokinghabits"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Smoking Habit
                  </label>
                  <select
                    name="smokinghabits"
                    value={form.smokinghabits}
                    onChange={handleChange}
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="">Select Smoking Habit</option>
                    {smokingHabitsData.map((habit) => (
                      <option key={habit} value={habit}>
                        {habit}
                      </option>
                    ))}
                  </select>
                  {error?.smokinghabits && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.smokinghabits}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="drinkinghabits"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Drinking Habit
                  </label>
                  <select
                    name="drinkinghabits"
                    value={form.drinkinghabits}
                    onChange={handleChange}
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option value="">Select Drinking Habit</option>
                    {drinkingHabitsData.map((habit) => (
                      <option key={habit} value={habit}>
                        {habit}
                      </option>
                    ))}
                  </select>
                  {error?.drinkinghabits && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.drinkinghabits}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">
                  Payment Methods (At least one required)
                </h3>
                <button
                  type="button"
                  onClick={addPaymentMethod}
                  disabled={(form.paymentMethods || []).length >= 3}
                  className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add Payment Method ({(form.paymentMethods || []).length}/3)
                </button>
              </div>

              {error?.paymentMethods && (
                <p className="text-red-500 text-sm">{error.paymentMethods}</p>
              )}

              {(form.paymentMethods || []).map((method, index) => (
                <div key={index} className="">
                  <div className="pb-3">
                    <div className="flex justify-between items-center">
                      <div className="text-base">
                        Payment Method {index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => removePaymentMethod(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`payment-type-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Payment Method Type
                      </label>
                      <select
                        value={method.type}
                        onChange={(e) =>
                          updatePaymentMethodType(index, e.target.value)
                        }
                        className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        required
                      >
                        <option value={PaymentMethodType.BANK_ACCOUNT}>
                          Bank Account
                        </option>
                        <option value={PaymentMethodType.UPI}>UPI</option>
                        <option value={PaymentMethodType.WALLET}>Wallet</option>
                      </select>
                    </div>
                    {renderPaymentMethodForm(method, index)}
                  </div>
                </div>
              ))}
            </div>

            {/* Other Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Other Details
              </h3>
              <div className="flex gap-5 flex-wrap my-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {error?.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.email}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={form.password || ''}
                    onChange={handleChange}
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {error?.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.password}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="bookingrate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Booking Rate (per hour)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your booking rate"
                    name="bookingrate"
                    value={form.bookingrate}
                    onChange={handleChange}
                    required
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {error?.bookingrate && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.bookingrate}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your height"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    required
                    className="inputfield-glg-be mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  {error?.height && (
                    <span className="text-red-500 text-sm mt-1">
                      {error.height}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Base Locations */}
            <div className="my-3">
              <h3 className="text-lg font-medium text-gray-700">
                Base Locations
              </h3>
              <div className="">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="my-3">
                    <label className="text-sm">Base Location {idx + 1}</label>
                    <br />
                    <LocationAccess
                      mapkey={idx}
                      setLocation={(l) => setMapBaseLocation(idx, l)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Description (Select at least 2)
              </h3>
              <div className="grid md:grid-cols-4 md:gap-3 gap-2 grid-cols-2">
                {descriptionData.map((desc) => (
                  <div key={desc} className="flex items-center">
                    <input
                      type="checkbox"
                      id={desc}
                      name="description"
                      value={desc}
                      checked={form.description.includes(desc)}
                      onChange={handleChange}
                      className="mx-2"
                    />
                    <label htmlFor={desc} className="md:text-sm text-xs">
                      {desc}
                    </label>
                  </div>
                ))}
              </div>
              {error?.description && (
                <span className="text-red-500 text-sm mt-1">
                  {error.description}
                </span>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-red-400 text-white px-4 py-2 rounded mt-4 hover:bg-red-500 disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
