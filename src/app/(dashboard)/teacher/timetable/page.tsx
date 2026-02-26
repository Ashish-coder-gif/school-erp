"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TimetableSlot {
  day: string;
  class: string;
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
}

const mockTimetable: TimetableSlot[] = [
  { day: "Monday", class: "10-A", subject: "Mathematics", startTime: "09:00", endTime: "10:00", room: "A101" },
  { day: "Monday", class: "9-B", subject: "Mathematics", startTime: "10:15", endTime: "11:15", room: "B102" },
  { day: "Monday", class: "8-C", subject: "Mathematics", startTime: "11:30", endTime: "12:30", room: "C103" },
  { day: "Tuesday", class: "10-A", subject: "Mathematics", startTime: "10:15", endTime: "11:15", room: "A101" },
  { day: "Tuesday", class: "9-A", subject: "Mathematics", startTime: "09:00", endTime: "10:00", room: "A105" },
  { day: "Tuesday", class: "11-A", subject: "Mathematics", startTime: "11:30", endTime: "12:30", room: "LAB2" },
  { day: "Wednesday", class: "10-B", subject: "Mathematics", startTime: "09:00", endTime: "10:00", room: "B101" },
  { day: "Wednesday", class: "9-C", subject: "Mathematics", startTime: "10:15", endTime: "11:15", room: "C102" },
  { day: "Wednesday", class: "8-A", subject: "Mathematics", startTime: "11:30", endTime: "12:30", room: "A104" },
  { day: "Thursday", class: "10-A", subject: "Mathematics", startTime: "11:30", endTime: "12:30", room: "A101" },
  { day: "Thursday", class: "9-B", subject: "Mathematics", startTime: "09:00", endTime: "10:00", room: "B103" },
  { day: "Friday", class: "10-C", subject: "Mathematics", startTime: "10:15", endTime: "11:15", room: "C101" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const classes = Array.from(new Set(mockTimetable.map(s => s.class)));

export default function TeacherTimetablePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Timetable (Mr. Sharma - Mathematics)</h1>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTimetable.map((slot, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{slot.day}</TableCell>
                  <TableCell>{slot.class}</TableCell>
                  <TableCell>{slot.subject}</TableCell>
                  <TableCell>{slot.startTime} - {slot.endTime}</TableCell>
                  <TableCell className="font-semibold">{slot.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {days.map(day => {
          const daySchedule = mockTimetable.filter(slot => slot.day === day);
          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {daySchedule.map((slot, idx) => (
                    <div key={idx} className="flex justify-between items-start border-l-4 border-blue-500 pl-4 py-2">
                      <div>
                        <p className="font-semibold">{slot.class}</p>
                        <p className="text-sm text-gray-600">{slot.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">{slot.startTime} - {slot.endTime} | Room {slot.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classes Taught</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {classes.map(cls => (
              <div key={cls} className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <p className="font-semibold">Class {cls}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
