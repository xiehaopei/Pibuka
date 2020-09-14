<template>
  <div>
    <el-card shadow>
      <!-- searchInput part -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="medium" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>

      <!-- table part -->
      <el-table :data="articleList" style="width: 100%" border stripe>
        <el-table-column prop="articleId" label="ID" width="80"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="标签" width="240">
          <template v-slot="scope">
            <el-tag v-for="tag in tags[scope.row.articleId]" :key="tag" effect="plain">{{tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="visits" label="浏览" width="70"></el-table-column>
        <el-table-column prop="likes" label="点赞" width="70"></el-table-column>
        <el-table-column prop="comments" label="评论" width="70"></el-table-column>
        <el-table-column label="日期" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="options">
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="editArticle(options.row)"
            >编辑</el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="delArticle(options.row.articleId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- pagination part -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- edit article dialog part-->
    <el-dialog title="编辑文章" :visible.sync="editDialogVisible">
      <el-form label-width="60px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要"></el-form-item>
        <el-form-item label="标签"></el-form-item>
        <el-form-item label="内容"></el-form-item>
        <el-form-item label="时间"></el-form-item>
        <el-form-item label="封面图"></el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepCopy } from '../../../utils/Emitter';
export default {
  components: {},
  data() {
    return {
      articleList: [],
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      tags: {},
      dynamicTags: {},
      tagsId: {},
      editDialogVisible: false,
      article: {}
    };
  },
  methods: {
    async getArticle() {
      try {
        const { data: res } = await this.$http.get('/articles/getList', { params: this.queryInfo });
        if (res.meta.status === 200) {
          this.articleList = res.data;
          this.getArticleTags();
        }
      } catch (err) {
        this.$Message.error('服务器发生错误！');
      }
    },
    async getTotal() {
      try {
        const { data: res } = await this.$http.get('/articles/getTotal');
        if (res.meta.status === 200) {
          this.total = res.data.total;
        }
      } catch (err) {
        this.$Message.error('服务器发生错误！');
      }
    },
    async getTags() {
      try {
        const { data: res } = await this.$http.get('/tags/getTags');
        if (res.meta.status === 200) {
          res.data.forEach(item => {
            this.dynamicTags[item.tagId] = item.tag;
          });
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    async getTagsId() {
      try {
        const { data: res } = await this.$http.get('/articles/getTags');
        if (res.meta.status === 200) {
          this.tagsId = res.data;
        }
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    getArticleTags() {
      for (let item of this.articleList) {
        const temp = [];
        if (this.tagsId[item.articleId] !== undefined) {
          for (let tagId of this.tagsId[item.articleId]) {
            if (this.dynamicTags[tagId]) {
              temp.push(this.dynamicTags[tagId]);
            }
          }
        }
        this.tags[item.articleId] = temp;
      }
    },
    async delArticle(articleId) {
      try {
        await this.$http.all([
          this.$http.delete('/articles/delArticle', { data: { articleId } }),
          this.$http.delete('/articles/delArticleLink', { data: { articleId } })
        ]);
        this.$Message.success('文章删除成功！');
        await this.getArticle();
      } catch (err) {
        this.$Message.error('服务器出现错误！');
      }
    },
    editArticle(row) {
      this.article = deepCopy(row);
      this.editDialogVisible = true;
    },
    handleSizeChange(size) {
      this.queryInfo.pageSize = size;
      this.getArticle();
    },
    handleCurrentChange(page) {
      this.queryInfo.pageNum = page;
      this.getArticle();
    }
  },
  async mounted() {
    await this.$http.all([this.getTags(), this.getTagsId(), this.getTotal()]);
    await this.getArticle();
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 0.1rem;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>