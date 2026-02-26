"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Exam {
  id: string;
  subject: string;
  date: string;
  totalMarks: number;
  passingMarks: number;
  marksObtained?: number;
  status: "COMPLETED" | "UPCOMING" | "PENDING";
}

// Mock exam data with actual marks
const mockExams: Exam[] = [
  { id: "1", subject: "Mathematics", date: "2026-02-28", totalMarks: 100, passingMarks: 40, marksObtained: 92, status: "COMPLETED" },
  { id: "2", subject: "English", date: "2026-03-02", totalMarks: 100, passingMarks: 40, marksObtained: 88, status: "COMPLETED" },
  { id: "3", subject: "Science", date: "2026-03-05", totalMarks: 100, passingMarks: 40, status: "UPCOMING" },
  { id: "4", subject: "History", date: "2026-03-08", totalMarks: 100, passingMarks: 40, status: "UPCOMING" },
  { id: "5", subject: "Geography", date: "2026-03-10", totalMarks: 100, passingMarks: 40, status: "UPCOMING" },
];

const getGradeFromMarks = (marks: number, totalMarks: number): string => {
  const percentage = (marks / totalMarks) * 100;
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C+";
  if (percentage >= 40) return "C";
  return "F";
};

const getStatusColor = (status: string) => {
  if (status === "COMPLETED") return "bg-green-100 text-green-800";
  if (status === "UPCOMING") return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-800";
};

const getGradeColor = (grade: string) => {
  if (grade.includes("A")) return "bg-green-100 text-green-800";
  if (grade.includes("B")) return "bg-blue-100 text-blue-800";
  if (grade.includes("C")) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

export default function StudentExamsPage() {
  const completedExams = mockExams.filter(e => e.status === "COMPLETED");
  const averageMarks = completedExams.length > 0 
    ? (completedExams.reduce((sum, e) => sum + ((e.marksObtained || 0) / e.totalMarks * 100), 0) / completedExams.length).toFixed(1)
    : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Exam Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockExams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedExams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockExams.filter(e => e.status === "UPCOMING").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{averageMarks}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Results Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Exam Date</TableHead>
                <TableHead>Your Marks</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExams.map((exam) => {
                const percentage = exam.marksObtained ? ((exam.marksObtained / exam.totalMarks) * 100).toFixed(1) : "—";
                const grade = exam.marksObtained ? getGradeFromMarks(exam.marksObtained, exam.totalMarks) : "—";
                return (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.subject}</TableCell>
                    <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-semibold">{exam.marksObtained || "—"}</TableCell>
                    <TableCell>{exam.totalMarks}</TableCell>
                    <TableCell className="font-semibold">{percentage}%</TableCell>
                    <TableCell>
                      {grade !== "—" && (
                        <Badge className={getGradeColor(grade)}>
                          {grade}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {completedExams.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedExams.map((exam) => {
                const percentage = ((exam.marksObtained! / exam.totalMarks) * 100);
                return (
                  <div key={exam.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{exam.subject}</span>
                      <span className="text-sm font-semibold">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          percentage >= 80 ? 'bg-green-600' :
                          percentage >= 60 ? 'bg-blue-600' :
                          'bg-yellow-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
