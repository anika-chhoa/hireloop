import { getCompanyJobs } from "@/lib/api/jobs";
import { Table } from "@heroui/react";
import { Eye, PencilToSquare, TrashBin } from "@gravity-ui/icons";

const RecruiterJobs = async () => {
  const companyId = "company_123";
  const jobs = await getCompanyJobs(companyId);

  // Dynamic currency extractor for header
  const currencyHeader =
    jobs && jobs[0]?.currency ? jobs[0].currency.toUpperCase() : "USD";

  return (
    <div className="bg-black text-white p-8 min-h-screen">
      {/* Header section with theme colors */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className="text-sky-500">Manage </span>
          <span className="text-orange-500">Company Jobs</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Review, track, and update all active positions for your organization.
        </p>
      </div>

      {/* HeroUI Table */}
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Company jobs list"
            className="min-w-[900px]"
          >
            <Table.Header>
              <Table.Column isRowHeader className="text-violet-500">
                Job Title
              </Table.Column>
              <Table.Column className="text-violet-500">Type</Table.Column>
              <Table.Column className="text-violet-500">
                Salary Range ({currencyHeader})
              </Table.Column>
              <Table.Column className="text-violet-500">Deadline</Table.Column>
              <Table.Column className="text-violet-500">Location</Table.Column>
              <Table.Column className="text-violet-500">Status</Table.Column>
              <Table.Column className="text-violet-500 text-center">
                Actions
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {jobs && jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <Table.Row
                    key={job.id || index}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {/* Job Title & Main Tech info */}
                    <Table.Cell>
                      <div>
                        <div className="font-semibold text-white">
                          {job.jobTitle}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Req: {job.requirements}
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Job Type */}
                    <Table.Cell className="capitalize text-gray-300">
                      {job.jobType}
                    </Table.Cell>

                    {/* Formatted Salary */}
                    <Table.Cell className="text-gray-300 font-mono">
                      {Number(job.minSalary).toLocaleString()} -{" "}
                      {Number(job.maxSalary).toLocaleString()}
                    </Table.Cell>

                    {/* Deadline format */}
                    <Table.Cell className="text-gray-400">
                      {new Date(job.deadline).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Table.Cell>

                    {/* Dynamic Location Column */}
                    <Table.Cell>
                      {job.isRemote ? (
                        <span className="inline-flex items-center rounded-md bg-sky-500/10 px-2 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
                          Remote
                        </span>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex w-fit items-center rounded-md bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/10 mb-1">
                            On-site
                          </span>
                          <span className="text-sm text-zinc-300 pl-1 font-medium truncate max-w-[150px]" title={job.location}>
                            {job.location || "Dhaka"}
                          </span>
                        </div>
                      )}
                    </Table.Cell>

                    {/* Job Status badge */}
                    <Table.Cell>
                      {job.status === "active" ? (
                        <span className="inline-flex items-center rounded-md bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-400 ring-1 ring-inset ring-orange-500/20 capitalize">
                          {job.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-gray-400 capitalize">
                          {job.status}
                        </span>
                      )}
                    </Table.Cell>

                    {/* Action buttons order: View -> Edit -> Delete */}
                    <Table.Cell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View Details Button */}
                        <button
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {/* Edit Button */}
                        <button
                          className="p-2 text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition"
                          title="Edit Job"
                        >
                          <PencilToSquare className="h-4 w-4" />
                        </button>
                        {/* Delete Button */}
                        <button
                          className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition"
                          title="Delete Job"
                        >
                          <TrashBin className="h-4 w-4" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No jobs found for this company.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default RecruiterJobs;