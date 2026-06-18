import { getApplicationsByUserId } from "@/lib/api/application";
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { Button, Card } from "@heroui/react";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getPlanById } from "@/lib/api/plans";

const ApplyJob = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-white min-h-[80vh] flex items-center justify-center">
        <Card className="w-full border border-orange-500/20 bg-[#0A0A0C] p-6 rounded-2xl text-center relative overflow-hidden">
          {/* Subtle Warning Glow */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 mb-4 border border-orange-500/20">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight">
            Access Restricted
          </h2>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Your profile is registered under an enterprise or **{user.role}**
            role. Only verified candidate talent profiles can apply to open
            positions.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <Link href={`/jobs/${id}`} className="w-full">
              <Button className="w-full bg-white/5 text-gray-300 text-xs font-semibold py-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Job Details
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full">
              <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition">
                Go to Workspace Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
  const applications = await getApplicationsByUserId(user.id);
  const hasApplied = applications.some((app) => app.jobId === id);
  if (hasApplied) {
    return (
      <div className="min-h-screen bg-[#030303] py-12 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            You have already applied for this position.
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Thank you for your interest in {job?.companyName}.
          </p>
        </div>
      </div>
    );
  }
  const plan=await getPlanById(user?.plan||"seeker_free")
  
 
  return (
    <div className="min-h-screen bg-[#030303] py-12 px-4 flex flex-col items-center justify-center">
      {/* Header Section */}

      {/* Form Component */}
      {applications.length < plan.maxApplicationPerMonth ? (
        <div>
          <div className="w-full max-w-7xl mx-auto text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Apply for{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {job?.jobTitle}
              </span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Complete the form below to submit your application to{" "}
              <span className="text-gray-300 font-medium">
                {job?.companyName}
              </span>
              .
            </p>
            <p>
              You have applied so far: {applications.length} out of{" "}
              {plan.maxApplicationPerMonth}
            </p>
          </div>
          <div className="w-full max-w-7xl">
            <JobApply applicant={user} job={job} />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl mx-auto p-8 bg-[#0A0A0C] border border-red-500/10 rounded-2xl text-center my-8 shadow-[0_8px_30px_rgba(239,68,68,0.02)] relative overflow-hidden">
          {/* Subtle Red Background Glow */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />

          {/* Limit Warning Icon */}
          <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white tracking-tight">
            Monthly Application Limit Reached
          </h3>

          <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
            You have submitted{" "}
            <span className="text-white font-semibold">
              {applications.length}
            </span>{" "}
            applications this month. Upgrade your plan to apply for more
            positions without interruptions.
          </p>

          {/* Progress Bar / Usage Counter */}
          <div className="mt-5 max-w-xs mx-auto bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full w-full" />
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            Usage: {applications.length} / {plan.maxApplicationPerMonth}{" "}
            standard applications
          </div>

          {/* Action Link Button */}
          <div className="mt-8">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold px-5 py-3 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all shadow-[0_4px_15px_rgba(124,58,237,0.15)] text-white"
            >
              Browse Premium Plans
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
