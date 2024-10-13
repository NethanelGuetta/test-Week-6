import { log } from "console";
import Student, { IStudent } from "../models/studentModel";
import Grade ,{ IGrade } from "../models/studentModel";
import { Types } from 'mongoose';

export const createStudent = async (data: Partial<IStudent>): Promise<IStudent> => {
    const studend = new Student(data);
    return (await studend.save());
}

export const updateStudent = async (id: Types.ObjectId, classId: Types.ObjectId): Promise<IStudent | null> => {
    const student = await Student.findByIdAndUpdate(id, { classId }, { new: true });
    return student;
}

export const addScore = async (id: string, data: Partial<IGrade>): Promise<IStudent | null> => {
    const student = await Student.findByIdAndUpdate(id, { $push: { grades: data } }, { new: true });
    return student;
}
// export const getStudents = async (): Promise<IStudent[] | null> => {
//     const students = await Student.find();
//     return students;
// }
export const getStudentByClass = async (classId: Types.ObjectId): Promise<IStudent[] | null> => {
    const students = await Student.find({ classId: classId });
    return students;
}

export const getStudentById = async (id: string): Promise<IStudent | null> => {
    const student = await Student.findOne({ _id: id });
    return student;
}

export const getScoresOfStudent = async (id: string): Promise<IGrade[] | null> => {
    const student = await Student.findById(id);
    console.log(student);
    if (!student) {
        return null
    }
    return student.grades
}

export const updateScore = async (id: string, scoreId: string, data: Partial<IGrade>): Promise<IGrade[] | null> => {
    const student = await Student.findById(id)
    if (!student) {
        return null
    }
    const grades: IGrade[] = student.grades;
    const grade = grades.find(grade => grade.id === scoreId);
    if (!grade) {
        return null
    }
    grade.exam ??= data.exam;
    grade.score = data.score;
    grade.comment = data.comment;
    return grades
    // grade.update(data);
}
