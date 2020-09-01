<template>
  <el-container>
    <el-aside>
      <el-avatar :src="userData.avatar" fit="cover" shape="square"></el-avatar>
      <font>Pibuka</font>
      <div class="setting">
        <el-button type="success" icon="el-icon-setting" size="mini" @click="setting">设置</el-button>
        <el-button type="danger" icon="el-icon-switch-button" size="mini" @click="out">退出</el-button>
      </div>
      <el-menu :router="true" :default-active="activePath">
        <el-menu-item
          v-for="item in menu"
          :key="item.id"
          :index="item.path"
          @click="savePath(item.path)"
        >
          <i :class="iconObj[item.id]"></i>
          <span slot="title">{{item.authName}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userData: this.$store.state.userData,
      activePath: 'monitor',
      menu: '',
      iconObj: {
        '1': 'el-icon-monitor',
        '2': 'el-icon-document',
        '3': 'el-icon-edit-outline',
        '4': 'el-icon-paperclip',
        '5': 'el-icon-chat-dot-round',
        '6': 'el-icon-user'
      }
    };
  },
  methods: {
    async getMenu() {
      try {
        const { data: res } = await this.$http.get('/menu/getMenu');
        if (res.meta.status === 200) {
          console.log('menu', res);
          this.menu = res.data;
        }
      } catch {
        this.$Message.error('请求菜单数据失败！');
      }
    },
    out() {
      window.localStorage.clear();
      this.$router.push('/login');
    },
    setting() {
      this.$router.push('/personal');
      this.activePath = 'personal';
    },
    savePath(path) {
      this.activePath = path;
      console.log(this.activePath);
    }
  },
  created() {
    this.getMenu();
  }
};
</script>

<style scoped lang="less">
.el-aside {
  background-color: #806d9e;
  height: 100vh;
  .el-avatar {
    display: block;
    width: 1rem;
    height: 1rem;
    margin: 0.15rem auto 0.05rem;
  }
  font {
    font-size: 0.12rem;
    color: aquamarine;
    display: flex;
    justify-content: center;
  }
  .setting {
    font-size: 0.1rem;
    display: flex;
    justify-content: center;
    margin: 0.05rem auto 0.2rem;
  }
  .el-menu {
    border-right: none;
    .el-menu-item {
      background-color: #806d9e;
      color: #fff;
    }
    .el-menu-item.is-active {
      background-color: #fff;
      color: #806d9e;
    }
  }
}
.el-main {
  background-color: #fff;
}
</style>