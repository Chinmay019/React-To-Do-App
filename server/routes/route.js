import express from "express";
import { homePageAPI, homePageAPItesting } from "../controller/controller.js";
const router = express.Router();

router.route("/", homePageAPI);
router.route("/testing", homePageAPItesting);

export default router;