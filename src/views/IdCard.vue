<template>
  <div>
    <div>
      <a-row>
        <a-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></a-col>
        <a-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
          <a-card>
            <el-divider content-position="left"><strong>1.输入身份证号</strong></el-divider>
            <center>
              <strong>
                <h2>基于经颅电刺激的认知障碍疾病综合康复研究</h2>
              </strong>
            </center>
            <div>
              <el-row :gutter="10">
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
                    <el-form-item prop="idCard" label="被试者身份证号码:">
                      <el-input
                        type="text"
                        show-word-limit
                        maxlength="18"
                        size="small"
                        placeholder="请输入身份证号码"
                        v-model="ruleForm.idCard"
                        :style="{width:'100%'}"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <a-button type="primary" @click="conform('ruleForm')">确定</a-button>
                </el-col>
              </el-row>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  data() {
    //验证身份证号格式
    var validateId = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value) && value != "") {
          callback(new Error("请输入正确的身份证号码"));
        } else {
          callback();
        }
      }
    };
    return {
      serverUrl: this.GLOBAL.serverUrl,
      ruleForm: {
        idCard: ""
      },

      rules: {
        idCard: [
          { required: true, message: "不能为空！", trigger: "blur" },
          { validator: validateId, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    conform(formName) {
      // 页面之间传值，传身份证号码
      // const idCardData = { idCard: this.ruleForm.idCard };
      sessionStorage.setItem("idCard", this.ruleForm.idCard);
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              this.serverUrl + "paper/patient/report/status/check",
              {
                reportId: this.$route.query.reportId,
                idCard: this.ruleForm.idCard,
                doctorId:localStorage.getItem("doctorId")
              },
              {
                headers: {
                  Token: localStorage.getItem("Token")
                }
              }
            )
            .then(response => {
              if (response.data.retCode === "000000") {
                var urlFirst =
                  "/home/AnswerSteps" +
                  "?reportId=" +
                  this.$route.query.reportId +
                  "&doctorId=" +
                  "that.$route.query.doctorId";
                // var urlNotFirst =
                //   "/home/AnswerReport" +
                //   "?reportId=" +
                //   this.$route.query.reportId +
                //   "&doctorId=" +
                //   "that.$route.query.doctorId";

            var urlNotFirst =
              "/home/followUpInfo" +
              "?reportId=" +
              this.$route.query.reportId +
              "&doctorId=" +
              "that.$route.query.doctorId";

                // 如果第一次答题：病人信息
                if (response.data.data === null) {
                  // var dortorIdParam = that.$route.query.doctorId
                  this.$router.push({
                    path: urlFirst,
                    query: {
                      reportId: that.$route.query.reportId, //获取当前URL的参数reportId，传到下一个页面
                      doctorId: that.$route.query.doctorId //获取当前URL的参数doctorId，传到下一个页面
                    }
                  });
                } else {
                  //如果不是第一次答题

                  this.patientId = response.data.data.patientId; //得到返回的patientId
                  sessionStorage.setItem("patientId", this.patientId); //存储patientId
                  this.$router.push({
                    path: urlNotFirst,
                    query: {
                      reportId: that.$route.query.reportId, //获取当前URL的参数reportId，传到下一个页面
                      doctorId: that.$route.query.doctorId
                    }
                  });
                }
              } else {
                this.$message.warning(response.data.retMsg, 2);
              }
            });
        } else {
          this.$message.error("格式错误，请检查！");
          return false;
        }
      });
    }
  }
};
</script>
