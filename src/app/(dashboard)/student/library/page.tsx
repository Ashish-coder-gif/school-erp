"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface BookIssue {
  id: string;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: "ACTIVE" | "RETURNED";
  fine?: number;
}

const mockBooks: BookIssue[] = [
  { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", issueDate: "2026-02-10", dueDate: "2026-03-10", status: "ACTIVE" },
  { id: "2", title: "1984", author: "George Orwell", issueDate: "2026-01-20", dueDate: "2026-02-20", returnDate: "2026-02-18", status: "RETURNED" },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", issueDate: "2026-02-15", dueDate: "2026-03-15", status: "ACTIVE" },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", issueDate: "2026-02-01", dueDate: "2026-03-01", status: "ACTIVE", fine: 50 },
];

const getStatusColor = (status: string) => {
  if (status === "ACTIVE") return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
};

export default function StudentLibraryPage() {
  const activeBooks = mockBooks.filter(b => b.status === "ACTIVE");
  const overdueBooks = activeBooks.filter(b => new Date(b.dueDate) < new Date());

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
            <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueBooks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Returned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockBooks.filter(b => b.status === "RETURNED").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Records</CardTitle>
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
                <TableHead>Fine</TableHead>
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
                  <TableCell>{book.fine ? `₹${book.fine}` : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
