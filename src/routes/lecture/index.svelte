<script context="module" lang="ts">
  export async function load({ session }) {
    if (!session["user"]) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    return {};
  }
</script>

<div class="courses">
  <p>Your list of courses</p>
</div>
