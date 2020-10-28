<template>
  <div class="users">
    <div class="navigation">
      <h3>首页 > 用户管理 > 用户列表</h3>
    </div>
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
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="num" label="#" width="50px"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作"></el-table-column>
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
      tableData: [
        {
          name: "As",
          email: "aaa@163.com",
          phone: "88888888",
          role: "admin",
          status: 1
        },
        {
          name: "As",
          email: "aaa@163.com",
          phone: "88888888",
          role: "admin",
          status: 0
        },
        {
          name: "As",
          email: "aaa@163.com",
          phone: "88888888",
          role: "admin",
          status: 1
        }
      ],
      state: true
    };
  }
});
</script>

<style lang="scss">
.users {
  .navigation {
    height: 4rem;
    line-height: 4rem;
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
    }
  }
}
</style>
