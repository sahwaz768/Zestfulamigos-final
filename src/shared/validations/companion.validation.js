export const validateCompanion = (
    register
  ) => {
    const errors = {};
  
    if (!register.firstname.trim()) {
      errors.firstname = "First name is required";
    }
  
    if (!register.lastname.trim()) {
      errors.lastname = "Last name is required";
    }
  
    // if (!register.email.trim() || !register.email.includes("@")) {
    //   errors.email = "Invalid email address";
    // }
  
    // if (
    //   register.password &&
    //   (!register.password.trim() || register.password.length < 8)
    // ) {
    //   errors.password = "Password must be at least 8 characters long";
    // }
  
    if (!register.gender) {
      errors.gender = "Gender is required";
    }
  
    if (!register.age) {
      errors.age = "Age must be a valid number";
    }
  
    if (!register.phoneno || !/^\d{10}$/.test(register.phoneno)) {
      errors.phoneno = "Phone no must be valid";
    }
  
    if (!register.description || register.description.length < 2) {
      errors.description = "Description is required";
    }
  
    if (!register.skintone) {
      errors.skintone = "Skin tone is required";
    }
  
    if (!register.city.trim().length) {
      errors.city = "City is required";
    }
  
    if (!register?.state || (register.state && !register.state.trim().length)) {
      errors.state = "State is required";
    }
  
    // if (register.zipcode && !register.zipcode.trim()) {
    //   errors.zipcode = 'Zipcode is required';
    // }
  
    if (!register.lat.trim() || isNaN(Number(register.lat))) {
      errors.lat = 'Latitude must be a valid number';
    }
  
    if (!register.lng.trim() || isNaN(Number(register.lng))) {
      errors.lng = 'Longitude must be a valid number';
    }
  
    if (!register.bookingrate) {
      errors.bookingrate = "Booking rate must be a valid number";
    }
  
    if (!register.height) {
      errors.height = "Height must be a valid number";
    }
  
    if (!register.bodytype) {
      errors.bodytype = "Body type is required";
    }
  
    if (!register.eatinghabits) {
      errors.eatinghabits = "Eating habits are required";
    }
  
    if (!register.drinkinghabits) {
      errors.drinkinghabits = "Drinking habits are required";
    }
  
    if (!register.smokinghabits) {
      errors.smokinghabits = "Smoking habits are required";
    }
  
    return errors ;
  };