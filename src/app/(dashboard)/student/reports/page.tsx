"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PerformanceReport {
  month: string;
  averageMarks: number;
  attendancePercentage: number;
  behaviorRating: string;
  status: string;
}

const mockReports: PerformanceReport[] = [
  { month: "January 2026", averageMarks: 82, attendancePercentage: 95, behaviorRating: "Excellent", status: "GOOD" },
  { month: "February 2026", averageMarks: 85, attendancePercentage: 92, behaviorRating: "Very Good", status: "EXCELLENT" },
];

const getBehaviorColor = (rating: string) => {
  if (rating === "Excellent" || rating === "Very Good") return "bg-green-100 text-green-800";
  if (rating === "Good") return "bg-blue-100 text-blue-800";
  if (rating === "Average") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const getStatusColor = (status: string) => {
  if (status === "EXCELLENT") return "bg-green-100 text-green-800";
  if (status === "GOOD") return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
};

export default function StudentReportsPage() {
  const latestReport = mockReports[mockReports.length - 1];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestReport.averageMarks}%</div>
            <p className="text-xs text-gray-500 mt-1">{latestReport.month}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{latestReport.attendancePercentage}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getBehaviorColor(latestReport.behaviorRating)}>
              {latestReport.behaviorRating}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overall Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(latestReport.status)}>
              {latestReport.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Average Marks</TableHead>
                <TableHead>Attendance %</TableHead>
                <TableHead>Behavior Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{report.month}</TableCell>
                  <TableCell>{report.averageMarks}%</TableCell>
                  <TableCell>{report.attendancePercentage}%</TableCell>
                  <TableCell>
                    <Badge className={getBehaviorColor(report.behaviorRating)}>
                      {report.behaviorRating}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
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
