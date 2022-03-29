<script context="module" lang="ts">
  import { getPosts } from "$lib/api/lectures";

  export async function load({ session }) {
    if (!session["user"]) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const res = await getPosts(session["user"]);

    return {
      props: {
        posts: res.body.posts,
      },
    };
  }
</script>

<script lang="ts">
  import Page from "../../components/Page.svelte";

  export let posts = [];
</script>

<div class="dashboard">
  <Page title="Dashboard" description="최근 포스트를 확인할 수 있습니다." />
  {#each posts as post}
    <a href={`/lecture/${post.lectureID}/post/${post.postID}`}>{post.title}</a>
  {/each}
</div>
