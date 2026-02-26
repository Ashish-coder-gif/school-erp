"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Clock, AlertCircle } from "lucide-react";

export default function TeacherTransportation() {
    const buses = [
        {
            id: "BUS001",
            number: "KA-01-AB-1234",
            driver: "Mr. Rajesh Kumar",
            driverPhone: "+91-9876543210",
            capacity: "50",
            currentStudents: "45",
            route: "North-Central",
            pickupTime: "07:30 AM",
            dropoffTime: "04:00 PM",
            status: "active",
            students: ["Alice Johnson", "Bob Smith", "Charlie Lee"]
        },
        {
            id: "BUS002",
            number: "KA-01-AB-1235",
            driver: "Mr. Vikram Singh",
            driverPhone: "+91-9876543211",
            capacity: "50",
            currentStudents: "48",
            route: "South-West",
            pickupTime: "07:45 AM",
            dropoffTime: "04:15 PM",
            status: "active",
            students: ["Diana Prince", "Edward Norton"]
        }
    ];

    const routes = [
        {
            name: "North-Central",
            stops: ["Main Gate", "Bus Stand", "Market", "Hospital", "School"],
            distance: "12 km",
            duration: "45 mins"
        },
        {
            name: "South-West",
            stops: ["Railway Station", "Shopping Mall", "Park", "Lake View", "School"],
            distance: "15 km",
            duration: "55 mins"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Transportation Information</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">View details about school buses and routes</p>
            </div>

            {/* Bus Information */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Active Buses</h2>
                <div className="grid gap-6">
                    {buses.map((bus) => (
                        <Card key={bus.id} className="hover:shadow-lg transition-shadow border-emerald-200 dark:border-emerald-900">
                            <CardHeader className="bg-emerald-50 dark:bg-emerald-950 border-b border-emerald-200 dark:border-emerald-800">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                                            {bus.number.slice(-2)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-emerald-900 dark:text-emerald-100">{bus.number}</CardTitle>
                                            <CardDescription className="text-emerald-700 dark:text-emerald-300">Route: {bus.route}</CardDescription>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                        Active
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {/* Driver Details */}
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Driver Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Name</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{bus.driver}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{bus.driverPhone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bus Details */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Card>
                                        <CardContent className="pt-4">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Capacity</p>
                                            <p className="text-2xl font-bold text-emerald-600">{bus.currentStudents}/{bus.capacity}</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-4">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Pick-up Time</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">{bus.pickupTime}</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-4">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Drop-off Time</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white">{bus.dropoffTime}</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Students in Bus */}
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Students in this Bus
                                    </h3>
                                    <div className="space-y-2">
                                        {bus.students.map((student, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                                                <div className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-semibold">
                                                    {student.charAt(0)}
                                                </div>
                                                <span className="text-slate-700 dark:text-slate-300">{student}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Routes Information */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Bus Routes</h2>
                <div className="grid gap-6">
                    {routes.map((route, idx) => (
                        <Card key={idx} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-emerald-600" />
                                    {route.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Bus Stops</p>
                                    <div className="space-y-1">
                                        {route.stops.map((stop, i) => (
                                            <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                                {stop}
                                                {i < route.stops.length - 1 && (
                                                    <div className="flex-1 border-t border-dashed border-slate-300 dark:border-slate-600 mx-2"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Total Distance</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{route.distance}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Approx Duration</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{route.duration}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Important Notice */}
            <Card className="border-yellow-300 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950">
                <CardHeader className="flex flex-row items-start gap-4">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                        <CardTitle className="text-yellow-900 dark:text-yellow-100">Transportation Guidelines</CardTitle>
                        <CardDescription className="text-yellow-700 dark:text-yellow-300">
                            • Students should reach their designated stop 5 minutes before pick-up time<br />
                            • In case of emergency, contact the bus driver immediately<br />
                            • Report any safety concerns to the administration<br />
                            • Bus fees must be paid on time to ensure continuous service
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
