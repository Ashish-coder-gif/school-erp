"use client";

import { useState } from "react";
import { Library, Search, Plus, Book, BookOpen, Clock, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const initialBooks = [
    { id: "B001", title: "Concepts of Physics Vol 1", author: "H.C. Verma", isbn: "9788177091878", total: 50, available: 12 },
    { id: "B002", title: "Mathematics Class 10", author: "R.D. Sharma", isbn: "9789383182061", total: 40, available: 5 },
    { id: "B003", title: "History of Modern India", author: "Bipan Chandra", isbn: "9788125036845", total: 30, available: 20 },
    { id: "B004", title: "English Grammar & Composition", author: "Wren & Martin", isbn: "9789352530144", total: 60, available: 15 },
    { id: "B005", title: "Computer Science with Python", author: "Sumita Arora", isbn: "9788177002003", total: 25, available: 0 },
];

const initialIssues: { id: string; student: string; roll: string; bookTitle: string; issueDate: string; dueDate: string; returnDate: string | null }[] = [
    { id: "ISS001", student: "Rahul Kumar", roll: "1001", bookTitle: "Concepts of Physics Vol 1", issueDate: "2024-10-01", dueDate: "2024-10-15", returnDate: null },
    { id: "ISS002", student: "Neha Patel", roll: "9025", bookTitle: "English Grammar & Composition", issueDate: "2024-10-05", dueDate: "2024-10-19", returnDate: null },
    { id: "ISS003", student: "Amit Sharma", roll: "9024", bookTitle: "Mathematics Class 10", issueDate: "2024-09-20", dueDate: "2024-10-04", returnDate: null },
];

export default function LibraryPage() {
    const [books, setBooks] = useState(initialBooks);
    const [issues, setIssues] = useState(initialIssues);
    const [activeTab, setActiveTab] = useState("books");
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddBook, setShowAddBook] = useState(false);
    const [showIssueBook, setShowIssueBook] = useState(false);
    const [bookForm, setBookForm] = useState({ title: "", author: "", isbn: "", quantity: "" });
    const [issueForm, setIssueForm] = useState({ student: "", roll: "", bookId: "", dueDate: "" });

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
    );

    const isOverdue = (dueDateStr: string) => new Date(dueDateStr) < new Date();

    const handleAddBook = (e: React.FormEvent) => {
        e.preventDefault();
        const qty = parseInt(bookForm.quantity) || 1;
        setBooks(prev => [...prev, { id: `B${String(prev.length + 1).padStart(3, "0")}`, title: bookForm.title, author: bookForm.author, isbn: bookForm.isbn, total: qty, available: qty }]);
        setBookForm({ title: "", author: "", isbn: "", quantity: "" });
        setShowAddBook(false);
        toast.success("Book added to library");
    };

    const handleIssueBook = (e: React.FormEvent) => {
        e.preventDefault();
        const book = books.find(b => b.id === issueForm.bookId);
        if (book && book.available <= 0) { toast.error("No copies available"); return; }
        setIssues(prev => [...prev, { id: `ISS${String(prev.length + 1).padStart(3, "0")}`, student: issueForm.student, roll: issueForm.roll, bookTitle: book?.title || "", issueDate: new Date().toISOString().split("T")[0], dueDate: issueForm.dueDate, returnDate: null }]);
        setBooks(prev => prev.map(b => b.id === issueForm.bookId ? { ...b, available: b.available - 1 } : b));
        setIssueForm({ student: "", roll: "", bookId: "", dueDate: "" });
        setShowIssueBook(false);
        toast.success(`Book issued to ${issueForm.student}`);
    };

    const handleReturn = (issueId: string) => {
        const issue = issues.find(i => i.id === issueId);
        setIssues(prev => prev.map(i => i.id === issueId ? { ...i, returnDate: new Date().toISOString().split("T")[0] } : i));
        const book = books.find(b => b.title === issue?.bookTitle);
        if (book) setBooks(prev => prev.map(b => b.id === book.id ? { ...b, available: b.available + 1 } : b));
        toast.success(`"${issue?.bookTitle}" returned by ${issue?.student}`);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Library className="h-6 w-6 text-fuchsia-600" />
                        Library Management
                    </h1>
                    <p className="text-slate-500">Manage books inventory and issuance</p>
                </div>
                <button onClick={() => activeTab === 'books' ? setShowAddBook(true) : setShowIssueBook(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {activeTab === 'books' ? 'Add New Book' : 'Issue Book'}
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('books')}
                        className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'books'
                                ? 'border-fuchsia-500 text-fuchsia-700'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <Book className="h-4 w-4" />
                        Books Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('issued')}
                        className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'issued'
                                ? 'border-fuchsia-500 text-fuchsia-700'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <BookOpen className="h-4 w-4" />
                        Issued Books
                    </button>
                </nav>
            </div>

            {activeTab === 'books' && (
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by title, author, or ISBN..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none text-sm transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
Total Books: {books.length}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Title & Author</th>
                                    <th className="px-6 py-4">ISBN</th>
                                    <th className="px-6 py-4 text-center">Total Qty</th>
                                    <th className="px-6 py-4 text-center">Available</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBooks.map((book) => (
                                    <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-800">{book.title}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">by {book.author}</div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-slate-600 text-xs">{book.isbn}</td>
                                        <td className="px-6 py-4 text-center text-slate-600 font-medium">{book.total}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${book.available > 5 ? 'bg-emerald-100 text-emerald-700' :
                                                    book.available > 0 ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {book.available}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-fuchsia-600 hover:text-fuchsia-800 bg-fuchsia-50 hover:bg-fuchsia-100 px-3 py-1.5 rounded text-xs font-medium transition-colors">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'issued' && (
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Book Title</th>
                                    <th className="px-6 py-4 text-center">Issue Date</th>
                                    <th className="px-6 py-4 text-center">Due Date</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {issues.map((issue) => {
                                    const returned = !!issue.returnDate;
                                    const overdue = !returned && isOverdue(issue.dueDate);
                                    return (
                                        <tr key={issue.id} className={`hover:bg-slate-50 transition-colors ${overdue ? 'bg-red-50/30' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800">{issue.student}</div>
                                                <div className="text-xs text-slate-500 mt-0.5">Roll: {issue.roll}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-700 font-medium">{issue.bookTitle}</td>
                                            <td className="px-6 py-4 text-center text-slate-600">{issue.issueDate}</td>
                                            <td className="px-6 py-4 text-center font-medium">
                                                <span className={overdue ? 'text-red-600' : 'text-slate-700'}>{issue.dueDate}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {returned ? (
                                                    <span className="flex items-center justify-center gap-1.5 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-200">Returned</span>
                                                ) : overdue ? (
                                                    <span className="flex items-center justify-center gap-1.5 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium border border-red-200"><AlertCircle className="h-3 w-3" />Overdue</span>
                                                ) : (
                                                    <span className="flex items-center justify-center gap-1.5 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-200"><Clock className="h-3 w-3" />Issued</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {!returned ? (
                                                    <button onClick={() => handleReturn(issue.id)} className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm">Return Book</button>
                                                ) : (
                                                    <span className="text-xs text-slate-400">Returned {issue.returnDate}</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add Book Modal */}
            {showAddBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800">Add New Book</h2>
                            <button onClick={() => setShowAddBook(false)} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 transition-colors"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleAddBook} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Title</label><input type="text" required value={bookForm.title} onChange={e => setBookForm(p => ({...p, title: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Book title" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Author</label><input type="text" required value={bookForm.author} onChange={e => setBookForm(p => ({...p, author: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Author name" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">ISBN</label><input type="text" required value={bookForm.isbn} onChange={e => setBookForm(p => ({...p, isbn: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="ISBN number" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label><input type="number" min="1" required value={bookForm.quantity} onChange={e => setBookForm(p => ({...p, quantity: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Number of copies" /></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddBook(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg text-sm font-medium hover:bg-fuchsia-700 shadow-sm">Add Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Issue Book Modal */}
            {showIssueBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800">Issue Book</h2>
                            <button onClick={() => setShowIssueBook(false)} className="p-1 rounded-md text-slate-400 hover:bg-slate-200 transition-colors"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleIssueBook} className="p-6 space-y-4">
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Student Name</label><input type="text" required value={issueForm.student} onChange={e => setIssueForm(p => ({...p, student: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Student name" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Roll Number</label><input type="text" required value={issueForm.roll} onChange={e => setIssueForm(p => ({...p, roll: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500" placeholder="Roll number" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Select Book</label>
                                <select required value={issueForm.bookId} onChange={e => setIssueForm(p => ({...p, bookId: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 bg-white">
                                    <option value="">Choose a book</option>
                                    {books.filter(b => b.available > 0).map(b => <option key={b.id} value={b.id}>{b.title} ({b.available} available)</option>)}
                                </select>
                            </div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label><input type="date" required value={issueForm.dueDate} onChange={e => setIssueForm(p => ({...p, dueDate: e.target.value}))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-fuchsia-500" /></div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowIssueBook(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg text-sm font-medium hover:bg-fuchsia-700 shadow-sm">Issue Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
