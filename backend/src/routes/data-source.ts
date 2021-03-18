import { Router } from "express";
import {
  getSuuntoApiInfo,
  setSuuntoToken,
  updateDataFromSuunto,
} from "../controllers/data-source/suunto-controller";

const router = Router();

router.get("/suunto", getSuuntoApiInfo);

router.post("/suunto/set-token", setSuuntoToken);

router.put("/suunto/update", updateDataFromSuunto);

export default router;
