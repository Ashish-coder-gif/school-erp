"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  target: "ALL" | "STUDENTS" | "PARENTS";
  author: string;
  status: "DRAFT" | "PUBLISHED";
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Mid-Term Exam Schedule Released",
    content: "The mid-term examination schedule has been released. Please check the portal for the complete timetable. Exams will start from March 1st, 2026.",
    date: "2026-02-25",
    target: "STUDENTS",
    author: "Mr. Sharma",
    status: "PUBLISHED",
  },
  {
    id: "2",
    title: "Assignment Submission Reminder",
    content: "All students must submit their Mathematics assignments by February 28th. Late submissions will not be accepted. Submit through the official portal.",
    date: "2026-02-24",
    target: "STUDENTS",
    author: "Mr. Sharma",
    status: "PUBLISHED",
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting Notice",
    content: "A parent-teacher meeting is scheduled for March 10th. Parents are requested to check the portal for appointment slots. Meeting will discuss academic progress and overall development.",
    date: "2026-02-20",
    target: "PARENTS",
    author: "Mr. Sharma",
    status: "PUBLISHED",
  },
];

export default function TeacherAnnouncementsEditPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", target: "STUDENTS" as "STUDENTS" | "PARENTS" | "ALL" });

  const handleOpenModal = (id?: string) => {
    if (id) {
      const announcement = announcements.find(a => a.id === id);
      if (announcement) {
        setFormData({ title: announcement.title, content: announcement.content, target: announcement.target });
        setEditingId(id);
      }
    } else {
      setFormData({ title: "", content: "", target: "STUDENTS" });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    if (editingId) {
      // Update existing
      setAnnouncements(prev => prev.map(a => 
        a.id === editingId 
          ? { ...a, title: formData.title, content: formData.content, target: formData.target as any }
          : a
      ));
      toast.success("Announcement updated successfully");
    } else {
      // Create new
      const newAnnouncement: Announcement = {
        id: String(announcements.length + 1),
        title: formData.title,
        content: formData.content,
        target: formData.target as any,
        date: new Date().toISOString().split('T')[0],
        author: "Mr. Sharma",
        status: "PUBLISHED",
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      toast.success("Announcement created successfully");
    }

    setShowModal(false);
    setFormData({ title: "", content: "", target: "STUDENTS" });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      toast.success("Announcement deleted successfully");
    }
  };

  const getTargetColor = (target: string) => {
    switch (target) {
      case "STUDENTS": return "bg-blue-100 text-blue-800";
      case "PARENTS": return "bg-amber-100 text-amber-800";
      case "ALL": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Announcements</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage your class announcements</p>
        </div>
        <Button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{announcement.title}</h3>
                    <Badge className={getTargetColor(announcement.target)}>
                      {announcement.target}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">{announcement.content}</p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(announcement.date).toLocaleDateString()} by {announcement.author}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(announcement.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex flex-row justify-between items-center border-b">
              <CardTitle>{editingId ? "Edit Announcement" : "Create New Announcement"}</CardTitle>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter announcement title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Audience</label>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="STUDENTS">Students</option>
                    <option value="PARENTS">Parents</option>
                    <option value="ALL">All</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter announcement details"
                    rows={6}
                    required
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingId ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
