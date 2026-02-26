"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ChildBookIssue {
  childName: string;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
  status: "ACTIVE" | "RETURNED";
  returnDate?: string;
}

const mockBookRecords: ChildBookIssue[] = [
  { childName: "Arjun", title: "The Great Gatsby", author: "F. Scott Fitzgerald", issueDate: "2026-02-15", dueDate: "2026-03-15", status: "ACTIVE" },
  { childName: "Arjun", title: "To Kill a Mockingbird", author: "Harper Lee", issueDate: "2026-02-10", dueDate: "2026-03-10", status: "ACTIVE" },
  { childName: "Arjun", title: "1984", author: "George Orwell", issueDate: "2026-01-20", dueDate: "2026-02-20", status: "RETURNED", returnDate: "2026-02-18" },
  { childName: "Priya", title: "Pride and Prejudice", author: "Jane Austen", issueDate: "2026-02-12", dueDate: "2026-03-12", status: "ACTIVE" },
  { childName: "Priya", title: "A Tale of Two Cities", author: "Charles Dickens", issueDate: "2026-01-25", dueDate: "2026-02-25", status: "RETURNED", returnDate: "2026-02-24" },
];

const getStatusColor = (status: string) => {
  if (status === "ACTIVE") return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
};

export default function ParentLibraryPage() {
  const children = ["Arjun", "Priya"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Children's Library Records</h1>

      {children.map(child => {
        const childBooks = mockBookRecords.filter(b => b.childName === child);
        const activeBooks = childBooks.filter(b => b.status === "ACTIVE");

        return (
          <Card key={child}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{child}</h2>
                <Badge className="bg-blue-100 text-blue-800">
                  {activeBooks.length} Active Books
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {childBooks.map((book, idx) => (
                    <TableRow key={idx}>
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
        );
      })}
    </div>
  );
}
