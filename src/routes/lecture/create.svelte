<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";

  export async function load({ session }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session.auth, { userTypes: ["P"] });

    if (!check) {
      return {
        status: 301,
        redirect: "/lecture",
      };
    }

    return {};
  }
</script>

<script lang="ts">
  import "$lib/styles/inputform.css";

  import Button from "$lib/shared/Button.svelte";

  import type { LectureForm } from "$lib/types";

  import { session } from "$app/stores";
  import { goto } from "$app/navigation";
  import { createLecture } from "$lib/api/lectures";

  let inputField: LectureForm = {
    code: "",
    name: "",
  };

  let error: string;

  async function submit() {
    console.log(inputField);
    const res = await createLecture($session["auth"], inputField);

    if (!res["error"]) goto(`/lecture/${inputField.code}`);
    error = res["error"];
  }
</script>

<div class="login">
  <h1>Create Lecture</h1>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <form on:submit|preventDefault={submit}>
    <div class="form-field">
      <input
        type="text"
        bind:value={inputField.code}
        placeholder="Lecture Code (ex: COSE101)"
      />
    </div>

    <div class="form-field">
      <input
        type="text"
        bind:value={inputField.name}
        placeholder="Lecture Name (ex: C Programming)"
      />
    </div>

    <Button>Create Lecture</Button>
  </form>
</div>
