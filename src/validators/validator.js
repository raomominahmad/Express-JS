import { body } from "express-validator";

export const userRegisterValidator = () => {
  return [
    // Email
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .normalizeEmail(),

    // Username
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters")
      .matches(/^[a-z0-9_]+$/)
      .withMessage("Username can only contain lowercase letters, numbers, and underscores"),

    // Password 
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number"),

    // Full Name
    body("fullName")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long"),
  ];
};

export const userLoginValidator = () =>{
  return[
    // Email
    body("email")
    .optional()
    .isEmail()
    .withMessage("Email is invalid"),

    // password
    body("password")
    .notEmpty()
    .withMessage("Password is required")

  ]
}

export const userChangeCurrentPassswordValidator = () => {
  return[
    
    body("oldPassword")
      .notEmpty()
      .withMessage("Old Password is required"),
    
    body("newPassword")
    .notEmpty()
    .withMessage("New password is required")

  ]
}

export const userForgotPasswordValidator = () => {
  return[
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
  ]
}

export const userResetForgotPasswordValidator = () => {
   return[
     body("newPassword")
      .notEmpty()
      .withMessage("Password is required")
   ]
}
