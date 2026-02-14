'use client'
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import React from 'react';

const JobPreference: React.FC<{ OpenDrawer: React.JSX.Element }> = ({ OpenDrawer }) => {
    return (
        <div>
            <Card>
                <CardContent>
                    <CardTitle className="font-semibold text-nowrap text-lg">
                        Add preferences to get match
                    </CardTitle>
                    <div className="space-y-2">
                        <span className="flex gap-2 flex-row mt-2 text-sm font-normal tracking-tight text-gray-600 items-center">
                            Preferred job role{" "}
                            {OpenDrawer}
                        </span>
                        <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                            {[
                                "frontend developer",
                                "mern stack developer",
                                "full stack developer",
                            ].map((ite) => (
                                <div
                                    key={`prefferred-job-${ite}`}
                                    className="rounded-full capitalize px-2.5 py-2.5 w-fit bg-gray-100 font-medium text-sm tracking-wide text-gray-800"
                                >
                                    {ite}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="inline-flex mt-2 text-sm font-normal tracking-tight text-gray-600 items-center gap-1">
                            Preferred work location{" "}
                            {OpenDrawer}
                        </span>
                        <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                            {[
                                "pune",
                                "Noida",
                                "Mumbai (All Areas)",
                                "Mumbai",
                                "Kolkata",
                                "Hyderabad/Secunderabad",
                                "Delhi / NCR",
                                "Chennai",
                                "Bangalore/Bengaluru",
                                "Ahmedabad",
                            ].map((ite) => (
                                <div
                                    key={`prefferred-job-${ite}`}
                                    className="rounded-full capitalize px-2.5 py-2.5 w-fit bg-gray-100 font-medium text-sm tracking-wide text-gray-800"
                                >
                                    {ite}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="inline-flex mt-2 text-sm font-normal tracking-tight text-gray-600 items-center gap-1">
                            Preferred Salary{" "}
                            {OpenDrawer}
                        </span>
                        <div className="gap-2 w-full flex-wrap flex items-center flex-1 justify-start">
                            {["₹ 6,60,000"].map((ite) => (
                                <div
                                    key={`prefferred-job-${ite}`}
                                    className="rounded-full capitalize px-2.5 py-2.5 w-fit bg-gray-100 font-medium text-sm tracking-wide text-gray-800"
                                >
                                    {ite}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default JobPreference;
