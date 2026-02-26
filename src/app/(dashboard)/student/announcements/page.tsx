"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Exam Schedule Released",
    content: "The final exam schedule has been released. Please check the notice board and your student portal for details. Exams will start from March 1st.",
    date: "2026-02-25",
    category: "Academic",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "Sports Day Announcement",
    content: "The annual sports day will be held on March 15th. All students are encouraged to participate in various events. Registration deadline is March 5th.",
    date: "2026-02-23",
    category: "Events",
    priority: "MEDIUM",
  },
  {
    id: "3",
    title: "Library Maintenance",
    content: "The library will be closed for maintenance from February 28th to March 2nd. Please complete your book renewals before the closure.",
    date: "2026-02-20",
    category: "Facility",
    priority: "MEDIUM",
  },
  {
    id: "4",
    title: "Fee Payment Reminder",
    content: "Please ensure all pending fees are paid by the due date. Late payment may result in fine charges. Contact the office for any clarifications.",
    date: "2026-02-18",
    category: "Finance",
    priority: "HIGH",
  },
  {
    id: "5",
    title: "New Course Available",
    content: "A new elective course on Digital Marketing is now available for students in grades 11-12. Limited seats available. Apply before March 10th.",
    date: "2026-02-15",
    category: "Academic",
    priority: "LOW",
  },
];

const getPriorityColor = (priority: string) => {
  if (priority === "HIGH") return "bg-red-100 text-red-800";
  if (priority === "MEDIUM") return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "Academic": "bg-blue-50 border-blue-200",
    "Events": "bg-purple-50 border-purple-200",
    "Facility": "bg-orange-50 border-orange-200",
    "Finance": "bg-red-50 border-red-200",
  };
  return colors[category] || "bg-gray-50 border-gray-200";
};

export default function StudentAnnouncementsPage() {
  const highPriorityCount = mockAnnouncements.filter(a => a.priority === "HIGH").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <Badge className="bg-red-100 text-red-800" variant="outline">
          {highPriorityCount} Important
        </Badge>
      </div>

      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={`border-l-4 ${getCategoryColor(announcement.category)}`}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">{announcement.title}</h2>
                  <p className="text-sm text-gray-600">
                    Posted on {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority} Priority
                  </Badge>
                  <Badge variant="outline">{announcement.category}</Badge>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
