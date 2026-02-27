"use client";

import { useState } from "react";
import { Menu, Bell, User, LogOut, Settings as SettingsIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-4 lg:px-6 z-30 sticky top-0 shadow-md dark:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 lg:hidden transition-all duration-200 hover:shadow-sm"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent hidden sm:block">
                    Welcome back, Ashish ({role}) 👋
                </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <ThemeToggle />

                <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:shadow-sm hover:text-slate-700 dark:hover:text-slate-200">
                    <Bell className="h-5 w-5 transition-transform duration-200" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-pulse"></span>
                </button>

                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600/50 hover:shadow-sm"
                    >
                        <Avatar className="h-10 w-10 border-2 border-slate-300 dark:border-slate-600 shadow-sm ring-2 ring-slate-100 dark:ring-slate-800">
                            <AvatarImage 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`}
                                alt="Ashish Kumar"
                                className="object-cover"
                            />
                            <AvatarFallback className={`font-bold text-sm ${role === 'Admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                                    role === 'Teacher' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                                        role === 'Student' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400' :
                                            'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                                }`}>
                                AK
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:flex flex-col items-start leading-none gap-1">
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Ashish Kumar</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{roleLabel}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-slate-400 hidden md:block transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    </button>

                    {dropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setDropdownOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-slate-200/50 dark:border-slate-800/50 md:hidden">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Ashish Kumar</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">ashish@{role.toLowerCase()}.edu</p>
                                </div>

                                {/* Portal Switcher Links for Demo Purposes */}
                                <div className="px-4 py-2 border-b border-slate-200/50 dark:border-slate-800/50">
                                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-2 tracking-wide">Switch Portal</p>
                                    <div className="space-y-1">
                                        <Link href="/admin" className={`block text-xs py-2 px-2 rounded-lg transition-all duration-150 ${role === 'Admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} onClick={() => setDropdownOpen(false)}>Admin</Link>
                                        <Link href="/teacher" className={`block text-xs py-2 px-2 rounded-lg transition-all duration-150 ${role === 'Teacher' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} onClick={() => setDropdownOpen(false)}>Teacher</Link>
                                        <Link href="/student" className={`block text-xs py-2 px-2 rounded-lg transition-all duration-150 ${role === 'Student' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} onClick={() => setDropdownOpen(false)}>Student</Link>
                                    </div>
                                </div>

                                <Link
                                    href={`/${role.toLowerCase()}/profile`}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-150 mx-2 rounded-lg"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                                    My Profile
                                </Link>
                                <div className="h-px bg-slate-200/50 dark:bg-slate-800/50 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all duration-150 text-left rounded-lg mx-2 my-1"
                                >
                                    <LogOut className="h-4 w-4 flex-shrink-0" />
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
