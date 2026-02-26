"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChildPerformance {
  childName: string;
  class: string;
  averageMarks: number;
  attendancePercentage: number;
  behavior: string;
  overallStatus: string;
  subjects: SubjectPerformance[];
}

interface SubjectPerformance {
  subject: string;
  marks: number;
  grade: string;
}

const mockPerformance: ChildPerformance[] = [
  {
    childName: "Arjun",
    class: "10-A",
    averageMarks: 85,
    attendancePercentage: 95,
    behavior: "Excellent",
    overallStatus: "EXCELLENT",
    subjects: [
      { subject: "Mathematics", marks: 92, grade: "A+" },
      { subject: "English", marks: 88, grade: "A" },
      { subject: "Science", marks: 85, grade: "A" },
      { subject: "History", marks: 82, grade: "A" },
      { subject: "Geography", marks: 80, grade: "B+" },
    ],
  },
  {
    childName: "Priya",
    class: "8-B",
    averageMarks: 79,
    attendancePercentage: 92,
    behavior: "Very Good",
    overallStatus: "GOOD",
    subjects: [
      { subject: "Mathematics", marks: 78, grade: "B+" },
      { subject: "English", marks: 82, grade: "A" },
      { subject: "Science", marks: 76, grade: "B" },
      { subject: "Social Studies", marks: 80, grade: "B+" },
    ],
  },
];

const getStatusColor = (status: string) => {
  if (status === "EXCELLENT") return "bg-green-100 text-green-800";
  if (status === "GOOD") return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
};

const getGradeColor = (grade: string) => {
  if (grade.includes("A")) return "bg-green-100 text-green-800";
  if (grade.includes("B")) return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
};

export default function ParentReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Children's Performance Reports</h1>

      {mockPerformance.map(child => (
        <Card key={child.childName}>
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{child.childName}</h2>
                <p className="text-sm text-gray-600">Class {child.class}</p>
              </div>
              <Badge className={getStatusColor(child.overallStatus)}>
                {child.overallStatus}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Average Marks</p>
                <p className="text-2xl font-bold text-purple-600">{child.averageMarks}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Attendance</p>
                <p className="text-2xl font-bold text-green-600">{child.attendancePercentage}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Behavior</p>
                <p className="text-lg font-semibold">{child.behavior}</p>
              </div>
              <div></div>
            </div>
          </CardHeader>

          <CardContent>
            <h3 className="font-semibold mb-4 text-lg">Subject-wise Performance</h3>
            <div className="space-y-3">
              {child.subjects.map(subject => (
                <div key={subject.subject} className="flex justify-between items-center border-b pb-3">
                  <div className="flex-1">
                    <p className="font-medium">{subject.subject}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-lg">{subject.marks}%</p>
                    <Badge className={getGradeColor(subject.grade)}>
                      {subject.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Comments:</strong> {child.childName} is performing exceptionally well in academics and maintains good discipline.
                Continue encouraging them to participate in co-curricular activities for overall development.
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
