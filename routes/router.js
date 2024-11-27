import { Router } from "express";
import { addSchool, listSchools } from "../controllers/school.controller.js";
import validate from "../middlewares/school.middleware.js";
import schoolSchema from "../validator/school.validate.js";

const router = Router();

router.route("/addSchool").post(validate(schoolSchema), addSchool);
router.route("/listSchools").get(listSchools);

export default router;