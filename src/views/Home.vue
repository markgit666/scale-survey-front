<template>
  <div class="box8">
    <a-layout id="components-layout-demo-fixed">
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <img src="../../public/homeLogo.png" class="homeLogo" @click="homeLogoClick"/>
        <a-menu
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">

            <router-link to="/Home/CreateScale">
              <a-icon type="form"/>
              创建量表
            </router-link>
          </a-menu-item>

          <a-menu-item key="2">
            <router-link to="/Home/AddPatientInfo">
              <a-icon type="usergroup-add"/>
              新增被试者
            </router-link>
          </a-menu-item>

          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="user"/>我的
            </span>
            <a-menu-item-group>
              <a-menu-item key="setting:3">
                <router-link to="/Home/MyPatients">我的被试者</router-link>
              </a-menu-item>
              <a-menu-item key="setting:4">
                <router-link to="/Home/MyScale">我的量表</router-link>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>

          <a-menu-item key="5">
            <router-link to="/Home/MyAnswer">
              <a-icon type="eye"/>
              查看答案
            </router-link>
          </a-menu-item>

          <a-menu-item key="6" :style="{float:'right'}" @click="dialogVisible = true">
            <a-icon type="user-delete"/>
            安全退出
          </a-menu-item>
        </a-menu>
      </a-layout-header>

      <el-dialog
        title="确定退出吗？"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <!-- <span>这是一段信息</span> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="exit">确 定</el-button>
        </span>
      </el-dialog>

      <!--内容-->
      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px',background: '#F0F2F5'}">

        <div :style="{ background: '#F0F2F5', padding: '24px', minHeight: '380px' }">
          <router-view></router-view>

        </div>
      </a-layout-content>

      <!--      尾部-->
      <a-layout-footer
        :style="{ textAlign: 'center', background: '#F0F2F5', padding:'24px 10px' }"
      >中国科学院深圳先进技术研究院脑所 ©2019
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import axios from 'axios'
import 'ant-design-vue/dist/antd.css'

export default {
  data () {
    return {
      dialogVisible: false,
      serverUrl: this.GLOBAL.serverUrl
    }
  },
  methods: {

    exit () {
      axios.post(this.serverUrl + 'authc/logout').then(response => {
        if (response.data.retCode === '000000') {
          localStorage.clear()
          this.$router.push({ path: '/login' })
        }
      }, err => {
        alert('网络异常，请检查是否连接上网络')
      })
    },

    // 退出
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },

    // logo跳转
    homeLogoClick () {
      this.$router.push({
        path: '/Home/noCreate'
      })
    }
  }
}
</script>
<style>
  #components-layout-demo-fixed {
    background: #f8f8f9;
  }

  #components-layout-demo-fixed .homeLogo {
    width: 30px;
    height: 30px;
    margin: 16px 24px 16px 0;
    float: left;
  }

  body {
    background: #f0f2f5;
  }

</style>
