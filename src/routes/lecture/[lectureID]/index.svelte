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

<div class="course">
  <p>A Course with id</p>
  <p>You can see list of posts of this course</p>
</div>
