"use client";

import { useState } from "react";
import { BookOpen, Search, Download, Plus, ChevronDown, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const examsData = [
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
    const [activeTab, setActiveTab] = useState("exams");
    const [selectedExamId, setSelectedExamId] = useState("EX001");
    const [marks, setMarks] = useState<Record<string, string>>({
        "STU001": "85",
        "STU002": "92",
        "STU003": "42",
        "STU004": "78",
        "STU005": "65",
    });

    const selectedExam = examsData.find(e => e.id === selectedExamId);

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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
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
                                {examsData.map((exam) => (
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
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center bg-blue-50/50">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Exam</label>
                            <div className="relative">
                                <select
                                    value={selectedExamId}
                                    onChange={(e) => setSelectedExamId(e.target.value)}
                                    className="w-full sm:w-80 pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white appearance-none font-medium"
                                >
                                    {examsData.map(e => (
                                        <option key={e.id} value={e.id}>{e.name} - {e.subject} ({e.class})</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {selectedExam && (
                            <div className="flex gap-6 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Marks</p>
                                    <p className="text-xl font-bold text-slate-800">{selectedExam.totalMarks}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Class</p>
                                    <p className="text-xl font-bold text-slate-800">{selectedExam.class}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 w-24">Roll No</th>
                                        <th className="px-6 py-4 w-64">Student Name</th>
                                        <th className="px-6 py-4">Marks Obtained</th>
                                        <th className="px-6 py-4 text-center w-32">Grade</th>
                                        <th className="px-6 py-4">Remarks</th>
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
