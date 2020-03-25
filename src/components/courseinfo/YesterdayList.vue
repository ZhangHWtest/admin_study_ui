<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
      <el-breadcrumb-item>昨日课程</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <!-- 搜索与添加区域-->
      <el-row>
        <el-col :span="6">
          <!-- <el-button type="primary" plain @click="getStudentList"
            >搜索</el-button
          > -->
          <el-button type="primary" @click="exportData">导出</el-button>
          <!-- <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          > -->
        </el-col>
      </el-row>
      <!-- 课程列表区域-->
      <el-table border :data="yesterDayList">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <template v-for="(item, index) in tableHead">
          <el-table-column
            v-if="item.column_name"
            :key="index"
            :prop="item.column_name"
            :label="item.column_comment"
          ></el-table-column>
        </template>
      </el-table>
      <!-- 分页-->
      <el-pagination
        :current-page="yesterDayList.page_num"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="yesterDayList.page_size"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      findYesterDayBody: {
        mes: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableHead: [
        { column_name: 'course_name', column_comment: '课程名称' },
        { column_name: 'content_title', column_comment: '直播名称' },
        { column_name: 'start_time', column_comment: '开课时间' },
        { column_name: 'school_name', column_comment: '学院' },
        { column_name: 'student_number', column_comment: '报名人数' },
        { column_name: 'real_number', column_comment: '上课人数' },
        { column_name: 'class_rate', column_comment: '到课率' }
      ],
      yesterDayList: []
    }
  },
  // 生命周期函数，进页面加载
  created() {
    this.getYesterDayList()
  },
  methods: {
    async getYesterDayList() {
      const { data: userRes } = await this.$api.course.findYesterDayList(
        this.findYesterDayBody
      )
      if (userRes.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      this.yesterDayList = userRes.data
    },
    // 导出数据
    exportData() {
      require.ensure([], () => {
        // 标红是没有驼峰命名
        // const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const { exportJsonToExcel } = require('../../utils/Export2Excel')
        // 要输出的表头
        const tHeader = [
          '课程名称',
          '直播名称',
          '开课时间',
          '学院',
          '报名人数',
          '上课人数',
          '到课率'
        ]
        // 表头对应的内容, 会从下行定义的 list 里去找相应的数据
        const filterVal = [
          'course_name',
          'content_title',
          'start_time',
          'school_name',
          'student_number',
          'real_number',
          'class_rate'
        ]
        // 数据来源
        const list = this.yesterDayList
        const data = this.formatJson(filterVal, list)
        const time = this.$moment(new Date()).format('YYYY-MM-DD')
        // fileName: 要导出的表格名称
        exportJsonToExcel(tHeader, data, '昨日课程' + time)
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="less" scoped></style>
