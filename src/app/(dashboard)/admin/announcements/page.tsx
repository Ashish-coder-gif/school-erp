"use client";

import { useState } from "react";
import { Bell, Plus, Users, GraduationCap, X } from "lucide-react";

// Mock Data
const announcementsData = [
    { id: 1, title: "Annual Sports Day 2024", content: "The annual sports day will be held on Oct 15th. All students must wear their respective house uniforms. Parents are cordially invited to attend.", target: "All", date: "Oct 5, 2024", author: "Principal" },
    { id: 2, title: "Mid-Term Examination Schedule", content: "The schedule for the first term examinations has been released. Exams will commence from Oct 25th. Download the timetable from the portal.", target: "Students", date: "Oct 8, 2024", author: "Exam Coordinator" },
    { id: 3, title: "Staff Meeting Notice", content: "A mandatory staff meeting is scheduled for this Friday at 3:00 PM in the main conference room to discuss the upcoming exam duties.", target: "Teachers", date: "Oct 10, 2024", author: "Admin" },
    { id: 4, title: "PTA Meeting for Class 10", content: "Parent-Teacher meeting for Class 10 students will be held on Oct 18th to discuss academic progress and board exam preparations.", target: "Parents", date: "Oct 12, 2024", author: "Class 10 Coordinator" },
];

export default function AnnouncementsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetFilter, setTargetFilter] = useState("All");

    const filteredAnnouncements = announcementsData.filter(
        (item) => targetFilter === "All" || item.target === targetFilter
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Bell className="h-6 w-6 text-amber-500" />
                        Notice Board
                    </h1>
                    <p className="text-slate-500">Create and manage school-wide announcements</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Announcement
                </button>
            </div>

            {/* Target Filter Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['All', 'Students', 'Teachers', 'Parents'].map(target => (
                    <button
                        key={target}
                        onClick={() => setTargetFilter(target)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${targetFilter === target
                                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                    >
                        {target === 'All' ? 'All Notices' : target}
                    </button>
                ))}
            </div>

            {/* Announcements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                        {/* Design detail: Left color bar based on target */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${announcement.target === 'All' ? 'bg-purple-500' :
                                announcement.target === 'Students' ? 'bg-emerald-500' :
                                    announcement.target === 'Teachers' ? 'bg-blue-500' :
                                        'bg-amber-500'
                            }`}></div>

                        <div className="flex justify-between items-start mb-3">
                            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${announcement.target === 'All' ? 'bg-purple-100 text-purple-700' :
                                    announcement.target === 'Students' ? 'bg-emerald-100 text-emerald-700' :
                                        announcement.target === 'Teachers' ? 'bg-blue-100 text-blue-700' :
                                            'bg-amber-100 text-amber-700'
                                }`}>
                                {announcement.target}
                            </span>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                                {announcement.date}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{announcement.title}</h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                            {announcement.content}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
                                    <span className="text-[10px] text-slate-600 font-bold">{announcement.author.charAt(0)}</span>
                                </div>
                                <span>By {announcement.author}</span>
                            </div>
                            <button className="text-amber-600 hover:text-amber-800 font-medium text-xs">Read Full</button>
                        </div>
                    </div>
                ))}
                {filteredAnnouncements.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-100 border-dashed">
                        No announcements found for "{targetFilter}".
                    </div>
                )}
            </div>

            {/* Add Announcement Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                Create Announcement
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Notice Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm"
                                    placeholder="E.g., Holiday on Monday"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 [&:has(:checked)]:border-amber-500 [&:has(:checked)]:bg-amber-50">
                                        <input type="radio" name="target" defaultChecked className="text-amber-500 focus:ring-amber-500" />
                                        <span className="text-sm font-medium text-slate-700">All (School-wide)</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 [&:has(:checked)]:border-amber-500 [&:has(:checked)]:bg-amber-50">
                                        <input type="radio" name="target" className="text-emerald-500 focus:ring-emerald-500" />
                                        <span className="text-sm font-medium text-slate-700">Students</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 [&:has(:checked)]:border-amber-500 [&:has(:checked)]:bg-amber-50">
                                        <input type="radio" name="target" className="text-blue-500 focus:ring-blue-500" />
                                        <span className="text-sm font-medium text-slate-700">Teachers</span>
                                    </label>
                                    <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 [&:has(:checked)]:border-amber-500 [&:has(:checked)]:bg-amber-50">
                                        <input type="radio" name="target" className="text-purple-500 focus:ring-purple-500" />
                                        <span className="text-sm font-medium text-slate-700">Parents</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message Content</label>
                                <textarea
                                    rows={5}
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm resize-none"
                                    placeholder="Write the full announcement details here..."
                                ></textarea>
                            </div>
                        </form>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors shadow-sm"
                            >
                                Publish Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
