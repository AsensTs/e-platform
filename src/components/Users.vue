<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 用户列表 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="7">
          <el-input
            v-model="search"
            placeholder="搜索用户"
            suffix-icon="el-icon-search"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="add-users-btn">添加用户</el-button>
        </el-col>
      </el-row>
      <div class="userlist">
        <el-table :data="usersList" border style="width: 100%">
          <el-table-column
            type="index"
            label="#"
            width="50px"
          ></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                :active-value="true"
                :inactive-value="false"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
              ></el-button>
              <el-tooltip
                class="item"
                effect="dark"
                content="设置"
                placement="top"
              >
                <el-button
                  type="warning"
                  icon="el-icon-s-tools"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除用户"
                placement="top"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagelist"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      search: "",
      usersList: [],
      usersLen: 0,
      total: 0,
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 6
      }
    };
  },
  created() {
    this.getUsersData();
  },
  methods: {
    async getUsersData() {
      const { data: res } = await this.$http("users", {
        params: this.queryInfo
      });
      if (res.meta.status === 200) {
        this.$message.success("获取用户列表数据成功");
        this.usersList = res.data.users;
        this.usersLen = this.usersList.length;
        this.total = res.data.total;
      }
    }
  }
});
</script>

<style lang="scss">
.users {
  .navigation {
    height: 3rem;
    padding-left: 1rem;
    font-size: 1.2rem;
  }
  .box-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
    .add-users-btn {
      margin-left: 4rem;
    }
    .userlist {
      padding: 2rem 0;
      .el-table_1_column_7 {
        .cell {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
