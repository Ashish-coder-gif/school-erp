"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ClassReport {
  class: string;
  totalStudents: number;
  averageMarks: number;
  passPercentage: number;
  failCount: number;
  topPerformer: string;
  topMarks: number;
}

const mockClassReports: ClassReport[] = [
  { class: "10-A", totalStudents: 35, averageMarks: 71, passPercentage: 94, failCount: 2, topPerformer: "Arjun Kumar", topMarks: 92 },
  { class: "10-B", totalStudents: 32, averageMarks: 68, passPercentage: 91, failCount: 3, topPerformer: "Shreya Sharma", topMarks: 89 },
  { class: "9-A", totalStudents: 30, averageMarks: 69, passPercentage: 93, failCount: 2, topPerformer: "Karan Singh", topMarks: 90 },
  { class: "9-B", totalStudents: 28, averageMarks: 65, passPercentage: 86, failCount: 4, topPerformer: "Aisha Khan", topMarks: 85 },
];

const getPassPercentageColor = (percentage: number) => {
  if (percentage >= 90) return "bg-green-100 text-green-800";
  if (percentage >= 75) return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
};

export default function TeacherReportsPage() {
  const overallAverageMarks = (mockClassReports.reduce((sum, c) => sum + c.averageMarks, 0) / mockClassReports.length).toFixed(1);
  const overallPassPercentage = (mockClassReports.reduce((sum, c) => sum + c.passPercentage, 0) / mockClassReports.length).toFixed(1);
  const totalStudents = mockClassReports.reduce((sum, c) => sum + c.totalStudents, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Performance Reports - Mathematics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{overallAverageMarks}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overall Pass %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallPassPercentage}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Classes Taught</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockClassReports.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead>Average Marks</TableHead>
                <TableHead>Pass Percentage</TableHead>
                <TableHead>Failed</TableHead>
                <TableHead>Top Performer</TableHead>
                <TableHead>Top Marks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClassReports.map((report) => (
                <TableRow key={report.class}>
                  <TableCell className="font-bold">{report.class}</TableCell>
                  <TableCell>{report.totalStudents}</TableCell>
                  <TableCell className="font-semibold text-purple-600">{report.averageMarks}%</TableCell>
                  <TableCell>
                    <Badge className={getPassPercentageColor(report.passPercentage)}>
                      {report.passPercentage}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={report.failCount > 3 ? "text-red-600 font-semibold" : ""}>
                      {report.failCount}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{report.topPerformer}</TableCell>
                  <TableCell className="font-bold text-green-600">{report.topMarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
