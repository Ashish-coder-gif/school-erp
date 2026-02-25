"use client";

import { useState } from "react";
import { Clock, Download, Plus, ChevronDown } from "lucide-react";

// Mock Data
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const slots = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
];

const classes = ["Nursery", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// Generate mock timetable
const generateTimetable = () => {
    const subjects = [
        { name: "Mathematics", teacher: "A. Kapoor", color: "bg-blue-50 text-blue-700 border-blue-200" },
        { name: "Science", teacher: "S. Williams", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        { name: "English", teacher: "R. Khanna", color: "bg-purple-50 text-purple-700 border-purple-200" },
        { name: "Hindi", teacher: "M. Kumari", color: "bg-amber-50 text-amber-700 border-amber-200" },
        { name: "History", teacher: "A. Bachchan", color: "bg-rose-50 text-rose-700 border-rose-200" },
        { name: "Geography", teacher: "R. Ganesan", color: "bg-orange-50 text-orange-700 border-orange-200" },
        { name: "Physical Ed", teacher: "S. Dutt", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
        { name: "Arts", teacher: "M. Dixit", color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200" },
    ];

    const timetable: Record<string, Record<string, typeof subjects[0] | null>> = {};

    days.forEach(day => {
        timetable[day] = {};
        let breakSlotAdded = false;

        slots.forEach((slot, index) => {
            // 12:00 to 13:00 is implicitly break time based on slots gap
            // But let's add some empty slots randomly for realism
            if (Math.random() > 0.8 && !breakSlotAdded) {
                timetable[day][slot] = null;
                breakSlotAdded = true;
            } else {
                const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
                timetable[day][slot] = randomSubject;
            }
        });
    });

    return timetable;
};

export default function TimetablePage() {
    const [selectedClass, setSelectedClass] = useState("10");
    const [timetableData, setTimetableData] = useState(() => generateTimetable());

    // Handle class change (generates new mock data for demonstration)
    const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClass(e.target.value);
        setTimetableData(generateTimetable());
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Clock className="h-6 w-6 text-blue-600" />
                        Class Timetable
                    </h1>
                    <p className="text-slate-500">Manage daily class schedules</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Setup
                    </button>
                </div>
            </div>

            {/* Class Selector */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                    Viewing Timetable For:
                </label>
                <div className="relative w-48">
                    <select
                        value={selectedClass}
                        onChange={handleClassChange}
                        className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50 appearance-none font-medium text-slate-800"
                    >
                        {classes.map(c => (
                            <option key={c} value={c}>Class {c}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Timetable Grid */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr>
                            <th className="p-4 border border-slate-100 bg-slate-50 font-medium text-slate-500 w-28 text-center sticky left-0 z-10">
                                Time / Day
                            </th>
                            {slots.map(slot => {
                                const [start, end] = slot.split(' - ');
                                return (
                                    <th key={slot} className="p-4 border border-slate-100 bg-slate-50 font-medium text-slate-600 text-center uppercase tracking-wider text-xs">
                                        <div className="flex flex-col items-center">
                                            <span>{start}</span>
                                            <span className="text-slate-400 mx-1">to</span>
                                            <span>{end}</span>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {days.map(day => (
                            <tr key={day}>
                                <td className="p-4 border border-slate-100 bg-slate-50 font-semibold text-slate-700 sticky left-0 z-10 text-center">
                                    {day}
                                </td>
                                {slots.map((slot, idx) => {
                                    const subject = timetableData[day][slot];

                                    // Break slot between 4th and 5th slot
                                    if (idx === 4 && subject) {
                                        return (
                                            <td key={`${day}-${slot}`} className="p-2 border border-slate-100 align-top">
                                                <div className={`h-full min-h-[80px] rounded-lg border flex flex-col items-center justify-center p-2 text-center transition-transform hover:scale-[1.02] cursor-pointer ${subject.color}`}>
                                                    <span className="font-bold block text-sm">{subject.name}</span>
                                                    <span className="text-xs opacity-90 mt-1">{subject.teacher}</span>
                                                </div>
                                            </td>
                                        );
                                    }

                                    if (!subject) {
                                        return (
                                            <td key={`${day}-${slot}`} className="p-2 border border-slate-100 bg-slate-50/50 align-top">
                                                <div className="h-full min-h-[80px] rounded border border-dashed border-slate-200 flex items-center justify-center">
                                                    <span className="text-xs text-slate-400 font-medium tracking-wide">FREE PERIOD</span>
                                                </div>
                                            </td>
                                        );
                                    }

                                    return (
                                        <td key={`${day}-${slot}`} className="p-2 border border-slate-100 align-top">
                                            <div className={`h-full min-h-[80px] rounded-lg border flex flex-col items-center justify-center p-2 text-center transition-transform hover:scale-[1.02] cursor-pointer ${subject.color}`}>
                                                <span className="font-bold block text-sm">{subject.name}</span>
                                                <span className="text-xs opacity-90 mt-1 block w-full truncate">{subject.teacher}</span>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
