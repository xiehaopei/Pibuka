<template>
  <div>
    <el-card shadow>
      <el-form label-width="0.6rem" :model="article" :rules="articleRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="article.digest"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-checkbox-group v-model="article.tags" size="mini">
            <el-checkbox v-for="tag in tags" :key="tag" :label="tag" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="内容"></el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker v-model="article.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="封面图">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-exceed="handleExeeed"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      article: {
        title: '',
        digest: '',
        tags: [],
        time: '',
        cover: ''
      },
      tags: [],
      effect: 'light',
      articleRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        time: [{ required: true, message: '请选择时间', trigger: 'blur' }]
      },
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    async getTags() {
      try {
        const { data: res } = await this.$http.get('/tags/getTags');
        if (res.meta.status === 200) {
          this.tags = res.data.map(item => {
            return item.tag;
          });
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(file, fileList) {
      this.$Message.success('图片上传成功！');
      console.log(file, fileList);
    },
    handleExeeed() {
      this.$Message.warning('上传图片超过上限！');
    },
  },
  created() {
    this.getTags();
  }
};
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: auto 0.1rem;
}
</style>