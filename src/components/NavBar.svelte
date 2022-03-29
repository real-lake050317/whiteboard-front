<script lang="ts">
  import Button from "$lib/shared/Button.svelte";

  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  function logout() {
    $session["user"] = null;
    goto("/");
  }
</script>

<div class="navbar">
  <h1>WhiteBoard</h1>

  <a href="/dashboard">Dashboard</a>
  <a href="/lecture">Lecture</a>

  <div class="logout">
    {#if $session["user"]}
      <Button on:click={logout}>Logout</Button>
    {/if}
  </div>

  <div class="copyright">
    <p>© 2022 Jungwoong Kim</p>
  </div>
</div>

<style>
  h1 {
    text-align: center;
    background: -webkit-linear-gradient(#666, #ccc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-top: 20px;
  }
  .navbar {
    margin: 0;
    padding: 0;
    width: 240px;
    background-color: #f1f1f1;
    position: fixed;
    height: 100%;
  }
  a {
    display: block;
    color: #000;
    padding: 12px 18px;
    text-decoration: none;
  }

  a:hover {
    background-color: #777;
    color: white;
  }

  .copyright,
  .logout {
    text-align: center;
  }
</style>
