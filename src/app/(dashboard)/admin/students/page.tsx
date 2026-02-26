"use client";

import { useState } from "react";
import {
    Users,
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    X
} from "lucide-react";
import { toast } from "sonner";

type Student = {
    id: string;
    name: string;
    roll: string;
    class: string;
    parent: string;
    phone: string;
    email: string;
    dob: string;
    address: string;
    status: string;
};

const initialStudents: Student[] = [
    { id: "STU001", name: "Rahul Kumar", roll: "1001", class: "10-A", parent: "Ramesh Kumar", phone: "+91 9876543210", email: "rahul@school.edu", dob: "2008-05-15", address: "123 Main St, Delhi", status: "Active" },
    { id: "STU002", name: "Priya Singh", roll: "1002", class: "10-A", parent: "Rajesh Singh", phone: "+91 9876543211", email: "priya@school.edu", dob: "2008-08-22", address: "456 Park Ave, Delhi", status: "Active" },
    { id: "STU003", name: "Amit Sharma", roll: "9024", class: "9-B", parent: "Suresh Sharma", phone: "+91 9876543212", email: "amit@school.edu", dob: "2009-01-10", address: "789 Lake Rd, Delhi", status: "Inactive" },
    { id: "STU004", name: "Neha Patel", roll: "9025", class: "9-B", parent: "Dinesh Patel", phone: "+91 9876543213", email: "neha@school.edu", dob: "2009-03-18", address: "321 Hill St, Delhi", status: "Active" },
    { id: "STU005", name: "Rohan Gupta", roll: "1205", class: "12-Science", parent: "Manoj Gupta", phone: "+91 9876543214", email: "rohan@school.edu", dob: "2006-11-25", address: "654 River Rd, Delhi", status: "Active" },
    { id: "STU006", name: "Sneha Verma", roll: "1206", class: "12-Science", parent: "Vinod Verma", phone: "+91 9876543215", email: "sneha@school.edu", dob: "2006-07-30", address: "987 Oak Lane, Delhi", status: "Active" },
    { id: "STU007", name: "Karan Johar", roll: "8012", class: "8-A", parent: "Yash Johar", phone: "+91 9876543216", email: "karan@school.edu", dob: "2010-02-14", address: "147 Pine St, Delhi", status: "Active" },
    { id: "STU008", name: "Pooja Hegde", roll: "8013", class: "8-A", parent: "Manjunath Hegde", phone: "+91 9876543217", email: "pooja@school.edu", dob: "2010-09-05", address: "258 Elm Ave, Delhi", status: "Active" },
    { id: "STU009", name: "Vikram Seth", roll: "1156", class: "11-Commerce", parent: "Prem Seth", phone: "+91 9876543218", email: "vikram@school.edu", dob: "2007-12-20", address: "369 Maple Dr, Delhi", status: "Inactive" },
    { id: "STU010", name: "Ananya Pandey", roll: "1157", class: "11-Commerce", parent: "Chunky Pandey", phone: "+91 9876543219", email: "ananya@school.edu", dob: "2007-04-08", address: "741 Cedar Blvd, Delhi", status: "Active" },
];

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewStudent, setViewStudent] = useState<Student | null>(null);
    const [editStudent, setEditStudent] = useState<Student | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "", email: "", roll: "", dob: "", class: "", section: "",
        parentName: "", phone: "", address: ""
    });

    const resetForm = () => {
        setFormData({ name: "", email: "", roll: "", dob: "", class: "", section: "", parentName: "", phone: "", address: "" });
        setEditStudent(null);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll.includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editStudent) {
            setStudents(prev => prev.map(s => s.id === editStudent.id ? {
                ...s, name: formData.name, email: formData.email, roll: formData.roll,
                dob: formData.dob, class: formData.class ? `${formData.class}-${formData.section || "A"}` : s.class,
                parent: formData.parentName, phone: formData.phone, address: formData.address,
            } : s));
            toast.success(`Student "${formData.name}" updated successfully`);
        } else {
            const newStudent: Student = {
                id: `STU${String(students.length + 1).padStart(3, "0")}`,
                name: formData.name, roll: formData.roll,
                class: `${formData.class}-${formData.section || "A"}`,
                parent: formData.parentName, phone: formData.phone, email: formData.email,
                dob: formData.dob, address: formData.address, status: "Active",
            };
            setStudents(prev => [...prev, newStudent]);
            toast.success(`Student "${formData.name}" added successfully`);
        }
        resetForm();
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        const student = students.find(s => s.id === id);
        setStudents(prev => prev.filter(s => s.id !== id));
        setDeleteConfirm(null);
        toast.success(`Student "${student?.name}" deleted`);
    };

    const openEdit = (student: Student) => {
        const parts = student.class.split("-");
        setFormData({
            name: student.name, email: student.email, roll: student.roll, dob: student.dob,
            class: parts[0] || "", section: parts[1] || "",
            parentName: student.parent, phone: student.phone, address: student.address,
        });
        setEditStudent(student);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Users className="h-6 w-6 text-blue-600" />
                        Students Directory
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage student records and information</p>
                </div>
                <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Student
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Search by name, roll no, or class..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
                </div>
                <div className="text-sm text-slate-500 font-medium">{filteredStudents.length} of {students.length} students</div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 uppercase font-medium border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Roll No</th>
                                <th className="px-6 py-4">Class</th>
                                <th className="px-6 py-4">Parent Details</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                                {student.name.charAt(0)}{student.name.split(" ")[1]?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800 dark:text-slate-200">{student.name}</div>
                                                <div className="text-xs text-slate-500">{student.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">{student.roll}</td>
                                    <td className="px-6 py-4"><span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs font-medium">{student.class}</span></td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-800 dark:text-slate-200">{student.parent}</div>
                                        <div className="text-xs text-slate-500">{student.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${student.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800" : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setViewStudent(student)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors" title="View"><Eye className="h-4 w-4" /></button>
                                            <button onClick={() => openEdit(student)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded transition-colors" title="Edit"><Edit className="h-4 w-4" /></button>
                                            <button onClick={() => setDeleteConfirm(student.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No students found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {viewStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Student Details</h2>
                            <button onClick={() => setViewStudent(null)} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xl">
                                    {viewStudent.name.charAt(0)}{viewStudent.name.split(" ")[1]?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{viewStudent.name}</h3>
                                    <p className="text-sm text-slate-500">{viewStudent.id} | Roll: {viewStudent.roll}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-slate-500 block">Class</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewStudent.class}</span></div>
                                <div><span className="text-slate-500 block">Status</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewStudent.status}</span></div>
                                <div><span className="text-slate-500 block">Date of Birth</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewStudent.dob || "N/A"}</span></div>
                                <div><span className="text-slate-500 block">Email</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewStudent.email || "N/A"}</span></div>
                                <div><span className="text-slate-500 block">Parent</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewStudent.parent}</span></div>
                                <div><span className="text-slate-500 block">Phone</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewStudent.phone}</span></div>
                                <div className="col-span-2"><span className="text-slate-500 block">Address</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewStudent.address || "N/A"}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
                        <div className="mx-auto h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4"><Trash2 className="h-6 w-6 text-red-600" /></div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Delete Student?</h3>
                        <p className="text-sm text-slate-500 mb-6">This will permanently remove &quot;{students.find(s => s.id === deleteConfirm)?.name}&quot;.</p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{editStudent ? "Edit Student" : "Add New Student"}</h2>
                            <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form id="student-form" onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Student Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                            <input type="text" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="e.g. Rahul Kumar" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                            <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="student@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Roll Number</label>
                                            <input type="text" required value={formData.roll} onChange={e => setFormData(p => ({ ...p, roll: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="e.g. 1001" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
                                            <input type="date" value={formData.dob} onChange={e => setFormData(p => ({ ...p, dob: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Class</label>
                                            <select required value={formData.class} onChange={e => setFormData(p => ({ ...p, class: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                                <option value="">Select Class</option>
                                                {["Nursery","LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"].map(c => <option key={c} value={c}>{isNaN(Number(c)) ? c : `Class ${c}`}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Section</label>
                                            <select value={formData.section} onChange={e => setFormData(p => ({ ...p, section: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                                <option value="">Select Section</option>
                                                <option value="A">Section A</option><option value="B">Section B</option><option value="C">Section C</option>
                                                <option value="Science">Science</option><option value="Commerce">Commerce</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Parent Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Parent Name</label>
                                            <input type="text" required value={formData.parentName} onChange={e => setFormData(p => ({ ...p, parentName: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="Full name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                                            <input type="tel" required value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="+91 xxxxxxxxxx" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
                                            <textarea rows={3} value={formData.address} onChange={e => setFormData(p => ({ ...p, address: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="Complete address"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">
                            <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                            <button type="submit" form="student-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">{editStudent ? "Update Student" : "Save Student"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
