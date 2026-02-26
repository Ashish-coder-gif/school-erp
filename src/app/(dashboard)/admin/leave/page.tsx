"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Clock, X } from "lucide-react";

export default function AdminLeave() {
    const [leaves, setLeaves] = useState([
        // Student Applications
        {
            id: "APP001",
            applicantName: "Alice Johnson",
            applicantType: "Student",
            class: "10-A",
            fromDate: "2026-02-20",
            toDate: "2026-02-22",
            days: 3,
            reason: "Fever and cold",
            leaveType: "Medical",
            status: "Pending",
            appliedDate: "2026-02-18"
        },
        {
            id: "APP002",
            applicantName: "Bob Smith",
            applicantType: "Student",
            class: "10-A",
            fromDate: "2026-02-25",
            toDate: "2026-02-26",
            days: 2,
            reason: "Family function",
            leaveType: "Personal",
            status: "Pending",
            appliedDate: "2026-02-24"
        },
        // Teacher Applications
        {
            id: "APP003",
            applicantName: "Mr. Rajesh Kumar",
            applicantType: "Teacher",
            subject: "Physics",
            coveringTeacher: "Mr. Vikram Singh",
            fromDate: "2026-02-24",
            toDate: "2026-02-25",
            days: 2,
            reason: "Health issues",
            leaveType: "Medical",
            status: "Pending",
            appliedDate: "2026-02-22"
        },
        {
            id: "APP004",
            applicantName: "Ms. Priya Sharma",
            applicantType: "Teacher",
            subject: "Mathematics",
            coveringTeacher: "Mrs. Anjali Patel",
            fromDate: "2026-03-01",
            toDate: "2026-03-03",
            days: 3,
            reason: "Official training program",
            leaveType: "Other",
            status: "Pending",
            appliedDate: "2026-02-27"
        },
        // Approved
        {
            id: "APP005",
            applicantName: "Charlie Brown",
            applicantType: "Student",
            class: "9-B",
            fromDate: "2026-02-10",
            toDate: "2026-02-12",
            days: 3,
            reason: "Medical appointment",
            leaveType: "Medical",
            status: "Approved",
            appliedDate: "2026-02-08"
        },
        {
            id: "APP006",
            applicantName: "Mr. Ahmed Khan",
            applicantType: "Teacher",
            subject: "Chemistry",
            coveringTeacher: "Mr. Vikram Singh",
            fromDate: "2026-02-05",
            toDate: "2026-02-06",
            days: 2,
            reason: "Family emergency",
            leaveType: "Emergency",
            status: "Approved",
            appliedDate: "2026-02-03"
        },
        // Rejected
        {
            id: "APP007",
            applicantName: "Diana Prince",
            applicantType: "Student",
            class: "10-C",
            fromDate: "2026-02-15",
            toDate: "2026-02-15",
            days: 1,
            reason: "Personal",
            leaveType: "Personal",
            status: "Rejected",
            appliedDate: "2026-02-14",
            rejectionReason: "Exam scheduled on this date"
        }
    ]);

    const [selectedStatus, setSelectedStatus] = useState("Pending");
    const [rejection, setRejection] = useState({ leaveId: "", reason: "" });

    const handleApprove = (id: string) => {
        setLeaves(leaves.map(leave =>
            leave.id === id ? { ...leave, status: "Approved" } : leave
        ));
    };

    const handleReject = (id: string) => {
        if (!rejection.reason) {
            alert("Please provide a rejection reason");
            return;
        }
        setLeaves(leaves.map(leave =>
            leave.id === id ? { ...leave, status: "Rejected", rejectionReason: rejection.reason } : leave
        ));
        setRejection({ leaveId: "", reason: "" });
    };

    const filteredLeaves = leaves.filter(leave => leave.status === selectedStatus);

    const stats = {
        pending: leaves.filter(l => l.status === "Pending").length,
        approved: leaves.filter(l => l.status === "Approved").length,
        rejected: leaves.filter(l => l.status === "Rejected").length,
        total: leaves.length
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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Leave Management</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Review and manage leave applications from students and teachers</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Total Applications</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
                        <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Approved</p>
                        <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Rejected</p>
                        <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="Pending" className="space-y-6" onValueChange={setSelectedStatus}>
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Approved">Approved</TabsTrigger>
                    <TabsTrigger value="Rejected">Rejected</TabsTrigger>
                </TabsList>

                <TabsContent value="Pending" className="space-y-4">
                    {filteredLeaves.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-slate-500 dark:text-slate-400 text-center py-8">No pending applications</p>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredLeaves.map((leave) => (
                            <Card key={leave.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                                    {leave.applicantName}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {leave.applicantType === "Student" ? `${leave.applicantType} • Class ${leave.class}` : `${leave.applicantType} • ${leave.subject}`}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(leave.status)}`}>
                                                {getStatusIcon(leave.status)}
                                                {leave.status}
                                            </span>
                                        </div>

                                        {/* Leave Details */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-200 dark:border-slate-700">
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Dates</p>
                                                <p className="font-semibold text-slate-900 dark:text-white">{leave.fromDate}</p>
                                                {leave.fromDate !== leave.toDate && (
                                                    <p className="font-semibold text-slate-900 dark:text-white">to {leave.toDate}</p>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Days</p>
                                                <p className="font-semibold text-slate-900 dark:text-white">{leave.days}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Type</p>
                                                <p className="font-semibold text-slate-900 dark:text-white">{leave.leaveType}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Applied On</p>
                                                <p className="font-semibold text-slate-900 dark:text-white">{leave.appliedDate}</p>
                                            </div>
                                        </div>

                                        {/* Reason */}
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400"><span className="font-semibold">Reason:</span> {leave.reason}</p>
                                            {leave.applicantType === "Teacher" && (
                                                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2"><span className="font-semibold">Covering Teacher:</span> {leave.coveringTeacher}</p>
                                            )}
                                        </div>

                                        {/* Action Buttons for Pending */}
                                        {leave.status === "Pending" && (
                                            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleApprove(leave.id)}
                                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                    >
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        onClick={() => setRejection({ leaveId: leave.id, reason: "" })}
                                                        variant="outline"
                                                        className="flex-1"
                                                    >
                                                        <X className="h-4 w-4 mr-2" />
                                                        Reject
                                                    </Button>
                                                </div>
                                                {rejection.leaveId === leave.id && (
                                                    <div className="space-y-2 bg-red-50 dark:bg-red-950 p-3 rounded">
                                                        <textarea
                                                            placeholder="Enter rejection reason"
                                                            value={rejection.reason}
                                                            onChange={(e) => setRejection({ ...rejection, reason: e.target.value })}
                                                            className="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                                                            rows={2}
                                                        />
                                                        <div className="flex gap-2">
                                                            <Button
                                                                onClick={() => handleReject(leave.id)}
                                                                size="sm"
                                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                                            >
                                                                Confirm Rejection
                                                            </Button>
                                                            <Button
                                                                onClick={() => setRejection({ leaveId: "", reason: "" })}
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex-1"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="Approved">
                    {filteredLeaves.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-slate-500 dark:text-slate-400 text-center py-8">No approved applications</p>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredLeaves.map((leave) => (
                            <Card key={leave.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{leave.applicantName}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {leave.fromDate === leave.toDate ? leave.fromDate : `${leave.fromDate} to ${leave.toDate}`} • {leave.days} day(s) • {leave.leaveType}
                                            </p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{leave.reason}</p>
                                        </div>
                                        <CheckCircle className="h-6 w-6 text-green-600 ml-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>

                <TabsContent value="Rejected">
                    {filteredLeaves.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-slate-500 dark:text-slate-400 text-center py-8">No rejected applications</p>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredLeaves.map((leave) => (
                            <Card key={leave.id} className="hover:shadow-lg transition-shadow border-red-200 dark:border-red-900">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{leave.applicantName}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {leave.fromDate === leave.toDate ? leave.fromDate : `${leave.fromDate} to ${leave.toDate}`} • {leave.days} day(s)
                                            </p>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{leave.reason}</p>
                                            {leave.rejectionReason && (
                                                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                                                    <span className="font-semibold">Rejection Reason:</span> {leave.rejectionReason}
                                                </p>
                                            )}
                                        </div>
                                        <AlertCircle className="h-6 w-6 text-red-600 ml-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
