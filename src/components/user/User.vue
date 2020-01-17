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
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="姓名/昵称/电话/邮箱" v-model="queryInfo.queryBody">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域-->
      <el-table border :data="userList">
        <template v-for="( item, index ) in tableHead">
          <el-table-column
            :prop="item.column_name"
            :label="item.column_comment"
            :key="index"
            v-if="item.column_name"
          ></el-table-column>
        </template>
        <el-table-column label="状态" width="50px">
          <template slot-scope="scope">
            <p v-if="scope.row.status ===1 ">启用</p>
            <p v-else-if="scope.row.status ===0">禁用</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserList()
  },
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        queryBody: '',
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
        { column_name: 'deptName', column_comment: '部门' },
        { column_name: 'createTime', column_comment: '创建时间' },
        { column_name: 'updateTime', column_comment: '修改时间' }
      ],
      userList: []
    }
  },
  methods: {
    async getUserList() {
      const { data: userRes } = await this.$http.get('/user/find', {
        params: this.queryInfo
      })
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
