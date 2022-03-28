<script lang="ts">
  import "$lib/styles/auth.css";
  import Button from "$lib/shared/Button.svelte";

  import { post } from "$lib/api/util";
  import type { SignupForm } from "$lib/types";

  let inputField: SignupForm = {
    username: "",
    password: "",
    name: "",
    schoolID: "",
    userType: "S",
  };

  function submit() {
    post("/auth/signup", inputField);
  }
</script>

<div class="signup">
  <h1>Sign Up</h1>
  <a href="/auth/login">Have account?</a>

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
      bind:value={inputField.schoolID}
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

    <Button on:click={submit}>Sign Up</Button>
  </form>
</div>
