"use client";

import { useState } from "react";
import { BookOpen, Search, Download, Plus, CheckCircle, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock Data
const initialExams = [
    { id: "EX001", name: "Mid Term Examination", class: "10-A", subject: "Mathematics", date: "2024-10-15", totalMarks: 100 },
    { id: "EX002", name: "Mid Term Examination", class: "10-A", subject: "Science", date: "2024-10-17", totalMarks: 100 },
    { id: "EX003", name: "Unit Test 2", class: "9-B", subject: "English", date: "2024-10-10", totalMarks: 50 },
    { id: "EX004", name: "Unit Test 2", class: "9-B", subject: "Hindi", date: "2024-10-12", totalMarks: 50 },
];

const studentsData = [
    { id: "STU001", name: "Rahul Kumar", roll: "1001" },
    { id: "STU002", name: "Priya Singh", roll: "1002" },
    { id: "STU003", name: "Amit Sharma", roll: "1003" },
    { id: "STU004", name: "Neha Patel", roll: "1004" },
    { id: "STU005", name: "Rohan Gupta", roll: "1005" },
];

const calculateGrade = (marksOut: number, total: number) => {
    const percentage = (marksOut / total) * 100;
    if (percentage >= 90) return { grade: "A+", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (percentage >= 80) return { grade: "A", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-700 bg-blue-50 border-blue-200" };
    if (percentage >= 60) return { grade: "C", color: "text-amber-700 bg-amber-50 border-amber-200" };
    if (percentage >= 45) return { grade: "D", color: "text-orange-700 bg-orange-50 border-orange-200" };
    return { grade: "F", color: "text-red-700 bg-red-50 border-red-200" };
};

export default function ExamsPage() {
    const [exams, setExams] = useState(initialExams);
    const [activeTab, setActiveTab] = useState("exams");
    const [selectedExamId, setSelectedExamId] = useState("EX001");
    const [showCreateExam, setShowCreateExam] = useState(false);
    const [examForm, setExamForm] = useState({ name: "", class: "", subject: "", date: "", totalMarks: "" });
    const [marks, setMarks] = useState<Record<string, string>>({
        "STU001": "85",
        "STU002": "92",
        "STU003": "42",
        "STU004": "78",
        "STU005": "65",
    });

    const selectedExam = exams.find(e => e.id === selectedExamId);

    const handleCreateExam = (e: React.FormEvent) => {
        e.preventDefault();
        const newExam = { id: `EX${String(exams.length + 1).padStart(3, "0")}`, name: examForm.name, class: examForm.class, subject: examForm.subject, date: examForm.date, totalMarks: parseInt(examForm.totalMarks) || 100 };
        setExams(prev => [...prev, newExam]);
        setExamForm({ name: "", class: "", subject: "", date: "", totalMarks: "" });
        setShowCreateExam(false);
        toast.success("Exam created successfully");
    };

    const handleMarkChange = (studentId: string, value: string) => {
        // Only allow numbers
        if (value && !/^\d*$/.test(value)) return;

        // Check if marks are valid based on total
        if (selectedExam && value) {
            const numValue = parseInt(value);
            if (numValue > selectedExam.totalMarks) return; // Don't allow higher than total
        }

        setMarks(prev => ({ ...prev, [studentId]: value }));
    };

    const handleSaveMarks = () => {
        toast.success("Marks saved successfully");
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                        Exams & Marks
                    </h1>
                    <p className="text-slate-500">Manage examinations, scores and report cards</p>
                </div>
                <div className="flex gap-3">
                    {activeTab === 'marks' && (
                        <button
                            onClick={handleSaveMarks}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                        >
                            <CheckCircle className="h-4 w-4" />
                            Save Marks
                        </button>
                    )}
                    <button onClick={() => { if (activeTab === 'exams') setShowCreateExam(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {activeTab === 'exams' ? 'Create Exam' : 'Add Subject'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('exams')}
                        className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'exams'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        Examination List
                    </button>
                    <button
                        onClick={() => setActiveTab('marks')}
                        className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'marks'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        Manage Marks
                    </button>
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'reports'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        Report Cards
                    </button>
                </nav>
            </div>

            {/* Tab Contents */}
            {activeTab === 'exams' && (
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h2 className="text-lg font-bold text-slate-800">Scheduled Exams</h2>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search exams..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Exam Details</th>
                                    <th className="px-6 py-4">Class</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Total Marks</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {exams.map((exam) => (
                                    <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-800">{exam.name}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{exam.subject}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded inline-block text-xs font-medium border border-slate-200">
                                                {exam.class}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{exam.date}</td>
                                        <td className="px-6 py-4 font-semibold text-slate-700">{exam.totalMarks}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => {
                                                    setSelectedExamId(exam.id);
                                                    setActiveTab('marks');
                                                }}
                                                className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-xs bg-blue-50 px-3 py-1.5 rounded"
                                            >
                                                Enter Marks
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'marks' && (
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-blue-50/50 relative">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-semibold text-slate-800 mb-2">Select Exam</label>
                            <Select value={selectedExamId} onValueChange={setSelectedExamId}>
                                <SelectTrigger className="w-full sm:w-96 bg-white text-slate-900 border-slate-300">
                                    <SelectValue placeholder="Choose an exam..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-slate-200 z-50">
                                    {exams.map(e => (
                                        <SelectItem key={e.id} value={e.id} className="text-slate-900 cursor-pointer">
                                            {e.name} - {e.subject} ({e.class})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedExam && (
                            <div className="flex gap-6 bg-white p-3 rounded-lg border border-slate-200 shadow-sm w-full sm:w-auto">
                                <div>
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wider font-semibold">Total Marks</p>
                                    <p className="text-xl font-bold text-slate-900">{selectedExam.totalMarks}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wider font-semibold">Class</p>
                                    <p className="text-xl font-bold text-slate-900">{selectedExam.class}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-700 bg-slate-50 uppercase font-medium border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 w-24 font-semibold text-slate-800">Roll No</th>
                                        <th className="px-6 py-4 w-64 font-semibold text-slate-800">Student Name</th>
                                        <th className="px-6 py-4 font-semibold text-slate-800">Marks Obtained</th>
                                        <th className="px-6 py-4 text-center w-32 font-semibold text-slate-800">Grade</th>
                                        <th className="px-6 py-4 font-semibold text-slate-800">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {studentsData.map((student) => {
                                        const markStr = marks[student.id] || "";
                                        const markNum = markStr ? parseInt(markStr) : 0;
                                        const gradeInfo = selectedExam && markStr ? calculateGrade(markNum, selectedExam.totalMarks) : { grade: "-", color: "text-slate-400" };

                                        return (
                                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-600">{student.roll}</td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">{student.name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={markStr}
                                                            onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                                            className="w-20 px-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-center font-semibold text-slate-800"
                                                            placeholder="0"
                                                        />
                                                        {selectedExam && (
                                                            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
                                                                / {selectedExam.totalMarks}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 rounded font-bold border ${gradeInfo.color}`}>
                                                        {gradeInfo.grade}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-1.5 border border-slate-200 rounded focus:border-blue-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm"
                                                        placeholder="Optional remark..."
                                                        defaultValue={markNum < 45 ? "Needs improvement" : (markNum > 85 ? "Excellent work" : "")}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Exam Modal */}
            {showCreateExam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800">Create New Exam</h2>
                            <button onClick={() => setShowCreateExam(false)} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 transition-colors"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleCreateExam} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Exam Name</label><input type="text" required value={examForm.name} onChange={e => setExamForm(p => ({...p, name: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Mid Term Examination" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Class</label><input type="text" required value={examForm.class} onChange={e => setExamForm(p => ({...p, class: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 10-A" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Subject</label><input type="text" required value={examForm.subject} onChange={e => setExamForm(p => ({...p, subject: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Mathematics" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Date</label><input type="date" required value={examForm.date} onChange={e => setExamForm(p => ({...p, date: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Total Marks</label><input type="number" required value={examForm.totalMarks} onChange={e => setExamForm(p => ({...p, totalMarks: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="100" /></div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowCreateExam(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">Create Exam</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'reports' && (
                <div className="bg-white p-12 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <AlertCircle className="h-16 w-16 text-slate-300 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700 mb-2">Report Card Generator</h2>
                    <p className="text-slate-500 max-w-md mb-6">
                        Select a class and term to generate PDF report cards for all students automatically.
                    </p>
                    <div className="flex gap-4">
                        <select className="px-4 py-2 border border-slate-300 rounded-lg outline-none bg-white font-medium text-slate-700">
                            <option>Final Term</option>
                            <option>Mid Term</option>
                        </select>
                        <select className="px-4 py-2 border border-slate-300 rounded-lg outline-none bg-white font-medium text-slate-700">
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
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Generate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
