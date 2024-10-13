"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const errorHandler_1 = require("../utils/errorHandler");
const router = (0, express_1.Router)();
// router.post("/login", login);
router.post("/register", (0, errorHandler_1.errorHandler)(teacherController_1.registerTeacher));
exports.default = router;
