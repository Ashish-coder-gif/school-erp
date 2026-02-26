"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface BookRecord {
  id: string;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
  status: "ACTIVE" | "RETURNED";
  returnDate?: string;
}

const mockBooks: BookRecord[] = [
  { id: "1", title: "Advanced Mathematics", author: "Srivastava & Gupta", issueDate: "2026-02-10", dueDate: "2026-03-10", status: "ACTIVE" },
  { id: "2", title: "Pedagogy and Teaching Methods", author: "John Dewey", issueDate: "2026-02-01", dueDate: "2026-03-01", status: "ACTIVE" },
  { id: "3", title: "A Brief History of Time", author: "Stephen Hawking", issueDate: "2026-01-15", dueDate: "2026-02-15", status: "RETURNED", returnDate: "2026-02-12" },
  { id: "4", title: "Problem Solving in Mathematics", author: "G. Polya", issueDate: "2026-02-05", dueDate: "2026-03-05", status: "ACTIVE" },
];

const getStatusColor = (status: string) => {
  if (status === "ACTIVE") return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
};

export default function TeacherLibraryPage() {
  const activeBooks = mockBooks.filter(b => b.status === "ACTIVE");
  const returnedBooks = mockBooks.filter(b => b.status === "RETURNED");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Library</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Books Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockBooks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Currently Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeBooks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Returned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{returnedBooks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {activeBooks.filter(b => new Date(b.dueDate) < new Date()).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Book Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{new Date(book.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(book.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "—"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(book.status)}>
                      {book.status}
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
