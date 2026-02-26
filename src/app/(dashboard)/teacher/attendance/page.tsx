"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StudentAttendance {
  studentId: string;
  studentName: string;
  rollNo: string;
  totalClasses: number;
  presented: number;
  absent: number;
  late: number;
}

const mockStudentAttendance: StudentAttendance[] = [
  { studentId: "S001", studentName: "Arjun", rollNo: "01", totalClasses: 25, presented: 24, absent: 0, late: 1 },
  { studentId: "S002", studentName: "Priya", rollNo: "02", totalClasses: 25, presented: 23, absent: 1, late: 1 },
  { studentId: "S003", studentName: "Rohan", rollNo: "03", totalClasses: 25, presented: 22, absent: 2, late: 1 },
  { studentId: "S004", studentName: "Neha", rollNo: "04", totalClasses: 25, presented: 25, absent: 0, late: 0 },
  { studentId: "S005", studentName: "Vikram", rollNo: "05", totalClasses: 25, presented: 20, absent: 3, late: 2 },
];

const getAttendancePercentageColor = (percentage: number) => {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 75) return "text-blue-600";
  return "text-red-600";
};

export default function TeacherAttendancePage() {
  const classAverageAttendance = (mockStudentAttendance.reduce((sum, s) => sum + (s.presented / s.totalClasses), 0) / mockStudentAttendance.length * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Class Attendance (10-A)</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentAttendance.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{classAverageAttendance}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Total Classes</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Late</TableHead>
                <TableHead>Attendance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudentAttendance.map((student) => {
                const percentage = ((student.presented / student.totalClasses) * 100).toFixed(1);
                return (
                  <TableRow key={student.studentId}>
                    <TableCell className="font-medium">{student.rollNo}</TableCell>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.totalClasses}</TableCell>
                    <TableCell className="text-green-600 font-semibold">{student.presented}</TableCell>
                    <TableCell className="text-red-600 font-semibold">{student.absent}</TableCell>
                    <TableCell className="text-yellow-600 font-semibold">{student.late}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${getAttendancePercentageColor(parseFloat(percentage))}`}>
                        {percentage}%
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
