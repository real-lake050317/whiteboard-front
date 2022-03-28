<script lang="ts">
  import "$lib/styles/global.css";
  import Navbar from "$lib/components/NavBar.svelte";
</script>

<Navbar />
<div class="main">
  <slot />
</div>

<style>
  .main {
    margin-left: 240px;
    padding: 10px 30px;
  }
</style>
