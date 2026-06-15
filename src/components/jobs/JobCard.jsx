import React from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { Compass, Clock, ChevronRight, ShieldCheck } from "@gravity-ui/icons";
import { Coins } from "lucide-react";

export default function JobCard({ job }) {
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
    _id
  } = job;

  const jobId = _id?.$oid || _id;

  const formattedDeadline = new Date(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  return (
    <Card className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0C] p-5 text-white transition hover:border-violet-500/30 hover:shadow-[0_8px_25px_rgba(124,58,237,0.12)]">

      {/* subtle glow */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-sky-600/5 blur-3xl" />

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 relative">
        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
            <img src={companyLogo} alt={companyName} className="h-full w-full object-contain" />
          </div>

          <div>
            <h3 className="text-sm text-gray-400">{companyName}</h3>
            <h2 className="text-lg font-semibold text-white leading-tight line-clamp-2">
              <Link href={`/jobs/${jobId}`} className="hover:text-violet-400 transition">
                {jobTitle}
              </Link>
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-300 capitalize">
            {jobType}
          </span>

          {isRemote && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 uppercase">
              Remote
            </span>
          )}
        </div>
      </div>

      {/* INFO ROW */}
      <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-gray-400">

        <div className="flex items-center justify-between bg-white/[0.02] px-3 py-2 rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-sky-400" />
            <span>{location}</span>
          </div>
          <span className="text-gray-500">{jobCategory}</span>
        </div>

        <div className="flex items-center justify-between bg-white/[0.02] px-3 py-2 rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-violet-400" />
            <span>
              {minSalary} - {maxSalary}
              <span className="text-[10px] text-gray-500 ml-1">{currency}/mo</span>
            </span>
          </div>

          <span className="text-gray-500">Salary</span>
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>
            Closes <span className="text-gray-300">{formattedDeadline}</span>
          </span>
        </div>

        <Link href={`/jobs/${jobId}`}>
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold px-4 py-2 rounded-xl hover:from-violet-500 hover:to-indigo-500 flex items-center gap-1.5">
            Apply
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </Link>

      </div>
    </Card>
  );
}