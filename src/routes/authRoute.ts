import { Router } from "express";
import { login } from "../controllers/authController";
import { errorHandler } from '../utils/errorHandler';

const router = Router();
/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login
 *    description: Every user can register
 *    tags: [Auth]
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
 *              role:
 *                type: enum
 *                enum: ['employee', 'manager']
 *              salary:
 *                type: number
 *              yearsOfExperience:
 *                type: number
 *              startDate:
 *                type: date
 *              age:
 *                type: number
 *            example:
 *              username: johnDoe
 *              password: some password 
 *              role: manager
 *              salary: 1000
 *              yearsOfExperience: 5
 *              startDate: 2022-01-01
 *              age: 30
 *    responses:
 *      200:
 *        description: Users list returned successfully
 *      401:
 *        description: Unauthorized
 *      503:
 *        description: Service is temporarily unavailable
 */
router.post("/login", errorHandler(login));

export default router;