<script lang="ts">
  import "$lib/styles/inputform.css";
  import Button from "$lib/shared/Button.svelte";

  import type { SignupForm } from "$lib/types";
  import { post } from "$lib/api/utils";
  import { goto } from "$app/navigation";

  let inputField: SignupForm = {
    username: "",
    password: "",
    name: "",
    schoolId: "",
    userType: "S",
  };

  let error: string;

  async function submit() {
    const res = await post("/api/signup", inputField);

    if (!res["error"]) goto("/auth/login");

    error = res["error"];
  }
</script>

<div class="signup">
  <h1>Sign Up</h1>
  <a href="/auth/login">Have account?</a>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <form on:submit|preventDefault={submit}>
    <input
      type="text"
      bind:value={inputField.username}
      placeholder="Username"
    />

    <input
      type="text"
      bind:value={inputField.password}
      placeholder="Password"
    />

    <input
      type="text"
      bind:value={inputField.name}
      placeholder="Full Name (ex: John Doe)"
    />

    <input
      type="text"
      bind:value={inputField.schoolId}
      placeholder="School ID (ex: 2022320082)"
    />

    <div class="radio-field">
      <label>
        <input type="radio" bind:group={inputField.userType} value={"S"} />
        학생
      </label>
      <label>
        <input type="radio" bind:group={inputField.userType} value={"P"} />
        교수
      </label>
    </div>

    <Button>Sign Up</Button>
  </form>
</div>
