<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程信息</el-breadcrumb-item>
      <el-breadcrumb-item>今日课程</el-breadcrumb-item>
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
      <el-table border :data="toDayList">
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
        :current-page="toDayList.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="toDayList.pagesize"
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
      findToDayBody: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      tableHead: [
        { column_name: "course_name", column_comment: "课程名称" },
        { column_name: "content_title", column_comment: "直播名称" },
        { column_name: "start_time", column_comment: "开课时间" },
        { column_name: "school_name", column_comment: "学院" },
        { column_name: "student_number", column_comment: "报名人数" },
        { column_name: "callback_key", column_comment: "CC_room_id" },
        { column_name: "teacher_info", column_comment: "讲师信息" }
      ],
      toDayList: []
    };
  },
  // 生命周期函数，进页面加载
  created() {
    this.getToDayList();
  },
  methods: {
    async getToDayList() {
      const { data: userRes } = await this.$api.course.findToDayList(
        this.findToDayBody
      );
      if (userRes.code !== 1) {
        return this.$message.error("获取用户列表失败！");
      }
      this.toDayList = userRes.data;
    },
    // 导出数据
    exportData() {
      require.ensure([], () => {
        const { exportJsonToExcel } = require("../../utils/Export2Excel");
        // 要输出的表头
        const tHeader = [
          "课程名称",
          "直播名称",
          "开课时间",
          "学院",
          "报名人数",
          "CC_room_id",
          "讲师信息"
        ];
        // 表头对应的内容, 会从下行定义的 list 里去找相应的数据
        const filterVal = [
          "course_name",
          "content_title",
          "start_time",
          "school_name",
          "student_number",
          "callback_key",
          "teacher_info"
        ];
        // 数据来源
        const list = this.toDayList;
        const data = this.formatJson(filterVal, list);
        const time = this.$moment(new Date()).format("YYYY-MM-DD");
        // fileName: 要导出的表格名称
        exportJsonToExcel(tHeader, data, "今日课程" + time);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style lang="less" scoped></style>
