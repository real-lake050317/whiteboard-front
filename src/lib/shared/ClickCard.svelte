<div class="card" on:click>
  <slot />
</div>

<style>
  .card {
    background: #fff;
    padding: 30px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    text-align: left;
  }

  .card:hover {
    cursor: pointer;
  }
</style>
