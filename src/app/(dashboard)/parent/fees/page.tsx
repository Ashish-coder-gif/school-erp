"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ChildFee {
  childName: string;
  class: string;
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
}

const mockChildrenFees: ChildFee[] = [
  { childName: "Arjun", class: "10-A", totalFees: 6800, paidAmount: 5800, pendingAmount: 1000, status: "PENDING" },
  { childName: "Priya", class: "8-B", totalFees: 6500, paidAmount: 6500, pendingAmount: 0, status: "PAID" },
];

const getStatusColor = (status: string) => {
  if (status === "PAID") return "bg-green-100 text-green-800";
  if (status === "PENDING") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

export default function ParentFeesPage() {
  const totalAllFees = mockChildrenFees.reduce((sum, f) => sum + f.totalFees, 0);
  const totalPaidAmount = mockChildrenFees.reduce((sum, f) => sum + f.paidAmount, 0);
  const totalPendingAmount = mockChildrenFees.reduce((sum, f) => sum + f.pendingAmount, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Children's Fees</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Fees (All Children)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAllFees.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalPaidAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">₹{totalPendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Payment %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {((totalPaidAmount / totalAllFees) * 100).toFixed(0)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockChildrenFees.map((child, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">{child.childName}</CardTitle>
                  <p className="text-sm text-gray-600">Class {child.class}</p>
                </div>
                <Badge className={getStatusColor(child.status)}>
                  {child.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Fees</p>
                  <p className="text-2xl font-bold">₹{child.totalFees.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Paid</p>
                  <p className="text-2xl font-bold text-green-600">₹{child.paidAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">₹{child.pendingAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(child.paidAmount / child.totalFees) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
