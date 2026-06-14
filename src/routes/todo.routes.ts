import express from "express";
import verifyUserAuth from "../middlewares/verifyUserAuth";
import { getCurretUserTodos } from "../controllers/todo.controller";

const router = express.Router();

router.route("/get-todos").get(verifyUserAuth, getCurretUserTodos);


export default router;