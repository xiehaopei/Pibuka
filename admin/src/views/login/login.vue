<template>
  <div class="login">
    <img src="../../assets/img/forest.jpg" class="image" />
    <form :action="url" method="get" class="box">
      <h1>login</h1>
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <input type="submit" value="Login" name="submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    url: 'http://localhost:3000/admin/login'
  },
  methods: {}
};
</script>

<style>
@import url('./login.css');
</style>