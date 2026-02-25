"use client";

import {
    Users,
    CalendarCheck,
    BookOpen,
    Clock,
    CheckCircle,
    FileText
} from "lucide-react";

const todayClasses = [
    { time: "08:00 - 09:00", subject: "Mathematics", class: "10-A", room: "Room 101" },
    { time: "09:00 - 10:00", subject: "Mathematics", class: "10-B", room: "Room 102" },
    { time: "11:00 - 12:00", subject: "Advanced Math", class: "12-Sci", room: "Room 304" },
    { time: "13:00 - 14:00", subject: "Mathematics", class: "9-A", room: "Room 201" },
];

const upcomingExams = [
    { id: 1, name: "Mid Term - Math", class: "10-A", date: "Oct 15, 2024", time: "09:00 AM" },
    { id: 2, name: "Mid Term - Math", class: "10-B", date: "Oct 15, 2024", time: "11:00 AM" },
    { id: 3, name: "Unit Test 3", class: "9-A", date: "Oct 20, 2024", time: "09:00 AM" },
];

export default function TeacherDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Teacher Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Welcome back, Ashish Kumar. Here's your schedule for today.</p>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">My Classes</p>
                        <h3 className="text-2xl font-bold text-slate-800">4</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">My Students</p>
                        <h3 className="text-2xl font-bold text-slate-800">142</h3>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <BookOpen className="h-6 w-6 text-emerald-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Today's Attendance</p>
                        <h3 className="text-2xl font-bold text-slate-800">96%</h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <CalendarCheck className="h-6 w-6 text-purple-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Pending Marks</p>
                        <h3 className="text-2xl font-bold text-slate-800">2</h3>
                        <p className="text-xs text-amber-600 mt-2 font-medium">Require action</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                        <FileText className="h-6 w-6 text-amber-600" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Today's Timetable */}
                <div className="xl:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Today's Schedule</h3>
                            <p className="text-sm text-slate-500">Your periods for today</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-8">
                            {todayClasses.map((item, i) => (
                                <div key={i} className="relative pl-6">
                                    <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-white left-[-9px] top-1"></div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-base">{item.subject}</h4>
                                                <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
                                                    <span className="flex items-center gap-1.5 font-medium px-2.5 py-1 bg-white rounded-md border border-slate-200">
                                                        <Users className="h-3.5 w-3.5 text-blue-500" /> Class {item.class}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium px-2.5 py-1 bg-white rounded-md border border-slate-200">
                                                        Location: {item.room}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                                <Clock className="h-4 w-4" />
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Column */}
                <div className="space-y-6">
                    {/* Upcoming Exams */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">Upcoming Exams (Invigilation)</h3>
                        </div>
                        <div className="p-0">
                            <ul className="divide-y divide-slate-100">
                                {upcomingExams.map((exam) => (
                                    <li key={exam.id} className="p-5 hover:bg-slate-50 transition-colors">
                                        <h4 className="font-semibold text-slate-800">{exam.name}</h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-slate-600 font-medium">Class: {exam.class}</span>
                                            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{exam.date} • {exam.time}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Pending Tasks */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden border-t-4 border-t-amber-500">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">Pending Actions</h3>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex gap-3 p-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
                                <div>
                                    <h4 className="font-semibold text-sm">Update Marks: Unit Test 2</h4>
                                    <p className="text-xs mt-1opacity-80">Class 10-A Mathematics marks missing</p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-sm">Submit Lesson Plan</h4>
                                    <p className="text-xs mt-1 opacity-80">Due next Monday for Class 9</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
