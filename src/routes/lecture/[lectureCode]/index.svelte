<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";
  import { getLecture } from "$lib/api/lectures";

  export async function load({ session, params }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session.auth, {
      lectureCode: params.lectureCode,
    });

    if (!check) {
      return {
        status: 301,
        redirect: `/lecture`,
      };
    }

    const { lecture } = await getLecture(session.auth, params.lectureCode);

    if (!lecture) {
      return {
        status: 301,
        redirect: `/lecture`,
      };
    }

    return {
      props: {
        lecture,
      },
    };
  }
</script>

<script lang="ts">
  import Page from "$lib/shared/Page.svelte";
  import ClickCard from "$lib/shared/ClickCard.svelte";
  import Button from "$lib/shared/Button.svelte";
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  export let lecture: any;

  function dateFormatter(dateString: string) {
    const date = new Date(dateString);
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }
</script>

<div class="lecture">
  <Page title={lecture.name} description={lecture.code}>
    {#if $session["auth"] && $session["auth"].userType === "P"}
      <Button on:click={() => goto(`/lecture/${lecture.code}/post/create`)}>
        게시물 만들기
      </Button>
      <Button on:click={() => goto(`/lecture/${lecture.code}/students`)}>
        학생 관리 메뉴
      </Button>
    {/if}

    <div class="post-list">
      {#each lecture.posts as post}
        <div class="list-element">
          <ClickCard
            on:click={() =>
              goto(`/lecture/${post.lectureCode}/post/${post.postId}`)}
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Created: {dateFormatter(post.createdAt)}</p>
          </ClickCard>
        </div>
      {/each}
    </div>
  </Page>
</div>

<style>
  h2 {
    margin: 0 0 16px 0;
  }

  .list-element {
    margin: 16px;
  }
</style>
