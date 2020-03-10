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
            v-model="findMonitorBody.apiName"
            placeholder="请输入API名称"
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
            @click=";(addDialogVisible = true), getMonitorGroups()"
            >添加单个API监控</el-button
          >
          <el-button type="primary" @click="addManyDialogVisible = true"
            >添加多个API监控</el-button
          >
        </el-col>
      </el-row>
      <!-- api列表区域-->
      <el-table border :data="monitorList">
        <el-table-column
          type="index"
          width="50px"
          label="序号"
        ></el-table-column>
        <el-table-column label="ID" prop="guid"></el-table-column>
        <el-table-column label="所属系统">
          <template slot-scope="scope">
            <el-link type="primary">{{ scope.row.group }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column
          label="监控频率(秒)"
          prop="frequency"
        ></el-table-column>
        <el-table-column
          label="可用率(百分比)"
          prop="usability"
        ></el-table-column>
        <el-table-column label="类型" width="80px" prop="type">
          <!-- <template slot-scope="scope">
            <p v-if="scope.row.type === 0">单个API</p>
            <p v-else-if="scope.row.type === 1">群组API</p>
          </template> -->
        </el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope="scope">
            <div class="apiStatus">
              <font
                v-if="scope.row.status === '未监控'"
                color="#F56C6C"
                class="apiNoActive"
              >
                未监控
              </font>
              <font v-else color="#67C23A" class="apiActive">
                监控中
              </font>
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
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 根据状态判断，是执行/暂停按钮 -->
            <el-tooltip
              v-if="scope.row.status === '未监控'"
              class="item"
              effect="dark"
              content="执行"
              placement="top"
            >
              <el-button
                v-if="scope.row.status === '未监控'"
                type="success"
                icon="el-icon-caret-right"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip
              v-if="scope.row.type === '监控中'"
              class="item"
              effect="dark"
              content="暂停"
              placement="top"
            >
              <el-button
                v-if="scope.row.type === '监控中'"
                type="danger"
                icon="el-icon-switch-button"
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
        :current-page="findMonitorBody.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="findMonitorBody.pagesize"
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
        <el-form-item label="所属系统" prop="group">
          <template>
            <el-select v-model="createApi.group" placeholder="请选择">
              <el-option
                v-for="item in groupsList"
                :key="item.index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="新增"
              placement="top"
            >
              <el-button
                class="addGroupButton"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                ricon="el-icon-plus"
                circle
                @click="addMonitorGroups"
              ></el-button>
            </el-tooltip>
          </template>
        </el-form-item>
        <el-form-item label="监控名称" prop="name">
          <el-input v-model="createApi.name"></el-input>
        </el-form-item>
        <el-form-item label="API类型" prop="httpMethod">
          <template>
            <el-radio v-model="radioApiType" label="GET">GET</el-radio>
            <el-radio v-model="radioApiType" label="POST">POST</el-radio>
            <el-radio v-model="radioApiType" label="HDEAD">HEAD</el-radio>
            <el-radio v-model="radioApiType" label="PUT">PUT</el-radio>
            <el-radio v-model="radioApiType" label="DELETE">DELETE</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="API地址" prop="url">
          <el-input
            v-model="createApi.url"
            placeholder="http://www.baidu.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="监控频率" prop="frequency">
          <template>
            <el-radio v-model="radioApiTime" label="THIRTY">30秒</el-radio>
            <el-radio v-model="radioApiTime" label="FIVE_MINUTES"
              >5分钟</el-radio
            >
            <el-radio v-model="radioApiTime" label="THIRTY_MINUTES"
              >10分钟</el-radio
            >
            <el-radio v-model="radioApiTime" label="THIRTY_MINUTES"
              >30分钟</el-radio
            >
            <el-radio v-model="radioApiTime" label="ONE_HOUR">1小时</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="请求头部">
          <el-input
            v-model="createApi.headers"
            placeholder="{key: value}"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-input
            v-model="createApi.parameters"
            placeholder="{key: value}"
          ></el-input>
        </el-form-item>
        <el-form-item label="结果校验" prop="condition">
          <el-select
            v-model="createApi.conditionType"
            placeholder="请选择"
            class="input_with_conditionType"
          >
            <el-option label="默认" value="DEFAULT"></el-option>
            <el-option label="不包含" value="DOESNT_CONTAIN"></el-option>
            <el-option label="状态码" value="STATUSCODE"></el-option>
            <el-option label="包含" value="CONTAINS"></el-option>
          </el-select>
          <el-input
            v-model="createApi.condition"
            class="input_with_apiCondition"
            placeholder="请输入内容"
          >
          </el-input>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 搜索绑定数据
      findMonitorBody: {
        monitorName: '',
        pagenum: '',
        pagesize: ''
      },
      // 返回总条数
      monitorTotal: 0,
      // 列表展示数据
      monitorList: {},

      // -------------------------------
      // 批量添加弹框里的table
      postmanTableHead: [
        { column_name: 'mobile', column_comment: 'API类型' },
        { column_name: 'name', column_comment: 'API地址' },
        { column_name: 'nickName', column_comment: '概况' }
      ],
      postmanApiList: [
        {
          name: 'name',
          nickName: 'nickName',
          mobile: 'mobile'
        }
      ],
      // 添加API表单的校验对象
      addRulesMonitorForm: {
        group: [{ required: true }],
        httpMethod: [{ required: true }],
        condition: [
          { required: true, message: '请输入校验信息', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入api名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入api地址', trigger: 'blur' }],
        frequency: [{ required: true, trigger: 'blur' }]
      },
      radioApiType: 'GET',
      radioApiTime: 'THIRTY',
      apiConditionType: 'DEFAULT',
      apiCondition: '',
      // 监听添加弹窗事件
      addDialogVisible: false,
      addManyDialogVisible: false,
      // 新增api 系统下拉框绑定数据
      options: [],
      // 结果校验 下拉绑定数据
      select: [],
      // 新增api对象
      createApi: {
        guid: '',
        pguid: '',
        group: '',
        name: '',
        httpMethod: '',
        url: '',
        frequency: '',
        headers: '',
        parameters: '',
        conditionType: '',
        condition: '',
        remark: '',
        type: ''
      },
      groupsList: []
    }
  },
  created() {
    this.getMonitorList()
  },
  methods: {
    async getMonitorList() {
      const { data: monitorRes } = await this.$api.monitor.monitorList()
      if (monitorRes.code !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.monitorList = monitorRes.data
      this.monitortotal = monitorRes.data.total
    },
    addDialogClosed() {
      this.$refs.addApiFormRef.resetFields()
    },
    addManyDialogClosed() {
      this.$refs.addApiFormRef.resetFields()
    },
    async addSingleApi() {
      this.createApi.type = 'SINGLE'
      this.createApi.httpMethod = this.radioApiType
      this.createApi.frequency = this.radioApiTime
      const { data: addMonitorRes } = await this.$api.monitor.saveSingle(
        this.createApi
      )
      // 关闭 添加弹框
      addDialogVisible = false
      // 返回信息校验
      if (addMonitorRes.code !== 200) {
        return this.$message.error('新增失败！')
      }
    },
    async getMonitorGroups() {
      const { data: getMGRes } = await this.$api.monitor.getMonitorGroupsApi()
      this.groupsList = getMGRes.data
    },
    async addMonitorGroups() {
      const { data: getMGRes } = await this.$api.monitor.getMonitorGroupsApi()
      this.groupsList = getMGRes.data
    }
  }
}
</script>

<style lang="less" scoped>
.apiStatus {
  padding-left: 10px;
  .apiActive::before {
    content: '';
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
    content: '';
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
