import { serverFetch } from "../core/server";

export const getPlanById = async (plan_id) => {
  return serverFetch(`/api/plans?plan_id=${plan_id}`);
};