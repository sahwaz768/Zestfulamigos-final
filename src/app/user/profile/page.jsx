'use client';
import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import Chatheader from '@/components/Masterheader';
import { Mastersidebar } from '@/components/MasterSidebar';
import Notify from '@/components/Notify';
import { BASEURL } from '@/Constants/services.constants';

const Page = () => {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    import('../../../services/user/userprofile.service')
      .then(({ userProfileDetailsService }) => userProfileDetailsService())
      .then(({ data, error }) => {
        if (data) {
          const values = {
            imageUrl: BASEURL + '/' + data.data?.Images[0],
            fullName: data.data?.firstname + ' ' + data.data?.lastname,
            email: data.data?.email,
            phoneNumber: data.data.phoneno,
            age: data.data?.age,
            gender: data.data?.gender?.toLocaleLowerCase(),
            id: data.data?.id
          };
          setFormData(() => ({ ...values }));
        } else {
          console.log(error);
        }
      });
  }, []);
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim().length) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.split(' ').length !== 2) {
      newErrors.fullName = 'Name must be valid first firstname and lastname';
    }
    if (
      !formData.phoneNumber.trim() ||
      !/^\d{10}$/.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = 'Valid Phone Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageUrl: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { updateuserProfileDetailsService } = await import(
          '@/services/user/userprofile.service'
        );
        const { toast } = await import('@/utils/reduxtrigger.utils');
        const userData = new FormData();
        const firstname = formData.fullName.split(' ')[0];
        const lastname = formData.fullName.split(' ')[1];
        userData.append('firstname', firstname);
        userData.append('lastname', lastname);
        userData.append('phoneno', formData.phoneNumber);
        if (typeof formData.imageUrl === 'object') {
          userData.append('images', formData.imageUrl);
        }
        const { data, error } = await updateuserProfileDetailsService(
          userData,
          formData.id
        );
        if (data) {
          toast.success('Successfully updated your profile');
        } else {
          toast.error(error);
        }
      } catch (error) {}
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: './aboutus' },
    { name: 'Privacy Policy', href: './privacypolicy' },
    { name: 'Contact', href: './contactus' }
  ];
  if (!formData) return <div>Loading...</div>;
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
        <Mastersidebar />
        <div className="profiledetail">
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="profile-containerx">
                <label
                  htmlFor="file-input"
                  className="profile-picturex"
                  style={{
                    backgroundImage: `url(${typeof formData.imageUrl === 'object' ? URL.createObjectURL(formData.imageUrl) : formData.imageUrl})`
                  }}
                >
                  {!formData.imageUrl && (
                    <span className="userx">
                      <CgProfile size={30} />
                    </span>
                  )}
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-inputx"
                />
              </div>
            </div>
            <div className="userprofile-detail mt-3">
              <div className="">
                <label className="text-sm my-1">Full Name</label>
                <br />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="userprofile-input-text"
                />
                {errors.fullName && (
                  <span className="text-sm">{errors.fullName}</span>
                )}
              </div>

              <div className="">
                <label className="text-sm">Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  disabled
                  value={formData.email}
                  placeholder="Enter your email"
                  className="userprofile-input-text"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="userprofile-detail ">
              <div className="">
                <label className="text-sm my-1">Phone Number</label>
                <br />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  className="userprofile-input-text"
                />
                {errors.phoneNumber && (
                  <span className="text-sm">{errors.phoneNumber}</span>
                )}
              </div>

              <div className="">
                <label className="text-sm my-1">Age</label>
                <br />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  placeholder="Enter your age"
                  min="1"
                  max="100"
                  className="userprofile-input-text"
                  disabled
                />
                {errors.age && <span className="text-sm">{errors.age}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="text-sm my-1">Gender</label>
              <br />
              <select
                name="gender"
                value={formData.gender}
                className="userprofile-input-text"
                disabled
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
            <button type="submit" className="savechgbtn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
