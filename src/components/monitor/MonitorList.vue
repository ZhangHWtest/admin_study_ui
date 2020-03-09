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
          <el-button plain @click="addDialogVisible = true"
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
        <el-table-column label="状态">
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
              v-if="scope.row.status === 0"
              class="item"
              effect="dark"
              content="执行"
              placement="top"
            >
              <el-button
                v-if="scope.row.status === 0"
                type="success"
                icon="el-icon-caret-right"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip
              v-if="scope.row.type === 1"
              class="item"
              effect="dark"
              content="暂停"
              placement="top"
            >
              <el-button
                v-if="scope.row.type === 1"
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
        :rules="addRulesApiForm"
        label-width="100px"
      >
        <el-form-item label="所属系统" prop="systemName">
          <el-input v-model="createApi.systemName"></el-input>
        </el-form-item>
        <el-form-item label="监控名称" prop="apiName">
          <el-input v-model="createApi.apiName"></el-input>
        </el-form-item>
        <el-form-item label="API类型" prop="apiType">
          <template>
            <el-radio v-model="radioApiType" label="1">GET</el-radio>
            <el-radio v-model="radioApiType" label="2">POST</el-radio>
            <el-radio v-model="radioApiType" label="3">HEAD</el-radio>
            <el-radio v-model="radioApiType" label="4">PUT</el-radio>
            <el-radio v-model="radioApiType" label="5">DELETE</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="API地址" prop="apiAdress">
          <el-input v-model="createApi.apiAdress"></el-input>
        </el-form-item>
        <el-form-item label="监控频率" prop="apiFrequency">
          <template>
            <el-radio v-model="radioApiTime" label="1">30秒</el-radio>
            <el-radio v-model="radioApiTime" label="2">1分钟</el-radio>
            <el-radio v-model="radioApiTime" label="3">5分钟</el-radio>
            <el-radio v-model="radioApiTime" label="4">10分钟</el-radio>
            <el-radio v-model="radioApiTime" label="5">30分钟</el-radio>
            <el-radio v-model="radioApiTime" label="5">1小时</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="请求头部">
          <el-input
            v-model="createApi.apiHead"
            placeholder="{key: value}"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-input
            v-model="createApi.apiBody"
            placeholder="{key: value}"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证结果">
          <el-input
            v-model="createApi.apiResult"
            placeholder="{key: value}"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="createApi.apiRemarks"
            type="textarea"
            :rows="2"
            placeholder="请输入备注信息。"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addApi">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加多个API区域--->
    <el-dialog
      title="添加多个API"
      :visible.sync="addManyDialogVisible"
      width="50%"
      @close="addManyDialogClosed"
    >
      <!-- 添加form区域-->
      <el-form
        ref="addApiFormRef"
        :model="createApi"
        :rules="addRulesApiForm"
        label-width="100px"
      >
        <el-form-item label="所属系统" prop="systemName">
          <el-input v-model="createApi.systemName"></el-input>
        </el-form-item>
        <el-form-item label="监控名称" prop="apiName">
          <el-input v-model="createApi.apiName"></el-input>
        </el-form-item>
        <el-form-item label="监控频率" prop="apiFrequency">
          <template>
            <el-radio v-model="radioApiTime" label="1">30秒</el-radio>
            <el-radio v-model="radioApiTime" label="2">1分钟</el-radio>
            <el-radio v-model="radioApiTime" label="3">5分钟</el-radio>
            <el-radio v-model="radioApiTime" label="4">10分钟</el-radio>
            <el-radio v-model="radioApiTime" label="5">30分钟</el-radio>
            <el-radio v-model="radioApiTime" label="5">1小时</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="API管理">
          <el-button type="primary" plain @click="getUserList"
            >导入postman脚本</el-button
          >
          <el-button plain @click="addDialogVisible = true"
            >添加单个API监控</el-button
          >
          <!-- 列表区域-->
          <el-table border :data="postmanApiList">
            <el-table-column
              type="index"
              width="50"
              label="序号"
            ></el-table-column>
            <template v-for="(item, index) in postmanTableHead">
              <el-table-column
                v-if="item.column_name"
                :key="index"
                :prop="item.column_name"
                :label="item.column_comment"
              ></el-table-column>
            </template>
            <el-table-column label="操作" width="120px">
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
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="createApi.apiRemarks"
            type="textarea"
            :rows="2"
            placeholder="请输入备注信息。"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addManyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addApi">确 定</el-button>
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
      addMonitor: [],
      // 添加API表单的校验对象
      addRulesMonitorForm: {
        systemName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        apiName: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        apiAdress: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        apiFrequency: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ]
      },
      radioApiType: '1',
      radioApiTime: '1',
      // 监听添加弹窗事件
      addDialogVisible: false,
      addManyDialogVisible: false,
      createApi: {
        apiName: '',
        name: [],
        password: [],
        nickName: [],
        mobile: [],
        email: [],
        status: '0'
      }
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
    addApi() {}
  }
}
</script>

<style lang="less" scoped>
.apiNoActive::before {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background: #f56c6c;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  top: 20px;
}
.apiActive::before {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background: #67c23a;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  top: 20px;
}
.apiStatus {
  padding-left: 10px;
}
</style>
