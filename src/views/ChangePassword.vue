<template>
  <div id="main">
    <a-card title="找回密码" hoverable style="width: 35rem">
      <h4>邮箱验证码已发送至{{this.$route.query.email}}</h4>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-dynamic"
      >
        <el-form-item prop="verificationCode" label="邮箱验证:">
          <div class="verifyCode">
            <el-input type="text" maxlength="6" show-word-limit v-model="ruleForm.verificationCode" size="medium"
                      placeholder="请输入验证码" class="verifyCode-input"></el-input>
            <a @click="sendMessage" class="verifyCode-a">{{verifyCodeText}}</a>
          </div>
        </el-form-item>
        <el-form-item label="新密码:" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入新的密码"
            size="medium"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('ruleForm')" class="login-form-button">提交</el-button>
        </el-form-item>
        <a @click="back">返回修改邮箱</a>
      </el-form>

    </a-card>
  </div>
</template>

<script>
import axios from 'axios'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

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
      verifyCodeText: '重新发送',
      btnDisabled: false,
      // 表单 邮箱校验
      ruleForm: {
        verificationCode: '',
        password: ''
      },
      serverUrl: this.GLOBAL.serverUrl,
      rules: {

        verificationCode: [
          { required: true, message: '验证码不能为空!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空!', trigger: 'blur' },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      },
      passwordEncrypt: ''
    }
  },

  // 创建表单
  resetForm (formName) {
    this.$refs[formName].resetFields()
  },
  methods: {
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
        this.verifyCodeText = '重新发送'
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

    // 获取验证码
    getVerifyCode () {

    },

    // 密码加密
    encryptPassword () {
      let encryptor = new JSEncrypt() // 新建JSEncrypt对象
      let publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDnjcWABbbV9C/J6ApZUExQnbMo
a+mZ+RGzkN8kwWqYT2y+QxaQ9fpF0lDPM9PN6b9Xo7czpJ77l8oJ5IDuNYOZF2/f
EyAyLGgNjWt1aPa5X6ST0o+mXMfV7UptEIAv7Re1SOukVuA1Ivt7Lq9AHj9kY0Zm
Xrej5WAcEy7ThIi17wIDAQAB` // 把之前生成的贴进来，实际开发过程中，可以是后台传过来的
      encryptor.setPublicKey(publicKey) // 设置公钥
      this.passwordEncrypt = encryptor.encrypt(this.ruleForm.password) // 对需要加密的数据进行加密
    },

    // 提交---修改新的密码
    submit (formName) {
      // 密码加密
      this.encryptPassword()
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post(this.serverUrl + 'authc/password/modify', {
            emailAddress: this.$route.query.email,
            verifyCode: this.ruleForm.verificationCode,
            newPassword: this.passwordEncrypt
          }).then(response => {
            if (response.data.retCode === '000000') {
              this.$router.push({ path: '/Login' })
              this.$message.success('修改成功', 5)
            } else {
              this.$message.error(response.data.retMsg, 5)
            }
          }, err => {
            alert('网络异常，请检查是否连接上网络')
          })
        }
      })
    },
    // 返回修改邮箱
    back () {
      this.$router.push({ path: '/findPassword' })
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

  /* 表单 */
  .demo-dynamic {
    width: 90%;
    align-items: center;
    margin: 0 auto;
    margin-left: 10px;
  }

  /* 登录按钮*/
  .login-form-button {
    width: 113%;
    margin-top: 10px;
    margin-left: -45px;
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
