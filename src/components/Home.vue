<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/github.jpeg" alt />
        <span>您好！欢迎进入Admin后台</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{loginname.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="updatePasword=true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.url"
              v-for="subItem in item.childMenu"
              :key="subItem.id"
              @click="saveNavState(subItem.url)"
            >
              <template slot="title">
                <i :class="subItem.icon"></i>
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体区域 -->
      <el-main>
        <!-- 路由占位符-->
        <router-view />
        <!-- 修改密码弹框-->
        <el-dialog
          title="修改密码"
          :visible.sync="updatePasword"
          width="50%"
          @close="updatePaswordClose"
        >
          <!-- 内容主体区域-->
          <el-form
            :model="updatePaswordUser"
            :rules="updatePaswordRulesForm"
            ref="updatePaswordFormRef"
            label-width="90px"
          >
            <el-form-item label="原始密码" prop="password">
              <el-input v-model="updatePaswordUser.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="updatePaswordUser.newPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input v-model="updatePaswordUser.checkPassword" type="password"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updatePasword = false">取 消</el-button>
            <el-button type="primary" @click.native="updatePaswordMethod()">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      loginname: {
        name: ''
      },
      updatePasword: false,
      updatePaswordUser: {
        name: [],
        password: [],
        newPassword: [],
        checkPassword: []
      },
      updatePaswordRulesForm: {
        password: [{ required: true, message: '原始密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码', trigger: 'blur' }],
        checkPassword: [
          { required: true, message: '再次确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    this.loginname.name = window.sessionStorage.getItem('token')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      // const { data: res } = await this.$http.get('/menu/getmenu', {
      //   params: this.loginname
      // })
      const { data: res } = await this.$api.menu.findNavTree(this.loginname)
      if (res.code !== 200) return this.$message.error(res.msg)
      this.menulist = res.data
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    updatePaswordClose() {
      this.$refs.updatePaswordFormRef.resetFields()
    },
    updatePaswordMethod() {
      this.$refs.updatePaswordFormRef.validate(async valid => {
        if (!valid) return
        this.updatePaswordUser.name = window.sessionStorage.getItem('token')
        if (this.updatePaswordUser.newPassword !== this.updatePaswordUser.checkPassword) return this.$message.error('请检查输入！')
        // 校验通过可以发起添加请求了
        // const { data: res } = await this.$http.post(
        //   '/user/updatepassword',
        //   this.updatePaswordUser
        // )
        const { data: res } = await this.$api.user.updatepassword(this.updatePaswordUser)
        if (res.code !== 200) {
          this.$message.error('修改失败！')
        }
        this.$message.success('修改成功，请重新登录！')
        window.sessionStorage.clear()
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      width: 200px;
      height: 100%;
      background-color: #eee;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.5em;
  cursor: pointer;
}
.el-dropdown-link {
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  color: #fff;
  font-size: 15px;
}
</style>
