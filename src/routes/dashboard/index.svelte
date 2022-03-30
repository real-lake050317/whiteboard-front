<script context="module" lang="ts">
  import { getPostsOfUser } from "$lib/api/lectures";

  export async function load({ session }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    console.log("Dashboard:", session.auth);

    const res = await getPostsOfUser(session.auth);
    console.log(res);

    return {
      props: {
        posts: res.posts,
      },
    };
  }
</script>

<script lang="ts">
  import Page from "$lib/shared/Page.svelte";
  import ClickCard from "$lib/shared/ClickCard.svelte";
  import { goto } from "$app/navigation";

  export let posts = [];

  function dateFormatter(dateString: string) {
    const date = new Date(dateString);
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
  }
</script>

<div class="dashboard">
  <Page title="Dashboard" description="최근 포스트를 확인할 수 있습니다." />
  <div class="post-list">
    {#each posts as post}
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
</div>

<style>
  h2 {
    margin: 0 0 16px 0;
  }

  .list-element {
    margin: 16px;
  }
</style>
