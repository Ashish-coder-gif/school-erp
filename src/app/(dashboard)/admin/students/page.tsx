"use client";

import { useState } from "react";
import {
    Users,
    Search,
    Plus,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    ChevronDown,
    X
} from "lucide-react";
import { toast } from "sonner";

// Mock Data
const studentsData = [
    { id: "STU001", name: "Rahul Kumar", roll: "1001", class: "10-A", parent: "Ramesh Kumar", phone: "+91 9876543210", status: "Active" },
    { id: "STU002", name: "Priya Singh", roll: "1002", class: "10-A", parent: "Rajesh Singh", phone: "+91 9876543211", status: "Active" },
    { id: "STU003", name: "Amit Sharma", roll: "9024", class: "9-B", parent: "Suresh Sharma", phone: "+91 9876543212", status: "Inactive" },
    { id: "STU004", name: "Neha Patel", roll: "9025", class: "9-B", parent: "Dinesh Patel", phone: "+91 9876543213", status: "Active" },
    { id: "STU005", name: "Rohan Gupta", roll: "1205", class: "12-Science", parent: "Manoj Gupta", phone: "+91 9876543214", status: "Active" },
    { id: "STU006", name: "Sneha Verma", roll: "1206", class: "12-Science", parent: "Vinod Verma", phone: "+91 9876543215", status: "Active" },
    { id: "STU007", name: "Karan Johar", roll: "8012", class: "8-A", parent: "Yash Johar", phone: "+91 9876543216", status: "Active" },
    { id: "STU008", name: "Pooja Hegde", roll: "8013", class: "8-A", parent: "Manjunath Hegde", phone: "+91 9876543217", status: "Active" },
    { id: "STU009", name: "Vikram Seth", roll: "1156", class: "11-Commerce", parent: "Prem Seth", phone: "+91 9876543218", status: "Inactive" },
    { id: "STU010", name: "Ananya Pandey", roll: "1157", class: "11-Commerce", parent: "Chunky Pandey", phone: "+91 9876543219", status: "Active" },
];

export default function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll.includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Student added successfully");
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Users className="h-6 w-6 text-blue-600" />
                        Students Directory
                    </h1>
                    <p className="text-slate-500">Manage student records and information</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Student
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, roll no, or class..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
                        <Filter className="h-4 w-4" />
                        Filter by Class
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 w-10">
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </th>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Roll No</th>
                                <th className="px-6 py-4">Class</th>
                                <th className="px-6 py-4">Parent Details</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                                {student.name.charAt(0)}{student.name.split(' ')[1]?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800">{student.name}</div>
                                                <div className="text-xs text-slate-500">{student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-600">{student.roll}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded inline-block text-xs font-medium">
                                            {student.class}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-800">{student.parent}</div>
                                        <div className="text-xs text-slate-500">{student.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${student.status === 'Active'
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : 'bg-slate-50 text-slate-700 border-slate-200'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View details">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                    <div>Showing 1 to {filteredStudents.length} of {studentsData.length} entries</div>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded transition-colors">1</button>
                        <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors">2</button>
                        <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Add Student Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800">Add New Student</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="add-student-form" onSubmit={handleAddStudent} className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Student Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                            <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="e.g. Rahul Kumar" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                            <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="student@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Roll Number</label>
                                            <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="e.g. 1001" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                                            <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
                                            <select required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm bg-white">
                                                <option value="">Select Class</option>
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
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                                            <select required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm bg-white">
                                                <option value="">Select Section</option>
                                                <option value="A">Section A</option>
                                                <option value="B">Section B</option>
                                                <option value="C">Section C</option>
                                                <option value="Science">Science</option>
                                                <option value="Commerce">Commerce</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-6">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Parent Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Parent's Name</label>
                                            <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="Full name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                            <input type="tel" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="+91 xxxxxxxxxx" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Home Address</label>
                                            <textarea rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm resize-none" placeholder="Complete address"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="add-student-form"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Save Student
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
