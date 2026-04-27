import { User } from "../models/u.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";

import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {
  // Test 
});


const createTask = asyncHandler(async (req, res) => {
  // Test
});

const getTaskbyId = asyncHandler(async (req, res) => {
  // Test
});

const updateTask = asyncHandler(async (req, res) => {
  // Test
});


const deleteTask = asyncHandler(async (req, res) => {
  // Test
});


const createSubTask = asyncHandler(async (req, res) => {
  // Test
});


const updateSubTask = asyncHandler(async (req, res) => {
  // Test
});

const deleteSubTask = asyncHandler(async (req, res) => {
  // Test
});

export {
    createSubTask,
    createTask,
    deleteTask,
    deleteSubTask,
    getTaskbyId,
    getTasks,
    updateSubTask,
    updateTask
}
