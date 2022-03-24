<script lang="ts">
  import { userStore } from "$lib/stores";
  import { checkAuth } from "$lib/api/auth";

  checkAuth($userStore);
</script>
