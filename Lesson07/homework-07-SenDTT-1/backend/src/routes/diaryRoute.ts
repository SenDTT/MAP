import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
  createNewDiary,
  deleteDiary,
  getADiary,
  getAllDiaries,
  updateDiary,
} from "../controller/diaryController";

const router = Router();

router.use(authenticate);

router.get("/", getAllDiaries);
router.post("/", createNewDiary);
router.get("/:id", getADiary);
router.put("/:id", updateDiary);
router.delete("/:id", deleteDiary);

export default router;
// Other CRUD operations here
