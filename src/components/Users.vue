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
            v-model="query"
            placeholder="搜索用户"
            suffix-icon="el-icon-search"
          ></el-input>
          {{ queryInfo.query }}
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            class="add-users-btn"
            @click="dialogFormVisible = true"
            >添加用户</el-button
          >
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
                @change="userStateChanged(scope.row)"
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
      <div class="pagelist">
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[2, 4, 6, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <!-- 用户名 -->
        <el-form-item
          label="用户名: "
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            type="username"
            v-model="addForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item
          label="用户密码: "
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            type="password"
            v-model="addForm.password"
            placeholder="请输入用户密码"
            autocomplete="off"
            show-password
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <!-- 确认用户密码 -->
        <el-form-item
          label="确认密码: "
          :label-width="formLabelWidth"
          prop="checkpassword"
        >
          <el-input
            type="password"
            v-model="addForm.checkpassword"
            placeholder="确认密码"
            autocomplete="off"
            show-password
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <!-- 电话号码 -->
        <el-form-item
          label="电话号码: "
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input
            type="mobile"
            v-model="addForm.mobile"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <!-- 邮箱地址 -->
        <el-form-item
          label="邮箱地址: "
          :label-width="formLabelWidth"
          prop="email"
        >
          <el-input
            type="email"
            v-model="addForm.email"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item
          label="角色权限: "
          :label-width="formLabelWidth"
          prop="role"
        >
          <el-select placeholder="请选择" v-model="addForm.role">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态管理 -->
        <el-form-item
          label="状态管理: "
          :label-width="formLabelWidth"
          prop="state"
        >
          <template>
            <el-switch
              v-model="addForm.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="login-reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      query: "",
      usersList: [],
      allUsersList: [],
      usersLen: 0,
      total: 0,
      queryInfo: {
        // 请求数据参数
        query: "",
        pagenum: 1,
        pagesize: 4
      },
      dialogFormVisible: false, // 显示表单弹窗开关
      // 添加用户表达
      addForm: {
        username: "",
        password: "",
        checkpassword: "",
        mobile: "",
        email: "",
        role: "普通用户",
        state: true
      },
      checkpassword: "", // 检测密码
      formLabelWidth: "90px", // label宽度
      roleOptions: [
        // 角色权限列表
        {
          value: "option1",
          label: "普通用户"
        },
        {
          value: "option2",
          label: "管理员"
        },
        {
          value: "option3",
          label: "超级管理员"
        }
      ],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        checkPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "号码无效", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUsersData();
  },
  watch: {
    query: async function(sname) {
      const tmpList: any = []; // 临时数组
      sname = sname.trim(); // 去空格
      const queryInfoSearch = {
        // 搜索用户列表的参数
        query: "",
        pagenum: 1,
        pagesize: this.total
      };
      const { data: res } = await this.$http("users", {
        // 搜索用户列表
        params: queryInfoSearch
      });
      const usersList = res.data.users;
      usersList.forEach((item: any) => {
        if (item.username.indexOf(sname) !== -1) {
          tmpList.push(item);
        }
      });
      this.usersList = tmpList;
      if (sname.length === 0) {
        this.getUsersData();
      }
    }
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
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize: any) {
      this.queryInfo.pagesize = newSize;
      this.getUsersData();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage: any) {
      this.queryInfo.pagenum = newPage;
      this.getUsersData();
    },
    // 监听 switch 开关的改变
    async userStateChanged(userInfo: any) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        userInfo.mg_states = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败!");
      }
      this.$message.success("更新用户状态成功!");
    },
    addUser(formName: string) {
      // this.dialogFormVisible = false;
      console.log(this.$refs[formName]);
      const refs: any = this.$refs[formName];
      refs.validate(async (vaild: any) => {
        if (vaild) {
          const { data: res } = await this.$http.post("users", {
            username: this.addForm.username,
            password: this.addForm.password,
            email: this.addForm.email,
            mobile: this.addForm.mobile
          });
          if (res.meta.status === 201) {
            this.$message.success("创建成功");
            this.dialogFormVisible = false;
          } else {
            this.$message.warning("创建失败");
          }
        } else {
          this.$message.warning("创建失败");
        }
      });
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
  .el-dialog {
    .el-dialog__header {
      text-align: center;
      font-weight: bold;
      padding: 3rem 2rem 1rem;
    }
    .el-form {
      .el-form-item {
        width: 90%;
      }
    }
  }
}
</style>
