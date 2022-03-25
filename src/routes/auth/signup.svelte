<script lang="ts">
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
  <form on:submit|preventDefault={submit}>
    <div class="form-field">
      <input type="text" bind:value={inputField.username} />
    </div>

    <div class="form-field">
      <input type="text" bind:value={inputField.password} />
    </div>

    <div class="form-field">
      <input type="text" bind:value={inputField.name} />
    </div>

    <div class="form-field">
      <input type="text" bind:value={inputField.schoolID} />
    </div>

    <div class="form-field">
      <label>
        <input type="radio" bind:group={inputField.userType} value={"S"} />
        학생
      </label>
      <label>
        <input type="radio" bind:group={inputField.userType} value={"P"} />
        교수
      </label>
    </div>

    <button type="submit" />
  </form>
</div>

<style>
  .form-field {
    margin: 18px auto;
  }
  input {
    width: 100%;
    border-radius: 6px;
  }
</style>
