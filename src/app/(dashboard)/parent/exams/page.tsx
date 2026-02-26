"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ChildExamResult {
  childName: string;
  class: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  status: "PASS" | "FAIL";
  examDate: string;
}

const mockExamResults: ChildExamResult[] = [
  { childName: "Arjun", class: "10-A", subject: "Mathematics", marksObtained: 92, totalMarks: 100, grade: "A+", status: "PASS", examDate: "2026-02-28" },
  { childName: "Arjun", class: "10-A", subject: "English", marksObtained: 88, totalMarks: 100, grade: "A", status: "PASS", examDate: "2026-03-02" },
  { childName: "Arjun", class: "10-A", subject: "Science", marksObtained: 85, totalMarks: 100, grade: "A", status: "PASS", examDate: "2026-03-04" },
  { childName: "Priya", class: "8-B", subject: "Mathematics", marksObtained: 78, totalMarks: 100, grade: "B+", status: "PASS", examDate: "2026-02-28" },
  { childName: "Priya", class: "8-B", subject: "English", marksObtained: 82, totalMarks: 100, grade: "A", status: "PASS", examDate: "2026-03-02" },
  { childName: "Priya", class: "8-B", subject: "Science", marksObtained: 76, totalMarks: 100, grade: "B", status: "PASS", examDate: "2026-03-04" },
];

const getGradeColor = (grade: string) => {
  if (grade.includes("A")) return "bg-green-100 text-green-800";
  if (grade.includes("B")) return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
};

const getStatusColor = (status: string) => {
  return status === "PASS" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
};

export default function ParentExamsPage() {
  const children = Array.from(new Set(mockExamResults.map(r => r.childName)));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Children's Exam Results</h1>

      {children.map(child => {
        const childResults = mockExamResults.filter(r => r.childName === child);
        const averageMarks = childResults.length > 0 
          ? (childResults.reduce((sum, r) => sum + (r.marksObtained / r.totalMarks * 100), 0) / childResults.length).toFixed(1)
          : 0;
        const passedCount = childResults.filter(r => r.status === "PASS").length;

        return (
          <Card key={child}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{child}</CardTitle>
                  <p className="text-sm text-gray-600">Class {childResults[0].class}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Average Marks</p>
                  <p className="text-3xl font-bold text-purple-600">{averageMarks}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Total Exams</p>
                  <p className="text-2xl font-bold">{childResults.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{passedCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{childResults.length - passedCount}</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Exam Date</TableHead>
                    <TableHead>Marks Obtained</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {childResults.map((result, idx) => {
                    const percentage = ((result.marksObtained / result.totalMarks) * 100).toFixed(1);
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{result.subject}</TableCell>
                        <TableCell>{new Date(result.examDate).toLocaleDateString()}</TableCell>
                        <TableCell className="font-semibold">{result.marksObtained}</TableCell>
                        <TableCell>{result.totalMarks}</TableCell>
                        <TableCell className="font-semibold">{percentage}%</TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(result.grade)}>
                            {result.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
