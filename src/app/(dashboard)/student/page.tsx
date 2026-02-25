"use client";

import { useState } from "react";
import {
    BookOpen,
    CalendarCheck,
    CreditCard,
    Library,
    Award,
    Bell
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const attendanceData = [
    { month: 'Jul', percent: 98 },
    { month: 'Aug', percent: 95 },
    { month: 'Sep', percent: 100 },
    { month: 'Oct', percent: 92 },
];

const recentMarks = [
    { id: 1, subject: "Mathematics", exam: "Unit Test 2", marks: "45/50", grade: "A+" },
    { id: 2, subject: "Science", exam: "Unit Test 2", marks: "42/50", grade: "A" },
    { id: 3, subject: "English", exam: "Unit Test 2", marks: "38/50", grade: "B+" },
    { id: 4, subject: "History", exam: "Unit Test 2", marks: "47/50", grade: "A+" },
];

export default function StudentDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Student Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400">Welcome back, Ashish Kumar (Class 10-A)</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
                    <Award className="h-4 w-4" /> Academic Year 2024-25
                </span>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Attendance</p>
                        <h3 className="text-2xl font-bold text-slate-800">96.5%</h3>
                        <p className="text-xs text-emerald-600 mt-2 font-medium">Above required 75%</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <CalendarCheck className="h-6 w-6 text-emerald-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Upcoming Exams</p>
                        <h3 className="text-2xl font-bold text-slate-800">2</h3>
                        <p className="text-xs text-slate-500 mt-2 font-medium">Next: Mid Term</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Fee Status</p>
                        <h3 className="text-lg font-bold text-amber-600">Pending</h3>
                        <p className="text-xs text-slate-500 mt-2 font-medium">Due in 5 days</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                        <CreditCard className="h-6 w-6 text-amber-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Library Books</p>
                        <h3 className="text-2xl font-bold text-slate-800">1</h3>
                        <p className="text-xs text-slate-500 mt-2 font-medium">Due: Oct 15</p>
                    </div>
                    <div className="p-3 bg-fuchsia-50 rounded-lg">
                        <Library className="h-6 w-6 text-fuchsia-600" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Attendance Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col h-[350px]">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-800">My Attendance Trend</h3>
                    </div>
                    <div className="flex-1 w-full pl-0 pb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={attendanceData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`${value}%`, 'Attendance']}
                                />
                                <Area type="monotone" dataKey="percent" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPercent)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Grades */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[350px]">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800">Recent Results</h3>
                    </div>
                    <div className="overflow-auto flex-1 p-2">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium">
                                <tr>
                                    <th className="px-4 py-3">Subject</th>
                                    <th className="px-4 py-3">Exam</th>
                                    <th className="px-4 py-3 text-center">Marks</th>
                                    <th className="px-4 py-3 text-center">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentMarks.map((mark) => (
                                    <tr key={mark.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 font-semibold text-slate-800">{mark.subject}</td>
                                        <td className="px-4 py-3 text-slate-600">{mark.exam}</td>
                                        <td className="px-4 py-3 text-center font-medium">{mark.marks}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded border border-emerald-200 text-xs">
                                                {mark.grade}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Announcements Feed */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Bell className="h-5 w-5 text-amber-500" />
                            School Announcements
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                            <div className="bg-amber-100 text-amber-700 p-2.5 rounded-lg h-fit">
                                <Bell className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-slate-800">Mid-Term Examination Schedule</h4>
                                    <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Oct 8, 2024</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">The schedule for the first term examinations has been released. Exams will commence from Oct 25th.</p>
                                <button className="text-blue-600 hover:text-blue-800 font-medium text-xs mt-3 bg-blue-50 px-3 py-1.5 rounded transition-colors">Download Timetable</button>
                            </div>
                        </div>

                        <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                            <div className="bg-purple-100 text-purple-700 p-2.5 rounded-lg h-fit">
                                <Bell className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-slate-800">Annual Sports Day 2024</h4>
                                    <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Oct 5, 2024</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">The annual sports day will be held on Oct 15th. All students must wear their respective house uniforms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
