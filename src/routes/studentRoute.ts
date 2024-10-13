import { Router } from "express";
import { errorHandler } from '../utils/errorHandler';
import { registerStudent } from "../controllers/studentController";
const router = Router();


/**
 * @swagger
 * /students/register:
 *  post:
 *    summary: Register
 *    description: Every user can register
 *    tags: [Students]
 *    security:
 *      - cookieAuth: []
 *    requestBody: 
 *      content:  
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              email:
 *                type: string
 *              className:
 *                type: string
 *            example:
 *              username: johnDoe
 *              password: some password 
 *              className: "first grade"
 *    responses:
 *      200:
 *        description: Registered successfully
 *      401:
 *        description: Unauthorized
 *      503:
 *        description: Service is temporarily unavailable
 */
router.post("/register", errorHandler( registerStudent) );

export default router;