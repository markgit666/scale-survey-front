<template>
  <div class="info_box">
    <a-card title="添加临床基本信息">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="175px" class="form-div">
        <!-- 姓名 -->
        <el-form-item label="姓名 :" class="form-item-div" prop="name">
          <el-input v-model="ruleForm.name" size="medium" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <!-- 出生日期 -->
        <el-form-item label="出生日期 :" prop="birthday" class="form-item-div">
          <el-date-picker
            size="medium"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.birthday"
            style="width: 100%;"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <!-- 性别 -->
        <el-form-item label="性别 :" prop="gender" class="form-item-div">
          <el-select
            v-model="ruleForm.gender"
            placeholder="请选择性别"
            style="width: 100%;"
            size="medium"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 家庭地址 -->
        <el-form-item label="家庭地址 :" class="form-item-div" prop="familyAddress">
          <el-input v-model="ruleForm.familyAddress" size="medium" placeholder="请输入家庭地址"></el-input>
        </el-form-item>

        <!-- 联系方式 -->
        <el-form-item label="联系方式 :" class="form-item-div" prop="telephoneNumber">
          <el-input v-model="ruleForm.telephoneNumber" size="medium" placeholder="请输入联系方式"></el-input>
        </el-form-item>

        <!-- 利手 -->
        <el-form-item label="利手 :" class="form-item-div">
          <el-select v-model="ruleForm.hand" placeholder="请选择" style="width: 100%;" size="medium">
            <el-option label="左" value="左手"></el-option>
            <el-option label="右" value="右手"></el-option>
          </el-select>
        </el-form-item>

        <!-- 民族 -->
        <el-form-item label="民族 :" class="form-item-div">
          <el-select
            v-model="ruleForm.nation"
            placeholder="请选择民族"
            style="width: 100%;"
            size="medium"
          >
            <el-option label="汉族" value="汉族"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <!-- 婚姻 -->
        <el-form-item label="婚姻 :" class="form-item-div">
          <el-select
            v-model="ruleForm.marriageStatus"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
          >
            <el-option label="未婚" value="未婚"></el-option>
            <el-option label="有配偶" value="有配偶"></el-option>
            <el-option label="离异" value="离异"></el-option>
            <el-option label="丧偶" value="丧偶"></el-option>
          </el-select>
        </el-form-item>

        <!-- 职业 -->
        <el-form-item label="职业 :" class="form-item-div">
          <el-select
            v-model="ruleForm.jobType"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="jobChange"
          >
            <el-option label="退休" value="退休"></el-option>
            <el-option label="离休" value="离休"></el-option>
            <el-option label="在职" value="在职"></el-option>
          </el-select>
        </el-form-item>

        <!-- 如果是在职，输入职业 -->
        <el-form-item label="在职职业 :" class="form-item-div" v-if="showJob">
          <el-input v-model="ruleForm.inServiceJob" size="medium" placeholder="请输入"></el-input>
        </el-form-item>

        <!-- 文化程度 -->
        <el-form-item label="文化程度 :" class="form-item-div">
          <el-select
            v-model="ruleForm.educationLevel"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
          >
            <el-option label="未上学" value="未上学"></el-option>
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中/中专" value="高中/中专"></el-option>
            <el-option label="大专/职大" value="大专/职大"></el-option>
            <el-option label="大学" value="大学"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>

        <!-- 受教育年数 -->
        <el-form-item label="受教育年数 :" class="form-item-div" prop="educationYears">
          <el-input
            type="age"
            v-model.number="ruleForm.educationYears"
            size="medium"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 是否打呼噜 -->
        <el-form-item label="是否打呼噜 :" class="form-item-div">
          <el-select
            v-model="ruleForm.isSnoring"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
          >
            <el-option label="打呼噜" value="打呼噜"></el-option>
            <el-option label="不打呼噜" value="不打呼噜"></el-option>
            <el-option label="有时打呼噜" value="有时打呼噜"></el-option>
          </el-select>
        </el-form-item>

        <!-- 居住方式 -->
        <el-form-item label="居住方式 :" class="form-item-div">
          <el-select
            v-model="ruleForm.livingWay"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
          >
            <el-option label="独居" value="独居"></el-option>
            <el-option label="与子女同住" value="与子女同住"></el-option>
            <el-option label="与配偶同住" value="与配偶同住"></el-option>
            <el-option label="与保姆同住" value="与保姆同住"></el-option>
            <el-option label="敬老院" value="敬老院"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <!-- 既往病史 -->
        <el-form-item label="既往病史 :" class="form-item-div">
          <el-select
            v-model="ruleForm.medicalHistory"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="diseaseChange"
          >
            <el-option label="高血压" value="高血压"></el-option>
            <el-option label="糖尿病" value="糖尿病"></el-option>
            <el-option label="冠心病" value="冠心病"></el-option>
            <el-option label="脑中风/脑梗" value="脑中风/脑梗"></el-option>
            <el-option label="其他疾病" value="其他疾病"></el-option>
          </el-select>
        </el-form-item>

        <!-- 如果是其他病史，输入其他病史  -->
        <el-form-item label="其他病史 :" class="form-item-div" v-if="showDisease">
          <el-input v-model="ruleForm.otherMedicalHistory" size="medium" placeholder="请输入"></el-input>
        </el-form-item>

        <!-- 吸烟史 -->
        <el-form-item label="吸烟史 :" class="form-item-div">
          <el-select
            v-model="ruleForm.smokingHistory"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="smokingChange"
          >
            <el-option label="没有吸烟史" value="没有吸烟史"></el-option>
            <el-option label="已戒" value="已戒"></el-option>
            <el-option label="仍在吸" value="仍在吸"></el-option>
          </el-select>
        </el-form-item>

        <!-- 如果仍在吸烟 -->
        <el-form-item
          label="一天抽几支 :"
          class="form-item-div"
          v-if="showSmoke"
          prop="smokingNumEachDay"
        >
          <el-input
            v-model.number="ruleForm.smokingNumEachDay"
            size="medium"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 吸烟年数 -->
        <el-form-item label="吸烟年数 :" class="form-item-div" prop="smokingYears" v-if="showSmoke">
          <el-input
            v-model.number="ruleForm.smokingYears"
            size="medium"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 饮酒史 -->
        <el-form-item label="饮酒史 :" class="form-item-div">
          <el-select
            v-model="ruleForm.drinkingHistory"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="drinkingChange"
          >
            <el-option label="没有饮酒史" value="没有饮酒史"></el-option>
            <el-option label="已戒" value="已戒"></el-option>
            <el-option label="仍在喝" value="仍在喝"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="饮酒类型 :" class="form-item-div" v-if="showDrink">
          <el-select
            multiple
            v-model="ruleForm.drinkingType"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
          >
            <el-option label="啤酒" value="啤酒"></el-option>
            <el-option label="黄酒" value="黄酒"></el-option>
            <el-option label="白酒" value="白酒"></el-option>
            <el-option label="葡萄酒" value="葡萄酒"></el-option>
          </el-select>
        </el-form-item>

        <!-- 如果仍在喝酒 -->
        <el-form-item
          label="一天几两 :"
          class="form-item-div"
          v-if="showDrink"
          prop="drinkingNumEachDay"
        >
          <el-input
            v-model.number="ruleForm.drinkingNumEachDay"
            size="medium"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 喝酒年数 -->
        <el-form-item label="喝酒年数 :" class="form-item-div" prop="drinkingYears" v-if="showDrink">
          <el-input
            v-model.number="ruleForm.drinkingYears"
            size="medium"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 精神疾病家族史 -->
        <el-form-item label="有无精神疾病家族史 :" class="form-item-div">
          <el-select
            v-model="ruleForm.isMentalDiseaseFamilyHistory"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="mentalDiseaseChange"
          >
            <el-option label="无" value="无"></el-option>
            <el-option label="有" value="有"></el-option>
          </el-select>
        </el-form-item>

        <!-- 如果有 精神疾病家族史 -->
        <el-form-item label="精神疾病家族史 :" class="form-item-div" v-if="showMentalDisease">
          <el-select
            v-model="ruleForm.mentalDiseaseFamilyHistory"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="otherMentalDiseaseChange"
          >
            <el-option label="痴呆" value="痴呆"></el-option>
            <el-option label="抑郁症" value="抑郁症"></el-option>
            <el-option label="神经衰弱" value="神经衰弱"></el-option>
            <el-option label="其他精神病史" value="其他精神病史"></el-option>
          </el-select>
        </el-form-item>

        <!-- 如果是其他精神病史，输入其他精神病史 -->
        <el-form-item label="其他精神病史 :" class="form-item-div" v-if="showOtherMentalDisease">
          <el-input
            v-model="ruleForm.otherMentalDiseaseFamilyHistory"
            size="medium"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <!-- 现病史 -->
        <el-form-item label="现病史（有无记忆下降）:" class="form-item-div">
          <el-select
            v-model="ruleForm.currentMedicalHistory_memoryLoss"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="memoryChange"
          >
            <el-option label="无" value="无记忆力下降"></el-option>
            <el-option label="有" value="有记忆力下降"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="记忆力下降多久 :" class="form-item-div" v-if="showMemory">
          <el-input v-model="ruleForm.memoryLossTime" size="medium" placeholder="请输入"></el-input>
        </el-form-item>

        <!-- 体格检查情况 -->
        <el-form-item label="体格检查情况 :" class="form-item-div">
          <el-input v-model="ruleForm.physicalExamination" size="medium" placeholder="请输入"></el-input>
        </el-form-item>

        <!-- 是否合并使用促认知药物 -->
        <el-form-item label="是否合并使用促认知药物 :" class="form-item-div">
          <el-select
            v-model="ruleForm.isUseCognitiveDrugs"
            placeholder="请选择"
            style="width: 100%;"
            size="medium"
            @change="cognitiveDrugChange"
          >
            <el-option label="无" value="无合并使用促认知药物"></el-option>
            <el-option label="有" value="有合并使用促认知药物"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="具体促认知药物 :" class="form-item-div" v-if="showCognitiveDrug">
          <el-input v-model="ruleForm.drugsType " size="medium" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item
          label="具体药物的剂量 :"
          class="form-item-div"
          v-if="showCognitiveDrug"
          prop="drugsDosage"
        >
          <el-input
            v-model.number="ruleForm.drugsDosage"
            size="medium"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 保存按钮 -->
        <el-form-item>
          <el-button type="primary" @click="updateInfo('ruleForm')" class="saveButton">保存</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单结束位置 -->
    </a-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    //手机号
    var validatePhone = (rule, value, callback) => {
      if (/^1[34578]{1}\d{9}$/.test(value) == false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {},
      rules: {
        name: [{ required: true, message: "不能为空！", trigger: "blur" }],
        birthday: [{ required: true, message: "不能为空！", trigger: "blur" }],
        gender: [{ required: true, message: "不能为空！", trigger: "blur" }],
        familyAddress: [
          { required: true, message: "不能为空！", trigger: "blur" }
        ],
        telephoneNumber: [
          { required: true, message: "不能为空！", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        educationYears: [{ type: "number", message: "必须为数字值" }],
        smokingNumEachDay: [{ type: "number", message: "必须为数字值" }],
        smokingYears: [{ type: "number", message: "必须为数字值" }],
        drinkingNumEachDay: [{ type: "number", message: "必须为数字值" }],
        drinkingYears: [{ type: "number", message: "必须为数字值" }],
        drugsDosage: [{ type: "number", message: "必须为数字值" }]
      },
      //服务器地址
      serverUrl: this.GLOBAL.serverUrl,
      showJob: false,
      showDisease: false,
      showSmoke: false,
      showDrink: false,
      showMentalDisease: false,
      showOtherMentalDisease: false,
      showMemory: false,
      showCognitiveDrug: false,
      //个人信息
      name: "zoujiem",
      birthday: null,
      educationYears: "",
      gender: "",
      config: {
        rules: [
          { type: "object", required: true, message: "Please select time!" }
        ]
      }
    };
  },

  mounted() {
    this.fetch();
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },

  methods: {
    handleChange() {},
    //   如果是在职，输入职业
    jobChange(value) {
      if (value == "在职") {
        this.showJob = true;
      } else {
        this.showJob = false;
      }
    },
    diseaseChange(value) {
      if (value == "其他疾病") {
        this.showDisease = true;
      } else {
        this.showDisease = false;
      }
    },
    smokingChange(value) {
      if (value == "仍在吸") {
        this.showSmoke = true;
      } else {
        this.showSmoke = false;
      }
    },
    drinkingChange(value) {
      if (value == "仍在喝") {
        this.showDrink = true;
      } else {
        this.showDrink = false;
      }
    },
    mentalDiseaseChange(value) {
      if (value == "有") {
        this.showMentalDisease = true;
      } else {
        this.showMentalDisease = false;
        this.showOtherMentalDisease = false;
      }
    },
    otherMentalDiseaseChange(value) {
      if (value == "其他精神病史") {
        this.showOtherMentalDisease = true;
      } else {
        this.showOtherMentalDisease = false;
      }
    },
    memoryChange(value) {
      if (value == "有记忆力下降") {
        this.showMemory = true;
      } else {
        this.showMemory = false;
      }
    },
    cognitiveDrugChange(value) {
      if (value == "有合并使用促认知药物") {
        this.showCognitiveDrug = true;
      } else {
        this.showCognitiveDrug = false;
      }
    },

    toggle() {
      this.disabled = !this.disabled;
    },
    //更新
    fetch() {
      let that = this;
      debugger;
      axios
        .post(this.serverUrl + "/patient/info/get", this.$route.query, {
          headers: {
            Token: localStorage.getItem("Token")
          }
        })
        .then(response => {
          debugger;
          if ((response.data.retCode = "000000")) {
            console.log(response);
            that.ruleForm = response.data.data;
          }
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    },

    // 更新
    updateInfo(formName) {
      this.$refs[formName].validate(valid => {
        // debugger;
        if (valid) {
          this.$http
            .post(this.serverUrl + "/patient/info/save", this.ruleForm, {
              headers: {
                Token: localStorage.getItem("Token")
              }
            })
            .then(function(data) {
              console.log(data);
              this.$message.success("更新成功", 5);
              this.$router.push({ path: "/Home/MyPatients" });
            });
        } else {
          alert("格式错误！请检查");
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
.info_box {
  /* border: 1px solid saddlebrown; */
  /* width: 100%; */
  text-align: center;
}

.form {
  border: 1px solid springgreen;
}
.text {
  color: #2d8cf0;
  font-size: 2.5vh;
}

.form-div {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid saddlebrown; */
  /* margin-left: -90px; */
  width: 100%;
}

.form-item-div {
  width: 80%;
  margin-left: -120px;
}

.saveButton {
  margin-left: -200px;
  width: 200px;
}
</style>

