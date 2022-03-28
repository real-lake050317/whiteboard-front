<script lang="ts">
  import Card from "$lib/shared/Card.svelte";

  export let title: string;
  export let previewBody: string;
</script>

<div class="post-preview">
  <Card>
    <h1>{title}</h1>
    <p>{previewBody}</p>
  </Card>
</div>
