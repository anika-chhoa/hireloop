import { serverFetch } from "../core/server";

export const getApplicationsByUserId = async (applicantId) => {
  return serverFetch(`/api/applications?applicantId=${applicantId}`);
};
