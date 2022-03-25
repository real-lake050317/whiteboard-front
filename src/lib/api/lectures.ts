import type { User } from "$lib/types"
import { api } from "./api";

export function getAllLectures() {

}

export async function getLectures(user: User) {
    return await api({
        endpoint: `/lecture/${user.id}`,
        method: 'get', 
        user
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