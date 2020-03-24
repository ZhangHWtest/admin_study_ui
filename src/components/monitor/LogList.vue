<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>AIP监控</el-breadcrumb-item>
      <el-breadcrumb-item>监控日志</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="5"> </el-col>
      </el-row>
    </el-card>

    <!-- api日志列表区域-->
    <el-card>
      <el-table border :data="apiList">
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHead: [
        { column_name: 'name', column_comment: '所属系统' },
        { column_name: 'mobile', column_comment: '名称' },
        { column_name: 'lastUpdateBy', column_comment: '监控时间' },
        { column_name: 'status', column_comment: '状态' },
        { column_name: 'lastUpdateBy', column_comment: '响应时间' },
        { column_name: 'lastUpdateBy', column_comment: '日志' },
        { column_name: 'lastUpdateBy', column_comment: 'API详情' }
      ],
      apiList: [
        {
          name: 'name',
          nickName: 'nickName',
          mobile: 'mobile',
          status: 'status',
          createTime: 'createTime',
          updateTime: 'updateTime',
          lastUpdateBy: 'lastUpdateBy'
        }
      ]
    }
  }
}
</script>
