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
            v-model="findMonitorBody.monitorName"
            placeholder="请输入jobName"
            class="input-with-select"
            clearable
            @clear="getMonitorList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getMonitorList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button
            plain
            @click="(addDialogVisible = true), getMonitorGroups()"
            >添加单个API监控</el-button
          >
          <el-button type="primary" @click="addManyDialogVisible = true"
            >添加多个API监控</el-button
          >
        </el-col>
      </el-row>
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
        <el-table-column
          label="备注"
          width="80px"
          prop="remark"
        ></el-table-column>
        <el-table-column
          label="监控表达式"
          width="80px"
          prop="jobCron"
        ></el-table-column>
        <el-table-column label="监控状态" width="80px">
          <template slot-scope="scope">
            <div class="apiStatus">
              <font v-if="scope.row.enabled" color="#67C23A" class="apiActive"
                >启动中</font
              >
              <font v-else color="#F56C6C" class="apiNoActive">未启动</font>
            </div>
          </template>
        </el-table-column>
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
        :current-page="findMonitorBody.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="findMonitorBody.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>

    <!-- 添加单个API区域--->
    <el-dialog
      title="添加单个API"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 添加form区域-->
      <el-form
        ref="addApiFormRef"
        :model="createApi"
        :rules="addRulesMonitorForm"
        label-width="100px"
      >
        <el-form-item label="系统名称" prop="httpSystemId">
          <el-select
            v-model="createApi.systemName"
            filterable
            allow-create
            default-first-option
            placeholder="请输入或者选择系统"
          >
            <el-option
              v-for="item in groupsList"
              :key="item.index"
              :label="item.systemName"
              :value="item.systemName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="job名称" prop="jobName">
          <el-input v-model="createApi.jobName"></el-input>
        </el-form-item>
        <el-form-item label="api名称" prop="httpName">
          <el-input v-model="createApi.httpName"></el-input>
        </el-form-item>
        <el-form-item label="API类型" prop="httpMethod">
          <template>
            <el-radio v-model="radioApiType" label="0">GET</el-radio>
            <el-radio v-model="radioApiType" label="1">POST</el-radio>
            <el-radio v-model="radioApiType" label="2">HEAD</el-radio>
            <el-radio v-model="radioApiType" label="3">PUT</el-radio>
            <el-radio v-model="radioApiType" label="4">DELETE</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="API地址" prop="httpUrl">
          <el-input
            v-model="createApi.httpUrl"
            placeholder="http://www.baidu.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="监控表达式" prop="jobCron">
          <template>
            <el-radio v-model="radioApiTime" label="0/15 * * * * ?"
              >15秒</el-radio
            >
            <el-radio v-model="radioApiTime" label="0/30 * * * * ?"
              >30秒</el-radio
            >
            <el-radio v-model="radioApiTime" label="0 0/1 * * * ?"
              >1分钟</el-radio
            >
            <el-radio v-model="radioApiTime" label="0 0/5 * * * ?"
              >5分钟</el-radio
            >
            <el-radio v-model="radioApiTime" label="0 0/30 * * * ?"
              >30分钟</el-radio
            >
          </template>
        </el-form-item>
        <el-form-item label="请求头部">
          <el-input
            v-model="createApi.httpHeaders"
            type="textarea"
            placeholder="{key:value,key:value}"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-input
            v-model="createApi.httpBody"
            type="textarea"
            placeholder="{key:value,key:value}"
          ></el-input>
        </el-form-item>
        <el-form-item label="结果校验" prop="conditionType">
          <el-select
            v-model="createApi.conditionType"
            placeholder="请选择"
            class="input_with_conditionType"
          >
            <el-option label="默认" value="0"></el-option>
            <el-option label="不包含" value="1"></el-option>
            <el-option label="状态码" value="2"></el-option>
            <el-option label="包含" value="3"></el-option>
          </el-select>
          <el-input
            v-model="createApi.conditionBody"
            class="input_with_apiCondition"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="createApi.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入备注信息。"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSingleApi()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改单个API区域--->
  </div>
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
.addGroupButton {
  margin-left: 10px;
}
.input_with_apiCondition {
  width: 70%;
  background-color: #fff;
}
.input_with_conditionType {
  width: 30%;
  background-color: #fff;
}
</style>
