"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const errorHandler_1 = require("../utils/errorHandler");
const router = (0, express_1.Router)();
router.post("/login", (0, errorHandler_1.errorHandler)(authController_1.login));
exports.default = router;
