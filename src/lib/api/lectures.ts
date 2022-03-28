import type { User } from "$lib/types"
import { api } from "./api";

export function getAllLectures() {

}

export async function getLectures(user: User) {
    return await api({
        endpoint: `lecture/${user.id}`,
        method: 'get', 
        token: user.token
    });
}

export async function getPosts(user: User) {
    return await api({
        endpoint: `lecture/post/${user.id}`,
        method: 'get', 
        token: user.token
    });
}

export function createLecture() {

}

export function createPost() {

}

export function enroll() {

}

export function withdraw() {

}

