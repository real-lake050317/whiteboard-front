import type { User } from "$lib/types"
import { api } from "./api";

export function getAllLectures() {

}

export async function getLectures(user: User) {
    return await api({
        endpoint: `lecture/${user.id}`,
        method: 'get', 
        token: user
    });
}

export async function getPosts(user: User) {
    return {
        status: 200,
        body: {
            posts: [
                {
                    title: 'title1',
                    body: 'asdkfsdlkf',
                    postID: 'Mar10',
                    lectureID: 'COSE101',
                },
                {
                    title: 'title2',
                    body: 'asdkfsdlkf',
                    postID: 'Mar14',
                    lectureID: 'COSE101',
                },
                {
                    title: 'title3',
                    body: 'asdkfsdlkf',
                    postID: 'Mar17',
                    lectureID: 'COSE101',
                }

            ]
        }
    };
    return await api({
        endpoint: `lecture/post/${user.id}`,
        method: 'get', 
        token: user
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

