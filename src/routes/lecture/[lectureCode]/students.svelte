<script context="module" lang="ts">
  import { checkPermission } from "$lib/api/auth";
  import { getStudentsOfLecture, removeStudent } from "$lib/api/lectures";

  export async function load({ session, params }) {
    if (!session.auth) {
      return {
        status: 301,
        redirect: "/auth/login",
      };
    }

    const check = await checkPermission(session.auth, {
      userTypes: ["P"],
      lectureCode: params.lectureCode,
    });

    if (!check) {
      return {
        status: 301,
        redirect: `/lecture/${params.lectureCode}`,
      };
    }

    const { students } = await getStudentsOfLecture(
      session.auth,
      params.lectureCode
    );

    console.log(students);

    if (!students) {
      return {
        status: 301,
        redirect: `/lecture`,
      };
    }

    return {
      props: {
        students,
        lectureCode: params.lectureCode,
      },
    };
  }
</script>

<script lang="ts">
  import Page from "$lib/shared/Page.svelte";
  import Button from "$lib/shared/Button.svelte";
  import Card from "$lib/shared/Card.svelte";
  import { session } from "$app/stores";
  import { goto } from "$app/navigation";

  export let students: any[];
  export let lectureCode: string;

  async function handle(student: any) {
    const res = await removeStudent($session["auth"], lectureCode, student._id);
    goto(`/lecture/${lectureCode}/students`);
  }
</script>

<div class="students">
  <Page title={"Student List"} description={"학생 관리 페이지"}>
    <div class="student-list">
      {#each students as student}
        <div class="list-element">
          <Card>
            <h2>{student.name}</h2>
            <Button on:click={() => handle(student)}>수강 취소</Button>
          </Card>
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
