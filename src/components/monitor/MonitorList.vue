<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>AIP监控</el-breadcrumb-item>
      <el-breadcrumb-item>监控列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <el-row :gutter="30">
        <el-col :span="5">
          <el-input
            v-model="findApiBody.apiName"
            placeholder="请输入API名称"
            class="input-with-select"
            clearable
            @clear="findApiList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="findApiList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button plain @click="exportData">添加单个API监控</el-button>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加多个API监控</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域-->
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
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                ricon="el-icon-edit"
                circle
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 执行按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="执行"
              placement="top"
            >
              <el-button
                type="success"
                icon="el-icon-caret-right"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>

            <!-- 查看日志按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="查看日志"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-chat-line-square"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        :current-page="findApiBody.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="findApiBody.pagesize"
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
      findApiBody: {
        apiName: '',
        pagenum: '',
        pagesize: ''
      },
      total: 0,
      tableHead: [
        { column_name: 'name', column_comment: '所属系统' },
        { column_name: 'nickName', column_comment: '类型' },
        { column_name: 'mobile', column_comment: '名称' },
        { column_name: 'status', column_comment: '状态' },
        { column_name: 'createTime', column_comment: '监控频率' },
        { column_name: 'updateTime', column_comment: '可用率' },
        { column_name: 'lastUpdateBy', column_comment: '平均响应时间' }
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
  },
  methods: {
    findApiList() {}
  }
}
</script>

<style lang="less" scoped></style>
