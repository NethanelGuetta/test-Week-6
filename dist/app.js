"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const teacherRoute_1 = __importDefault(require("./routes/teacherRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.default)();
// Routes
app.use("/api/auth", authRoute_1.default);
app.use("/api/teachers", teacherRoute_1.default);
app.use("/api/studends", studentRoute_1.default);
// Error handling middleware
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
