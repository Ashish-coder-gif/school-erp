"use client";

import {
    Users,
    GraduationCap,
    CreditCard,
    CalendarCheck,
    TrendingUp
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const attendanceData = [
    { name: 'Jan', value: 92 },
    { name: 'Feb', value: 95 },
    { name: 'Mar', value: 89 },
    { name: 'Apr', value: 94 },
    { name: 'May', value: 96 },
    { name: 'Jun', value: 85 },
    { name: 'Jul', value: 91 },
    { name: 'Aug', value: 93 },
    { name: 'Sep', value: 97 },
    { name: 'Oct', value: 94 },
    { name: 'Nov', value: 92 },
    { name: 'Dec', value: 88 },
];

const feeData = [
    { name: 'Jan', amount: 450000 },
    { name: 'Feb', amount: 380000 },
    { name: 'Mar', amount: 520000 },
    { name: 'Apr', amount: 410000 },
    { name: 'May', amount: 480000 },
    { name: 'Jun', amount: 350000 },
];

const recentStudents = [
    { id: 1, name: "Rahul Kumar", class: "10-A", roll: "1001", status: "Active" },
    { id: 2, name: "Priya Singh", class: "9-B", roll: "9024", status: "Active" },
    { id: 3, name: "Amit Sharma", class: "12-C", roll: "1205", status: "Inactive" },
    { id: 4, name: "Neha Patel", class: "8-A", roll: "8012", status: "Active" },
    { id: 5, name: "Rohan Gupta", class: "11-Science", roll: "1156", status: "Active" },
];

const recentAnnouncements = [
    { id: 1, title: "Annual Sports Day", date: "Oct 15, 2024", target: "All" },
    { id: 2, title: "PTA Meeting for Class 10", date: "Oct 18, 2024", target: "Parents" },
    { id: 3, title: "Mid-Term Exam Schedule", date: "Oct 25, 2024", target: "Students" },
    { id: 4, title: "Staff Meeting", date: "Oct 12, 2024", target: "Teachers" },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                    <p className="text-slate-500">Overview of your school's performance</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Generate Report
                </button>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Students</p>
                        <h3 className="text-2xl font-bold text-slate-800">1,248</h3>
                        <p className="text-xs text-green-600 mt-2 flex items-center font-medium">
                            <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
                        </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Teachers</p>
                        <h3 className="text-2xl font-bold text-slate-800">86</h3>
                        <p className="text-xs text-green-600 mt-2 flex items-center font-medium">
                            <TrendingUp className="h-3 w-3 mr-1" /> +3 new
                        </p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-emerald-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Fee Collected</p>
                        <h3 className="text-2xl font-bold text-slate-800">₹4,82,000</h3>
                        <p className="text-xs text-slate-500 mt-2 flex items-center font-medium">
                            78% collected
                        </p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                        <CreditCard className="h-6 w-6 text-amber-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Attendance Today</p>
                        <h3 className="text-2xl font-bold text-slate-800">94.2%</h3>
                        <p className="text-xs text-slate-500 mt-2 flex items-center font-medium">
                            1,174 present
                        </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <CalendarCheck className="h-6 w-6 text-purple-600" />
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Monthly Attendance</h3>
                        <p className="text-sm text-slate-500">Average attendance percentage over time</p>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[80, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                                    formatter={(value) => [`${value}%`, 'Attendance']}
                                />
                                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-800">Fee Collection</h3>
                        <p className="text-sm text-slate-500">Monthly totals in ₹</p>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={feeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                                    cursor={{ fill: '#f1f5f9' }}
                                    formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Amount']}
                                />
                                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Recent Students</h3>
                            <p className="text-sm text-slate-500">Latest enrollments</p>
                        </div>
                        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Class</th>
                                    <th className="px-6 py-3">Roll No</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{student.class}</td>
                                        <td className="px-6 py-4 text-slate-600">{student.roll}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${student.status === 'Active'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Recent Announcements</h3>
                            <p className="text-sm text-slate-500">Important notices</p>
                        </div>
                        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-start">
                        <div className="space-y-4">
                            {recentAnnouncements.map((announcement) => (
                                <div key={announcement.id} className="flex gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-semibold text-slate-800 text-sm">{announcement.title}</h4>
                                            <span className="text-xs text-slate-400">{announcement.date}</span>
                                        </div>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium tracking-wide ${announcement.target === 'All' ? 'bg-purple-100 text-purple-700' :
                                                announcement.target === 'Parents' ? 'bg-amber-100 text-amber-700' :
                                                    announcement.target === 'Teachers' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {announcement.target.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
