"use client"
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { useSession } from '@/lib/auth-client';
import { BriefcaseFill, Persons, Thunderbolt } from '@gravity-ui/icons';
import { SpinnerRoot } from '@heroui/react';
import { CircleCheck } from 'lucide-react';
import React from 'react';

const RecruiterDashboardHomePage = () => {
    const {data:session, isPending}=useSession();
    if(isPending){
        return <div className='w-full flex justify-center items-center'><SpinnerRoot color="current" /></div>
    }
    const user=session?.user;
    
    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: BriefcaseFill },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];
    return (
        <div>
            <div className='text-2xl font-semibold'>Welcome Back! {user.name}</div>
            <DashboardStats statsData={recruiterStats}/>
        </div>
    );
};

export default RecruiterDashboardHomePage;