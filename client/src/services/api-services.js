import axios from "axios"


const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

export function getTimeline() {
    return http.get("/posts/timeline/6550ef155339b525ba6daa20")
}


  