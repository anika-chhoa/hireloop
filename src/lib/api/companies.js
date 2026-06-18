import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getAllCompanies=async()=>{
    return serverFetch("/api/companies")
}

export const getRecruiterCompany=async(recruiterId)=>{
    return serverFetch(`/api/my/company?recruiterId=${recruiterId}`)
}

export const getLoggedInRecruiterCompany=async()=>{
    const user=await getUserSession();
    return getRecruiterCompany(user?.id)
}