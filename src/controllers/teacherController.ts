import { Request, Response } from "express";
import Teacher, { ITeacher } from "../models/teacherModel";
import { createTeacher, updateTeacher } from "../services/teacerService";
import { createKlass } from "../services/classService";
import { addScore, getStudentByClass, getStudentById, updateScore } from "../services/studentService";
import { ObjectId, Types } from 'mongoose';
import Student, { IStudent } from "../models/studentModel";
import { getIdFromToken, getRoleFromToken } from "../utils/token";
import { log } from "console";
import { get } from "http";

export const registerTeacher = async (req: Request, res: Response) => {
    const { name, password, email, KlassName } = req.body;

    try {
        const teacherExist = await Teacher.findOne({ email: email });
        if (teacherExist) {
            return res.status(401).json({ message: "Teacher already exist" });

        }
        const newTeacher = await createTeacher({
            name, password, email
        });
        const newKlass = await createKlass({
            name: KlassName,
            teacherId: newTeacher._id as Types.ObjectId,
            students: []
        })

        await updateTeacher(newTeacher._id as Types.ObjectId, newKlass._id as Types.ObjectId)
        const newKlassId = newKlass._id as Types.ObjectId
        res.status(201).json({ message: "User registered successfully", newKlassId })
    }
    catch (error) {
        console.log(error);
        res.status(400).json("Error registering user")
    }
};

export const addGradeToStudent = async (req: Request, res: Response) => {
    const { exam, comment, score } = req.body;
    const { studentId } = req.params;
    const teacherId = getIdFromToken(req.cookies.token);
    const existingTeacher = await Teacher.findById(teacherId);
    const existingStudent = await Student.findById(studentId);
    console.log(existingStudent?.classId);
    console.log(existingTeacher?.classId);

    if (!existingStudent) {
        return res.status(404).json({ message: "Student not found" });
    }
    if (!existingStudent.classId.equals(existingTeacher?.classId)) {
        return res.status(401).json({ message: "The student is not in your class" });
    }
    await addScore(studentId, { exam, comment, score });
    res.status(200).json({ message: "Grade added successfully" });
}

export const getStudents = async (req: Request, res: Response) => {
    if (getRoleFromToken(req.cookies.token) !== "teacher") {
        return res.status(401).json({ message: "You are not a teacher" });
    }
    const teacherId = getIdFromToken(req.cookies.token);
    const teacher = await Teacher.findById(teacherId);
    const students = await getStudentByClass(teacher?.classId as Types.ObjectId);
    res.status(200).json(students);
}

 export const getStudent = async (req: Request, res: Response) => {
    if (getRoleFromToken(req.cookies.token) !== "teacher") {
        return res.status(401).json({ message: "You are not a teacher" });
    }
    const teacherId = getIdFromToken(req.cookies.token);
    const teacher = await Teacher.findById(teacherId);
    const student = await getStudentById(req.params.id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    if (!student.classId.equals(teacher?.classId)) {
        return res.status(401).json({ message: "The student is not in your class" });
    }
    res.status(200).json(student);
}

export const updateScoreOfStudent = async (req: Request, res: Response) => {
    if (getRoleFromToken(req.cookies.token) !== "teacher") {
        return res.status(401).json({ message: "You are not a teacher" });
    }
    const teacherId = getIdFromToken(req.cookies.token);
    const teacher = await Teacher.findById(teacherId);
    // const student = await getStudentById(req.params.id);
    // if (!student) {
    //     return res.status(404).json({ message: "Student not found" });
    // }
    // if (!student.classId.equals(teacher?.classId)) {
    //     return res.status(401).json({ message: "The student is not in your class" });
    // }
    // await updateScore(req.params.id, req.body);
    res.status(200).json({ message: "Score updated successfully" });
}