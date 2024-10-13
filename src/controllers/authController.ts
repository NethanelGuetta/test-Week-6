import { Request, Response } from "express";
import Teacher, { ITeacher } from "../models/teacherModel";
import Student, { IStudent } from "../models/studentModel";
import { generateToken } from "../utils/token";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const teacher = await Teacher.findOne({ email: email });
    if (teacher) {
        if (!(await teacher.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = generateToken(teacher.id, "teacher");
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        })
        return res.status(200).json({message: "logged in successfully", token });
    }

    const student = await Student.findOne({ email: email });
    if (student) {
        if (!(await student.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = generateToken(student.id, "student");
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        })
        
        return res.status(200).json({ message: "logged in successfully", token });
    }
    
}