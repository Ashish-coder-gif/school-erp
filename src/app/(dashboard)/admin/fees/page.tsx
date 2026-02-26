"use client";

import { useState } from "react";
import { CreditCard, Search, CheckCircle, AlertCircle, Clock, Filter, Receipt } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const feesData = [
    { id: "FEE001", student: "Rahul Kumar", class: "10-A", roll: "1001", type: "Tuition Fee", amount: 45000, dueDate: "2024-10-10", status: "Paid" },
    { id: "FEE002", student: "Priya Singh", class: "10-A", roll: "1002", type: "Transport Fee", amount: 15000, dueDate: "2024-10-15", status: "Paid" },
    { id: "FEE003", student: "Amit Sharma", class: "9-B", roll: "9024", type: "Tuition Fee", amount: 40000, dueDate: "2024-10-10", status: "Overdue" },
    { id: "FEE004", student: "Neha Patel", class: "9-B", roll: "9025", type: "Library Fee", amount: 2000, dueDate: "2024-11-05", status: "Pending" },
    { id: "FEE005", student: "Rohan Gupta", class: "12-Sci", roll: "1205", type: "Lab Fee", amount: 8000, dueDate: "2024-10-30", status: "Pending" },
    { id: "FEE006", student: "Sneha Verma", class: "12-Sci", roll: "1206", type: "Tuition Fee", amount: 55000, dueDate: "2024-09-15", status: "Overdue" },
    { id: "FEE007", student: "Karan Johar", class: "8-A", roll: "8012", type: "Tuition Fee", amount: 35000, dueDate: "2024-10-10", status: "Paid" },
];

export default function FeesPage() {
    const [fees, setFees] = useState(feesData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const filteredData = fees.filter(fee => {
        const matchesSearch = fee.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fee.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || fee.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totals = {
        total: fees.reduce((acc, curr) => acc + curr.amount, 0),
        collected: fees.filter(f => f.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0),
        pending: fees.filter(f => f.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0),
        overdue: fees.filter(f => f.status === 'Overdue').reduce((acc, curr) => acc + curr.amount, 0),
    };

    const handleMarkAsPaid = (id: string, name: string) => {
        setFees(prev => prev.map(f => f.id === id ? { ...f, status: 'Paid' } : f));
        toast.success(`Payment recorded for ${name}`);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-emerald-600" />
                        Fee Management
                    </h1>
                    <p className="text-slate-500">Track collections and pending dues</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                    <Receipt className="h-4 w-4" />
                    Generate Invoice
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Expected</p>
                    <h3 className="text-2xl font-bold text-slate-800">₹{totals.total.toLocaleString()}</h3>
                </div>
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 shadow-sm">
                    <p className="text-sm font-medium text-emerald-700 mb-1">Total Collected</p>
                    <h3 className="text-2xl font-bold text-emerald-800">₹{totals.collected.toLocaleString()}</h3>
                </div>
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm">
                    <p className="text-sm font-medium text-amber-700 mb-1">Pending Fees</p>
                    <h3 className="text-2xl font-bold text-amber-800">₹{totals.pending.toLocaleString()}</h3>
                </div>
                <div className="bg-red-50 p-5 rounded-xl border border-red-100 shadow-sm">
                    <p className="text-sm font-medium text-red-700 mb-1">Overdue Amount</p>
                    <h3 className="text-2xl font-bold text-red-800">₹{totals.overdue.toLocaleString()}</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search student or invoice ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                    <button
                        onClick={() => setFilterStatus("All")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'All' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                        All Invoices
                    </button>
                    <button
                        onClick={() => setFilterStatus("Paid")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        Paid
                    </button>
                    <button
                        onClick={() => setFilterStatus("Pending")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilterStatus("Overdue")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        Overdue
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Invoice ID</th>
                                <th className="px-6 py-4">Student Details</th>
                                <th className="px-6 py-4">Fee Type</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Due Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.map((fee) => (
                                <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{fee.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-800">{fee.student}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">{fee.class} | Roll: {fee.roll}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 font-medium">{fee.type}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">₹{fee.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <span className={`block text-xs font-medium border rounded w-fit px-2 py-1 ${fee.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 border-slate-200'
                                            }`}>
                                            {fee.dueDate}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border w-fit ${fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                fee.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {fee.status === 'Paid' && <CheckCircle className="h-3 w-3" />}
                                            {fee.status === 'Pending' && <Clock className="h-3 w-3" />}
                                            {fee.status === 'Overdue' && <AlertCircle className="h-3 w-3" />}
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {fee.status !== 'Paid' ? (
                                            <button
                                                onClick={() => handleMarkAsPaid(fee.id, fee.student)}
                                                className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
                                            >
                                                Mark as Paid
                                            </button>
                                        ) : (
                                            <button className="text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                                                View Receipt
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredData.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No matching records found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
