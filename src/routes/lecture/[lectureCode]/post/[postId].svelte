<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";
  import { getPost } from "$lib/api/lectures";

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
        redirect: `/lecture/${params.lectureCode}`,
      };
    }

    const { post } = await getPost(
      session.auth,
      params.lectureCode,
      params.postId
    );

    return {
      props: {
        post,
      },
    };
  }
</script>

<script lang="ts">
  import Page from "$lib/shared/Page.svelte";
  import { marked } from "marked";

  export let post;
</script>

<div class="post">
  <Page title={post.title}>
    {@html marked(post.body)}
  </Page>
</div>
