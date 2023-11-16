import axios from "axios"

const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

export function getTimeline() {
    return http.get("/posts/timeline/654d3576a987e3628e02a1dc")
}

export function getUser() {
    return http.get(`/users/654d3576a987e3628e02a1dc`)
}