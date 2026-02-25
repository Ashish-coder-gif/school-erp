"use client";

import { BarChart3, Download, Filter, FileText } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell
} from "recharts";

// Mock Data
const examPerformances = [
    { subject: 'Maths', Class10A: 85, Class10B: 78, Class10C: 82 },
    { subject: 'Science', Class10A: 79, Class10B: 88, Class10C: 75 },
    { subject: 'English', Class10A: 92, Class10B: 85, Class10C: 89 },
    { subject: 'History', Class10A: 76, Class10B: 82, Class10C: 90 },
];

const attendanceStats = [
    { name: 'Present', value: 1150 },
    { name: 'Absent', value: 65 },
    { name: 'Late', value: 33 },
];

const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-indigo-600" />
                        Analytics & Reports
                    </h1>
                    <p className="text-slate-500">Comprehensive overview of school activities</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
                        <Filter className="h-4 w-4 text-slate-400" />
                        <select className="bg-transparent outline-none cursor-pointer">
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Attendance Pie Chart Card */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Attendance Distribution</h3>
                            <p className="text-sm text-slate-500">Overall student attendance status</p>
                        </div>
                        <button className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded transition-colors" title="Download CSV">
                            <FileText className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex-1 relative pb-6 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={attendanceStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {attendanceStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${value} Students`, 'Count']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Academic Performance Bar Chart Card */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Academic Performance Average</h3>
                            <p className="text-sm text-slate-500">Average marks by class and subject</p>
                        </div>
                        <button className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded transition-colors" title="Download CSV">
                            <FileText className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex-1 w-full pb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={examPerformances} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="Class10A" name="Class 10-A" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Class10B" name="Class 10-B" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Class10C" name="Class 10-C" fill="#818cf8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
