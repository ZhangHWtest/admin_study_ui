<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>AIP监控</el-breadcrumb-item>
      <el-breadcrumb-item>监控图表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card clas="handCard">
      <el-row :gutter="30">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-people">
              <svg-icon icon-class="peoples" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                New Visits
              </div>
              <count-to
                :start-val="0"
                :end-val="102400"
                :duration="2600"
                class="card-panel-num"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="5">2</el-col>
        <el-col :span="5">3</el-col>
      </el-row>
    </el-card>
    <el-card>
      <div>
        <highcharts :options="chartOptions" :callback="myCallback"></highcharts>
      </div>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="12"
          >预留饼图1
          <div class="grid-content bg-purple"></div
        ></el-col>
        <el-col :span="12"
          >预留饼图2
          <div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
  components: {
    highcharts: Chart
  },
  data() {
    return {
      // 多级选择器，绑定数据
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],

      // 曲线图 绑定数据
      chartOptions: {
        title: {
          text: 'API监控结果'
        },
        subtitle: {
          text: 'api名称暂时无'
        },
        yAxis: {
          title: {
            text: '响应时间'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [
          {
            name: '安装，实施人员',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: '工人',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: '销售',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          },
          {
            name: '项目开发',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          },
          {
            name: '其他',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    myCallback() {
      console.log('this is callback function')
    }
  }
}
</script>

<style lang="less" scoped>
.highcharts-container {
  width: 600px;
  height: 350px;
  border: 1px solid #ddd;
  margin: auto;
}
</style>
