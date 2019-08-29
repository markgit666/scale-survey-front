<template>
  <div class="box8">
    <a-layout id="components-layout-demo-fixed">
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['1']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <router-link to="/Home">我的问卷</router-link>
          </a-menu-item>

          <!-- <a-menu-item key="2">
            <router-link to="/Home/CreateScale">创建量表</router-link>
          </a-menu-item>-->
          <!-- <a-menu-item key="3">
            <router-link to="/Home/CreateQuestionnaire">创建问卷</router-link>
          </a-menu-item>

          <a-menu-item key="4">
            <router-link to="/Home/AddPatientInfo">添加病人信息</router-link>
          </a-menu-item>-->

          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="form" />创建
            </span>
            <a-menu-item-group>
              <a-menu-item key="setting:1">
                <router-link to="/Home/AddPatientInfo">添加病人信息</router-link>
              </a-menu-item>
              <a-menu-item key="setting:2">
                <router-link to="/Home/CreateScale">创建量表</router-link>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>

          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="user" />我的
            </span>
            <a-menu-item-group>
              <a-menu-item key="setting:3">
                <router-link to="/Home/MyPatients">我的病人信息</router-link>
              </a-menu-item>
              <a-menu-item key="setting:4">
                <router-link to="/Home/MyScale">我的量表</router-link>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>

          <a-menu-item key="5">
            <router-link to="/Home/Answer">数据管理</router-link>
          </a-menu-item>

          <a-menu-item key="7">
            <router-link to="/Home/Draw">画图</router-link>
          </a-menu-item>

          <a-menu-item key="8">
            <router-link to="/home/picture">上传图片</router-link>
          </a-menu-item>

          <a-menu-item key="6" :style="{float:'right'}" @click="exit">
            <a-icon type="user-delete" />安全退出
          </a-menu-item>
        </a-menu>
      </a-layout-header>

      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px',background: '#F0F2F5'}">
        <!-- <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>-->
        <div :style="{ background: '#F0F2F5', padding: '24px', minHeight: '380px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer
        :style="{ textAlign: 'center', background: '#F0F2F5', padding:'24px 10px' }"
      >中国科学院深圳先进技术研究院脑所 ©2019</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      this.$confirm({
        title: "确定退出吗?",
        onOk() {
          // this.$router.push({ path: "/" });
          this.$router.push({ path: "/login" });
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    }
  }
};
</script>
<style>
#components-layout-demo-fixed {
  background: #f8f8f9;
}
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
/* 
.box8{
  background:red;
} */
body {
  background: #f0f2f5;
}
</style>
