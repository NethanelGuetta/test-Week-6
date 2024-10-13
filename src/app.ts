import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import cookieParser from 'cookie-parser';
import teacherRouter from "./routes/teacherRoute";
import authRouter from "./routes/authRoute";
import studendRouter from "./routes/studentRoute";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employees API',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(openapiSpecification));



connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/students", studendRouter)



// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
