<script lang="ts">
  import NavBar from "$lib/components/NavBar.svelte";
  import "$lib/styles/global.css";
</script>

<NavBar />
<div class="main">
  <slot />
</div>

<style>
  .main {
    margin-left: 240px;
    padding: 10px 30px;
  }
</style>
