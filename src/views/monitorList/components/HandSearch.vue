<template>
  <el-row :gutter="30">
    <el-col :span="5">
      <h2>{{ mes }}</h2>
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
      <el-button plain @click="(addDialogVisible = true), getMonitorGroups()"
        >添加单个API监控</el-button
      >
      <el-button type="primary" @click="addManyDialogVisible = true"
        >添加多个API监控</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
