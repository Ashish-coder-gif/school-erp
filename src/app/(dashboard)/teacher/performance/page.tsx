"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Student {
    id: string;
    name: string;
    englishMarks: number;
    mathsMarks: number;
    scienceMarks: number;
    historyMarks: number;
    averageMarks: number;
    grade: string;
    trend: "up" | "down" | "stable";
}

const gradeDistributionData = [
    { grade: 'A+ (90-100)', count: 5, fill: '#10b981' },
    { grade: 'A (80-89)', count: 8, fill: '#3b82f6' },
    { grade: 'B (70-79)', count: 6, fill: '#f59e0b' },
    { grade: 'C (60-69)', count: 4, fill: '#ef4444' },
];

const subjectAverageData = [
    { subject: 'English', average: 82 },
    { subject: 'Maths', average: 78 },
    { subject: 'Science', average: 85 },
    { subject: 'History', average: 80 },
];

const studentData: Student[] = [
    { id: "S001", name: "Aarav Patel", englishMarks: 88, mathsMarks: 92, scienceMarks: 85, historyMarks: 80, averageMarks: 86.25, grade: "A+", trend: "up" },
    { id: "S002", name: "Bhavna Singh", englishMarks: 85, mathsMarks: 80, scienceMarks: 82, historyMarks: 78, averageMarks: 81.25, grade: "A", trend: "stable" },
    { id: "S003", name: "Chetan Kumar", englishMarks: 78, mathsMarks: 75, scienceMarks: 70, historyMarks: 72, averageMarks: 73.75, grade: "B", trend: "down" },
    { id: "S004", name: "Diya Sharma", englishMarks: 92, mathsMarks: 88, scienceMarks: 90, historyMarks: 85, averageMarks: 88.75, grade: "A+", trend: "up" },
    { id: "S005", name: "Eshan Reddy", englishMarks: 75, mathsMarks: 70, scienceMarks: 68, historyMarks: 65, averageMarks: 69.5, grade: "C", trend: "down" },
    { id: "S006", name: "Fatima Khan", englishMarks: 86, mathsMarks: 84, scienceMarks: 88, historyMarks: 82, averageMarks: 85, grade: "A", trend: "up" },
    { id: "S007", name: "Gaurav Verma", englishMarks: 81, mathsMarks: 85, scienceMarks: 80, historyMarks: 79, averageMarks: 81.25, grade: "A", trend: "stable" },
    { id: "S008", name: "Harshita Gupta", englishMarks: 89, mathsMarks: 90, scienceMarks: 87, historyMarks: 88, averageMarks: 88.5, grade: "A+", trend: "up" },
    { id: "S009", name: "Ishaan Roy", englishMarks: 72, mathsMarks: 68, scienceMarks: 65, historyMarks: 70, averageMarks: 68.75, grade: "C", trend: "stable" },
    { id: "S010", name: "Jiya Nair", englishMarks: 84, mathsMarks: 86, scienceMarks: 89, historyMarks: 87, averageMarks: 86.5, grade: "A", trend: "up" },
];

