import type { Auth, LectureForm, PostForm } from "$lib/types"
import { del, get, post } from "./api";

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
    console.log("Lectures:", lectures, lectureCode);
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
    return post('lecture', { lecture: lectureForm }, auth.token);
}

export async function createPost(auth: Auth, lectureCode: string, postForm: PostForm) {
    const { lecture } = await getLecture(auth, lectureCode);
    console.log(lecture);
    return post(`lecture/${lecture._id}/post`, { post: postForm }, auth.token);
}

export function enroll(auth: Auth, lectureId: string) {
    return post(`lecture/${lectureId}/enroll`, undefined, auth.token);
}

export async function getStudentsOfLecture(auth: Auth, lectureCode: string) {
    const { lecture } = await getLecture(auth, lectureCode);
    return get(`lecture/${lecture._id}/student`, auth.token);
}
export async function removeStudent(auth: Auth, lectureCode: string, studentId: string) {
    const { lecture } = await getLecture(auth, lectureCode);
    return del(`lecture/${lecture._id}/student/${studentId}`, auth.token);
}