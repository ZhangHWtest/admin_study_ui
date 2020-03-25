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
      <div>
        <MonitorHandSearch />
      </div>
      <div>
        <MonitorTable />
      </div>
    </el-card>
  </div>
</template>

<script>
import MonitorHandSearch from "./components/HandSearch";
import MonitorTable from "./components/Table";

export default {
  name: "MonitorList",
  components: {
    MonitorHandSearch,
    MonitorTable
  },
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
      // 列表展示数据
      monitorList: {},

      // -------------------------------
      // 批量添加弹框里的table
      postmanTableHead: [
        { column_name: "mobile", column_comment: "API类型" },
        { column_name: "name", column_comment: "API地址" },
        { column_name: "nickName", column_comment: "概况" }
      ],
      postmanApiList: [
        {
          name: "name",
          nickName: "nickName",
          mobile: "mobile"
        }
      ],
      // 添加API表单的校验对象
      addRulesMonitorForm: {
        systemName: [{ required: true }],
        jobName: [
          { required: true, message: "请输入Job名称", trigger: "blur" }
        ],
        httpName: [
          { required: true, message: "请输入api名称", trigger: "blur" }
        ],
        httpMethod: [{ required: true }],
        httpUrl: [
          { required: true, message: "请输入api地址", trigger: "blur" }
        ],
        jobCron: [{ required: true, trigger: "blur" }],
        conditionType: [{ required: true, trigger: "blur" }],
        conditionBody: [{ required: true, trigger: "blur" }]
      },

      radioApiType: "0",
      radioApiTime: "0/15 * * * * ?",
      apiConditionType: "0",
      apiCondition: "",
      // 监听添加弹窗事件
      addDialogVisible: false,
      addManyDialogVisible: false,
      // 新增api 系统下拉框绑定数据
      options: [],
      // 结果校验 下拉绑定数据
      select: [],
      // 新增api对象
      createApi: {
        systemName: "",
        jobName: "",
        httpName: "",
        type: "",
        remark: "",
        jobCron: "",
        httpUrl: "",
        httpMethod: "",
        httpHeaders: "",
        httpBody: "",
        conditionType: "",
        conditconditionBodyion: ""
      },
      groupsList: {},
      enableMonitorBody: {
        jobId: "",
        enabled: ""
      }
    };
  },

  created() {},
  methods: {
    addDialogClosed() {
      this.$refs.addApiFormRef.resetFields();
    },
    addManyDialogClosed() {
      this.$refs.addApiFormRef.resetFields();
    },
    async addSingleApi() {
      this.createApi.type = "0";
      this.createApi.httpMethod = this.radioApiType;
      this.createApi.jobCron = this.radioApiTime;
      const { data: addMonitorRes } = await this.$api.monitor.saveSingle(
        this.createApi
      );
      // 返回信息校验
      if (addMonitorRes.code !== 200) {
        return this.$message.error("新增失败！");
      }
      // 关闭 添加弹框
      this.addDialogVisible = false;
    },
    async getMonitorGroups() {
      const { data: getMGRes } = await this.$api.monitor.getMonitorGroupsApi();
      this.groupsList = getMGRes.data;
    },
    async addMonitorGroups() {
      const { data: getMGRes } = await this.$api.monitor.getMonitorGroupsApi();
      this.groupsList = getMGRes.data;
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

<style lang="less" scoped></style>
