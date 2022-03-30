<script context="module" lang="ts">
  import { getLecturesOfUser } from "$lib/api/lectures";

  export async function load({ session }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const res = await getLecturesOfUser(session.auth);

    console.log("Lecture: ", res.lectures);
    return {
      props: {
        lectures: res.lectures,
      },
    };
  }
</script>

<script lang="ts">
  import Page from "$lib/shared/Page.svelte";
  import Button from "$lib/shared/Button.svelte";
  import ClickCard from "$lib/shared/ClickCard.svelte";

  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  export let lectures = [];
</script>

<div class="lectures">
  <Page title="Lectures" description="자신이 속한 강의들을 볼 수 있습니다." />

  {#if $session["auth"]}
    {#if $session["auth"].userType === "S"}
      <Button on:click={() => goto("/lecture/search")}>강의 검색</Button>
    {:else if $session["auth"].userType === "P"}
      <Button on:click={() => goto("/lecture/create")}>강의 만들기</Button>
    {/if}
  {/if}

  <div class="lecture-list">
    {#each lectures as lecture}
      <div class="list-element">
        <ClickCard on:click={() => goto(`/lecture/${lecture.code}`)}>
          <h2>{lecture.name}</h2>
        </ClickCard>
      </div>
    {/each}
  </div>
</div>

<style>
  .list-element {
    margin: 16px;
  }
</style>
