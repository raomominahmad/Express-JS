import { Router } from "express";

import {
  getTasks,
  createTask,
  getTaskbyId,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "../controllers/task.controller.js";

import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

import {
  createTaskValidator,
  updateTaskValidator,
  taskIdValidator,
  subTaskValidator,
} from "../validators/validator.js";

import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

// Tasks
router.route("/:projectId")
  .get(validateProjectPermission(), getTasks)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    createTaskValidator(),
    validate,
    createTask
  );

router.route("/:projectId/t/:taskId")
  .get(validateProjectPermission(), getTaskbyId)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    updateTaskValidator(),
    validate,
    updateTask
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    deleteTask
  );

//   SubTasks

router.route("/:projectId/t/:taskId/subtasks")
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    subTaskValidator(),
    validate,
    createSubTask
  );

router.route("/:projectId/st/:subTaskId")
  .put(
    validateProjectPermission(),
    updateSubTask
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    deleteSubTask
  );


export default router;  