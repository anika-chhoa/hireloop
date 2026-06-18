
const baseURL=process.env.NEXT_PUBLIC_BASE_URI;

export const serverFetch=async(path)=>{
    const res=await fetch(`${baseURL}${path}`)
    return res.json()
}


export const serverMutation=async(path,data, action="POST")=>{
    const res=await fetch (`${baseURL}${path}`,{
        method:action,
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return res.json();
}

