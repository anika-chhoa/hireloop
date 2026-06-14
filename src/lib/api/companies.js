import { serverFetch } from "../core/server";



export const getRecruiterCompany=async(recruiterId)=>{
    return serverFetch(`/api/my/company?recruiterId=${recruiterId}`)
}