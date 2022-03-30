import type { Auth, LectureForm } from "$lib/types"
import { get, post } from "./api";

export function getAllLectures(auth: Auth) {
    return get('lecture', auth.token);
}

export async function getLecturesOfUser(auth: Auth) {
    return get('lecture/user', auth.token);
}

export async function getPostsOfUser(auth: Auth) {
    return get('lecture/user/post', auth.token);
}

export async function getLecture(auth: Auth, lectureCode: string) {
    const { lectures } = await getLecturesOfUser(auth);
    return {
        lecture: lectures.find(lecture => lecture.code === lectureCode)
    };
}

export async function getPost(auth: Auth, lectureCode: string, postId: string) {
    const { lecture } = await getLecture(auth, lectureCode);

    return {
        post: lecture.posts.find(post => post.postId === postId)
    }
}

export function createLecture(auth: Auth, lectureForm: LectureForm) {
    return post(`lecture`, { lecture: lectureForm }, auth.token);
}

export function createPost() {

}

export function enroll(auth: Auth, lectureId: string) {
    return post(`lecture/${lectureId}/enroll`, undefined, auth.token);
}

export function withdraw() {

}

