<script context="module" lang="ts">
  export function load({ session }) {
    const { user } = session;

    if (user) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    return {};
  }
</script>

<script lang="ts">
  import "$lib/styles/auth.css";

  import { session } from "$app/stores";
  import { login } from "$lib/api/auth";
  import Button from "$lib/shared/Button.svelte";
  import type { LoginForm } from "$lib/types";

  let inputField: LoginForm = {
    username: "",
    password: "",
  };

  let error: string;

  async function submit() {
    const res = await login(inputField);
    console.log(res);
    if (res.error) {
      error = res.error;
      return;
    }

    const { id, token, userType } = res.body;

    $session["user"] = { id, token, userType };
    console.log($session["user"]);
  }
</script>

<div class="login">
  <h1>Login</h1>

  <a href="/auth/signup">Do not have account?</a>

  {#if error}
    <p>{error}</p>
  {/if}

  <form on:submit|preventDefault={submit}>
    <div class="form-field">
      <input
        type="text"
        bind:value={inputField.username}
        placeholder="Username"
      />
    </div>

    <div class="form-field">
      <input
        type="text"
        bind:value={inputField.password}
        placeholder="Password"
      />
    </div>

    <Button on:click={submit}>Login</Button>
  </form>
</div>
