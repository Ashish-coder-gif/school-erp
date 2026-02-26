"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Calendar, AlertCircle, Edit2, Trash2 } from "lucide-react";

export default function AdminTransportation() {
    const [buses, setBuses] = useState([
        {
            id: "BUS001",
            number: "KA-01-AB-1234",
            driver: "Mr. Rajesh Kumar",
            capacity: "50",
            currentStudents: "45",
            route: "North-Central",
            pickupTime: "07:30 AM",
            dropoffTime: "04:00 PM",
            status: "active",
            fee: "₹2,500/month"
        },
        {
            id: "BUS002",
            number: "KA-01-AB-1235",
            driver: "Mr. Vikram Singh",
            capacity: "50",
            currentStudents: "48",
            route: "South-West",
            pickupTime: "07:45 AM",
            dropoffTime: "04:15 PM",
            status: "active",
            fee: "₹2,500/month"
        },
        {
            id: "BUS003",
            number: "KA-01-AB-1236",
            driver: "Mr. Ahmed Khan",
            capacity: "45",
            currentStudents: "40",
            route: "East-Industrial",
            pickupTime: "08:00 AM",
            dropoffTime: "04:30 PM",
            status: "active",
            fee: "₹2,200/month"
        }
    ]);

    const [routes, setRoutes] = useState([
        {
            id: "R001",
            name: "North-Central",
            stops: ["Main Gate", "Bus Stand", "Market", "Hospital", "School"],
            totalDistance: "12 km",
            duration: "45 mins",
            buses: ["BUS001"]
        },
        {
            id: "R002",
            name: "South-West",
            stops: ["Railway Station", "Shopping Mall", "Park", "Lake View", "School"],
            totalDistance: "15 km",
            duration: "55 mins",
            buses: ["BUS002"]
        },
        {
            id: "R003",
            name: "East-Industrial",
            stops: ["Factory Circle", "Tech Park", "Residential Area", "School"],
            totalDistance: "10 km",
            duration: "40 mins",
            buses: ["BUS003"]
        }
    ]);

    const [students, setStudents] = useState([
        { id: "STU001", name: "Alice Johnson", bus: "BUS001", route: "North-Central", feeStatus: "Paid" },
        { id: "STU002", name: "Bob Smith", bus: "BUS001", route: "North-Central", feeStatus: "Pending" },
        { id: "STU003", name: "Charlie Brown", bus: "BUS002", route: "South-West", feeStatus: "Paid" },
        { id: "STU004", name: "Diana Prince", bus: "BUS003", route: "East-Industrial", feeStatus: "Paid" },
        { id: "STU005", name: "Edward Norton", bus: "BUS002", route: "South-West", feeStatus: "Pending" }
    ]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Transportation Management</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Manage buses, routes, drivers, and student assignments</p>
            </div>

            <Tabs defaultValue="buses" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="buses">Buses</TabsTrigger>
                    <TabsTrigger value="routes">Routes</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>

                {/* Buses Tab */}
                <TabsContent value="buses" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">All Buses</h2>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add New Bus</Button>
                    </div>

                    <div className="grid gap-6">
                        {buses.map((bus) => (
                            <Card key={bus.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">B</div>
                                                {bus.number}
                                            </CardTitle>
                                            <CardDescription>Route: {bus.route}</CardDescription>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                            {bus.status === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Driver</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{bus.driver}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Capacity</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{bus.currentStudents}/{bus.capacity}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Monthly Fee</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{bus.fee}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Pick-up Time</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{bus.pickupTime}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Drop-off Time</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{bus.dropoffTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="sm"><Edit2 className="h-4 w-4 mr-1" />Edit</Button>
                                        <Button variant="outline" size="sm" className="text-red-600"><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Routes Tab */}
                <TabsContent value="routes" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Bus Routes</h2>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add New Route</Button>
                    </div>

                    <div className="grid gap-6">
                        {routes.map((route) => (
                            <Card key={route.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        {route.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Stops</p>
                                        <div className="flex flex-wrap gap-2">
                                            {route.stops.map((stop, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm">
                                                    {stop}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Total Distance</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{route.totalDistance}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{route.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Buses Assigned</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{route.buses.length}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="sm"><Edit2 className="h-4 w-4 mr-1" />Edit</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Student Assignments Tab */}
                <TabsContent value="assignments" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Student Bus Assignments</h2>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Assign Bus</Button>
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-slate-200 dark:border-slate-700">
                                        <tr>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Student Name</th>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Bus Number</th>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Route</th>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Fee Status</th>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                <td className="py-3 px-4 text-slate-900 dark:text-white">{student.name}</td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{student.bus}</td>
                                                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{student.route}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        student.feeStatus === 'Paid' 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {student.feeStatus}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button variant="outline" size="sm">View</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Transport Fee Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                <CardHeader>
                    <CardTitle className="text-blue-900 dark:text-blue-100">Transportation Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">Total Buses</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{buses.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">Total Routes</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{routes.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">Students Using Buses</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{students.length}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">Monthly Revenue</p>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">₹3.85L</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
