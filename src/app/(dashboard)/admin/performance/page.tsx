"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Users, Award, ChevronDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

interface ClassPerformance {
    id: string;
    className: string;
    totalStudents: number;
    classAverage: number;
    passRate: number;
    topStudent: string;
    topMarks: number;
    trend: "up" | "down" | "stable";
    studentCount: { A: number; B: number; C: number; D: number };
}

const classPerformanceData: ClassPerformance[] = [
    {
        id: "C001",
        className: "10-A",
        totalStudents: 32,
        classAverage: 82.5,
        passRate: 93.75,
        topStudent: "Aarav Patel",
        topMarks: 94,
        trend: "up",
        studentCount: { A: 15, B: 12, C: 4, D: 1 },
    },
    {
        id: "C002",
        className: "10-B",
        totalStudents: 30,
        classAverage: 78.3,
        passRate: 86.67,
        topStudent: "Diya Sharma",
        topMarks: 91,
        trend: "stable",
        studentCount: { A: 10, B: 14, C: 5, D: 1 },
    },
    {
        id: "C003",
        className: "9-A",
        totalStudents: 29,
        classAverage: 81.2,
        passRate: 89.66,
        topStudent: "Harshita Gupta",
        topMarks: 92,
        trend: "up",
        studentCount: { A: 12, B: 13, C: 3, D: 1 },
    },
    {
        id: "C004",
        className: "9-B",
        totalStudents: 31,
        classAverage: 76.8,
        passRate: 80.65,
        topStudent: "Jiya Nair",
        topMarks: 88,
        trend: "down",
        studentCount: { A: 8, B: 15, C: 6, D: 2 },
    },
    {
        id: "C005",
        className: "8-A",
        totalStudents: 28,
        classAverage: 79.5,
        passRate: 85.71,
        topStudent: "Atharv Kumar",
        topMarks: 89,
        trend: "up",
        studentCount: { A: 11, B: 12, C: 4, D: 1 },
    },
    {
        id: "C006",
        className: "8-B",
        totalStudents: 26,
        classAverage: 75.4,
        passRate: 76.92,
        topStudent: "Priya Singh",
        topMarks: 85,
        trend: "down",
        studentCount: { A: 6, B: 12, C: 6, D: 2 },
    },
];

const performanceTrendData = [
    { month: "January", average: 75.2 },
    { month: "February", average: 76.8 },
    { month: "March", average: 78.5 },
    { month: "April", average: 79.3 },
    { month: "May", average: 80.1 },
    { month: "June", average: 79.8 },
];

const classComparisonData = classPerformanceData.map(c => ({
    className: c.className,
    average: c.classAverage,
    passRate: c.passRate,
}));

