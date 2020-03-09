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
        <el-col :span="6"
          ><div class="grid-content bg-purple">1111</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">2222</div></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>
