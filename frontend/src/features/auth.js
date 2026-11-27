// purpose is to keep authentication-related API calls separate from your React components.

import api from "@/api"  // import the Axios instance

export const login = async (token)=>{
    try{
        const {data} = await api.post("/api/auth/login",{token})  // sending an HTTP POST request to your Express backend. directly extract the data property from the response object
        console.log(data)
        return data // returns the backend response to the component that called the login() function
    }catch(error){
        console.log(error)
    }
}

export const logout = async ()=>{
    try{
        const {data} = await api.get("/api/auth/logout")  // sends an HTTP GET request to your backend endpoint . directly extract the data property from the response object
        console.log(data)
        return data   // Returns the backend response to the component that called logout()
    }catch(error){
        console.log(error)
    }
}

// me() function is intended to fetch the information of the currently authenticated user from your Express backend
export const me = async (token)=>{
    try{
        const {data} = await api.get("/api/auth/me",{token})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}