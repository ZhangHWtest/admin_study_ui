<template>
  <!-- api列表区域-->
  <el-table border :data="monitorList">
    <el-table-column width="50px" label="ID" prop="id"></el-table-column>
    <el-table-column label="jobId" prop="jobId"></el-table-column>
    <el-table-column label="jobName">
      <template slot-scope="scope">
        <el-link type="primary">{{ scope.row.jobName }}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="系统名称" prop="httpSystem"></el-table-column>
    <el-table-column label="API名称" prop="httpName"></el-table-column>
    <el-table-column label="类型" prop="type">
      <template slot-scope="scope">
        <font v-if="scope.row.type === 0">单个api</font>
        <font v-else>多个api</font>
      </template>
    </el-table-column>
    <el-table-column label="备注" width="80px" prop="remark"></el-table-column>
    <el-table-column label="监控表达式" width="80px" prop="jobCron">
    </el-table-column>
    <el-table-column label="监控状态" width="80px">
      <template slot-scope="scope">
        <div class="apiStatus">
          <font v-if="scope.row.enabled" color="#67C23A" class="apiActive">
            启动中
          </font>
          <font v-else color="#F56C6C" class="apiNoActive">
            未启动
          </font>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180px">
      <template slot-scope="scope">
        <!-- 修改按钮 -->
        <el-tooltip class="item" effect="dark" content="修改" placement="top">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            ricon="el-icon-edit"
            circle
            @click="showEditDialog(scope.row.jobId)"
          ></el-button>
        </el-tooltip>
        <!-- 根据状态判断，是执行/暂停按钮 -->
        <el-tooltip
          v-if="scope.row.enabled === 1"
          class="item"
          effect="dark"
          content="暂停"
          placement="top"
        >
          <el-button
            type="danger"
            icon="el-icon-switch-button"
            size="mini"
            circle
            @click="enableMonitor(scope)"
          ></el-button>
        </el-tooltip>

        <el-tooltip
          v-else
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
            @click="enableMonitor(scope)"
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
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
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
</template>

<script>
export default {
  data() {
    return {
      // 搜索绑定数据
      findMonitorBody: {
        monitorName: "",
        pageNum: 1,
        pageSize: 10
      },
      // 返回总条数
      total: 0,
      monitorList: {}
    };
  },
  created() {
    this.getMonitorList();
  },
  methods: {
    async getMonitorList() {
      const { data: monitorRes } = await this.$api.monitor.monitorList(
        this.findMonitorBody
      );
      console.log(monitorRes);
      if (monitorRes.code !== 200) {
        return this.$message.error("获取监控列表失败！");
      }
      this.monitorList = monitorRes.data.monitor;
      this.total = monitorRes.data.total;
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.findMonitorBody.pageSize = newSize;
      this.getMonitorList();
    },
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.findMonitorBody.pageNum = newPage;
      this.getMonitorList();
    },
    async enableMonitor(scope) {
      console.log(scope, "scope");
      if (scope.row.enabled === 1) {
        this.enableMonitorBody.enabled = 0;
      } else {
        this.enableMonitorBody.enabled = 1;
      }
      this.enableMonitorBody.jobId = scope.row.jobId;
      const { data: getMGRes } = await this.$api.monitor.enableMonitorApi(
        this.enableMonitorBody
      );
      console.log(getMGRes);
      if (getMGRes.code === 200) {
        this.getMonitorList();
        return this.$message.success("修改成功！");
      }
      return this.$message.error("修改失败！");
    }
  }
};
</script>

<style lang="less" scoped>
.apiStatus {
  padding-left: 10px;
  .apiActive::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background: #67c23a;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .apiNoActive::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background: #f56c6c;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
