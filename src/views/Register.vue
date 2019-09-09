<template>
  <div id="register">
    <a-card title="注册" hoverable style="width: 90vh">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-dynamic"
      >
        <el-form-item prop="email" label="邮箱:">
          <el-input v-model="ruleForm.email" size="medium" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password1">
          <el-input
            type="password"
            v-model="ruleForm.password1"
            placeholder="请输入密码"
            size="medium"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="再次密码:" prop="password2">
          <el-input
            type="password"
            v-model="ruleForm.password2"
            placeholder="请再次输入密码"
            size="medium"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register('ruleForm')" class="login-form-button">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- <a class="login-form-forgot" @click="forget">忘记密码</a> -->
      <a @click="backLogin">返回登录</a>

      <!-- <div class="button">
        <center>
          <a-button
            type="primary"
            @click="register"
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
      </div>-->
      <!-- </a-form> -->
    </a-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // 密码
    var validatePass1 = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error("请输入6-20位密码，必须包含大小写字母和数字"));
      } else {
        callback();
      }
    };
    // 确认密码
    var validatePass2 = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error("请输入6-20位密码，必须包含大小写字母和数字"));
      } else if (value !== this.ruleForm.password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      serverUrl: this.GLOBAL.serverUrl,
      // 表单 邮箱校验
      ruleForm: {
        email: "",
        password1: "",
        password2: ""
      },
      rules: {
        email: [
          { required: true, message: "邮箱不能为空!", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password1: [
          { required: true, message: "密码不能为空!", trigger: "blur" },
          { validator: validatePass1, trigger: "blur" }
        ],
        password2: [
          { required: true, message: "密码不能为空!", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
  methods: {
    //取消注册
    backLogin() {
      this.$router.push({ path: "/Login" });
    },

    //点击"确定"按钮, 同时会获取到表单提交的数据
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger;
          axios
            .post(this.serverUrl + "authc/register", {
              loginName: this.ruleForm.email,
              password: this.ruleForm.password1,
              confirmPassword: this.ruleForm.password2
            })
            .then(response => {
              debugger;
              if (response.data.retCode === "100004") {
                this.$message.error("用户名已被注册！",5);
              } else if (response.data.retCode === "000002") {
                this.$message.success("注册成功！",5);
                this.$router.push({ path: "/Login" });
              } else {
                this.$message.error("注册失败！",5);
              }
            });
        } else {
          this.$message.error("注册失败！",5);
          return false;
        }
      });
    }
  }
};
</script>

<style>
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

/* .button {
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
} */
</style>