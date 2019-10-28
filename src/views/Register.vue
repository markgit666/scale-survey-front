<template>
  <div id="register">
    <a-card title="注册" hoverable style="width: 90vh;">
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

        <el-form-item prop="verifyCode" label="验证码:">
          <div class="verifyCode">
            <el-input v-model="ruleForm.verifyCode" size="medium" placeholder="请输入验证码"
                      class="verifyCode-input"></el-input>
            <a @click="sendMessage" class="verifyCode-a">{{verifyCodeText}}</a>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register('ruleForm')" class="login-form-button">注册</el-button>
        </el-form-item>
      </el-form>

      <a @click="backLogin">返回登录</a>

    </a-card>
  </div>
</template>

<script>
import axios from 'axios'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
  data () {
    // 密码
    var validatePass1 = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error('请输入6-20位密码，必须包含大小写字母和数字'))
      } else {
        callback()
      }
    }
    // 确认密码
    var validatePass2 = (rule, value, callback) => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(value) == false) {
        callback(new Error('请输入6-20位密码，必须包含大小写字母和数字'))
      } else if (value !== this.ruleForm.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      verifyCodeText: '邮箱验证',
      btnDisabled: false,
      serverUrl: this.GLOBAL.serverUrl,
      // 表单 邮箱校验
      ruleForm: {
        email: '',
        password1: '',
        password2: '',
        verifyCode: ''
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空!', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        password1: [
          { required: true, message: '密码不能为空!', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空!', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      // 加密加密1
      encryptPassword1: '',
      // 加密加密2
      encryptPassword1: ''
    }
  },
  resetForm (formName) {
    // eslint-disable-next-line no-sequences
    this.$refs[formName].resetFields()
  },

  methods: {
    // 取消注册
    backLogin () {
      this.$router.push({ path: '/Login' })
    },

    // 验证码
    sendMessage () {
      if (this.ruleForm.email !== '') {
        if (this.btnDisabled) {
          return
        }
        this.getVerifyCode()
        this.getSecond(60)
      } else {
        alert('提示：\n\n请输入邮箱')
      }
    },

    getSecond (wait) {
      let _this = this
      let _wait = wait
      if (wait === 0) {
        this.btnDisabled = false
        this.verifyCodeText = '获取验证码'
        wait = _wait
      } else {
        this.btnDisabled = true
        this.verifyCodeText = '验证码(' + wait + 's)'
        wait--
        setTimeout(function () {
          _this.getSecond(wait)
        },
        1000)
      }
    },

    /**
       * 获取验证码
       */
    getVerifyCode () {
      // 对电子邮件的验证
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!myreg.test(this.ruleForm.email)) {
        alert('提示：\n\n请输入正确的邮箱地址！')
        myreg.focus()
        return false
      } else {
        axios.post(this.serverUrl + 'authc/verifyCode/get',
          {
            emailAddress: this.ruleForm.email
          }).then(response => {
          debugger
          if (response.data.retCode === '000003') {
            this.$message.success(response.data.retMsg, 5)
          } else if (response.data.retCode === '100008') {
            this.$message.error('验证码错误', 5)
          } else {
            this.$message.error('获取验证码失败，请稍后重试', 5)
          }
        })
      }
    },

    // 密码加密
    encryptPassword () {
      let encryptor = new JSEncrypt() // 新建JSEncrypt对象
      let publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDnjcWABbbV9C/J6ApZUExQnbMo
a+mZ+RGzkN8kwWqYT2y+QxaQ9fpF0lDPM9PN6b9Xo7czpJ77l8oJ5IDuNYOZF2/f
EyAyLGgNjWt1aPa5X6ST0o+mXMfV7UptEIAv7Re1SOukVuA1Ivt7Lq9AHj9kY0Zm
Xrej5WAcEy7ThIi17wIDAQAB` // 把之前生成的贴进来，实际开发过程中，可以是后台传过来的

      encryptor.setPublicKey(publicKey) // 设置公钥
      this.encryptPassword1 = encryptor.encrypt(this.ruleForm.password1) // 对需要加密的数据进行加密
      this.encryptPassword2 = encryptor.encrypt(this.ruleForm.password2) // 对需要加密的数据进行加密
    },

    // 点击"确定"按钮, 同时会获取到表单提交的数据
    register (formName) {
      // 密码加密
      this.encryptPassword()
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(this.serverUrl + 'authc/register', {
              loginName: this.ruleForm.email,
              password: this.encryptPassword1,
              confirmPassword: this.encryptPassword2,
              verifyCode: this.ruleForm.verifyCode
            })
            .then(response => {
              debugger
              if (response.data.retCode === '100004') {
                this.$message.error('用户名已被注册！', 5)
              } else if (response.data.retCode === '000002') {
                this.$message.success('注册成功！', 5)
                this.$router.push({ path: '/Login' })
              } else if (response.data.retCode === '100008'){
                this.$message.error('验证码不正确！', 5)
              } else {
                this.$message.error('注册失败！', 5)
              }
            })
        }
        // else {
        //   this.$message.error('注册失败！', 5)
        //   return false
        // }
      })
    }
  }
}
</script>

<style scoped>
  #register {
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

  .verifyCode {
    width: 100%;
    display: flex;
    flex-direction: row;
    /*border: 1px solid red;*/
  }

  .verifyCode-input {
    width: 75%;
  }

  .verifyCode-a {
    width: 25%;
  }

</style>
