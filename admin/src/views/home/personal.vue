<template>
  <div>
    <el-dialog title="修改个人信息" :visible.sync="dataDialogVisible" width="50%">
      <el-form label-width="0.5rem" :model="userData">
        <el-form-item label="用户名">
          <el-input v-model="userData.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="userData.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dataDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="editDialogVisible" width="40%">
      <el-form label-width="0.5rem">
        <el-form-item label="请输入原密码">
          <el-input v-model="oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码">
          <el-input v-model="newPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </el-dialog>

    <el-card shadow>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-edit"
        class="edit-btn"
        @click="editData"
      >编辑个人信息</el-button>
      <el-button type="danger" size="mini" icon="el-icon-lock" @click="editPassword">修改密码</el-button>
      <el-form label-width="0.5rem" :model="userData">
        <el-form-item label="头像">
          <el-avatar :src="userData.avatar" fit="cover" shape="square"></el-avatar>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userData.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userData.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="userData.description" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      userData: this.$store.state.userData,
      dataDialogVisible: false,
      editDialogVisible: false,
      oldPassword: '',
      newPassword: ''
    };
  },
  methods: {
    editData() {
      this.dataDialogVisible = true;
    },
    editPassword() {
      this.editDialogVisible = true;
    },
    async updateInfo() {
      const params = {
        username: this.userData.username,
        email: this.userData.email,
        description: this.userData.description,
        id: this.userData.id
      };
      try {
        const { data: res } = await this.$http.put('admin/update', params);
        if (res.meta.status === 200) {
          this.$Message.success('信息修改成功！');
        }
        this.dataDialogVisible = false;
      } catch (error) {
        this.$Message.error('服务器出现错误！');
      }
    },
    async updatePassword() {
      const params = {
        password: this.newPassword,
        id: this.userData.id
      };
      if (this.oldPassword !== this.userData.password) return this.$Message.warning('原密码错误！');
      try {
        const { data: res } = await this.$http.put('admin/updatePassword', params);
        if (res.meta.status === 200) {
          this.$Message.success('密码修改成功！');
        }
        this.dataDialogVisible = false;
      } catch (error) {
        this.$Message.error('服务器出现错误！');
      }
    }
  }
};
</script>

<style lang="less">
.edit-btn {
  margin-left: 0.2rem;
}
.el-form {
  margin: 0.2rem 0.01rem;
  .el-form-item {
    margin-bottom: 0.1rem;
    .el-avatar {
      width: 0.5rem;
      height: 0.5rem;
      border: 1px solid #d4d4d4;
    }
  }
}
</style>