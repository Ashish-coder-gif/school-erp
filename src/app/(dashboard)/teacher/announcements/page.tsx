"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    title: "Staff Meeting - Friday 3 PM",
    content: "All staff members are requested to attend the monthly staff meeting on Friday at 3 PM in the conference room. Please come prepared with any issues or suggestions.",
    date: "2026-02-25",
    category: "Staff",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "Exam Marking Deadline",
    content: "Please submit all exam papers with marks and grades by March 5th, 2026. This is essential for our record keeping and report card generation.",
    date: "2026-02-24",
    category: "Academic",
    priority: "HIGH",
  },
  {
    id: "3",
    title: "Annual Sports Day - Volunteer Needed",
    content: "We are organizing the annual sports day on March 15th. Teachers are requested to volunteer for various roles. Please sign up at the staff room.",
    date: "2026-02-23",
    category: "Events",
    priority: "MEDIUM",
  },
  {
    id: "4",
    title: "Professional Development Workshop",
    content: "A professional development workshop on modern teaching methodologies will be held on March 8th. Registration is open for all interested teachers.",
    date: "2026-02-20",
    category: "Training",
    priority: "MEDIUM",
  },
];

const getPriorityColor = (priority: string) => {
  if (priority === "HIGH") return "bg-red-100 text-red-800";
  if (priority === "MEDIUM") return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "Staff": "bg-blue-50 border-blue-200",
    "Academic": "bg-purple-50 border-purple-200",
    "Events": "bg-green-50 border-green-200",
    "Training": "bg-orange-50 border-orange-200",
  };
  return colors[category] || "bg-gray-50 border-gray-200";
};

export default function TeacherAnnouncementsPage() {
  const highPriorityCount = mockAnnouncements.filter(a => a.priority === "HIGH").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-gray-600 mt-1">School-wide announcements and important notices</p>
        </div>
        <Link href="/teacher/announcements-edit">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            Manage Your Notices <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {highPriorityCount > 0 && (
          <Badge className="bg-red-100 text-red-800">
            {highPriorityCount} Important
          </Badge>
        )}
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

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-bold mb-2">📢 Manage Your Announcements</h3>
          <p className="text-sm text-gray-600 mb-3">Create and edit announcements for your students, parents, or school-wide communication.</p>
          <Link href="/teacher/announcements-edit">
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              Go to Announcement Manager →
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
