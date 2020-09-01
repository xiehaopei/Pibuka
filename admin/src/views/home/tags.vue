<!-- 组件说明 -->
<template>
  <div>
    <el-card shadow>
      <font class="title">管理标签</font>
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{tag}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClose(tag) {
      this.delTag(tag);
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.addTag(inputValue);
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    async getTags() {
      try {
        const { data: res } = await this.$http.get('/tags/getTags');
        if (res.meta.status === 200) {
          this.$Message.success('获取标签信息成功！');
          this.dynamicTags = res.data.map(item => {
            return item.tag;
          });
          console.log(this.dynamicTags);
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    async addTag(tag) {
      try {
        const { data: res } = await this.$http.post('/tags/addTag', { tag });
        if (res.meta.status === 200) {
          this.$Message.success('添加标签成功！');
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    async delTag(tag) {
      try {
        const { data: res } = await this.$http.delete('/tags/delTag', { data: { tag } });
        if (res.meta.status === 200) {
          this.$Message.success('标签删除成功！');
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    }
  },
  created() {
    this.getTags();
  }
};
</script>

<style lang="less" scoped>
.title {
  display: block;
  font-size: 30px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>