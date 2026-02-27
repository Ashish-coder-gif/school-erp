"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    CalendarCheck,
    Clock,
    BookOpen,
    CreditCard,
    Library,
    Bell,
    BarChart3,
    Settings,
    X,
    FileText,
    Bus,
    FileCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Students", href: "/admin/students", icon: Users },
    { title: "Teachers", href: "/admin/teachers", icon: GraduationCap },
    { title: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
    { title: "Timetable", href: "/admin/timetable", icon: Clock },
    { title: "Exams & Marks", href: "/admin/exams", icon: BookOpen },
    { title: "Leave Management", href: "/admin/leave", icon: FileCheck },
    { title: "Performance", href: "/admin/performance", icon: BarChart3 },
    { title: "Fee Management", href: "/admin/fees", icon: CreditCard },
    { title: "Transportation", href: "/admin/transportation", icon: Bus },
    { title: "Library", href: "/admin/library", icon: Library },
    { title: "Announcements", href: "/admin/announcements", icon: Bell },
    { title: "Reports", href: "/admin/reports", icon: FileText },
];

const teacherNavItems = [
    { title: "My Dashboard", href: "/teacher", icon: LayoutDashboard },
    { title: "My Classes", href: "/teacher/classes", icon: Users },
    { title: "Mark Attendance", href: "/teacher/attendance", icon: CalendarCheck },
    { title: "My Timetable", href: "/teacher/timetable", icon: Clock },
    { title: "Exams & Marks", href: "/teacher/exams", icon: BookOpen },
    { title: "Class Performance", href: "/teacher/performance", icon: BarChart3 },
    { title: "Apply for Leave", href: "/teacher/leave", icon: FileCheck },
    { title: "Transportation", href: "/teacher/transportation", icon: Bus },
    { title: "My Library", href: "/teacher/library", icon: Library },
    { title: "Announcements", href: "/teacher/announcements", icon: Bell },
];

const parentNavItems = [
    { title: "My Dashboard", href: "/parent", icon: LayoutDashboard },
    { title: "Children's Attendance", href: "/parent/attendance", icon: CalendarCheck },
    { title: "Children's Timetable", href: "/parent/timetable", icon: Clock },
    { title: "Exam Results", href: "/parent/exams", icon: BookOpen },
    { title: "Fee Status", href: "/parent/fees", icon: CreditCard },
    { title: "Transportation", href: "/parent/transportation", icon: Bus },
    { title: "Performance Reports", href: "/parent/reports", icon: BarChart3 },
    { title: "Library", href: "/parent/library", icon: Library },
    { title: "Announcements", href: "/parent/announcements", icon: Bell },
];

const studentNavItems = [
    { title: "My Dashboard", href: "/student", icon: LayoutDashboard },
    { title: "My Attendance", href: "/student/attendance", icon: CalendarCheck },
    { title: "My Timetable", href: "/student/timetable", icon: Clock },
    { title: "Exam Results", href: "/student/exams", icon: BookOpen },
    { title: "Apply for Leave", href: "/student/leave", icon: FileCheck },
    { title: "Fee Status", href: "/student/fees", icon: CreditCard },
    { title: "Transportation", href: "/student/transportation", icon: Bus },
    { title: "Library", href: "/student/library", icon: Library },
    { title: "Announcements", href: "/student/announcements", icon: Bell },
];

export default function Sidebar({
    open,
    setOpen
}: {
    open: boolean;
    setOpen: (open: boolean) => void
}) {
    const pathname = usePathname();

    let navItems = adminNavItems;
    let rolePrefix = "/admin";
    let themeColor = "bg-blue-600";
    let themeHover = "hover:bg-blue-600/10 hover:text-blue-500";
    let themeActive = "bg-blue-600 text-white";

    if (pathname?.startsWith("/teacher")) {
        navItems = teacherNavItems;
        rolePrefix = "/teacher";
        themeColor = "bg-emerald-600";
        themeHover = "hover:bg-emerald-600/10 hover:text-emerald-500";
        themeActive = "bg-emerald-600 text-white";
    } else if (pathname?.startsWith("/student")) {
        navItems = studentNavItems;
        rolePrefix = "/student";
        themeColor = "bg-purple-600";
        themeHover = "hover:bg-purple-600/10 hover:text-purple-500";
        themeActive = "bg-purple-600 text-white";
    } else if (pathname?.startsWith("/parent")) {
        navItems = parentNavItems;
        rolePrefix = "/parent";
        themeColor = "bg-amber-600";
        themeHover = "hover:bg-amber-600/10 hover:text-amber-500";
        themeActive = "bg-amber-600 text-white";
    }

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-slate-950 border-r border-slate-200/50 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-[280px] flex flex-col shadow-lg lg:shadow-none",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-slate-200/50 dark:border-slate-800/50 justify-between bg-gradient-to-r from-blue-50 to-transparent dark:from-slate-900/50 dark:to-transparent">
                    <div className="flex items-center gap-3 flex-1">
                        <div className={cn("p-2 rounded-xl shadow-md", themeColor)}>
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">School</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Management</p>
                        </div>
                    </div>
                    <button
                        className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3">
                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            const Icon = item.icon;
                            const isExactActive = item.href === rolePrefix ? pathname === rolePrefix : isActive;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                        isExactActive
                                            ? `${themeActive} shadow-md`
                                            : "hover:bg-slate-100 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                    )}
                                    onClick={() => setOpen(false)}
                                >
                                    <Icon className={cn(
                                        "h-5 w-5 transition-transform duration-200",
                                        isExactActive 
                                            ? "text-white scale-110" 
                                            : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:scale-110"
                                    )} />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Settings Footer */}
                <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-900/30 dark:to-transparent">
                    <Link
                        href={`${rolePrefix}/settings`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium group"
                    >
                        <Settings className="h-5 w-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                        <span>Settings</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
