<button on:click>
  <slot />
</button>

<style>
  button {
    border: 0;
    margin: 0;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
    font-weight: bold;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  }
</style>
