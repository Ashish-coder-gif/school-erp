"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AttendanceRecord {
  date: string;
  status: "PRESENT" | "ABSENT" | "LATE";
}

const mockAttendance: AttendanceRecord[] = [
  { date: "2026-02-25", status: "PRESENT" },
  { date: "2026-02-24", status: "PRESENT" },
  { date: "2026-02-23", status: "LATE" },
  { date: "2026-02-20", status: "PRESENT" },
  { date: "2026-02-19", status: "ABSENT" },
  { date: "2026-02-18", status: "PRESENT" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "PRESENT":
      return "bg-green-100 text-green-800";
    case "ABSENT":
      return "bg-red-100 text-red-800";
    case "LATE":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function StudentAttendancePage() {
  const presentCount = mockAttendance.filter(a => a.status === "PRESENT").length;
  const absentCount = mockAttendance.filter(a => a.status === "ABSENT").length;
  const lateCount = mockAttendance.filter(a => a.status === "LATE").length;
  const percentage = ((presentCount / mockAttendance.length) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAttendance.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Attendance %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendance.map((record) => (
                <TableRow key={record.date}>
                  <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
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
