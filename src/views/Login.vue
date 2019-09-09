<template>
  <div id="main">
    <a-card title="登录" hoverable style="width: 90vh">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-dynamic"
      >
        <el-form-item prop="email" label="邮箱:">
          <el-input v-model="ruleForm.email" size="medium" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            size="medium"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')" class="login-form-button">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="forgot-register">
        <a class="login-form-forgot" @click="forget">忘记密码</a>
        <a class="login-form-register" @click="register">马上注册</a>
      </div>
    </a-card>
  </div>
</template>

<script>
import axios from "axios";
import { log } from "util";
export default {
  data() {
    // 密码
    var validatePass = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error("请输入6-20位密码，必须包含大小写字母和数字!"));
      } else {
        callback();
      }
    };

    return {
      // 表单 邮箱校验
      ruleForm: {
        email: "",
        password: ""
      },

      serverUrl: this.GLOBAL.serverUrl,
      rules: {
        email: [
          { required: true, message: "邮箱不能为空!", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址!",
            trigger: ["blur", "change"]
          }
        ],

        password: [
          { required: true, message: "密码不能为空!", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },

  // 创建表单
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
  methods: {
    //登录
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$router.push({ path: "/Home" });
          // debugger;
          axios
            .post(this.serverUrl + "authc/login", {
              loginName: this.ruleForm.email,
              password: this.ruleForm.password
            })
            .then(response => {
              debugger;
              if (response.data.retCode === "000001") {
                localStorage.setItem("Token", response.data.data);
                this.$router.push({ path: "/Home" });
              } else {
                this.$message.warning("用户名或密码错误",5);
              }

              // console.log("response:", response);
            });
        } else {
          alert("登录失败");
          return false;
        }
      });
    },

    // 注册
    register() {
      this.$router.push({ path: "/Register" });
      console.log("a");
    },
    // 忘记密码
    forget() {
      console.log("忘记密码");
    }
  }
};
</script>
<style>
/* card */
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
/* 表单 */
.demo-dynamic {
  width: 90%;
  align-items: center;
  margin: 0 auto;
  margin-left: 10px;
}
/* 忘记密码 */
.login-form-register {
  float: right;
  /* margin-right: px; */
  margin-right: 20px;
}
/* 马上注册 */
.login-form-forgot {
  float: left;
  margin-left: 10px;
}

/* 登录按钮*/
.login-form-button {
  width: 113%;
  margin-top: 10px;
  margin-left: -45px;
}
</style>