"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ChildTimetable {
  childName: string;
  class: string;
  schedule: TimetableSlot[];
}

interface TimetableSlot {
  day: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  room: string;
}

const mockChildrenTimetables: ChildTimetable[] = [
  {
    childName: "Arjun",
    class: "10-A",
    schedule: [
      { day: "Monday", subject: "Mathematics", teacher: "Mr. Sharma", startTime: "09:00", endTime: "10:00", room: "A101" },
      { day: "Monday", subject: "English", teacher: "Ms. Patel", startTime: "10:15", endTime: "11:15", room: "A102" },
      { day: "Monday", subject: "Science", teacher: "Dr. Gupta", startTime: "11:30", endTime: "12:30", room: "LAB1" },
      { day: "Tuesday", subject: "History", teacher: "Mr. Kumar", startTime: "09:00", endTime: "10:00", room: "A103" },
      { day: "Tuesday", subject: "Mathematics", teacher: "Mr. Sharma", startTime: "10:15", endTime: "11:15", room: "A101" },
    ],
  },
  {
    childName: "Priya",
    class: "8-B",
    schedule: [
      { day: "Monday", subject: "English", teacher: "Ms. Patel", startTime: "09:00", endTime: "10:00", room: "B101" },
      { day: "Monday", subject: "Science", teacher: "Dr. Gupta", startTime: "10:15", endTime: "11:15", room: "LAB1" },
      { day: "Tuesday", subject: "Mathematics", teacher: "Mr. Sharma", startTime: "09:00", endTime: "10:00", room: "B102" },
      { day: "Tuesday", subject: "History", teacher: "Mr. Kumar", startTime: "10:15", endTime: "11:15", room: "B103" },
    ],
  },
];

export default function ParentTimetablePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Children's Timetables</h1>

      {mockChildrenTimetables.map(child => (
        <Card key={child.childName}>
          <CardHeader>
            <h2 className="text-xl font-bold">{child.childName} - Class {child.class}</h2>
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
                {child.schedule.map((slot, idx) => (
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
      ))}
    </div>
  );
}
