import { Router } from "express";

import {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";

import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

import {
  projectIdValidator,
  createNoteValidator,
  updateNoteValidator,
  noteIdValidator,
} from "../validators/validator.js";

import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);


router.route("/:projectId")
  .get(validateProjectPermission(), getNotes)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createNoteValidator(),
    validate,
    createNote
  );

router.route("/:projectId/n/:noteId")
  .get(validateProjectPermission(), getNoteById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateNoteValidator(),
    validate,
    updateNote
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    noteIdValidator(),
    validate,
    deleteNote
  );


export default router;  