"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ChildAttendance {
  childName: string;
  class: string;
  totalClasses: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
}

const mockChildrenAttendance: ChildAttendance[] = [
  { childName: "Arjun", class: "10-A", totalClasses: 20, presentDays: 19, absentDays: 1, lateDays: 0 },
  { childName: "Priya", class: "8-B", totalClasses: 20, presentDays: 18, absentDays: 0, lateDays: 2 },
];

const getStatusColor = (percentage: number) => {
  if (percentage >= 90) return "bg-green-100 text-green-800";
  if (percentage >= 75) return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
};

export default function ParentAttendancePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Children's Attendance</h1>

      <div className="space-y-4">
        {mockChildrenAttendance.map((child, idx) => {
          const percentage = ((child.presentDays / child.totalClasses) * 100).toFixed(1);
          return (
            <Card key={idx}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">{child.childName}</CardTitle>
                    <p className="text-sm text-gray-600">Class {child.class}</p>
                  </div>
                  <Badge className={getStatusColor(parseFloat(percentage))}>
                    {percentage}% Present
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Classes</p>
                    <p className="text-2xl font-bold">{child.totalClasses}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="text-2xl font-bold text-green-600">{child.presentDays}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="text-2xl font-bold text-red-600">{child.absentDays}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Late</p>
                    <p className="text-2xl font-bold text-yellow-600">{child.lateDays}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
