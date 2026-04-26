import { User } from "../models/users.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";

export const getProjects = asyncHandler(async (req, res) => {
  /* 
    Give me all projects where current user is a member, along with:
    project info
    number of members
    user’s role in that project 

    localField is the field in the current collection you are working on
    foreignField is the field in the other collection you want to match with

    MongoDB automatically converts model names to lowercase + plural form for collection names
    */


  const projects = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user_id),
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "projects",
        pipeline: [
          {
            $lookup: {
              from: "projectmembers",
              localField: "_id",
              foreignField: "projects",
              as: "projectmembers",
            },
          },
        //   Adds new field: members = total users in project
          {
            $addFields: {
              members: {
                $size: "$projectmembers",
              },
            },
          },
        ],
      },
    },
    // unwind converts array field into object
    {
      $unwind: "$projects",
    },
    {
      $project: {
        project: {
          _id: 1,
          name: 1,
          members: 1,
          createdAt: 1,
          createdBy: 1,
        },
      },
      role: 1,
      _id: 0,
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Project fetched successfully"));
});

export const getProjectById = asyncHandler(async (req, res) => {});

export const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    // createdBy stores user ID (who created project)
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });
  await ProjectMember.create({
    user: mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN, // Creator is automatically admin of project
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

export const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { projectId } = req.params;

  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
    },
    { new: true }, // returns updated document
  );
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByIdAndDelete(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project deleted successfully"));
});

export const deleteMember = asyncHandler(async (req, res) => {
  // test
});

export const addMemebersToProject = asyncHandler(async (req, res) => {
  // test
});

export const getProjectMembers = asyncHandler(async (req, res) => {
  // test
});

export const updateMemberRole = asyncHandler(async (req, res) => {
  // test
});
