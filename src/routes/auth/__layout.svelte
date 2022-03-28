<script lang="ts">
  import Card from "$lib/shared/Card.svelte";
</script>

<div class="auth">
  <Card>
    <slot />
  </Card>
</div>

<style>
  .auth {
    width: 600px;
    margin: 50px auto;
  }
</style>
