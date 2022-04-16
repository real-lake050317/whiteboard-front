<script context="module" lang="ts">
  export function load({ session }) {
    if (session.auth) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    return {};
  }
</script>

<script lang="ts">
  import "$lib/styles/inputform.css";

  import Button from "$lib/shared/Button.svelte";

  import type { LoginForm } from "$lib/types";
  import { post } from "$lib/api/utils";

  import { session } from "$app/stores";
  import { goto } from "$app/navigation";

  let inputField: LoginForm = {
    username: "",
    password: "",
  };

  let error: string;

  async function submit() {
    console.log(inputField);
    const res = await post("/api/login", inputField);
    console.log(res);

    error = res["error"];

    if (res["user"]) {
      $session["auth"] = res["user"];
      $session["auth"].token = res["token"];
      goto("/");
    }
  }
</script>

<div class="login">
  <h1>Login</h1>

  <a href="/auth/signup">Do not have account?</a>

  {#if error}
    <p class="error">{error}</p>
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
        type="password"
        bind:value={inputField.password}
        placeholder="Password"
      />
    </div>

    <Button>Login</Button>
  </form>
</div>
