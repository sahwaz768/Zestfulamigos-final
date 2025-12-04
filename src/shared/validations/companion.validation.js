export const validateCompanion = (register, skipPasswordValidation = false) => {
  const errors = {};
  
  // First name validation
  if (!register.firstname || !register.firstname.trim()) {
    errors.firstname = 'First name is required';
  }
  
  // Last name validation
  if (!register.lastname || !register.lastname.trim()) {
    errors.lastname = 'Last name is required';
  }
  
  // Email validation
  if (!register.email.trim() || !register.email.includes('@')) {
    errors.email = 'Invalid email address';
  }
  
  // Password validation
  if (!skipPasswordValidation) {
    if (!register.password.trim() || register.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
  }
  
  // Gender validation
  if (!register.gender) {
    errors.gender = 'Gender is required';
  }
  
  // Age validation
  if (!register.age) {
    errors.age = 'Age is required';
  } else if (isNaN(register.age)) {
    errors.age = 'Age must be a valid number';
  } else if (register.age < 18 || register.age > 50) {
    errors.age = 'Age must be between 18 and 50';
  }
  
  // Phone number validation
  if (!register.phoneno || !/^\d{10}$/.test(register.phoneno)) {
    errors.phoneno = 'Phone number must be valid (10 digits)';
  }
  
  // Description validation
  if (!register.description || register.description.length < 2) {
    errors.description = 'Description is required';
  }
  
  // Skin tone validation
  if (!register.skintone) {
    errors.skintone = 'Skin tone is required';
  }
  
  // Base locations validation
  if (register.baselocations.filter((l) => l).length < 4) {
    errors.baselocations = 'You must select at least 4 base locations';
  }
  
  // Height validation
  if (!register.height) {
    errors.height = 'Height is required';
  } else if (isNaN(register.height)) {
    errors.height = 'Height must be a valid number';
  }
  
  // Body type validation
  if (!register.bodytype) {
    errors.bodytype = 'Body type is required';
  }
  
  // Eating habits validation
  if (!register.eatinghabits) {
    errors.eatinghabits = 'Eating habits are required';
  }
  
  // Drinking habits validation
  if (!register.drinkinghabits) {
    errors.drinkinghabits = 'Drinking habits are required';
  }
  
  // Smoking habits validation
  if (!register.smokinghabits) {
    errors.smokinghabits = 'Smoking habits are required';
  }
  
  // Booking rate validation
  if (!register.bookingrate) {
    errors.bookingrate = 'Booking rate is required';
  }
  
  // Payment methods validation with detailed field checks
  const paymentErrors = {};
  const paymentMethods = register.paymentmethods || [];
  
  if (paymentMethods.length === 0) {
    errors.paymentMethods = 'At least one payment method is required';
  } else {
    let hasCompletePaymentMethod = false;
    
    paymentMethods.forEach((pm, index) => {
      const pmErrors = {};
      
      // Common fields validation
      if (!pm.type || pm.type.trim() === '') {
        pmErrors.type = 'Payment method type is required';
      }
      
      if (!pm.recipientName || pm.recipientName.trim() === '') {
        pmErrors.recipientName = 'Recipient name is required';
      }
      
      if (!pm.nickname || pm.nickname.trim() === '') {
        pmErrors.nickname = 'Nickname is required';
      }
      
      // Bank Account specific validation
      if (pm.type === 'BANK_ACCOUNT') {
        if (!pm.accountHolderName || pm.accountHolderName.trim() === '') {
          pmErrors.accountHolderName = 'Account holder name is required';
        }
        
        if (!pm.accountNumber || pm.accountNumber.trim() === '') {
          pmErrors.accountNumber = 'Account number is required';
        } else if (!/^\d{9,18}$/.test(pm.accountNumber)) {
          pmErrors.accountNumber = 'Account number must be 9-18 digits';
        }
        
        if (!pm.ifscCode || pm.ifscCode.trim() === '') {
          pmErrors.ifscCode = 'IFSC code is required';
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(pm.ifscCode)) {
          pmErrors.ifscCode = 'Invalid IFSC code format';
        }
        
        if (!pm.bankName || pm.bankName.trim() === '') {
          pmErrors.bankName = 'Bank name is required';
        }
        
        if (!pm.branchName || pm.branchName.trim() === '') {
          pmErrors.branchName = 'Branch name is required';
        }
        
        if (!pm.accountType || pm.accountType.trim() === '') {
          pmErrors.accountType = 'Account type is required';
        }
      }
      
      // UPI specific validation
      if (pm.type === 'UPI') {
        if (!pm.upiId || pm.upiId.trim() === '') {
          pmErrors.upiId = 'UPI ID is required';
        } else if (!/^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/.test(pm.upiId)) {
          pmErrors.upiId = 'Invalid UPI ID format';
        }
        
        if (!pm.upiProvider || pm.upiProvider.trim() === '') {
          pmErrors.upiProvider = 'UPI provider is required';
        }
      }
      
      // Wallet specific validation
      if (pm.type === 'WALLET') {
        if (!pm.walletProvider || pm.walletProvider.trim() === '') {
          pmErrors.walletProvider = 'Wallet provider is required';
        }
        
        if (!pm.walletIdentifier || pm.walletIdentifier.trim() === '') {
          pmErrors.walletIdentifier = 'Wallet ID / Phone number is required';
        }
      }
      
      // Store errors for this payment method if any
      if (Object.keys(pmErrors).length > 0) {
        paymentErrors[index] = pmErrors;
      } else {
        hasCompletePaymentMethod = true;
      }
    });
    
    // If there are any field errors, add them to main errors
    if (Object.keys(paymentErrors).length > 0) {
      errors.paymentMethods = paymentErrors;
    }
    
    // Ensure at least one complete payment method exists
    if (!hasCompletePaymentMethod) {
      errors.paymentMethods = 'At least one complete payment method is required';
    }
  }
  
  // Images validation
  if (!register.images || register.images.length < 2) {
    errors.images = 'At least 2 profile pictures are required';
  }
  
  return errors;
};