<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";

  export async function load({ session, params }) {
    if (!session["user"]) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session["user"], {
      userTypes: ["P"],
      lectureID: params["lectureID"],
    });

    if (!check) {
      return {
        status: 301,
        redirect: `/lecture/${params["lectureID"]}`,
      };
    }

    return {};
  }
</script>

<div class="post-create">
  <p>post writer tool</p>
  <p>accessible only by professors</p>
</div>
