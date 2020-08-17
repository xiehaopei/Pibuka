<template>
  <div class="login">
    <img src="@/assets/img/forest.jpg" class="image" />
    <form ref="form" class="box">
      <h1>login</h1>
      <input type="text" placeholder="username" v-model="formData.username" />
      <input type="password" placeholder="password" v-model="formData.password" />
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: 'xiehaopei',
        password: '15907678645'
      }
    };
  },
  computed: {
    url() {
      return 'http://localhost:3000/admin/login';
    }
  },
  methods: {
    async login() {
      const { data: res } = await this.$http.get(this.url, {
        params: this.formData
      });
      console.log(res);
      if (res.meta.status !== 200) alert('登录失败！');
      else alert('登录成功！');
      window.sessionStorage.setItem('token', res.data.token);
      this.$router.push('/home');
    }
  }
};
</script>

<style>
@import url('./login.css');
</style>