<template>
<el-container>
  <!-- aside part -->
  <el-aside>
    <!-- <font>Pibuka</font> -->
    <el-menu :router="true" :default-active="activePath" :collapse="isCollapse">
      <!-- <el-menu-item
          v-for="item in menu"
          :key="item.id"
          :index="item.path"
          @click="savePath(item.path)"
        >
          <i :class="iconObj[item.id]"></i>
          <span slot="title">{{item.authName}}</span>
        </el-menu-item>-->
      <el-menu-item index="monitor">
        <i class="el-icon-monitor"></i>
        <span slot="title">监控台</span>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item index="articles">
          <i class="el-icon-document"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="publish">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">文章发布</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">留言管理</span>
        </template>
        <el-menu-item>
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论列表</span>
        </el-menu-item>
        <el-menu-item index="comments">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">留言列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-paperclip"></i>
        <span slot="title">标签管理</span>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-paperclip"></i>
        <span slot="title">友链管理</span>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-paperclip"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="personal">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <!-- main part -->
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
      activePath: 'monitor',
      isCollapse: false
    };
  },
  methods: {
    async getMenu() {
      try {
        const {
          data: res
        } = await this.$http.get('/menu/getMenu');
        if (res.meta.status === 200) {
          console.log('menu', res);
          this.menu = res.data;
        }
      } catch {
        this.$Message.error('请求菜单数据失败！');
      }
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

<style lang="less" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    // background-color: #806d9e;
    height: 100vh;
    // font {
    //   font-size: 0.12rem;
    //   color: aquamarine;
    //   display: flex;
    //   justify-content: center;
    // }
    // .el-menu {
    //   border-right: none;
    //   .el-menu-item {
    //     background-color: #806d9e;
    //     color: #fff;
    //   }
    //   .el-menu-item.is-active {
    //     background-color: #fff;
    //     color: #806d9e;
    //   }
    // }
  }

  .el-main {
    background-color: #fff;
  }
}
</style>
