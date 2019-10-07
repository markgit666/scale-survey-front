<template>
  <div id="main">
    <a-card title="找回密码" hoverable style="width: 90vh">
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

        <el-form-item prop="verificationCode" label="验证码:" >
          <div class="verifyCode">
            <el-input v-model="ruleForm.verificationCode" size="medium" placeholder="请输入验证码" class="verifyCode-input"></el-input>
            <el-image class="verifyCode-image" :src="imageCode"></el-image>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="next('ruleForm')" class="login-form-button">下一步</el-button>
        </el-form-item>
        <a @click="back">返回</a>
      </el-form>

    </a-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 表单 邮箱校验
      ruleForm: {
        email: '',
        verificationCode: ''
      },
      base64Code: '',
      imageCode: '',
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
    // 刷新验证码
    this.fetchCaptchaCode()
  },
  methods: {
    // 刷新验证码
    fetchCaptchaCode () {
      axios.post(this.serverUrl + 'authc/captcha/get').then(response => {
        this.base64Code = response.data.data.captchaImg
        this.imageCode = 'data:image/jpeg;base64,' + this.base64Code
        this.captchaToken = response.data.data.captchaToken
        console.log(response)
      })
    },

    // 下一步
    // （1） 需要调用获取验证码的接口
    // （2）点击时需要把邮箱传到下一个界面
    next (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 调用获取验证码的接口,传三个参数
          axios.post(this.serverUrl + 'authc/password/findBack', {
            emailAddress: this.ruleForm.email,
            captcha: this.ruleForm.verificationCode,
            captchaToken: this.captchaToken
          }).then(response => {
            if (response.data.retCode === '000003') {
              this.$router.push({ path: '/changePassword', query: { email: this.ruleForm.email } })
            } else {
              this.$message.error(response.data.retMsg, 5)
            }
          })

          // debugger;
          // axios
          //   .post(this.serverUrl + "authc/login", {
          //     loginName: this.ruleForm.email,
          //     password: this.ruleForm.password
          //   })
          //   .then(response => {
          //     debugger;
          //     if (response.data.retCode === "000001") {
          //       localStorage.setItem("Token", response.data.data);
          //       this.$router.push({ path: "/Home" });
          //     } else {
          //       this.$message.warning("用户名或密码错误",5);
          //     }
          //   });
        } else {
          alert('请输入注册过的邮箱！')
          return false
        }
      })
      this.fetchCaptchaCode()
    },

    back () {
      this.$router.push({ path: '/Login' })
    }
  }
}
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
