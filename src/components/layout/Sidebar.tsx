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
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Students", href: "/admin/students", icon: Users },
    { title: "Teachers", href: "/admin/teachers", icon: GraduationCap },
    { title: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
    { title: "Timetable", href: "/admin/timetable", icon: Clock },
    { title: "Exams & Marks", href: "/admin/exams", icon: BookOpen },
    { title: "Fee Management", href: "/admin/fees", icon: CreditCard },
    { title: "Library", href: "/admin/library", icon: Library },
    { title: "Announcements", href: "/admin/announcements", icon: Bell },
    { title: "Reports", href: "/admin/reports", icon: BarChart3 },
];

const teacherNavItems = [
    { title: "My Dashboard", href: "/teacher", icon: LayoutDashboard },
    { title: "My Classes", href: "/teacher/classes", icon: Users },
    { title: "Mark Attendance", href: "/teacher/attendance", icon: CalendarCheck },
    { title: "My Timetable", href: "/teacher/timetable", icon: Clock },
    { title: "Exams & Marks", href: "/teacher/exams", icon: BookOpen },
    { title: "Performance", href: "/teacher/reports", icon: BarChart3 },
    { title: "My Library", href: "/teacher/library", icon: Library },
    { title: "Announcements", href: "/teacher/announcements", icon: Bell },
];

const parentNavItems = [
    { title: "My Dashboard", href: "/parent", icon: LayoutDashboard },
    { title: "Children's Attendance", href: "/parent/attendance", icon: CalendarCheck },
    { title: "Children's Timetable", href: "/parent/timetable", icon: Clock },
    { title: "Exam Results", href: "/parent/exams", icon: BookOpen },
    { title: "Fee Status", href: "/parent/fees", icon: CreditCard },
    { title: "Performance Reports", href: "/parent/reports", icon: BarChart3 },
    { title: "Library", href: "/parent/library", icon: Library },
    { title: "Announcements", href: "/parent/announcements", icon: Bell },
];

const studentNavItems = [
    { title: "My Dashboard", href: "/student", icon: LayoutDashboard },
    { title: "My Attendance", href: "/student/attendance", icon: CalendarCheck },
    { title: "My Timetable", href: "/student/timetable", icon: Clock },
    { title: "Exam Results", href: "/student/exams", icon: BookOpen },
    { title: "Fee Status", href: "/student/fees", icon: CreditCard },
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
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-[260px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-[260px] flex flex-col",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 justify-between">
                    <div className="flex items-center gap-3">
                        <div className={cn("p-1.5 rounded-md", themeColor)}>
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-lg hidden sm:block text-slate-900 dark:text-white">School ERP</span>
                    </div>
                    <button
                        className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            const Icon = item.icon;

                            const isExactActive = item.href === rolePrefix ? pathname === rolePrefix : isActive;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group text-sm font-medium",
                                        isExactActive
                                            ? themeActive
                                            : cn("hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 text-slate-600 dark:text-slate-400", themeHover)
                                    )}
                                    onClick={() => setOpen(false)}
                                >
                                    <Icon className={cn(
                                        "h-5 w-5",
                                        isExactActive ? "text-white" : "text-slate-400 group-hover:text-current"
                                    )} />
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <Link
                        href={`${rolePrefix}/settings`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium"
                    >
                        <Settings className="h-5 w-5 text-slate-400" />
                        Settings
                    </Link>
                </div>
            </aside>
        </>
    );
}
