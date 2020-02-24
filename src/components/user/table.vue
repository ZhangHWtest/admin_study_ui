<template>
  <el-table :data="userList" border stripe>
    <el-table-column label="ID" prop="id" width="50px"></el-table-column>
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="昵称" prop="nickName"></el-table-column>
    <el-table-column label="电话" prop="mobile"></el-table-column>
    <el-table-column label="邮箱" prop="email"></el-table-column>
    <el-table-column label="状态" width="50px">
      <template slot-scope="scope">
        <p v-if="scope.row.status === 1">启用</p>
        <p v-else-if="scope.row.status === 0">禁用</p>
      </template>
    </el-table-column>
    <el-table-column label="部门" prop="deptName"></el-table-column>
    <el-table-column
      label="创建时间"
      prop="createTime"
      width="150px"
    ></el-table-column>
    <el-table-column
      label="最后修改时间"
      prop="updateTime"
      width="150px"
    ></el-table-column>
    <el-table-column label="操作" width="180px">
      <template slot-scope>
        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        <el-tooltip
          effect="dark"
          content="分配角色"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
          ></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>
