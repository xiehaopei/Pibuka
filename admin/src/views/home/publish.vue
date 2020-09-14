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
            <el-checkbox
              v-for="value in tags"
              :key="value.tagId"
              :label="value.tagId"
              border
            >{{value.tag}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="内容">
          <mavon-editor
            v-model="article.md"
            ref="md"
            :scrollStyle="true"
            :ishljs="true"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          />
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="article.time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
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
        <el-button type="success" @click="add">发布文章</el-button>
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
        articleId: '',
        title: '',
        digest: '',
        tags: [],
        md: '',
        time: '',
        cover: '',
        visits: 0,
        likes: 0,
        comments: 0
      },
      tags: [],
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
          this.tags = res.data;
          // this.tags = res.data.map(item => {
          //   return item.tag;
          // });
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
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append('image', $file);
      console.log(formdata, pos);
      // axios({
      //   url: 'server url',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }).then(url => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   /**
      //    * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //    * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //    * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //    */
      //   $vm.$img2Url(pos, url);
      // });
    },
    $imgDel($file) {
      console.log($file);
    },
    async publish() {
      if (!this.article.title) return this.$Message.warning('未填写文章标题！');
      if (!this.article.time) return this.$Message.warning('未选择文章发布时间！');
      try {
        const { data: res } = await this.$http.post('/articles/add', this.article);
        if (res.meta.status === 200) {
          this.$Message.success('文章发布成功！');
          this.article.articleId = res.data.articleId;
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    async linkTags(params) {
      try {
        const { data: res } = await this.$http.put('/articles/linkTags', { params });
        if (res.meta.status === 200) {
          this.$Message.success('标签生成成功！');
          this.$router.push('/articles');
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    async add() {
      await this.publish();
      if (this.article.tags !== []) {
        const params = [];
        for (let item of this.article.tags) {
          params.push([this.article.articleId, item]);
        }
        await this.linkTags(params);
      }
    }
  },
  mounted() {
    this.getTags();
  }
};
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: auto 0.1rem;
}
</style>