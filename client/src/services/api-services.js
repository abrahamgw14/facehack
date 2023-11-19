import axios from "axios"

const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

export function getTimeline() {
    return http.get("/posts/timeline/6550ef155339b525ba6daa20") // Todos los posts
}

export function getUser() {
    return http.get("/users/6550ef155339b525ba6daa20") // /users/${post.userId}
}

export function getUserProfile() {
    return http.get("/posts/profile/" + username) // Todos los posts de un usuario DENTRO del perfil del usuario
}
