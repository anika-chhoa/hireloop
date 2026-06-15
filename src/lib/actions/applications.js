"use server"
import { serverMutation } from "../core/server"

export const submitApplication=async(newApplication)=>{
    return serverMutation("/api/applications",newApplication)
}
