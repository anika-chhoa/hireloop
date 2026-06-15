import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  return res.json();
};
export const getAllJobs = async () => {
  return serverFetch(`/api/jobs`);
};

export const getJobById = async (id) => {
  return serverFetch(`/api/jobs/${id}`);
};
