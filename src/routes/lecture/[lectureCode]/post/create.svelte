<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";

  export async function load({ session, params }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session.auth, {
      userTypes: ["P"],
      lectureCode: params["lectureCode"],
    });

    if (!check) {
      return {
        status: 301,
        redirect: `/lecture/${params["lectureCode"]}`,
      };
    }

    return {};
  }
</script>

<script lang="ts">
  import Page from "$lib/shared/Page.svelte";

  import { marked } from "marked";
  let source = `# H1 heading

## H2 heading

### H3 heading

--------

**bold text**

*italicized text*

--------

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

[Svelte](https://svelte.dev/)`;

  $: markdown = marked(source);
</script>

<div class="post-create">
  <Page title="Create Post" description="새로운 게시물을 작성할 수 있습니다.">
    <div class="markdown-editor">
      <div class="left-panel">
        <textarea bind:value={source} class="source" />
      </div>

      <div class="right-panel">
        <h2>Output</h2>
        <div class="output">{@html markdown}</div>
      </div>
    </div>
  </Page>
</div>

<style>
  .markdown-editor {
    width: 100%;
    height: 60vh;
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .left-panel,
  .right-panel {
    width: 50%;
    height: 100%;
    border: solid 1px black;
    background: #ffffff;
    padding: 10px 20px;
  }
  .right-panel {
    overflow: auto;
  }
  h2 {
    text-align: center;
  }
  textarea {
    resize: none;
  }
  .source {
    border: none;
    width: 100%;
    height: 100%;
  }
  .source:focus {
    outline: none;
  }
  .output {
    width: 100%;
    height: 100%;
  }
</style>
