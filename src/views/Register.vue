<template>
  <div id="register">
    <a-card title="注册" hoverable style="width: 90vh">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <!-- 用户名 -->
        <a-form-item label="用户名：" :label-col="{ span: 5}" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: '用户名不许为空!' }]  }
        ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- 密码 -->
        <a-form-item label="密码：" :label-col="{ span: 5}" :wrapper-col="{ span: 18 }">
          <a-input
            type="password"
            v-decorator="[
          'password1',
          { rules: [{ required: true, message: '密码不许为空!' }] }
        ]"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- 再次密码 -->
        <a-form-item label="再次密码：" :label-col="{ span: 5}" :wrapper-col="{ span: 18 }">
          <a-input
            type="password"
            v-decorator="[
          'password2',
          { rules: [{ required: true, message: '密码不许为空!' }] }
        ]"
            placeholder="请输入再次输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>

        <div class="button">
          <center>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              :style="{width:'15vh'}"
            >注册</a-button>
          </center>
          <center>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              :style="{width:'15vh', marginLeft:'2vh'}"
              @click="cancel"
            >取消注册</a-button>
          </center>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    //取消注册
    cancel() {
      this.$router.push({ path: "/Login" });
    },

    success() {
      this.$message.success("This is a message of success");
    },

    //点击"确定"按钮, 同时会获取到表单提交的数据
    handleSubmit(e) {
      debugger;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (password1.value === password2.value) {
            this.$router.push({ path: "/Login" });
          } else {
            alert("两次密码输入不一致！");
          }
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

/* #components-form-demo-normal-login .box {
  width: 270px;
} */
#components-form-demo-normal-login .login-form-forgot {
  float: left;
}
#components-form-demo-normal-login .login-form-register {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
#register {
  /* background-image: url(../assets/img/login.jpg); */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  padding-top: 25vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  max-width: 100vh;
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.button button {
  width: 15vh;
  text-align: center;
  margin: 5vh;
  text-align: center;
}
</style>