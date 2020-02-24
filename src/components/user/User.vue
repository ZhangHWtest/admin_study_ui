<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <!-- 搜索与添加区域-->
      <el-row :gutter="30">
        <el-col :span="5">
          <el-input
            v-model="queryInfo.mes"
            placeholder="姓名/昵称/电话/邮箱"
            clearable
            @clear="getUserList"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="queryInfo.status" placeholder="状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="timeValue"
            type="datetimerange"
            align="right"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '24:00:00']"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" plain @click="getUserList">搜索</el-button>
          <el-button plain @click="exportData">导出</el-button>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域-->
      <el-table border :data="userList">
        <template v-for="(item, index) in tableHead">
          <el-table-column
            v-if="item.column_name"
            :key="index"
            :prop="item.column_name"
            :label="item.column_comment"
          ></el-table-column>
        </template>
        <el-table-column label="状态" width="50px">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 1">启用</p>
            <p v-else-if="scope.row.status === 0">禁用</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域-->
      <el-form
        ref="addFormRef"
        :model="createUser"
        :rules="addRulesForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="createUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="createUser.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="createUser.nickName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="createUser.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="createUser.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <template>
            <el-radio v-model="createUser.status" label="0">禁用</el-radio>
            <el-radio v-model="createUser.status" label="1">启用</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框-->
    <el-dialog
      title="修改用戶"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="addRulesForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="editForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <template>
            <el-radio v-model="editForm.status" label="0">禁用</el-radio>
            <el-radio v-model="editForm.status" label="1">启用</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的自定义规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱！'))
    }
    // 验证手机号的自定义规则˝
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[3456789]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号！'))
    }
    return {
      timeValue: '',
      // 获取用户列表的参数对象
      queryInfo: {
        mes: '',
        status: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableHead: [
        { column_name: 'id', column_comment: 'ID' },
        { column_name: 'name', column_comment: '姓名' },
        { column_name: 'nickName', column_comment: '昵称' },
        { column_name: 'mobile', column_comment: '电话' },
        { column_name: 'email', column_comment: '邮箱' },
        { column_name: 'createTime', column_comment: '创建时间' },
        { column_name: 'updateTime', column_comment: '修改时间' },
        { column_name: 'lastUpdateBy', column_comment: '最后修改人' }
      ],
      userList: [],
      // 控制添加用户对话框的显示隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      createUser: {
        name: [],
        password: [],
        nickName: [],
        mobile: [],
        email: [],
        status: '0'
      },
      // 添加用户表单的校验对象
      addRulesForm: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {
        // 获取当前登录用户。作为修改人
        lastUpdateBy: []
      },
      options: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '禁用'
        }
      ]
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // const { data: userRes } = await this.$http.get('/user/find', {
      //   params: this.queryInfo
      // })
      this.queryInfo.startTime = this.timeValue[0]
      this.queryInfo.endTime = this.timeValue[1]
      const { data: userRes } = await this.$api.user.findPage(this.queryInfo)
      if (userRes.code !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userList = userRes.data.users
      this.total = userRes.data.total
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击”确认“提交前的预校验
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 校验通过可以发起添加请求了
        // const { data: res } = await this.$http.post(
        //   '/user/create',
        //   this.createUser
        // )
        const { data: res } = await this.$api.user.create(this.createUser)
        if (res.code !== 200) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 添加成功关闭对话框
        this.addDialogVisible = false
        // 重新获取列表数据
        this.getUserList()
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      // const { data: res } = await this.$http.get('/user/getuserbyid/' + id)
      const { data: res } = await this.$api.user.getuserbyid(id)
      if (res.code !== 200) {
        return this.$message.error('查询用户信息失败！')
      }

      this.editForm = res.data
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.editForm.lastUpdateBy = window.sessionStorage.getItem('token')
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起用户请求
        // const { data: res } = await this.$http.post(
        //   '/user/update',
        //   this.editForm
        // )
        const { data: res } = await this.$api.user.update(this.editForm)
        if (res.code !== 200) {
          return this.$message.error('修改用户信息失败！')
        }
        // 关闭对框
        this.editDialogVisible = false
        // 刷新数据
        this.getUserList()
        // 提示信息
        this.$message.success('更新成功！')
      })
    },
    // 根据id删除
    async removeUserById(id) {
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      // const { data: res } = await this.$http.delete('/user/deleteuser/' + id)
      const { data: res } = await this.$api.user.deleteuser(id)
      if (res.code !== 200) {
        return this.$message.error('删除用户信息失败！')
      }
      // 提示信息
      this.$message.success('删除成功！')
      // 刷新数据
      this.getUserList()
    },
    // 导出数据
    exportData() {
      require.ensure([], () => {
        // 标红是没有驼峰命名
        // const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const { exportJsonToExcel } = require('../../vendor/Export2Excel')
        // 要输出的表头
        const tHeader = [
          'id',
          '姓名',
          '昵称',
          '电话',
          '邮箱',
          '创建时间',
          '修改时间',
          '最后修改人'
        ]
        // 表头对应的内容, 会从下行定义的 list 里去找相应的数据
        const filterVal = [
          'id',
          'name',
          'nickName',
          'mobile',
          'email',
          'createTime',
          'updateTime',
          'lastUpdateBy'
        ]
        // 数据来源
        const list = this.userList
        const data = this.formatJson(filterVal, list)
        // fileName: 要导出的表格名称
        exportJsonToExcel(tHeader, data, 'users' + this.time)
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="less" scoped></style>
