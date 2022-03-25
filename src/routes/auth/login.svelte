<script lang="ts">
  import type { LoginForm } from "$lib/types";
</script>

<div class="signup">
  <form action="/auth/signup" method="post">
    <input type="text" name="name" id="name" />
    <input type="text" name="username" id="username" />
    <input type="text" name="password" id="password" />
    <input type="text" name="schoolID" id="schoolID" />
    <label>
      <input type="radio" name="userType" id="userType" value={"S"} />
      학생
    </label>
    <label>
      <input type="radio" name="userType" id="userType" value={"P"} />
      교수
    </label>
    <button type="submit" />
  </form>
</div>
<a href="/auth/signup">signup</a>