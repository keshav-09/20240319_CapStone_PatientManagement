
  
  // /** Validator function for email */
  // function emailValidator(email) {
  //   // Check for string
  //   if (typeof email !== "string") {
  //     return false;
  //   }
  //   // Check for length
  //   if (email.length < 6 || email.length > 255) {
  //     return false;
  //   }
  //   // Check for email format
  //   const emailRegex = /\S+@\S+\.\S+/;
  //   if (!emailRegex.test(email)) {
  //     return false;
  //   }
  //   return true;
  // }
  
  // /** Validator function for password */
  // function passwordValidator(password) {
  //   // Check for string
  //   if (typeof password !== "string") {
  //     return false;
  //   }
  //   // Check for length
  //   if (password.length < 6 || password.length > 255) {
  //     return false;
  //   }
  //   return true;
  // }
  
  /** Validator function for role */
//   function roleValidator(role) {
//     // Check for string
//     if (typeof role !== "string") {
//       return false;
//     }
//     // Check for enum
//     if (role !== "user" && role !== "seller" && role !== "admin") {
//       return false;
//     }
//     return true;
//   }
  
  module.exports = {
    emailValidator,
    passwordValidator,

  };
  