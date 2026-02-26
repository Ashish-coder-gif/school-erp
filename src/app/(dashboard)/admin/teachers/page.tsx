"use client";

import { useState } from "react";
import {
    GraduationCap,
    Search,
    Plus,
    Filter,
    Edit,
    Trash2,
    Eye,
    ChevronDown,
    X
} from "lucide-react";
import { toast } from "sonner";

type Teacher = {
    id: string; name: string; employeeId: string; subject: string;
    phone: string; email: string; joiningDate: string; salary: string; status: string;
};

const initialTeachers: Teacher[] = [
    { id: "TCH001", name: "Anil Kapoor", employeeId: "EMP801", subject: "Mathematics", phone: "+91 9876543220", email: "anil@school.edu", joiningDate: "2018-05-12", salary: "55000", status: "Active" },
    { id: "TCH002", name: "Sunita Williams", employeeId: "EMP802", subject: "Science", phone: "+91 9876543221", email: "sunita@school.edu", joiningDate: "2019-06-15", salary: "52000", status: "Active" },
    { id: "TCH003", name: "Rajesh Khanna", employeeId: "EMP803", subject: "English", phone: "+91 9876543222", email: "rajesh@school.edu", joiningDate: "2017-04-10", salary: "58000", status: "Active" },
    { id: "TCH004", name: "Meena Kumari", employeeId: "EMP804", subject: "Hindi", phone: "+91 9876543223", email: "meena@school.edu", joiningDate: "2020-03-20", salary: "48000", status: "On Leave" },
    { id: "TCH005", name: "Sanjay Dutt", employeeId: "EMP805", subject: "Physical Ed", phone: "+91 9876543224", email: "sanjay@school.edu", joiningDate: "2015-08-05", salary: "45000", status: "Active" },
    { id: "TCH006", name: "Madhuri Dixit", employeeId: "EMP806", subject: "Arts", phone: "+91 9876543225", email: "madhuri@school.edu", joiningDate: "2021-02-14", salary: "46000", status: "Active" },
    { id: "TCH007", name: "Amitabh Bachchan", employeeId: "EMP807", subject: "History", phone: "+91 9876543226", email: "amitabh@school.edu", joiningDate: "2010-07-01", salary: "65000", status: "Active" },
    { id: "TCH008", name: "Rekha Ganesan", employeeId: "EMP808", subject: "Geography", phone: "+91 9876543227", email: "rekha@school.edu", joiningDate: "2016-11-30", salary: "50000", status: "Inactive" },
];

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
    const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", dob: "", employeeId: "", subject: "", joiningDate: "", salary: "" });

    const resetForm = () => { setFormData({ name: "", email: "", phone: "", dob: "", employeeId: "", subject: "", joiningDate: "", salary: "" }); setEditTeacher(null); };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employeeId.includes(searchTerm) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editTeacher) {
            setTeachers(prev => prev.map(t => t.id === editTeacher.id ? { ...t, name: formData.name, email: formData.email, phone: formData.phone, employeeId: formData.employeeId, subject: formData.subject, joiningDate: formData.joiningDate, salary: formData.salary } : t));
            toast.success(`Teacher "${formData.name}" updated successfully`);
        } else {
            const newTeacher: Teacher = { id: `TCH${String(teachers.length + 1).padStart(3, "0")}`, name: formData.name, employeeId: formData.employeeId, subject: formData.subject, phone: formData.phone, email: formData.email, joiningDate: formData.joiningDate, salary: formData.salary, status: "Active" };
            setTeachers(prev => [...prev, newTeacher]);
            toast.success(`Teacher "${formData.name}" added successfully`);
        }
        resetForm(); setIsModalOpen(false);
    };

    const handleDelete = (id: string) => { const t = teachers.find(t => t.id === id); setTeachers(prev => prev.filter(t => t.id !== id)); setDeleteConfirm(null); toast.success(`Teacher "${t?.name}" deleted`); };

    const openEdit = (teacher: Teacher) => {
        setFormData({ name: teacher.name, email: teacher.email, phone: teacher.phone, dob: "", employeeId: teacher.employeeId, subject: teacher.subject, joiningDate: teacher.joiningDate, salary: teacher.salary });
        setEditTeacher(teacher); setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                        Teachers Directory
                    </h1>
                    <p className="text-slate-500">Manage teaching staff records</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Teacher
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, employee ID, subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
                        <Filter className="h-4 w-4" />
                        Filter by Department
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
                                <th className="px-6 py-4">Teacher</th>
                                <th className="px-6 py-4">Employee ID</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Joining Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                                {teacher.name.charAt(0)}{teacher.name.split(' ')[1]?.charAt(0)}
                                            </div>
                                            <div className="font-medium text-slate-800">{teacher.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-600">{teacher.employeeId}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded inline-block text-xs font-medium">
                                            {teacher.subject}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{teacher.phone}</td>
                                    <td className="px-6 py-4 text-slate-600">{teacher.joiningDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${teacher.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                teacher.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    'bg-slate-50 text-slate-700 border-slate-200'
                                            }`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setViewTeacher(teacher)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="View details">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => openEdit(teacher)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => setDeleteConfirm(teacher.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {viewTeacher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Teacher Details</h2>
                            <button onClick={() => setViewTeacher(null)} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xl">{viewTeacher.name.charAt(0)}{viewTeacher.name.split(' ')[1]?.charAt(0)}</div>
                                <div><h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{viewTeacher.name}</h3><p className="text-sm text-slate-500">{viewTeacher.employeeId}</p></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-slate-500 block">Subject</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewTeacher.subject}</span></div>
                                <div><span className="text-slate-500 block">Status</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewTeacher.status}</span></div>
                                <div><span className="text-slate-500 block">Phone</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewTeacher.phone}</span></div>
                                <div><span className="text-slate-500 block">Email</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewTeacher.email}</span></div>
                                <div><span className="text-slate-500 block">Joining Date</span><span className="font-medium text-slate-800 dark:text-slate-200">{viewTeacher.joiningDate}</span></div>
                                <div><span className="text-slate-500 block">Salary</span><span className="font-medium text-slate-800 dark:text-slate-200">₹{Number(viewTeacher.salary).toLocaleString()}</span></div>
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
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Delete Teacher?</h3>
                        <p className="text-sm text-slate-500 mb-6">This will permanently remove &quot;{teachers.find(t => t.id === deleteConfirm)?.name}&quot;.</p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Teacher Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{editTeacher ? "Edit Teacher" : "Add New Teacher"}</h2>
                            <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form id="teacher-form" onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Personal Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label><input type="text" required value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="e.g. Anil Kapoor" /></div>
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label><input type="email" required value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="teacher@school.edu" /></div>
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label><input type="tel" required value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="+91 xxxxxxxxxx" /></div>
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label><input type="date" value={formData.dob} onChange={e => setFormData(p => ({...p, dob: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" /></div>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Employment Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Employee ID</label><input type="text" required value={formData.employeeId} onChange={e => setFormData(p => ({...p, employeeId: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="e.g. EMP123" /></div>
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                                            <select required value={formData.subject} onChange={e => setFormData(p => ({...p, subject: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                                <option value="">Select Subject</option><option value="Mathematics">Mathematics</option><option value="Science">Science</option><option value="English">English</option><option value="Hindi">Hindi</option><option value="History">History</option><option value="Geography">Geography</option><option value="Physical Ed">Physical Ed</option><option value="Arts">Arts</option>
                                            </select>
                                        </div>
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Joining Date</label><input type="date" required value={formData.joiningDate} onChange={e => setFormData(p => ({...p, joiningDate: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" /></div>
                                        <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Salary (₹)</label><input type="number" value={formData.salary} onChange={e => setFormData(p => ({...p, salary: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" placeholder="45000" /></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">
                            <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                            <button type="submit" form="teacher-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">{editTeacher ? "Update Teacher" : "Save Teacher"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
