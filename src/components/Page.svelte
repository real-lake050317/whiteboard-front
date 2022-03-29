<script lang="ts">
    export let title: string = "";
    export let description: string = "";
</script>

<div class="page">
    <h1>{title}</h1>
    {#if description}
        <p>{description}</p>
    {/if}
    <slot />
</div>