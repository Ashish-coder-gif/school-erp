"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeacherFeesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Fees Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Access Restricted</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Fees management is only available for admin and finance staff members.
            As a teacher, you can view student fee payment status for individual students
            through the student portal or by requesting information from the administration office.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li>• Contact Admin Office for fee-related queries</li>
            <li>• View student payment status via student database</li>
            <li>• Submit fee-related complaints or suggestions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
