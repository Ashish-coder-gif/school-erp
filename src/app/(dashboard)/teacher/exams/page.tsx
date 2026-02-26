"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ExamRecord {
  examId: string;
  subject: string;
  class: string;
  totalMarks: number;
  passingMarks: number;
  date: string;
  status: "SCHEDULED" | "COMPLETED";
  studentsSubmitted?: number;
  totalStudents?: number;
}

const mockExams: ExamRecord[] = [
  { examId: "E001", subject: "Mathematics", class: "10-A", totalMarks: 100, passingMarks: 40, date: "2026-02-28", status: "COMPLETED", studentsSubmitted: 35, totalStudents: 35 },
  { examId: "E002", subject: "Mathematics", class: "10-B", totalMarks: 100, passingMarks: 40, date: "2026-03-02", status: "SCHEDULED", totalStudents: 32 },
  { examId: "E003", subject: "Mathematics", class: "9-A", totalMarks: 100, passingMarks: 35, date: "2026-03-05", status: "SCHEDULED", totalStudents: 30 },
];

const getStatusColor = (status: string) => {
  if (status === "COMPLETED") return "bg-green-100 text-green-800";
  return "bg-blue-100 text-blue-800";
};

export default function TeacherExamsPage() {
  const completedExams = mockExams.filter(e => e.status === "COMPLETED");
  const upcomingExams = mockExams.filter(e => e.status === "SCHEDULED");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Exams</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="text-2xl font-bold text-blue-600">{upcomingExams.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Passing Marks</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExams.map((exam) => (
                <TableRow key={exam.examId}>
                  <TableCell className="font-medium">{exam.subject}</TableCell>
                  <TableCell>{exam.class}</TableCell>
                  <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                  <TableCell>{exam.totalMarks}</TableCell>
                  <TableCell>{exam.passingMarks}</TableCell>
                  <TableCell>
                    {exam.studentsSubmitted ? `${exam.studentsSubmitted}/${exam.totalStudents}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(exam.status)}>
                      {exam.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
