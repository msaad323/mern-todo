// src/routes/userAuth.js

import express from "express";
import { signup, login, logout } from "../controllers/auth.js";
import { refreshAccessToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

export default router;
