import { login } from "$lib/api/auth";
import type { LoginForm } from "$lib/types";

export async function post({ request }) {
    const data = await request.formData();
    console.log(data);
    return {
        status: 200
    };
    // const {} = await login();

    // if (errors) {
    //   // return validation errors
    //   return {
    //     status: 400,
    //     body: { errors }
    //   };
    // }

    // // redirect to the newly created item
    // return {
    //   status: 303,
    //   headers: {
    //     location: `/items/${item.id}`
    //   }
    // };
}