export default function AdminPerformance() {
    const [selectedClass, setSelectedClass] = useState<ClassPerformance | null>(null);
    const [expandedClass, setExpandedClass] = useState<string | null>(null);

    const overallAverage = (classPerformanceData.reduce((sum, c) => sum + c.classAverage, 0) / classPerformanceData.length).toFixed(2);
    const totalStudents = classPerformanceData.reduce((sum, c) => sum + c.totalStudents, 0);
    const averagePassRate = (classPerformanceData.reduce((sum, c) => sum + c.passRate, 0) / classPerformanceData.length).toFixed(1);
    const topClass = classPerformanceData.reduce((prev, current) => current.classAverage > prev.classAverage ? current : prev);

    const getTrendIcon = (trend: "up" | "down" | "stable") => {
        if (trend === "up") {
            return <TrendingUp className="h-4 w-4 text-green-600" />;
        } else if (trend === "down") {
            return <TrendingDown className="h-4 w-4 text-red-600" />;
        }
        return <span className="text-blue-600 font-semibold">→</span>;
    };

    const getPerformanceColor = (average: number) => {
        if (average >= 85) return "bg-green-100 text-green-800";
        if (average >= 75) return "bg-blue-100 text-blue-800";
        if (average >= 65) return "bg-yellow-100 text-yellow-800";
        return "bg-red-100 text-red-800";
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">School Performance Analytics</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">View comprehensive performance metrics across all classes</p>
            </div>

            {/* Overall Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">School Average</p>
                                <p className="text-3xl font-bold text-blue-600">{overallAverage}%</p>
                            </div>
                            <Award className="h-8 w-8 text-blue-600 opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Total Classes</p>
                                <p className="text-3xl font-bold text-purple-600">{classPerformanceData.length}</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-600 opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Students</p>
                            <p className="text-3xl font-bold text-green-600">{totalStudents}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Avg Pass Rate</p>
                            <p className="text-3xl font-bold text-emerald-600">{averagePassRate}%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="comparison" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="comparison">Class Comparison</TabsTrigger>
                    <TabsTrigger value="trend">Performance Trend</TabsTrigger>
                </TabsList>

                <TabsContent value="comparison">
                    <Card>
                        <CardHeader>
                            <CardTitle>Class-wise Performance Comparison</CardTitle>
                            <CardDescription>Average marks and pass rate across all classes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={classComparisonData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="className" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="average" fill="#3b82f6" name="Average Marks" />
                                    <Bar dataKey="passRate" fill="#10b981" name="Pass Rate" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="trend">
                    <Card>
                        <CardHeader>
                            <CardTitle>Overall Performance Trend</CardTitle>
                            <CardDescription>School-wide average marks trend over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={performanceTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="average"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6', r: 5 }}
                                        activeDot={{ r: 7 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Top Performing Class */}
            <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
                <CardHeader>
                    <CardTitle className="text-emerald-900 dark:text-emerald-100">Top Performing Class</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-bold text-emerald-900 dark:text-white">{topClass.className}</p>
                                <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">{topClass.totalStudents} students</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-emerald-600">{topClass.classAverage}%</p>
                                <p className="text-sm text-emerald-600 flex items-center gap-1 justify-end mt-1">
                                    {getTrendIcon(topClass.trend)}
                                </p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Top Student:</span>
                            <span className="font-semibold text-slate-900 dark:text-white ml-2">{topClass.topStudent} ({topClass.topMarks}%)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Class Performance Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Performance Details</CardTitle>
                    <CardDescription>Detailed metrics for each class</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {classPerformanceData.map((classData) => (
                            <div key={classData.id} className="border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow">
                                <div
                                    onClick={() => setExpandedClass(expandedClass === classData.id ? null : classData.id)}
                                    className="p-4 cursor-pointer flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="font-bold text-lg text-slate-900 dark:text-white w-20">{classData.className}</div>
                                        <div className="flex items-center gap-8 flex-1">
                                            <div>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Average</p>
                                                <p className="text-lg font-bold text-slate-900 dark:text-white">{classData.classAverage}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Pass Rate</p>
                                                <p className="text-lg font-bold text-slate-900 dark:text-white">{classData.passRate.toFixed(1)}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Students</p>
                                                <p className="text-lg font-bold text-slate-900 dark:text-white">{classData.totalStudents}</p>
                                            </div>
                                            <Badge className={getPerformanceColor(classData.classAverage)}>
                                                {classData.classAverage >= 85 ? "Excellent" : classData.classAverage >= 75 ? "Good" : classData.classAverage >= 65 ? "Average" : "Below Avg"}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getTrendIcon(classData.trend)}
                                        <ChevronDown
                                            className={`h-5 w-5 text-slate-400 transition-transform ${
                                                expandedClass === classData.id ? "rotate-180" : ""
                                            }`}
                                        />
                                    </div>
                                </div>

                                {expandedClass === classData.id && (
                                    <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/30">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className="bg-white dark:bg-slate-800 p-3 rounded">
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Top Student</p>
                                                <p className="font-semibold text-slate-900 dark:text-white text-sm">{classData.topStudent}</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{classData.topMarks}% marks</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-800 p-3 rounded">
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Grade A</p>
                                                <p className="font-bold text-green-600 text-lg">{classData.studentCount.A}</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">students</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-800 p-3 rounded">
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Grade B</p>
                                                <p className="font-bold text-blue-600 text-lg">{classData.studentCount.B}</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">students</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-800 p-3 rounded">
                                                <p className="text-xs text-slate-600 dark:text-slate-400">Grade C & Below</p>
                                                <p className="font-bold text-red-600 text-lg">{classData.studentCount.C + classData.studentCount.D}</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">students</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full" onClick={() => setSelectedClass(classData)}>
                                            View Detailed Report
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Selected Class Details Modal */}
            {selectedClass && (
                <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {selectedClass.className} - Detailed Report
                            <button
                                onClick={() => setSelectedClass(null)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-2xl"
                            >
                                ✕
                            </button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Class Average</p>
                                <p className="text-3xl font-bold text-blue-600">{selectedClass.classAverage}%</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">out of 100</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Students</p>
                                <p className="text-3xl font-bold text-purple-600">{selectedClass.totalStudents}</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">enrolled students</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Pass Rate</p>
                                <p className="text-3xl font-bold text-green-600">{selectedClass.passRate.toFixed(1)}%</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">passed overall</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Grade Distribution</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600 font-semibold">A Grade:</span>
                                        <span>{selectedClass.studentCount.A} ({((selectedClass.studentCount.A / selectedClass.totalStudents) * 100).toFixed(0)}%)</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-blue-600 font-semibold">B Grade:</span>
                                        <span>{selectedClass.studentCount.B} ({((selectedClass.studentCount.B / selectedClass.totalStudents) * 100).toFixed(0)}%)</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-yellow-600 font-semibold">C Grade:</span>
                                        <span>{selectedClass.studentCount.C} ({((selectedClass.studentCount.C / selectedClass.totalStudents) * 100).toFixed(0)}%)</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-red-600 font-semibold">D Grade:</span>
                                        <span>{selectedClass.studentCount.D} ({((selectedClass.studentCount.D / selectedClass.totalStudents) * 100).toFixed(0)}%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}