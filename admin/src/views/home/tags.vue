<!-- 组件说明 -->
<template>
  <div>
    <el-card shadow>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="inputValue" @keydown.enter.native="add"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" size="medium" icon="el-icon-s-promotion" @click="add">创建标签</el-button>
        </el-col>
      </el-row>

      <el-table :data="dynamicTags" style="width: 100%" border stripe>
        <el-table-column prop="tagId" label="ID"></el-table-column>
        <el-table-column prop="tag" label="标签"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="options">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-paperclip"
              @click="showDialog(options.row)"
            >查看</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(options.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- dialog part -->
    <el-dialog title="该标签下有篇文章" :visible.sync="dialogVisible" width="50%">
      <span>这是一段信息</span>
      <el-table :data="expands[row.tagId].article" border :v-if="showExpend">
        <el-table-column prop="articleId" label="ID"></el-table-column>
        <el-table-column prop="title" label="文章标题"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      expands: [],
      showExpend: false,
      dialogVisible: false,
      row: {}
    };
  },
  methods: {
    // the method to get all tags
    async getTags() {
      try {
        const { data: res } = await this.$http.get('/tags/getTags');
        if (res.meta.status === 200) {
          this.dynamicTags = res.data;
          console.log(this.dynamicTags);
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    // the method to add a tag
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
    // use the method to add a tag
    async add() {
      await this.addTag(this.inputValue);
      this.inputValue = '';
      await this.getTags();
    },
    // delete the tag
    async delTag(tagId) {
      try {
        const { data: res } = await this.$http.delete('/tags/delTag', { data: { tagId } });
        if (res.meta.status === 200) {
          this.$Message.success('标签删除成功！');
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    // delete articles under the tag
    async delTagLink(tagId) {
      try {
        await this.$http.delete('/tags/delTagLink', { data: { tagId } });
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    // delete a tag and the articles under this tag
    del(row) {
      this.$http.all([this.delTag(row.tagId), this.delTagLink(row.tagId)]);
      this.dynamicTags.splice(this.dynamicTags.indexOf(row), 1);
    },
    // get the article under the tag
    async getArticles(row) {
      if (!this.expands[row.tagId]) {
        try {
          const { data: res } = await this.$http.get('/tags/linkArticles', { params: { tagId: row.tagId } });
          if (res.meta.status === 200) {
            const articleId = res.data.map(item => item.articleId);
            this.expands[row.tagId] = { total: res.data.length, article: {} };
            if (this.expands[row.tagId].total) {
              const { data: result } = await this.$http.post('/articles/getArticlesById', { articleId });
              if (result.meta.status === 200) {
                this.expands[row.tagId].article = result.data;
                console.log('expands', this.expands);
              }
            }
          }
        } catch (err) {
          this.$Message.error('服务器出现错误！');
        }
      }
    },
    // click the check-info button
    async showDialog(row) {
      this.dialogVisible = true;
      this.row = row;
      await this.getArticles(row);
      this.showExpend = true;
    }
  },
  created() {
    this.getTags();
  }
};
</script>

<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
  cursor: pointer;
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