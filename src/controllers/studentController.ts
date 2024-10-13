import { Request, Response } from "express";
import Student, { IStudent } from "../models/studentModel";
import { createStudent } from "../services/studentService";
import { ObjectId, Types } from 'mongoose';
import { addStudentToClass} from "../services/classService";

export const registerStudent = async (req: Request, res: Response) => {
    const { name, password, email, KlassName } = req.body;

    try {
        const studentExist = await Student.findOne({ email: email });
        if (studentExist) {
            return res.status(401).json({ message: "Student already exist" });

        }
        const newStudent = await createStudent({
            name, password, email
        });
       
        const Klass = await addStudentToClass(KlassName ,newStudent._id as Types.ObjectId)
        if (!Klass) {
            return res.status(401).json({ message: "Klass not found" });
        }
        newStudent.classId = Klass._id as Types.ObjectId
        await newStudent.save();
        
        res.status(201).json({ message: "Student registered successfully" })
    }
    catch (error) {
        console.log(error);
        res.status(400).json("Error registering student")
    }
};