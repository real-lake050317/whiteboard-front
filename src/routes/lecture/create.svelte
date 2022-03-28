<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";

  export async function load({ session }) {
    if (!session["user"]) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session["user"], { userTypes: ["P"] });

    if (!check) {
      return {
        status: 301,
        redirect: "/lecture",
      };
    }

    return {};
  }
</script>
