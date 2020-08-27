<template>
  <div class="login">
    <img src="@/assets/img/forest.jpg" class="image" />
    <form class="box">
      <h1>login</h1>
      <input type="text" placeholder="username" v-model="formData.username" />
      <input type="password" placeholder="password" v-model="formData.password" />
      <button @click.prevent="login">Login</button>
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
  methods: {
    async login() {
      try {
        const { data: res } = await this.$http.post('admin/login', this.formData);
        console.log('res', res);
        if (res.meta.status === 200) {
          this.$Message.success('登录成功！');
          window.localStorage.setItem('token', res.data.token);
          this.$store.state.userData = res.data;
          this.$router.push('/home');
        } else return this.$Message.error('用户名或密码错误！');
      } catch (error) {
        this.$Message.error('服务器出现错误！');
      }
    }
  }
};
</script>

<style>
.image {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
}

.box {
  width: 3.5rem;
  height: 1.5rem;
  padding: 0.3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  background: rgba(35, 35, 35, 0.7);
}

.box > h1 {
  color: #ffffff;
  margin: auto;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.2rem;
}

.box > input {
  display: block;
  background: none;
  transition-duration: 0.3s;
  color: #1ba784;
  font-size: 0.1rem;
}

input::placeholder {
  color: #fff;
}

.box > input[type='text'],
.box > input[type='password'] {
  width: 2rem;
  height: 0.05rem;
  border: 0.01rem solid #fff;
  padding: 0.1rem 0.15rem;
  margin: 0.15rem auto;
  border-radius: 0.4rem;
}

.box > input[type='text']:focus,
.box > input[type='password']:focus {
  width: 3rem;
  border: 0.01rem solid #99ccff;
  outline: none;
}

.box > button {
  position: absolute;
  width: 1rem;
  padding: 0.05rem;
  text-align: center;
  color: #ffffff;
  border-radius: 0.2rem;
  border: 0.02rem solid #ffffff;
  outline: none;
  margin-left: -0.5rem;
  background-color: #000;
  font-size: 0.08rem;
}

.box > button:hover {
  background: #99ccff;
  outline: none;
  cursor: pointer;
}
</style>