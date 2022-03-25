import { signup } from "$lib/api/auth";
import type { SignupForm } from "$lib/types";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const data: SignupForm = await request.json();
    console.log(data);

    // validation of data
    data.username.trim();
    data.password.trim();
    data.name.trim();
    data.schoolID.trim();

    const res = signup(data);
}