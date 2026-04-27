import { Router } from "express";
import {
  getProjectById,
  getProjects,
  getProjectMembers,
  createProject,
  updateProject,
  deleteProject,
  updateMemberRole,
  deleteMember,
  addMemebersToProject,
} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createProjectValidator,
  addMembertoProjectValidator,
} from "../validators/validator.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";


const router = Router();

// middleware
router.use(verifyJWT)
// all routes include verifyJWT

router.route("/")
      .get(getProjects)
      .post(createProjectValidator() , validate , createProject)

router.route("/:projectId")
      .get(validateProjectPermission(AvailableUserRole),getProjectById)
      .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createProjectValidator(),
        validate,
        updateProject
      )
      .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteProject,
      )

router.route("/:projectId/members")
      .get(getProjectMembers)
      .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        addMembertoProjectValidator(),
        validate,
        addMemebersToProject
      )

router.route("/:projectId/members/:userId")
      .put(validateProjectPermission([UserRolesEnum.ADMIN]) , updateMemberRole)
      .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember)


export default router;
