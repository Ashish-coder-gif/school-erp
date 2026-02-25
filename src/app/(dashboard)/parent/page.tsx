"use client";

import { useState } from "react";
import {
    CreditCard,
    CalendarCheck,
    BookOpen,
    Bell,
    ChevronDown,
    Download
} from "lucide-react";

export default function ParentDashboardPage() {
    const [selectedChild, setSelectedChild] = useState("Rahul Kumar");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Parent Portal</h1>
                    <p className="text-slate-500">Welcome, Ashish Kumar (Parent)</p>
                </div>

                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 pl-2">Viewing Details For:</span>
                    <div className="relative">
                        <select
                            value={selectedChild}
                            onChange={(e) => setSelectedChild(e.target.value)}
                            className="pl-3 pr-8 py-1.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-slate-800 bg-slate-50 appearance-none min-w-[150px]"
                        >
                            <option value="Rahul Kumar">Rahul Kumar (10-A)</option>
                            <option value="Aarti Kumar">Aarti Kumar (7-C)</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Child Overview */}
                <div className="col-span-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left bg-gradient-to-r from-blue-50 to-white">
                    <div className="h-24 w-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-3xl flex-shrink-0 shadow-inner">
                        {selectedChild.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-800">{selectedChild}</h2>
                        <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 shadow-sm">
                                Class: {selectedChild.includes('Rahul') ? '10-A' : '7-C'}
                            </span>
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 shadow-sm">
                                Roll No: {selectedChild.includes('Rahul') ? '1001' : '7042'}
                            </span>
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 shadow-sm">
                                Blood Group: B+
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-3 font-medium flex items-center gap-1">
                            <CalendarCheck className="h-4 w-4 text-emerald-500" /> Current Term Attendance: <span className="text-emerald-600 font-bold ml-1">96.5%</span>
                        </p>
                    </div>
                </div>

                {/* Academic Updates */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-indigo-500" />
                                Recent Examination Results
                            </h3>
                            <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium">
                                    <tr>
                                        <th className="px-5 py-3">Subject</th>
                                        <th className="px-5 py-3">Exam Type</th>
                                        <th className="px-5 py-3 text-center">Marks</th>
                                        <th className="px-5 py-3 text-center">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-5 py-3 font-semibold text-slate-800">Mathematics</td>
                                        <td className="px-5 py-3 text-slate-600">Unit Test 2</td>
                                        <td className="px-5 py-3 text-center font-medium">45/50</td>
                                        <td className="px-5 py-3 text-center"><span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">A+</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-5 py-3 font-semibold text-slate-800">Science</td>
                                        <td className="px-5 py-3 text-slate-600">Unit Test 2</td>
                                        <td className="px-5 py-3 text-center font-medium">42/50</td>
                                        <td className="px-5 py-3 text-center"><span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">A</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-5 py-3 font-semibold text-slate-800">History</td>
                                        <td className="px-5 py-3 text-slate-600">Unit Test 2</td>
                                        <td className="px-5 py-3 text-center font-medium">35/50</td>
                                        <td className="px-5 py-3 text-center"><span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">B</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col">
                        <div className="p-5 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Bell className="h-5 w-5 text-amber-500" />
                                Latest Notices
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-slate-800">PTA Meeting for Class 10</h4>
                                    <span className="text-xs text-slate-500 whitespace-nowrap">2 Days ago</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">Parent-Teacher meeting for Class 10 students will be held on Oct 18th to discuss academic progress and board exam preparations.</p>
                            </div>
                            <div className="p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-slate-800">Annual Sports Day</h4>
                                    <span className="text-xs text-slate-500 whitespace-nowrap">Oct 5, 2024</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">The annual sports day will be held on Oct 15th. Parents are cordially invited to attend.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Fee Status Card */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden border-t-4 border-t-amber-500">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-amber-500" />
                                Fee Status
                            </h3>
                        </div>
                        <div className="p-5 space-y-4 text-center">
                            <div>
                                <p className="text-sm text-slate-500 font-medium mb-1">Upcoming Due</p>
                                <h2 className="text-3xl font-bold text-slate-800">₹45,000</h2>
                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 font-semibold text-sm rounded-full border border-amber-200">
                                    Due by: Oct 10, 2024
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 space-y-3">
                                <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-lg transition-colors shadow-sm">
                                    Pay Now
                                </button>
                                <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <Download className="h-4 w-4" /> Download Receipts
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <button className="w-full text-left px-4 py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium text-slate-700 rounded-lg transition-colors border border-slate-100">Leave Application</button>
                            </li>
                            <li>
                                <button className="w-full text-left px-4 py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium text-slate-700 rounded-lg transition-colors border border-slate-100">Transport Details</button>
                            </li>
                            <li>
                                <button className="w-full text-left px-4 py-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-sm font-medium text-slate-700 rounded-lg transition-colors border border-slate-100">Contact Teachers</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
