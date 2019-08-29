<template>
  <div id="main">
    <a-card title="登录" hoverable style="width: 90vh">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名：" :label-col="{ span: 4}" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: '用户名不能为空!' }] }
        ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="密码：" :label-col="{ span: 4}" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '密码不能为空！' }] }
        ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <div class="forgot-register">
            <a class="login-form-forgot" @click="forget">忘记密码</a>
            <a class="login-form-register" @click="register">马上注册</a>
          </div>

          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            :style="{width:'90%'}"
          >登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$router.push({ path: "/Home" });
        }
      });
    },

    register() {
      this.$router.push({ path: "/Register" });
      console.log("a");
    },

    forget() {
      conslog.log("忘记密码");
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .box {
  width: 270px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: left;
}
#components-form-demo-normal-login .login-form-register {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
#main {
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

.forgot-register {
  width: 90%;
  align-items: center;
  margin: 0 auto;
}
</style>