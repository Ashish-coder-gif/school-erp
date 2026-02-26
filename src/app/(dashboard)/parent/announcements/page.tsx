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
    title: "Parent-Teacher Meeting Scheduled",
    content: "We invite all parents to attend the parent-teacher meeting on March 10th, 2026. This is an opportunity to discuss your child's progress and address any concerns.",
    date: "2026-02-25",
    category: "School",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "Annual Sports Day",
    content: "The annual sports day will be held on March 15th. All students are participating. You are invited to attend and cheer for our students!",
    date: "2026-02-23",
    category: "Events",
    priority: "MEDIUM",
  },
  {
    id: "3",
    title: "Fee Payment Deadline Extended",
    content: "The fee payment deadline has been extended to March 15th. Please clear all pending dues by the new deadline.",
    date: "2026-02-20",
    category: "Finance",
    priority: "HIGH",
  },
  {
    id: "4",
    title: "School Picnic",
    content: "An educational picnic is planned for grade 8 on March 20th. Consent forms are available at the reception. Submission deadline: March 12th.",
    date: "2026-02-18",
    category: "Events",
    priority: "MEDIUM",
  },
  {
    id: "5",
    title: "Mid-term Results Released",
    content: "Mid-term exam results have been released. Parents can view their child's performance on the student portal or contact the class teacher.",
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
    "School": "bg-blue-50 border-blue-200",
    "Events": "bg-purple-50 border-purple-200",
    "Finance": "bg-red-50 border-red-200",
    "Academic": "bg-green-50 border-green-200",
  };
  return colors[category] || "bg-gray-50 border-gray-200";
};

export default function ParentAnnouncementsPage() {
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
