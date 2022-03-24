<script>
  let links = ['hello'];
</script>

<div class="navbar">
    <nav>
        <ul>
            {#each links as link}
                <li>
                    <a href={link}>link</a>
                </li>
            {/each}
        </ul>
    </nav>    
    <div class="copyright">
        <p></p>
    </div>
</div>


<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #f1f1f1;
  }

  li a {
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
  }

  /* Change the link color on hover */
  li a:hover {
    background-color: #555;
    color: white;
  }
</style>
