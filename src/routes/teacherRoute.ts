import { Router } from "express";
import * as teacerService  from "../controllers/teacherController";
import { errorHandler } from '../utils/errorHandler';

const router = Router();

/**
 * @swagger
 * /teachers/register:
 *  post:
 *    summary: Register
 *    description: Teacher can register only in new class
 *    tags: [Teachers]
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
router.post("/register", errorHandler(teacerService.registerTeacher));

/**
 * @swagger
 * /teachers/grade/:studentId:
 *  post:
 *    summary: Add grade
 *    description: Only the teacher of the student can add grade
 *    tags: [Teachers]
 *    security:
 *      - cookieAuth: []
 *    requestBody: 
 *      content:  
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              exam:
 *                type: string
 *              score:
 *                type: number
 *              comment:
 *                type: string
 *            example:
 *              exam: English
 *              score: 4 
 *              comment: "Vary Good"
 *    responses:
 *      200:
 *        description: Added successfully
 *      401:
 *        description: Unauthorized
 *      503:
 *        description: Service is temporarily unavailable
 */
router.post("/grade/:studentId", errorHandler(teacerService.addGradeToStudent));
export default router;