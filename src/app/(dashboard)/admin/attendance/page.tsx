"use client";

import { useState } from "react";
import {
    CalendarCheck,
    Calendar as CalendarIcon,
    ChevronDown,
    Save,
    Check,
    X,
    Clock
} from "lucide-react";
import { toast } from "sonner";

// Mock Data
const attendanceData = [
    { id: "STU001", name: "Rahul Kumar", roll: "1001", status: "Present" },
    { id: "STU002", name: "Priya Singh", roll: "1002", status: "Present" },
    { id: "STU003", name: "Amit Sharma", roll: "1003", status: "Absent" },
    { id: "STU004", name: "Neha Patel", roll: "1004", status: "Present" },
    { id: "STU005", name: "Rohan Gupta", roll: "1005", status: "Late" },
    { id: "STU006", name: "Sneha Verma", roll: "1006", status: "Present" },
    { id: "STU007", name: "Karan Johar", roll: "1007", status: "Present" },
    { id: "STU008", name: "Pooja Hegde", roll: "1008", status: "Present" },
    { id: "STU009", name: "Vikram Seth", roll: "1009", status: "Present" },
    { id: "STU010", name: "Ananya Pandey", roll: "1010", status: "Absent" },
];

export default function AttendancePage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedClass, setSelectedClass] = useState("10-A");
    const [students, setStudents] = useState(attendanceData);

    const stats = {
        present: students.filter(s => s.status === 'Present').length,
        absent: students.filter(s => s.status === 'Absent').length,
        late: students.filter(s => s.status === 'Late').length,
        total: students.length
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
    };

    const markAll = (status: string) => {
        setStudents(students.map(s => ({ ...s, status })));
    };

    const handleSave = () => {
        toast.success(`Attendance saved for Class ${selectedClass} on ${date}`);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <CalendarCheck className="h-6 w-6 text-purple-600" />
                        Class Attendance
                    </h1>
                    <p className="text-slate-500">Record and manage daily student attendance</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center gap-2"
                >
                    <Save className="h-4 w-4" />
                    Save Attendance
                </button>
            </div>

            {/* Selectors and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-4 lg:col-span-1 border-t-4 border-t-purple-500">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                            <CalendarIcon className="h-4 w-4 text-slate-400" />
                            Select Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                            <span className="h-4 w-4 flex items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-500">C</span>
                            Select Class
                        </label>
                        <div className="relative">
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white appearance-none"
                            >
                                <option value="Nursery">Nursery</option>
                                <option value="LKG">LKG</option>
                                <option value="UKG">UKG</option>
                                <option value="1">Class 1</option>
                                <option value="2">Class 2</option>
                                <option value="3">Class 3</option>
                                <option value="4">Class 4</option>
                                <option value="5">Class 5</option>
                                <option value="6">Class 6</option>
                                <option value="7">Class 7</option>
                                <option value="8">Class 8</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                                <option value="11">Class 11</option>
                                <option value="12">Class 12</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 mt-2">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</h4>
                        <div className="flex gap-2">
                            <button onClick={() => markAll('Present')} className="flex-1 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded text-xs font-medium transition-colors">
                                Mark All Present
                            </button>
                            <button onClick={() => markAll('Absent')} className="flex-1 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded text-xs font-medium transition-colors">
                                Mark All Absent
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <span className="text-sm font-medium text-slate-500 mb-1">Total Class</span>
                        <span className="text-3xl font-bold text-slate-800">{stats.total}</span>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex flex-col justify-center items-center text-center">
                        <span className="text-sm font-medium text-emerald-700 mb-1">Present</span>
                        <span className="text-3xl font-bold text-emerald-700">{stats.present}</span>
                        <span className="text-xs font-medium text-emerald-600 mt-1">{Math.round((stats.present / stats.total) * 100)}%</span>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex flex-col justify-center items-center text-center">
                        <span className="text-sm font-medium text-amber-700 mb-1">Late</span>
                        <span className="text-3xl font-bold text-amber-700">{stats.late}</span>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col justify-center items-center text-center">
                        <span className="text-sm font-medium text-red-700 mb-1">Absent</span>
                        <span className="text-3xl font-bold text-red-700">{stats.absent}</span>
                    </div>
                </div>
            </div>

            {/* Attendance List */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Roll No</th>
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Mark Attendance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {students.map((student) => (
                                <tr key={student.id} className={`hover:bg-slate-50 transition-colors ${student.status === 'Absent' ? 'bg-red-50/50' : ''
                                    }`}>
                                    <td className="px-6 py-4 font-medium text-slate-600 w-24">{student.roll}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                                                {student.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-slate-800">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 w-32">
                                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border w-fit ${student.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            student.status === 'Late' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {student.status === 'Present' && <Check className="h-3 w-3" />}
                                            {student.status === 'Absent' && <X className="h-3 w-3" />}
                                            {student.status === 'Late' && <Clock className="h-3 w-3" />}
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleStatusChange(student.id, 'Present')}
                                                className={`flex-1 max-w-[100px] py-1.5 rounded border text-xs font-medium transition-colors ${student.status === 'Present'
                                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-500 hover:text-emerald-600'
                                                    }`}
                                            >
                                                Present
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(student.id, 'Late')}
                                                className={`flex-1 max-w-[100px] py-1.5 rounded border text-xs font-medium transition-colors ${student.status === 'Late'
                                                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-500 hover:text-amber-600'
                                                    }`}
                                            >
                                                Late
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(student.id, 'Absent')}
                                                className={`flex-1 max-w-[100px] py-1.5 rounded border text-xs font-medium transition-colors ${student.status === 'Absent'
                                                    ? 'bg-red-500 text-white border-red-500 shadow-sm'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-red-500 hover:text-red-600'
                                                    }`}
                                            >
                                                Absent
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
