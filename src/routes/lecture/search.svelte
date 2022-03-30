<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";
  import { getAllLectures } from "$lib/api/lectures";

  export async function load({ session }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session.auth, { userTypes: ["S"] });

    if (!check) {
      return {
        status: 301,
        redirect: "/lecture",
      };
    }

    const res = await getAllLectures(session.auth);
    console.log(res.lectures);

    return {
      props: {
        lectures: res.lectures,
      },
    };
  }
</script>

<script lang="ts">
  import Page from "$lib/shared/Page.svelte";
  import Card from "$lib/shared/Card.svelte";
  import Button from "$lib/shared/Button.svelte";

  import { userInLecture } from "$lib/api/auth";
  import { enroll } from "$lib/api/lectures";
  import { session } from "$app/stores";
  import { goto } from "$app/navigation";

  export let lectures = [];

  async function enrollHandle(lecture: any) {
    const res = await enroll($session["auth"], lecture['_id']);
    console.log('enrollHandle', res);
    if (!res.error) {
      goto(`/lecture/${lecture['code']}`);
    }
  }
</script>

<div class="course-search">
  <Page title="Course Search" description="모든 강의를 검색할 수 있습니다." />

  <div class="lecture-list">
    {#each lectures as lecture}
      <div class="list-element">
        <Card>
          <h2>{lecture.name}</h2>
          {#await userInLecture($session["auth"], lecture["code"])}
            <p>Loading...</p>
          {:then check}
            {#if check}
              <p>수강중인 강의입니다</p>
            {:else}
              <Button on:click={() => enrollHandle(lecture)}
                >수강신청</Button
              >
            {/if}
          {/await}
        </Card>
      </div>
    {/each}
  </div>
</div>

<style>
  .list-element {
    margin: 16px;
  }
</style>
