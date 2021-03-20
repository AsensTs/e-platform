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

      <!-- 用户列表 -->
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
          <el-table-column label="操作" width="170px">
            <!-- 
              slot-scope="scope" 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据
              tableData是给到table的记录集，scope是table内部基于tableData生成出来的
              可以理解为elementui 生成表格而创建出来的数据
             -->
            <template slot-scope="scope">
              <!-- 修改用户 -->
              <el-tooltip effect="dark" content="修改" placement="top">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  @click="showEditDialog(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <!-- 设置 -->
              <el-tooltip effect="dark" content="设置" placement="top">
                <el-button
                  type="warning"
                  icon="el-icon-s-tools"
                  size="small"
                ></el-button>
              </el-tooltip>
              <!-- 删除用户 -->
              <el-tooltip effect="dark" content="删除用户" placement="top">
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

    <!-- 添加用户界面 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      width="40%"
      @close="addDialogClosed('addFormRef')"
    >
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser('addFormRef')"
          >确 定</el-button
        >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="login-reset" @click="addDialogClosed('addFormRef')"
          >重置</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改编辑用户信息 -->
    <!-- 
      1. :visible.sync="dialogChangeFormVisible" elementui中的控制对话框的隐藏和显示
      2. elementui close事件，Dialog 关闭的回调
    -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogEditFormVisible"
      width="50%"
      @close="addDialogClosed('editFormRef')"
    >
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef">
        <!-- 用户名 -->
        <el-form-item
          label="用户名: "
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            type="username"
            :value="this.editForm.username"
            disabled
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
            :value="this.editForm.mobile"
            v-model="this.editForm.mobile"
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
            :value="this.editForm.email"
            v-model="this.editForm.email"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUser('editFormRef')"
          >确 定</el-button
        >
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button class="login-reset" @click="eidtDialogClosed('editFormRef')"
          >重置</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    // 自定义验证规则 begin
    // 自定义验证规则 end

    return {
      query: "",
      usersList: [],
      usersLen: 0,
      total: 0,
      queryInfo: {
        // 请求数据参数
        query: "",
        pagenum: 1,
        pagesize: 4
      },
      // 添加用户对话框开关
      dialogFormVisible: false,
      // 修改用户对话框开关
      dialogEditFormVisible: false,
      // 添加用户表单
      addForm: {
        username: "",
        password: "",
        mobile: "",
        email: "",
        role: "普通用户"
      },
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
      // 添加用户验证表单
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "号码无效", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      // 修改用户
      editForm: []
    };
  },
  created() {
    this.getUsersData();
  },
  watch: {
    // 搜索功能
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

    /*
      添加新用户
    */
    // 添加新用户，先预校验。
    addUser(addFormRef: string) {
      const refs: any = this.$refs[addFormRef];
      refs.validate(async (vaild: any) => {
        if (vaild) {
          const { data: res } = await this.$http.post("users", this.addForm);
          if (res.meta.status === 201) {
            this.$message.success("创建成功");
            this.dialogFormVisible = false; // 添加用户成功关闭用户框
            location.reload();
          } else {
            this.$message.warning("创建失败");
            return;
          }
        } else {
          this.$message.warning("创建失败");
          return;
        }
      });
    },

    // 监听添加用户对话框关闭事件
    addDialogClosed(addFormRef: string) {
      const refs: any = this.$refs[addFormRef];
      refs.resetFields(); // 重置
    },

    /* 
      修改编辑用户信息
    */
    // 打开修改信息显示框
    async showEditDialog(id: number) {
      const { data: res } = await this.$http.get("users/" + id);

      if (res.meta.status == 200) {
        console.log(res);
        this.editForm = res.data;
        this.dialogEditFormVisible = true;
      } else {
        return this.$message("查询用户信息失败");
      }
    },
    //修改用户信息
    editUser(editFormRef: string) {
      const refs: object = this.$refs[editFormRef];
    },
    // 监听修改用户的对话框关闭事件
    eidtDialogClosed(editFormRef: string) {
      const refs: any = this.$refs[editFormRef];
      refs.resetFields(); // 重置
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
          justify-content: center;
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
