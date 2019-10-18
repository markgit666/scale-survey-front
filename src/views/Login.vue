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

        <el-form-item prop="verificationCode" label="验证码:" >
          <div class="verifyCode">
            <el-input v-model="ruleForm.verificationCode" size="medium" placeholder="请输入验证码" class="verifyCode-input"></el-input>
            <el-image class="verifyCode-image" :src="imageCode" @click="fetchVertifyCode"></el-image>
          </div>
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
import axios from 'axios'
import { log } from 'util'
export default {
  data () {
    // 密码
    var validatePass = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error('请输入6-20位密码，必须包含大小写字母和数字!'))
      } else {
        callback()
      }
    }

    return {
      // 表单 邮箱校验
      ruleForm: {
        email: '',
        password: '',
        verificationCode: ''
      },
      base64Code: '',
      imageCode: '',
      captchaToken: '',
      serverUrl: this.GLOBAL.serverUrl,
      rules: {
        email: [
          { required: true, message: '邮箱不能为空!', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址!',
            trigger: ['blur', 'change']
          }
        ],

        password: [
          { required: true, message: '密码不能为空!', trigger: 'blur' },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        verificationCode: [
          { required: true, message: '验证码不能为空!', trigger: 'blur' }
        ]
      }
    }
  },

  // 创建表单
  resetForm (formName) {
    this.$refs[formName].resetFields()
  },

  mounted () {
    this.fetchCaptchaCode()
  },
  methods: {

    fetchCaptchaCode () {
      axios.post(this.serverUrl + 'authc/captcha/get').then(response => {
        this.base64Code = response.data.data.captchaImg
        this.imageCode = 'data:image/jpeg;base64,' + this.base64Code
        this.captchaToken = response.data.data.captchaToken
        console.log(response)
      })
    },
    fetchVertifyCode () {
      this.fetchCaptchaCode()
    },

    // 登录
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(this.serverUrl + 'authc/login', {
              loginName: this.ruleForm.email,
              password: this.ruleForm.password,
              captchaToken: this.captchaToken,
              captcha: this.ruleForm.verificationCode
            })
            .then(response => {

              if (response.data.retCode === '000001') {
                localStorage.setItem('Token', response.data.data)
                this.$router.push({ path: '/home/noCreate' })
              } else if (response.data.retCode === '100008') {
                this.$message.error('验证码错误', 5)
              } else {
                this.$message.error('用户名或密码错误', 5)
              }

              // console.log("response:", response);
            })
        } else {
          alert('登录失败')
          return false
        }
      })
      this.fetchCaptchaCode()
    },

    // 注册
    register () {
      this.$router.push({ path: '/Register' })
    },
    // 忘记密码
    forget () {
      this.$router.push({ path: '/findPassword' })
    }
  }
}
</script>
<style scoped>
/* card */
#main {
  /* background-image: url(../assets/img/login.jpg); */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  padding-top: 15vh;
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
.verifyCode{
  width: 100%;
  display: flex;
  flex-direction: row;

  /*border: 1px solid red;*/
}
.verifyCode-input{
  width:75%;
}
.verifyCode-image{
  width:25%;
  height: 33px;
  margin-top: 3px;
  margin-left: 10px;
}

</style>
