"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Clock, Trash2 } from "lucide-react";

export default function StudentLeave() {
    const [formData, setFormData] = useState({
        fromDate: "",
        toDate: "",
        reason: "",
        leaveType: "medical"
    });

    const [leaves, setLeaves] = useState([
        {
            id: "L001",
            fromDate: "2026-02-10",
            toDate: "2026-02-12",
            days: 3,
            reason: "Medical appointment",
            leaveType: "Medical",
            status: "Approved",
            appliedDate: "2026-02-08"
        },
        {
            id: "L002",
            fromDate: "2026-01-22",
            toDate: "2026-01-24",
            days: 3,
            reason: "Family function",
            leaveType: "Personal",
            status: "Approved",
            appliedDate: "2026-01-20"
        },
        {
            id: "L003",
            fromDate: "2026-02-20",
            toDate: "2026-02-22",
            days: 3,
            reason: "Fever and cold",
            leaveType: "Medical",
            status: "Pending",
            appliedDate: "2026-02-18"
        },
        {
            id: "L004",
            fromDate: "2026-02-15",
            toDate: "2026-02-15",
            days: 1,
            reason: "Dental treatment",
            leaveType: "Medical",
            status: "Rejected",
            appliedDate: "2026-02-14",
            rejectionReason: "Already issued leave for the same period"
        }
    ]);

    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fromDate || !formData.toDate || !formData.reason) {
            alert("Please fill all fields");
            return;
        }

        const newLeave = {
            id: `L${leaves.length + 5}`,
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            days: Math.ceil((new Date(formData.toDate).getTime() - new Date(formData.fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
            reason: formData.reason,
            leaveType: formData.leaveType.charAt(0).toUpperCase() + formData.leaveType.slice(1),
            status: "Pending",
            appliedDate: new Date().toISOString().split('T')[0]
        };

        setLeaves([newLeave, ...leaves]);
        setFormData({ fromDate: "", toDate: "", reason: "", leaveType: "medical" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleDeleteLeave = (id: string) => {
        setLeaves(leaves.filter(leave => leave.id !== id));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Approved":
                return <CheckCircle className="h-4 w-4" />;
            case "Pending":
                return <Clock className="h-4 w-4" />;
            case "Rejected":
                return <AlertCircle className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const totalDaysUsed = leaves.filter(l => l.status === "Approved").reduce((sum, l) => sum + l.days, 0);
    const pendingLeaves = leaves.filter(l => l.status === "Pending").length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Leave Application</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Apply for leave and track your applications</p>
            </div>

            <Tabs defaultValue="apply" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                {/* Apply for Leave Tab */}
                <TabsContent value="apply" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>New Leave Application</CardTitle>
                            <CardDescription>Fill in the details to apply for leave</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fromDate">From Date</Label>
                                        <Input
                                            id="fromDate"
                                            name="fromDate"
                                            type="date"
                                            value={formData.fromDate}
                                            onChange={handleInputChange}
                                            className="bg-white dark:bg-slate-900"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="toDate">To Date</Label>
                                        <Input
                                            id="toDate"
                                            name="toDate"
                                            type="date"
                                            value={formData.toDate}
                                            onChange={handleInputChange}
                                            className="bg-white dark:bg-slate-900"
                                            required
                                            min={formData.fromDate}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="leaveType">Leave Type</Label>
                                    <select
                                        id="leaveType"
                                        name="leaveType"
                                        value={formData.leaveType}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                    >
                                        <option value="medical">Medical</option>
                                        <option value="personal">Personal</option>
                                        <option value="emergency">Emergency</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Reason for Leave</Label>
                                    <textarea
                                        id="reason"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        placeholder="Please provide a detailed reason for your leave application"
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                                        rows={4}
                                        required
                                    ></textarea>
                                </div>

                                {formData.fromDate && formData.toDate && (
                                    <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                                        <p className="text-sm text-purple-700 dark:text-purple-300">
                                            Total Days: <span className="font-bold">{Math.ceil((new Date(formData.toDate).getTime() - new Date(formData.fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)</span>
                                        </p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Submit Application
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Days Used This Year</p>
                                <p className="text-3xl font-bold text-purple-600">{totalDaysUsed}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Out of 30 days</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Days Remaining</p>
                                <p className="text-3xl font-bold text-green-600">{30 - totalDaysUsed}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Available for leave</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Pending Applications</p>
                                <p className="text-3xl font-bold text-yellow-600">{pendingLeaves}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Awaiting approval</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leave History</CardTitle>
                            <CardDescription>Your past and current leave applications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {leaves.length === 0 ? (
                                    <p className="text-slate-500 dark:text-slate-400 text-center py-8">No leave applications yet</p>
                                ) : (
                                    leaves.map((leave) => (
                                        <div key={leave.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                                            {leave.fromDate === leave.toDate ? leave.fromDate : `${leave.fromDate} to ${leave.toDate}`}
                                                        </h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(leave.status)}`}>
                                                            {getStatusIcon(leave.status)}
                                                            {leave.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        <span className="font-medium">{leave.leaveType}</span> • {leave.days} day(s) • Applied on {leave.appliedDate}
                                                    </p>
                                                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{leave.reason}</p>
                                                    {leave.rejectionReason && (
                                                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                                                            <span className="font-semibold">Rejection Reason:</span> {leave.rejectionReason}
                                                        </p>
                                                    )}
                                                </div>
                                                {leave.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleDeleteLeave(leave.id)}
                                                        className="ml-4 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {submitted && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Leave application submitted successfully!
                </div>
            )}
        </div>
    );
}
