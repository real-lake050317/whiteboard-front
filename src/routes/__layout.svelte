<script lang="ts" context="module">
  export async function load({ url, session }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    if (url.pathname === '/') {
      return {
        status: 301,
        redirect: "/dashboard",
      };
    }

    return {};
  }
</script>

<script lang="ts">
  // where all the init script is called

  // get local storage

  // auth check
</script>

<nav>
  <a href="/course">Courses</a>
  <a href="/dashboard">Dashboard</a>
</nav>

<slot />
