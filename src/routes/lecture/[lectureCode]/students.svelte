<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";

  export async function load({ session, params }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session.auth, {
      userTypes: ["P"],
      lectureCode: params["lectureCode"],
    });

    if (!check) {
      return {
        status: 301,
        redirect: `/lecture/${params["lectureCode"]}`,
      };
    }

    return {};
  }
</script>

<div class="students">
  <p>A list of students in a course</p>
  <p>accessible only by professors</p>
</div>
