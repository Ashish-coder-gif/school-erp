"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TimetableSlot {
  day: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  room: string;
}

const mockTimetable: TimetableSlot[] = [
  { day: "Monday", subject: "Mathematics", teacher: "Mr. Sharma", startTime: "09:00", endTime: "10:00", room: "A101" },
  { day: "Monday", subject: "English", teacher: "Ms. Patel", startTime: "10:15", endTime: "11:15", room: "A102" },
  { day: "Monday", subject: "Science", teacher: "Dr. Gupta", startTime: "11:30", endTime: "12:30", room: "LAB1" },
  { day: "Tuesday", subject: "History", teacher: "Mr. Kumar", startTime: "09:00", endTime: "10:00", room: "A103" },
  { day: "Tuesday", subject: "Mathematics", teacher: "Mr. Sharma", startTime: "10:15", endTime: "11:15", room: "A101" },
  { day: "Tuesday", subject: "Geography", teacher: "Mrs. Singh", startTime: "11:30", endTime: "12:30", room: "A104" },
  { day: "Wednesday", subject: "Science", teacher: "Dr. Gupta", startTime: "09:00", endTime: "10:00", room: "LAB1" },
  { day: "Wednesday", subject: "English", teacher: "Ms. Patel", startTime: "10:15", endTime: "11:15", room: "A102" },
  { day: "Wednesday", subject: "Computer Science", teacher: "Mr. Verma", startTime: "11:30", endTime: "12:30", room: "LAB2" },
  { day: "Thursday", subject: "Mathematics", teacher: "Mr. Sharma", startTime: "09:00", endTime: "10:00", room: "A101" },
  { day: "Thursday", subject: "Physical Education", teacher: "Coach Rao", startTime: "10:15", endTime: "11:15", room: "GROUND" },
  { day: "Thursday", subject: "Science", teacher: "Dr. Gupta", startTime: "11:30", endTime: "12:30", room: "LAB1" },
  { day: "Friday", subject: "English", teacher: "Ms. Patel", startTime: "09:00", endTime: "10:00", room: "A102" },
  { day: "Friday", subject: "Art", teacher: "Ms. Reddy", startTime: "10:15", endTime: "11:15", room: "STUDIO" },
  { day: "Friday", subject: "Music", teacher: "Mr. Nair", startTime: "11:30", endTime: "12:30", room: "MUSIC" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function StudentTimetablePage() {
  const todayTimetable = mockTimetable.filter(slot => slot.day === "Monday"); // Default to Monday

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Timetable</h1>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTimetable.map((slot, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{slot.day}</TableCell>
                  <TableCell>{slot.subject}</TableCell>
                  <TableCell>{slot.teacher}</TableCell>
                  <TableCell>{slot.startTime} - {slot.endTime}</TableCell>
                  <TableCell className="font-semibold">{slot.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map(day => {
          const daySchedule = mockTimetable.filter(slot => slot.day === day);
          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {daySchedule.map((slot, idx) => (
                    <div key={idx} className="flex justify-between items-start border-b pb-3">
                      <div>
                        <p className="font-semibold">{slot.subject}</p>
                        <p className="text-sm text-gray-600">{slot.teacher}</p>
                        <p className="text-xs text-gray-500">{slot.startTime} - {slot.endTime} | Room {slot.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
