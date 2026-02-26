"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Fee {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: "PAID" | "PENDING" | "OVERDUE";
  paidDate?: string;
}

const mockFees: Fee[] = [
  { id: "1", type: "Tuition Fee", amount: 5000, dueDate: "2026-01-31", status: "PAID", paidDate: "2026-01-25" },
  { id: "2", type: "Activity Fee", amount: 500, dueDate: "2026-01-31", status: "PAID", paidDate: "2026-01-25" },
  { id: "3", type: "Library Fee", amount: 200, dueDate: "2026-02-28", status: "PAID", paidDate: "2026-02-20" },
  { id: "4", type: "Lab Fee", amount: 800, dueDate: "2026-02-28", status: "PENDING" },
  { id: "5", type: "Sports Fee", amount: 300, dueDate: "2026-03-31", status: "PENDING" },
];

const getStatusColor = (status: string) => {
  if (status === "PAID") return "bg-green-100 text-green-800";
  if (status === "PENDING") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

export default function StudentFeesPage() {
  const totalFees = mockFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = mockFees.filter(f => f.status === "PAID").reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = mockFees.filter(f => f.status === "PENDING").reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Fees</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Payment %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{((paidAmount / totalFees) * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.type}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : "—"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(fee.status)}>
                      {fee.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
