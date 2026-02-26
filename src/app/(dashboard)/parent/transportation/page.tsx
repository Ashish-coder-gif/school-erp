"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, User, Phone, AlertCircle, CheckCircle } from "lucide-react";

export default function ParentTransportation() {
    const children = [
        {
            id: "CHILD001",
            name: "Alice Johnson",
            class: "10-A",
            bus: {
                number: "KA-01-AB-1234",
                driver: "Mr. Rajesh Kumar",
                driverPhone: "+91-9876543210",
                route: "North-Central",
                pickupTime: "07:30 AM",
                dropoffTime: "04:00 PM",
                myStop: "Bus Stand",
                capacity: "50",
                currentStudents: "45"
            },
            fee: "₹2,500/month",
            feeStatus: "Paid",
            attendance: "18/20 days"
        },
        {
            id: "CHILD002",
            name: "Bob Johnson",
            class: "8-B",
            bus: {
                number: "KA-01-AB-1235",
                driver: "Mr. Vikram Singh",
                driverPhone: "+91-9876543211",
                route: "South-West",
                pickupTime: "07:45 AM",
                dropoffTime: "04:15 PM",
                myStop: "Shopping Mall",
                capacity: "50",
                currentStudents: "48"
            },
            fee: "₹2,500/month",
            feeStatus: "Pending",
            attendance: "19/20 days"
        }
    ];

    const [selectedChild, setSelectedChild] = useState(children[0]);

    const routeDetails = {
        "North-Central": {
            stops: [
                { name: "Main Gate", time: "07:30 AM" },
                { name: "Bus Stand", time: "07:35 AM" },
                { name: "Market", time: "07:42 AM" },
                { name: "Hospital", time: "07:50 AM" },
                { name: "School", time: "08:00 AM" }
            ],
            totalDistance: "12 km",
            totalDuration: "45 mins"
        },
        "South-West": {
            stops: [
                { name: "Railway Station", time: "07:45 AM" },
                { name: "Shopping Mall", time: "07:55 AM" },
                { name: "Park", time: "08:05 AM" },
                { name: "Lake View", time: "08:12 AM" },
                { name: "School", time: "08:20 AM" }
            ],
            totalDistance: "15 km",
            totalDuration: "55 mins"
        }
    };

    const currentRoute = routeDetails[selectedChild.bus.route as keyof typeof routeDetails];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Children's Transportation</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor your children's bus details and routes</p>
            </div>

            {/* Children Selection */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Your Children</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {children.map((child) => (
                        <Card
                            key={child.id}
                            className={`cursor-pointer transition-all ${
                                selectedChild.id === child.id
                                    ? 'border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-950 shadow-lg'
                                    : 'hover:shadow-md'
                            }`}
                            onClick={() => setSelectedChild(child)}
                        >
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-amber-200 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full flex items-center justify-center font-bold text-lg">
                                        {child.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-lg text-slate-900 dark:text-white">{child.name}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Class {child.class}</p>
                                        <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">
                                            Bus: {child.bus.number}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Selected Child's Details */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Details for {selectedChild.name}</h2>

                {/* Bus Information Card */}
                <Card className="border-amber-200 dark:border-amber-900 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                            <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                                {selectedChild.bus.number.slice(-2)}
                            </div>
                            Bus Assignment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Bus Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Card className="bg-white dark:bg-slate-800">
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Bus Number</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedChild.bus.number}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-slate-800">
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Pick-up Time</p>
                                    <p className="text-lg font-bold text-amber-600">{selectedChild.bus.pickupTime}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-slate-800">
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Drop-off Time</p>
                                    <p className="text-lg font-bold text-amber-600">{selectedChild.bus.dropoffTime}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-slate-800">
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Stop Name</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedChild.bus.myStop}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-slate-800">
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Monthly Fee</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedChild.fee}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-slate-800">
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Attendance</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedChild.attendance}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Driver Information */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Driver Information</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-200 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full flex items-center justify-center font-bold">
                                    {selectedChild.bus.driver.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{selectedChild.bus.driver}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                                        <Phone className="h-4 w-4" />
                                        {selectedChild.bus.driverPhone}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fee Status */}
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Transportation Fee Status</p>
                                <p className="font-semibold text-slate-900 dark:text-white">February 2026</p>
                            </div>
                            <span className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 ${
                                selectedChild.feeStatus === 'Paid'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {selectedChild.feeStatus === 'Paid' && <CheckCircle className="h-4 w-4" />}
                                {selectedChild.feeStatus}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Route Map */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-amber-600" />
                            {selectedChild.bus.route} Route
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Card>
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Distance</p>
                                    <p className="text-2xl font-bold text-amber-600">{currentRoute.totalDistance}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Duration</p>
                                    <p className="text-2xl font-bold text-amber-600">{currentRoute.totalDuration}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Bus Stops</p>
                            <div className="space-y-0">
                                {currentRoute.stops.map((stop, idx) => (
                                    <div key={idx} className={`flex items-center gap-4 p-3 ${selectedChild.bus.myStop === stop.name ? 'bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-600 rounded' : 'border-b border-slate-200 dark:border-slate-700'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${selectedChild.bus.myStop === stop.name ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                            {idx + 1}
                                        </div>
                                        <p className={`font-semibold flex-1 ${selectedChild.bus.myStop === stop.name ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-white'}`}>
                                            {stop.name}
                                            {selectedChild.bus.myStop === stop.name && <span className="ml-2 text-xs bg-amber-600 text-white px-2 py-1 rounded">Your Child's Stop</span>}
                                        </p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{stop.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Important Notice */}
            <Card className="border-blue-300 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
                <CardHeader className="flex flex-row items-start gap-4">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                        <CardTitle className="text-blue-900 dark:text-blue-100">Parent Guidelines</CardTitle>
                        <CardDescription className="text-blue-700 dark:text-blue-300 space-y-1 mt-2">
                            <p>• Ensure your child reaches the bus stop 5 minutes early</p>
                            <p>• Keep the driver's contact number saved for emergencies</p>
                            <p>• Pay transportation fees on time</p>
                            <p>• Inform the school if your child will not use the bus on a particular day</p>
                            <p>• Monitor your child's attendance in the bus service</p>
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
