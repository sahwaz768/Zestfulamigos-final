'use client';
import Header from '@/components/Homeheader';
import { FiPlus } from 'react-icons/fi';
import React, { useState } from 'react';
import Link from 'next/link';
import Chatheader from '@/components/Masterheader';
import { Notification } from '../swipepage/page';


const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setFormData] = useState({
    email: '',
    problem: '',
    elaborateProblem: '',
    image: null
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      formErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Please enter a valid email.';
    }

    if (!formData.problem) {
      formErrors.problem = 'Problem description is required.';
    }

    if (!formData.elaborateProblem) {
      formErrors.elaborateProblem = 'Please elaborate on your problem.';
    }

    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log('Form submitted successfully:', formData);
      setIsOpen(false);
      // Perform further actions like sending data to the server here
    }
  };
  return (
    <div>
        <Chatheader rightElement={<Notification />} />
      <div className="support-head">
        <div className="support-txt">
          <h1 className="md:text-xl ml-3 md:font-bold mt-2">
            Your support requests
          </h1>
        </div>
        <div className="support" onClick={openModal}>
          <FiPlus color="red" />
          <h1 className="text-sm font-bold">MAKE SUPPORT REQUEST</h1>
        </div>
      </div>
      <div className="support-box-head">
        <div className="support-row-head md:text-xl ">Ticket no</div>
        <div className="support-row-head md:text-xl ">Topic</div>
        <div className="support-row-head md:text-xl  ">status</div>
        <div className="support-row-2-head md:text-xl ">check</div>
      </div>
      <hr />
      <div className="support-box">
        <div className="support-row text-sm font-bold">#12345</div>
        <div className="support-row text-sm font-bold">Balance error</div>
        <div className="support-row text-sm font-bold pending">pending</div>
        <div className="support-row-2 text-sm font-bold">
          <Link href={'/user/ticket'}>
            {' '}
            <h1>view</h1>{' '}
          </Link>
        </div>
      </div>
      <div className="support-box">
        <div className="support-row text-sm font-bold">#12345</div>
        <div className="support-row text-sm font-bold">Balance error</div>
        <div className="support-row text-sm font-bold pending">pending</div>
        <div className="support-row-2 text-sm font-bold">
          <Link href={'/user/ticket'}>
            {' '}
            <h1>view</h1>{' '}
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="ticket-modal-overlay">
          <div
            className="ticket-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold">Raise your issue</h2>

            <button onClick={closeModal} className="close">
              &times;
            </button>
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="inputfield-glg"
                  placeholder="Email"
                />
                {errors.email && <p className="text-sm">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="problem" className="text-sm">
                  Problem related
                </label>
                <textarea
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="inputfield-glg"
                  placeholder="payment issue"
                />
                {errors.problem && <p className="text-xs">{errors.problem}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="elaborateProblem" className="text-sm">
                  Elaborate Your Problem:
                </label>
                <textarea
                  id="elaborateProblem"
                  name="elaborateProblem"
                  value={formData.elaborateProblem}
                  onChange={handleChange}
                  className="inputfield-glg"
                  placeholder="Hii sir i have payment issue will booking"
                />
                {errors.elaborateProblem && (
                  <p className="text-xs">{errors.elaborateProblem}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="image" className="text-sm">
                  Attachment (optional):
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="my-3"
                />
              </div>
              <div className="mt-2">
                <button type="submit" className="sbtbtm">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
