import { body,param } from "express-validator";
import { AvailableUserRole } from "../utils/constants.js";
import mongoose from "mongoose";

// User Validators
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
      .withMessage(
        "Username can only contain lowercase letters, numbers, and underscores",
      ),

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

export const userLoginValidator = () => {
  return [
    // Email
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    // password
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export const userChangeCurrentPassswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old Password is required"),

    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

export const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

export const userResetForgotPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

// Project Validators
export const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("description")
        .optional()
        .trim(),
  ];
};

export const addMembertoProjectValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is verified"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRole)
      .withMessage("Role is invalid"),
  ];
};

export const projectIdValidator = () => {
  return [
    param("projectId")
      .notEmpty()
      .withMessage("Project ID is required")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid Project ID"),
  ];
};

// Notes Validator
export const createNoteValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .trim(),

    body("content")
      .optional()
      .trim(),
  ];
};

export const updateNoteValidator = () => {
  return [
    param("noteId")
      .notEmpty()
      .withMessage("Note ID is required")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid Note ID"),

    body("title")
      .optional()
      .trim(),

    body("content")
      .optional()
      .trim(),
  ];
};


export const noteIdValidator = () => {
  return [
    param("noteId")
      .notEmpty()
      .withMessage("Note ID is required")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid Note ID"),
  ];
};


// Task Validator

export const taskIdValidator = () => {
  return [
    param("taskId")
      .notEmpty()
      .withMessage("Task ID is required")
      .custom((value) => mongoose.isValidObjectId(value))
      .withMessage("Invalid Task ID"),
  ];
};

export const createTaskValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .trim(),

    body("description")
      .optional()
      .trim(),

    body("assignedTo")
      .optional()
      .custom((value) => mongoose.isValidObjectId(value))
      .withMessage("Invalid assignedTo user ID"),

    body("status")
      .optional()
      .isIn(["todo", "in_progress", "done"])
      .withMessage("Invalid task status"),
  ];
};

export const updateTaskValidator = () => {
  return [
    param("taskId")
      .notEmpty()
      .withMessage("Task ID is required")
      .custom((value) => mongoose.isValidObjectId(value))
      .withMessage("Invalid Task ID"),

    body("title")
      .optional()
      .trim(),

    body("description")
      .optional()
      .trim(),

    body("assignedTo")
      .optional()
      .custom((value) => mongoose.isValidObjectId(value))
      .withMessage("Invalid assignedTo user ID"),

    body("status")
      .optional()
      .isIn(["todo", "in_progress", "done"])
      .withMessage("Invalid task status"),
  ];
};

export const subTaskValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .trim(),
  ];
};