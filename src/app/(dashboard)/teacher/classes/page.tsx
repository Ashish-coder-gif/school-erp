"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, BookOpen } from "lucide-react";

interface ClassInfo {
  id: string;
  name: string;
  totalStudents: number;
  section: string;
  subject: string;
  schedule: string;
  room: string;
  classTeacher?: string;
}

interface StudentRecord {
  id: string;
  name: string;
  rollNo: string;
  attendance: number;
  avgMarks: number;
}

const myClasses: ClassInfo[] = [
  {
    id: "1",
    name: "Class 10",
    section: "10-A",
    totalStudents: 42,
    subject: "Mathematics",
    schedule: "Mon, Wed, Fri - 09:00 AM to 10:00 AM",
    room: "Room 101",
    classTeacher: "Ashish Kumar",
  },
  {
    id: "2",
    name: "Class 10",
    section: "10-B",
    totalStudents: 38,
    subject: "Mathematics",
    schedule: "Mon, Wed, Fri - 11:00 AM to 12:00 PM",
    room: "Room 102",
  },
  {
    id: "3",
    name: "Class 9",
    section: "9-A",
    totalStudents: 40,
    subject: "Mathematics",
    schedule: "Tue, Thu - 01:00 PM to 02:00 PM",
    room: "Room 201",
  },
  {
    id: "4",
    name: "Class 12",
    section: "12-Sci",
    totalStudents: 35,
    subject: "Advanced Mathematics",
    schedule: "Mon, Wed, Fri - 11:00 AM to 12:30 PM",
    room: "Room 304",
  },
];

const classStudents: Record<string, StudentRecord[]> = {
  "1": [
    { id: "1", name: "Rahul Kumar", rollNo: "001", attendance: 95, avgMarks: 88 },
    { id: "2", name: "Priya Singh", rollNo: "002", attendance: 92, avgMarks: 92 },
    { id: "3", name: "Akshay Patel", rollNo: "003", attendance: 88, avgMarks: 78 },
    { id: "4", name: "Diana Sharma", rollNo: "004", attendance: 96, avgMarks: 85 },
    { id: "5", name: "Vikram Desai", rollNo: "005", attendance: 85, avgMarks: 72 },
  ],
  "2": [
    { id: "1", name: "Arjun Gupta", rollNo: "101", attendance: 91, avgMarks: 82 },
    { id: "2", name: "Neha Kapoor", rollNo: "102", attendance: 94, avgMarks: 88 },
    { id: "3", name: "Rohan Verma", rollNo: "103", attendance: 80, avgMarks: 76 },
  ],
  "3": [
    { id: "1", name: "Aditya Nair", rollNo: "201", attendance: 93, avgMarks: 85 },
    { id: "2", name: "Sneha Reddy", rollNo: "202", attendance: 89, avgMarks: 81 },
  ],
  "4": [
    { id: "1", name: "Simran Kaur", rollNo: "301", attendance: 97, avgMarks: 94 },
    { id: "2", name: "Aryan Singh", rollNo: "302", attendance: 90, avgMarks: 86 },
  ],
};

export default function TeacherClassesPage() {
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);

  const stats = {
    totalClasses: myClasses.length,
    totalStudents: myClasses.reduce((sum, cls) => sum + cls.totalStudents, 0),
    avgAttendance: 91,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Classes</h1>
        <p className="text-gray-600">Manage and view details of your assigned classes</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-3xl font-bold">{stats.totalClasses}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold">{stats.totalStudents}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Attendance</p>
                <p className="text-3xl font-bold">{stats.avgAttendance}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes List */}
      <Card>
        <CardHeader>
          <CardTitle>Class Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myClasses.map((cls) => (
              <div key={cls.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedClassId(expandedClassId === cls.id ? null : cls.id)}
                  className="w-full p-4 bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 transition-colors text-left"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg">{cls.name} - {cls.section}</h3>
                        <Badge className="bg-emerald-100 text-emerald-800">{cls.subject}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {cls.totalStudents} Students
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {cls.schedule}
                        </span>
                        <span>📍 {cls.room}</span>
                        {cls.classTeacher && <span>👨‍🏫 Class Teacher: {cls.classTeacher}</span>}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {expandedClassId === cls.id ? "▼" : "▶"}
                    </div>
                  </div>
                </button>

                {/* Expanded Section - Students List */}
                {expandedClassId === cls.id && (
                  <div className="border-t p-4 bg-slate-50">
                    <h4 className="font-semibold mb-3">Students in {cls.section}</h4>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Roll No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead>Avg. Marks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(classStudents[cls.id] || []).map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.rollNo}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>
                                <Badge className={student.attendance >= 90 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                  {student.attendance}%
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold">{student.avgMarks}/100</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-center">
              <p className="font-semibold text-blue-600">Mark Attendance</p>
              <p className="text-sm text-gray-600 mt-1">Record student attendance</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-emerald-50 transition-colors text-center">
              <p className="font-semibold text-emerald-600">Enter Marks</p>
              <p className="text-sm text-gray-600 mt-1">Input exam results</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-purple-50 transition-colors text-center">
              <p className="font-semibold text-purple-600">View Reports</p>
              <p className="text-sm text-gray-600 mt-1">Check class performance</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-amber-50 transition-colors text-center">
              <p className="font-semibold text-amber-600">Announcements</p>
              <p className="text-sm text-gray-600 mt-1">Post notices to class</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