export default function TeacherPerformance() {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [sortBy, setSortBy] = useState<"name" | "marks">("marks");

    const classAverage = (studentData.reduce((sum, s) => sum + s.averageMarks, 0) / studentData.length).toFixed(2);
    const passCount = studentData.filter(s => parseFloat(s.averageMarks.toString()) >= 60).length;
    const topStudent = studentData.reduce((prev, current) => current.averageMarks > prev.averageMarks ? current : prev);

    const sortedStudents = [...studentData].sort((a, b) => {
        if (sortBy === "marks") {
            return b.averageMarks - a.averageMarks;
        }
        return a.name.localeCompare(b.name);
    });

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case "A+":
            case "A":
                return "bg-green-100 text-green-800";
            case "B":
                return "bg-blue-100 text-blue-800";
            case "C":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-red-100 text-red-800";
        }
    };

    const getTrendIcon = (trend: "up" | "down" | "stable") => {
        if (trend === "up") {
            return <TrendingUp className="h-4 w-4 text-green-600" />;
        } else if (trend === "down") {
            return <TrendingDown className="h-4 w-4 text-red-600" />;
        }
        return <span className="text-blue-600 font-semibold">→</span>;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Class Performance</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">View and analyze your class performance and individual student progress</p>
            </div>

            {/* Class Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Class Average</p>
                                <p className="text-3xl font-bold text-blue-600">{classAverage}%</p>
                            </div>
                            <Award className="h-8 w-8 text-blue-600 opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Total Students</p>
                                <p className="text-3xl font-bold text-purple-600">{studentData.length}</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-600 opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Pass Rate</p>
                            <p className="text-3xl font-bold text-green-600">{((passCount / studentData.length) * 100).toFixed(0)}%</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">({passCount}/{studentData.length} passed)</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Top Student</p>
                            <p className="text-lg font-bold text-emerald-600">{topStudent.name}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{topStudent.averageMarks}% avg</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="subject-avg" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="subject-avg">Subject Average</TabsTrigger>
                    <TabsTrigger value="grade-dist">Grade Distribution</TabsTrigger>
                </TabsList>

                <TabsContent value="subject-avg">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subject-wise Average Marks</CardTitle>
                            <CardDescription>Average marks obtained by students in each subject</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={subjectAverageData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="subject" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="average" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="grade-dist">
                    <Card>
                        <CardHeader>
                            <CardTitle>Grade Distribution</CardTitle>
                            <CardDescription>Number of students in each grade</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={gradeDistributionData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ grade, count }) => `${grade}: ${count}`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="count"
                                        >
                                            {gradeDistributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Student Performance Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Individual Student Performance</CardTitle>
                    <CardDescription>Click on a student to view detailed performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSortBy("marks")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    sortBy === "marks"
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                }`}
                            >
                                Sort by Marks
                            </button>
                            <button
                                onClick={() => setSortBy("name")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    sortBy === "name"
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                }`}
                            >
                                Sort by Name
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Student Name</th>
                                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">English</th>
                                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Maths</th>
                                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Science</th>
                                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">History</th>
                                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Average</th>
                                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Grade</th>
                                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedStudents.map((student) => (
                                        <tr
                                            key={student.id}
                                            onClick={() => setSelectedStudent(student)}
                                            className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                                        >
                                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{student.name}</td>
                                            <td className="text-center py-3 px-4 text-slate-700 dark:text-slate-300">{student.englishMarks}</td>
                                            <td className="text-center py-3 px-4 text-slate-700 dark:text-slate-300">{student.mathsMarks}</td>
                                            <td className="text-center py-3 px-4 text-slate-700 dark:text-slate-300">{student.scienceMarks}</td>
                                            <td className="text-center py-3 px-4 text-slate-700 dark:text-slate-300">{student.historyMarks}</td>
                                            <td className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">{student.averageMarks}</td>
                                            <td className="text-center py-3 px-4">
                                                <Badge className={getGradeColor(student.grade)}>
                                                    {student.grade}
                                                </Badge>
                                            </td>
                                            <td className="text-center py-3 px-4">
                                                <div className="flex items-center justify-center">
                                                    {getTrendIcon(student.trend)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Selected Student Details */}
            {selectedStudent && (
                <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {selectedStudent.name}'s Detailed Performance
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                ✕
                            </button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">English</p>
                                <p className="text-2xl font-bold text-blue-600">{selectedStudent.englishMarks}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Maths</p>
                                <p className="text-2xl font-bold text-purple-600">{selectedStudent.mathsMarks}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Science</p>
                                <p className="text-2xl font-bold text-green-600">{selectedStudent.scienceMarks}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">History</p>
                                <p className="text-2xl font-bold text-amber-600">{selectedStudent.historyMarks}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg col-span-2">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Average Marks</p>
                                <p className="text-2xl font-bold text-emerald-600">{selectedStudent.averageMarks}%</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Grade</p>
                                <p className="text-2xl font-bold text-blue-600">{selectedStudent.grade}</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Performance Trend</p>
                                <div className="flex items-center gap-2 mt-2">
                                    {getTrendIcon(selectedStudent.trend)}
                                    <span className="font-semibold text-slate-900 dark:text-white capitalize">{selectedStudent.trend}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}