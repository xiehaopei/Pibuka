<template>
  <div class="login">
    <img src="../assets/img/forest.jpg" class="image" />
    <form action method="post" class="box">
      <h1>login</h1>
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <input type="submit" value="Login" name="submit" />
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
}

.box {
  width: 500px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  background: rgba(35, 35, 35, 0.7);
}

.box > h1 {
  color: #ffffff;
  margin: 20px auto;
  text-transform: uppercase;
  font-weight: 800;
}

.box > input {
  display: block;
  background: none;
  transition-duration: 0.3s;
  color: #1ba784;
}

input::placeholder {
  color: #fff;
}

.box > input[type='text'],
.box > input[type='password'] {
  width: 200px;
  border: 2px solid #fff;
  padding: 10px 15px;
  margin: 15px auto;
  border-radius: 40px;
}

.box > input[type='text']:focus,
.box > input[type='password']:focus {
  width: 300px;
  border: 2px solid #99ccff;
  outline: none;
}

.box > input[type='submit'] {
  width: 100px;
  margin: 30px auto 0;
  padding: 5px;
  text-align: center;
  color: #ffffff;
  border-radius: 20px;
  border: 2px solid #ffffff;
}

.box > input[type='submit']:hover {
  background: #99ccff;
}
</style>