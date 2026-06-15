import React from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { getJobById } from "@/lib/api/jobs";
import { 
  Compass, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Briefcase, 
  FileText, 
  Gift 
} from "@gravity-ui/icons";
import { Coins } from "lucide-react";

const JobDetails = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  // Fallback state if job data fails to load or is not found
  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-white">
        <p className="text-gray-400">Job specification details could not be found.</p>
        <Link href="/jobs" className="text-violet-400 mt-4 inline-block hover:underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  const {
    jobTitle,
    companyName,
    companyLogo,
    location,
    jobType,
    minSalary,
    maxSalary,
    currency,
    deadline,
    isRemote,
    jobCategory,
    responsibilities,
    requirements,
    benefits
  } = job;

  const formattedDeadline = new Date(deadline).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white min-h-screen">
      
      {/* Back navigation */}
      <Link href="/jobs" className="text-xs text-gray-500 hover:text-violet-400 transition flex items-center gap-1 mb-6">
        ← Back to open positions
      </Link>

      {/* HEADER SECTION PANEL */}
      <Card className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0C] p-6 sm:p-8 mb-8">
        {/* Glow ambient meshes */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-sky-600/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            {/* Corporate Logo Box */}
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 backdrop-blur-md">
              <img src={companyLogo} alt={companyName} className="h-full w-full object-contain" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">{companyName}</span>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5 leading-tight">{jobTitle}</h1>
            </div>
          </div>

          {/* Pill Tags */}
          <div className="flex flex-row sm:flex-col items-start gap-2 self-start sm:self-center">
            <span className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-300 capitalize font-medium">
              {jobType}
            </span>
            {isRemote && (
              <span className="text-[11px] px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 uppercase font-semibold tracking-wider">
                Remote
              </span>
            )}
          </div>
        </div>

        {/* METADATA GRID SUB-PANEL */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400 relative z-10">
          <div className="flex items-center justify-between bg-white/[0.02] px-4 py-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-sky-400" />
              <span className="font-medium text-gray-300">{location}</span>
            </div>
            <span className="text-xs text-gray-500 capitalize">{jobCategory}</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.02] px-4 py-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-2.5">
              <Coins className="h-4 w-4 text-violet-400" />
              <span className="font-medium text-gray-300">
                {minSalary} - {maxSalary} <span className="text-xs text-gray-500 ml-0.5">{currency}/mo</span>
              </span>
            </div>
            <span className="text-xs text-gray-500">Compensation</span>
          </div>
        </div>
      </Card>

      {/* CORE SPECIFICATION CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Dynamic Text Areas */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Responsibilities Block */}
          <div className="bg-[#0A0A0C] border border-white/5 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-violet-400" />
              Key Responsibilities
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
              {responsibilities}
            </p>
          </div>

          {/* Requirements Block */}
          <div className="bg-[#0A0A0C] border border-white/5 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-sky-400" />
              Role Requirements
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
              {requirements}
            </p>
          </div>

          {/* Perks & Benefits Block */}
          {benefits && (
            <div className="bg-[#0A0A0C] border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <Gift className="h-4 w-4 text-orange-400" />
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                {benefits}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Deadline Sticky Widget & Call To Action */}
        <div className="lg:sticky lg:top-6 flex flex-col gap-4">
          <div className="bg-[#0A0A0C] border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-white/[0.02] px-4 py-3.5 rounded-xl border border-white/5">
              <Clock className="h-5 w-5 text-gray-400 shrink-0" />
              <div>
                <span className="text-[10px] block uppercase tracking-wider text-gray-500 font-bold">
                  Application Deadline
                </span>
                <span className="text-xs text-gray-200 font-semibold mt-0.5 block">
                  {formattedDeadline}
                </span>
              </div>
            </div>

            <Link href={`/jobs/${id}/apply`} className="w-full">
              <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-bold py-4 rounded-xl hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/10 flex items-center justify-center gap-2 transition-all">
                Apply for this Position
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="px-2 text-center">
            <span className="text-[10px] text-gray-600">
              By applying, you agree to share your verified profile data with {companyName}.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default JobDetails;