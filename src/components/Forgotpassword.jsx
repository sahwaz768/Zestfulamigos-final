'use client';
import React, { useState } from 'react';

const Forgotpassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ newPassword: '', confirmPassword: '' });
  const [editingField, setEditingField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validatePasswords = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    let errors = { newPassword: '', confirmPassword: '' };

    if (!passwordRegex.test(newPassword)) {
      errors.newPassword =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number.';
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setError(errors);
    return !errors.newPassword && !errors.confirmPassword;
  };

  const handleInputFocus = (field) => {
    setEditingField(field);
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log('New Password:', newPassword);
      // Clear the input fields
      setNewPassword('');
      setConfirmPassword('');
      setError({ newPassword: '', confirmPassword: '' });
      alert('Password reset successful!');
    }
  };

  return (
    <>
      <div>
        <h2 className="text-center text-xl my-3 font-bold text-black">
          Create New password
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-black mt-3 text-sm">Enter new password</p>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => handleInputFocus('newPassword')}
              onBlur={() => setEditingField(null)}
              placeholder="*********"
              className="inputfield "
            />
            {error.newPassword && editingField !== 'newPassword' && (
              <p className='text-xs text-pink-600'>{error.newPassword}</p>
            )}
          </div>
          <div>
            <p className="text-black mt-3 text-sm">confirm password</p>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleInputFocus('confirmPassword')}
              onBlur={() => setEditingField(null)}
              className="inputfield "
              placeholder="**********"
            />
            {error.confirmPassword && editingField !== 'confirmPassword' && (
              <p className='text-xs text-pink-700'>{error.confirmPassword}</p>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className='text-xs ml-2'>Show Password</label>
          </div>
          <button type="submit" className="w-full loginbtn text-center">
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default Forgotpassword;
