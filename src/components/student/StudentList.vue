<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <!-- 搜索与添加区域-->
      <el-row :gutter="30">
        <el-col :span="5">
          <el-input
            v-model="getStudentBody.mobile"
            placeholder="请输入学员手机号"
            class="input-with-select"
            clearable
            @clear="getStudentList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getStudentList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- api列表区域-->
      <el-table border :data="studentList">
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
        :current-page="getStudentBody.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="getStudentBody.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
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
      getStudentBody: {
        mobile: "13933006634",
        pageNum: 1,
        pageSize: 10
      },
      // 返回总条数
      total: 0,
      // 列表展示数据
      studentList: {},
      // table 头名称
      tableHead: [
        { column_name: "course_id", column_comment: "课程ID" },
        { column_name: "course_name", column_comment: "课程名称" }
      ]
    };
  },
  created() {
    this.getStudentList();
  },
  methods: {
    async getStudentList() {
      const { data: studentRes } = await this.$api.student.findStudentList(
        this.getStudentBody
      );
      console.log(studentRes);
      if (studentRes.code !== 200) {
        return this.$message.error("获取学生课程列表失败！");
      }
      this.studentList = studentRes.data;
      this.total = studentRes.total;
      this.pageNum = studentRes.pageNum;
      this.pageSize = studentRes.pageSize;
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.getStudentBody.pageSize = newSize;
      this.getStudentList();
    },
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.getStudentBody.pageNum = newPage;
      this.getStudentList();
    }
  }
};
</script>

<style scoped></style>
