"use client";

import { useState } from "react";
import { Menu, Bell, User, LogOut, Settings as SettingsIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        router.push("/login");
    };

    // Determine role based on URL
    let role = "Admin";
    let roleLabel = "Administrator";
    let shortName = "AD";

    if (pathname?.startsWith("/teacher")) {
        role = "Teacher";
        roleLabel = "Senior Teacher";
        shortName = "TC";
    } else if (pathname?.startsWith("/student")) {
        role = "Student";
        roleLabel = "Class 10-A";
        shortName = "ST";
    } else if (pathname?.startsWith("/parent")) {
        role = "Parent";
        roleLabel = "Parent of Rahul";
        shortName = "PR";
    }

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6 z-30 sticky top-0 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 hidden sm:block">
                    Welcome back, Ashish ({role}) 👋
                </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <ThemeToggle />

                <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>

                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${role === 'Admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                                role === 'Teacher' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                                    role === 'Student' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400' :
                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                            }`}>
                            {shortName}
                        </div>
                        <div className="hidden md:flex flex-col items-start leading-none gap-1">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Ashish Kumar</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{roleLabel}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
                    </button>

                    {dropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setDropdownOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-100 dark:border-slate-800 z-50 py-1 overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 md:hidden">
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Ashish Kumar</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">ashish@{role.toLowerCase()}.edu</p>
                                </div>

                                {/* Portal Switcher Links for Demo Purposes */}
                                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                                    <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Switch Portal</p>
                                    <div className="space-y-1">
                                        <Link href="/admin" className={`block text-xs py-1 hover:text-blue-500 ${role === 'Admin' ? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`} onClick={() => setDropdownOpen(false)}>Admin</Link>
                                        <Link href="/teacher" className={`block text-xs py-1 hover:text-emerald-500 ${role === 'Teacher' ? 'text-emerald-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`} onClick={() => setDropdownOpen(false)}>Teacher</Link>
                                        <Link href="/student" className={`block text-xs py-1 hover:text-purple-500 ${role === 'Student' ? 'text-purple-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`} onClick={() => setDropdownOpen(false)}>Student</Link>
                                    </div>
                                </div>

                                <Link
                                    href={`/${role.toLowerCase()}/profile`}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <User className="h-4 w-4 text-slate-400" />
                                    My Profile
                                </Link>
                                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                                >
                                    <LogOut className="h-4 w-4 text-red-500" />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
