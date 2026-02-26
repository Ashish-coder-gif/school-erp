"use client";

import { useState } from "react";
import { Save, Eye, EyeOff, Bell, Moon, Globe, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export default function TeacherSettings() {
    const { theme, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    // Profile Form State
    const [profile, setProfile] = useState({
        fullName: "Mr. John Doe",
        email: "john.doe@school.com",
        phone: "+1 234 567 8900",
        qualification: "B.Sc in Physics",
        subject: "Physics",
        employeeId: "T001"
    });

    // Password Form State
    const [password, setPassword] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    // Notification Preferences
    const [notifications, setNotifications] = useState({
        classAlerts: true,
        attendanceReminders: true,
        examSchedules: true,
        parentMessages: true,
        emailNotifications: true,
        smsNotifications: false
    });

    // Teaching Preferences
    const [teaching, setTeaching] = useState({
        maxClasses: "4",
        officeHours: "3:00 PM - 4:00 PM",
        consultationOpenSlots: "5"
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 1000);
    };

    const handleChangePassword = async () => {
        if (password.new !== password.confirm) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setPassword({ current: "", new: "", confirm: "" });
            setTimeout(() => setSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your account and teaching preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="teaching">Teaching</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal and professional details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        value={profile.fullName}
                                        onChange={handleProfileChange}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleProfileChange}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="employeeId">Employee ID</Label>
                                    <Input
                                        id="employeeId"
                                        name="employeeId"
                                        value={profile.employeeId}
                                        disabled
                                        className="bg-slate-100 dark:bg-slate-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={profile.subject}
                                        onChange={handleProfileChange}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="qualification">Qualification</Label>
                                    <Input
                                        id="qualification"
                                        name="qualification"
                                        value={profile.qualification}
                                        onChange={handleProfileChange}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleSaveProfile}
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Display Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Preferences</CardTitle>
                            <CardDescription>Customize how the system looks</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <Label>Theme</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {["light", "dark", "system"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTheme(t)}
                                            className={`p-3 rounded-lg border-2 transition-all capitalize ${
                                                theme === t
                                                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950"
                                                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                                            }`}
                                        >
                                            {t === "light" && <Globe className="h-4 w-4 mx-auto mb-1" />}
                                            {t === "dark" && <Moon className="h-4 w-4 mx-auto mb-1" />}
                                            {t === "system" && <Globe className="h-4 w-4 mx-auto mb-1" />}
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Password Tab */}
                <TabsContent value="password" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password to keep your account secure</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="current">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="current"
                                        name="current"
                                        type={showPassword ? "text" : "password"}
                                        value={password.current}
                                        onChange={handlePasswordChange}
                                        className="bg-white dark:bg-slate-900 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new">New Password</Label>
                                <Input
                                    id="new"
                                    name="new"
                                    type="password"
                                    value={password.new}
                                    onChange={handlePasswordChange}
                                    className="bg-white dark:bg-slate-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm">Confirm Password</Label>
                                <Input
                                    id="confirm"
                                    name="confirm"
                                    type="password"
                                    value={password.confirm}
                                    onChange={handlePasswordChange}
                                    className="bg-white dark:bg-slate-900"
                                />
                            </div>
                            <Button
                                onClick={handleChangePassword}
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Lock className="h-4 w-4 mr-2" />
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose what notifications you want to receive</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                {Object.entries(notifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <label className="flex items-center gap-3 cursor-pointer flex-1">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                                                className="w-4 h-4 rounded border-slate-300"
                                            />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <Button
                                onClick={handleSaveProfile}
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Bell className="h-4 w-4 mr-2" />
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Teaching Tab */}
                <TabsContent value="teaching" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Teaching Preferences</CardTitle>
                            <CardDescription>Set your office hours and consultation preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="maxClasses">Max Classes per Day</Label>
                                    <Input
                                        id="maxClasses"
                                        name="maxClasses"
                                        type="number"
                                        value={teaching.maxClasses}
                                        onChange={(e) => setTeaching({ ...teaching, maxClasses: e.target.value })}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="officeHours">Office Hours</Label>
                                    <Input
                                        id="officeHours"
                                        name="officeHours"
                                        value={teaching.officeHours}
                                        onChange={(e) => setTeaching({ ...teaching, officeHours: e.target.value })}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="consultationSlots">Consultation Slots Available</Label>
                                    <Input
                                        id="consultationSlots"
                                        name="consultationSlots"
                                        type="number"
                                        value={teaching.consultationOpenSlots}
                                        onChange={(e) => setTeaching({ ...teaching, consultationOpenSlots: e.target.value })}
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleSaveProfile}
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Teaching Settings
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {success && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    Changes saved successfully!
                </div>
            )}
        </div>
    );
}
