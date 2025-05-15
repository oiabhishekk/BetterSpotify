import { Router } from "express";
const router = Router();

router.get("/", () => {
  console.log("user router");
});
export default router;
