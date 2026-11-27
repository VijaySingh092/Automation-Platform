// this file is to create a centralized API communication setup for our frontend.
// instead of configuring Axios separately in every React component, we create one file that stores the common Axios configuration and reuse it everywhere.

import axios from 'axios'

// Creates a reusable Axios object with predefined settings.
const api = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL || "http://localhost:8000",  // Sets the default backend address. Every request uses this address unless overridden.
    withCredentials:true  // Allows applicable cookies to be included in cross-origin requests.
})

export default api  // Makes this configured Axios instance available to other files.