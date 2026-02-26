"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, User, Phone, AlertCircle } from "lucide-react";

export default function StudentTransportation() {
    const myBus = {
        number: "KA-01-AB-1234",
        driver: "Mr. Rajesh Kumar",
        driverPhone: "+91-9876543210",
        capacity: "50",
        currentStudents: "45",
        route: "North-Central",
        pickupTime: "07:30 AM",
        dropoffTime: "04:00 PM",
        myStop: "Bus Stand",
        estimatedPickupTime: "07:35 AM",
        estimatedDropoffTime: "04:05 PM",
        fee: "₹2,500/month",
        feeStatus: "Paid"
    };

    const routeDetails = {
        name: "North-Central",
        stops: [
            { name: "Main Gate", time: "07:30 AM", distance: "0 km" },
            { name: "Bus Stand", time: "07:35 AM", distance: "2 km" },
            { name: "Market", time: "07:42 AM", distance: "4 km" },
            { name: "Hospital", time: "07:50 AM", distance: "6 km" },
            { name: "School", time: "08:00 AM", distance: "8 km" }
        ],
        totalDistance: "12 km",
        totalDuration: "45 mins"
    };

    const otherStudents = [
        { name: "Bob Smith", stop: "Bus Stand", pickupTime: "07:35 AM" },
        { name: "Charlie Lee", stop: "Market", pickupTime: "07:42 AM" },
        { name: "Diana Prince", stop: "Hospital", pickupTime: "07:50 AM" }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">My Transportation</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">View your bus details and route information</p>
            </div>

            {/* My Bus Information */}
            <Card className="border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                        <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                            {myBus.number.slice(-2)}
                        </div>
                        My Assigned Bus
                    </CardTitle>
                    <CardDescription className="text-purple-700 dark:text-purple-300">
                        {myBus.number} • {myBus.route} Route
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Bus Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-white dark:bg-slate-800">
                            <CardContent className="pt-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Pick-up Time</p>
                                <p className="text-lg font-bold text-purple-600">{myBus.pickupTime}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Est: {myBus.estimatedPickupTime}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-slate-800">
                            <CardContent className="pt-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Drop-off Time</p>
                                <p className="text-lg font-bold text-purple-600">{myBus.dropoffTime}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Est: {myBus.estimatedDropoffTime}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-slate-800">
                            <CardContent className="pt-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">My Stop</p>
                                <p className="text-lg font-bold text-purple-600">{myBus.myStop}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-slate-800">
                            <CardContent className="pt-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Monthly Fee</p>
                                <p className="text-lg font-bold text-purple-600">{myBus.fee}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Driver Information */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Driver Information</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full flex items-center justify-center font-bold text-lg">
                                RK
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{myBus.driver}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {myBus.driverPhone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fee Status */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Fee Status</p>
                            <p className="font-semibold text-slate-900 dark:text-white">February 2026</p>
                        </div>
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                            {myBus.feeStatus}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Route Map */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-purple-600" />
                        {routeDetails.name} Route
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Card>
                            <CardContent className="pt-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Total Distance</p>
                                <p className="text-2xl font-bold text-purple-600">{routeDetails.totalDistance}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-4">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Total Duration</p>
                                <p className="text-2xl font-bold text-purple-600">{routeDetails.totalDuration}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Route Stops</p>
                        <div className="space-y-0">
                            {routeDetails.stops.map((stop, idx) => (
                                <div key={idx} className={`flex items-center gap-4 p-3 ${myBus.myStop === stop.name ? 'bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-600 rounded' : 'border-b border-slate-200 dark:border-slate-700'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${myBus.myStop === stop.name ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className={`font-semibold ${myBus.myStop === stop.name ? 'text-purple-900 dark:text-purple-100' : 'text-slate-900 dark:text-white'}`}>
                                                {stop.name}
                                                {myBus.myStop === stop.name && <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">My Stop</span>}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{stop.distance}</p>
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="font-semibold text-slate-900 dark:text-white">{stop.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Co-passengers */}
            <Card>
                <CardHeader>
                    <CardTitle>Co-passengers from Your Stop</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {otherStudents.map((student, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full flex items-center justify-center font-bold text-sm">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{student.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{student.stop}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{student.pickupTime}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950">
                <CardHeader className="flex flex-row items-start gap-4">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                        <CardTitle className="text-amber-900 dark:text-amber-100">Important Guidelines</CardTitle>
                        <CardDescription className="text-amber-700 dark:text-amber-300 space-y-1 mt-2">
                            <p>• Reach your stop 5 minutes before the scheduled pick-up time</p>
                            <p>• Maintain discipline inside the bus</p>
                            <p>• Keep your belongings secure at all times</p>
                            <p>• In case of emergency, contact the bus driver or management immediately</p>
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
