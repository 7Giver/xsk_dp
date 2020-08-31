<template>
  <div class="container">
    <el-table
      v-loading="listLoading"
      :data="articleData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      height="750"
      @sort-change="sortChange"
    >
      <el-table-column
        prop="id"
        align="center"
        label="ID"
        width="90"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="品牌">
        <template slot-scope="{ row }">
          <span>{{ row.brand_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="cover" align="center" label="封面">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <a :href="scope.row.cover" target="_blank" title="查看最大化图片">
              <img :src="scope.row.cover" style="width: 200px;height: 200px" />
            </a>
            <img
              slot="reference"
              :src="scope.row.cover"
              style="width: 50px;height: 50px; cursor:pointer; margin: 0 auto;"
            />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="发布时间">
        <template slot-scope="{ row }">
          <span>{{ row.add_time | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>

      <el-table-column width="90px" align="center" label="是否音视频">
        <template slot-scope="{ row }">
          <span>{{ row.is_vido | audioTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column width="90px" align="center" label="视频类型">
        <template slot-scope="{ row }">
          <span>{{ row.vido_type | videoTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="视频地址">
        <template slot-scope="{ row }">
          <span>{{ row.vid }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        align="center"
        class-name="status-col"
        width="100"
      >
        <template slot-scope="{ row }">
          <span>{{ row.is_validate | statusFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-waves
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            编辑
          </el-button>
          <el-button
            v-waves
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editDialogVisible">
      <el-form ref="form" :model="articleInfo" label-width="60px">
        <el-form-item label="标题">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

import { getMyArticle, delMyArticle } from "@api/home";

export default {
  name: "homeWork",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        "0": "待审核",
        "1": "已审核",
        "2": "未通过",
      };
      return statusMap[status];
    },
    audioTypeFilter(status) {
      const statusMap = {
        0: "否",
        1: "是",
      };
      return statusMap[status];
    },
    videoTypeFilter(status) {
      const statusMap = {
        "0": "未知",
        "1": "腾讯",
        "2": "优酷",
        "3": "电台",
        "4": "视频",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      total: 0,
      articleData: [],
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      listLoading: true,
      articleInfo: {},
      editDialogVisible: false,
      articleIndex: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        userId: this.$store.state.userId,
        start: this.listQuery.page - 1,
        limit: this.listQuery.limit,
      };
      this.listLoading = true;
      getMyArticle(params).then((res) => {
        const data = res.data;
        if (data.code == 200) {
          this.total = +data.data.count;
          this.articleData = data.data.data;
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    handleUpdate(row) {
      // this.$router.push({
      //   name: "/home/material",
      //   params: {
      //     id: row.id,
      //   },
      // });
      this.$router.push(`/home/material?id=${row.id}`);
    },
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMyArticle({ id: row.id }).then((res) => {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });

            // this.$message({
            //   type: 'success',
            //   message: "删除成功!"
            // });

            this.total -= 1;
            this.articleData.splice(index, 1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    articleEdit(index, item) {
      this.articleIndex = index;
      this.editDialogVisible = true;
    },
    articleDelete(index) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.articleData.splice(index, 1);
        })
        .catch((_) => {});
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>

<style lang="less" scoped>
@import "@assets/common/option";
.container {
  height: @container-height;
}
</style>
