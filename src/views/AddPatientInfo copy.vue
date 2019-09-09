
<template>
  <div class="info_box">
    <a-card title="添加临床基本信息">
      <a-form :form="form" @submit="submitInfo">
        <!-- 1.姓名 -->
        <a-form-item label="姓名：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
          <a-input
            placeholder="请输入姓名"
            v-decorator="[
          'name',
          {rules: [{ required: true, message: '姓名不允许为空!' }]}
        ]"
          />
        </a-form-item>

        <!--2.出生日期 -->
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="出生日期：">
          <a-date-picker
            :style="{width:'100%'}"
            placeholder="请选择"
            v-decorator="['birthday', config]"
          />
        </a-form-item>

        <!-- 3.性别 -->
        <a-form-item label="性别：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select
            placeholder="请选择"
            v-decorator="[
          'gender',
          {rules: [{ required: true, message: '性别不允许为空!' }]}
        ]"
          >
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="2">女</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 9.家庭地址 -->
        <a-form-item label="家庭地址：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
          <a-input
            placeholder="请输入"
            v-decorator="[
          'familyAddress',
          {rules: [{ required: true, message: '家庭地址不允许为空!' }]}
        ]"
          />
        </a-form-item>
        <!-- 10.联系电话 -->
        <a-form-item label="联系电话：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
          <a-input
            placeholder="请输入"
            v-decorator="[
          'telephoneNumber',
          {rules: [{ required: true, message: '联系电话不允许为空!' }]}
        ]"
          />
        </a-form-item>

        <!-- 4.民族 -->
        <a-form-item label="民族：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择">
            <a-select-option value="汉族">汉族</a-select-option>
            <a-select-option value="其他">其他</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 5.婚姻 -->
        <a-form-item label="婚姻：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择">
            <a-select-option value="未婚">未婚</a-select-option>
            <a-select-option value="有配偶">有配偶</a-select-option>
            <a-select-option value="离异">离异</a-select-option>
            <a-select-option value="丧偶">丧偶</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 6.职业 -->
        <a-form-item label="职业：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择" @change="jobChange">
            <a-select-option value="退休">退休</a-select-option>
            <a-select-option value="离休">离休</a-select-option>
            <a-select-option value="在职">在职</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 如果是在职，输入职业 -->
        <a-form-item
          v-if="showJob"
          label="在职职业："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input placeholder="输入您所在职职业：" />
        </a-form-item>

        <!-- 7.文化程度 -->
        <a-form-item label="文化程度：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择">
            <a-select-option value="未上学">未上学</a-select-option>
            <a-select-option value="小学">小学</a-select-option>
            <a-select-option value="初中">初中</a-select-option>
            <a-select-option value="高中/中专">高中/中专</a-select-option>
            <a-select-option value="大专/职大">大专/职大</a-select-option>
            <a-select-option value="大学">大学</a-select-option>
            <a-select-option value="硕士">硕士</a-select-option>
            <a-select-option value="博士">博士</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 8.受教育年数 -->
        <a-form-item label="受教育年数：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
          <a-input placeholder="请输入" v-model="educationYears" @change="handleChange" />
        </a-form-item>

        <!-- 是否打呼噜 -->
        <a-form-item label="是否打呼噜：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择">
            <a-select-option value="打呼噜">是</a-select-option>
            <a-select-option value="不打呼噜">否</a-select-option>
            <a-select-option value="有时打呼噜">有时</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 12.居住方式 -->
        <a-form-item label="居住方式：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择">
            <a-select-option value="独居">独居</a-select-option>
            <a-select-option value="与子女同住">与子女同住</a-select-option>
            <a-select-option value="与配偶同住">与配偶同住</a-select-option>
            <a-select-option value="与保姆同住">与保姆同住</a-select-option>
            <a-select-option value="敬老院">敬老院</a-select-option>
            <a-select-option value="其他">其他</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 13.既往病史 -->
        <a-form-item label="既往病史：" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择" @change="diseaseChange">
            <a-select-option value="高血压">高血压</a-select-option>
            <a-select-option value="糖尿病">糖尿病</a-select-option>
            <a-select-option value="冠心病">冠心病</a-select-option>
            <a-select-option value="脑中风/脑梗">脑中风/脑梗</a-select-option>
            <a-select-option value="其他疾病">其他疾病</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 如果是其他病史，输入其他病史 -->
        <a-form-item
          v-if="showDisease"
          label="其他病史："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input placeholder="输入其他病史" />
        </a-form-item>

        <!--14. 吸烟史 -->
        <a-form-item label="吸烟史:" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择" @change="smokingChange">
            <a-select-option value="否">否</a-select-option>
            <a-select-option value="已戒 ">已戒</a-select-option>
            <a-select-option value="仍在吸">仍在吸</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 如果是其他病史，输入其他病史 -->
        <a-form-item
          v-if="showSmoke"
          label="一天抽几支："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input placeholder="一天抽几支" />
        </a-form-item>
        <a-form-item
          v-if="showSmoke"
          label="吸烟年数："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input placeholder="吸烟年数" />
        </a-form-item>

        <!-- 15.精神疾病家族史 -->
        <a-form-item label="有无精神疾病家族史:" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择" @change="mentalDiseaseChange">
            <a-select-option value="无">无</a-select-option>
            <a-select-option value="有">有</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 如果有 精神疾病家族史 -->
        <a-form-item
          label="精神疾病家族史:"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          v-if="showMentalDisease"
        >
          <a-select placeholder="请选择" @change="otherMentalDiseaseChange">
            <a-select-option value="痴呆">痴呆</a-select-option>
            <a-select-option value="抑郁症">抑郁症</a-select-option>
            <a-select-option value="神经衰弱">神经衰弱</a-select-option>
            <a-select-option value="其他精神病史">其他精神病史</a-select-option>
          </a-select>
        </a-form-item>

        <!-- 如果是其他精神病史，输入其他精神病史 -->
        <a-form-item
          v-if="showOtherMentalDisease"
          label="其他精神病史:"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16}"
        >
          <a-input placeholder="请输入其他精神病史" />
        </a-form-item>

        <!-- 16. 现病史 -->
        <a-form-item label="现病史（有无记忆下降）:" :label-col="{ span: 5 }" :wrapper-col="{ span: 16}">
          <a-select placeholder="请选择" @change="memoryChange">
            <a-select-option value="有记忆力下降">有</a-select-option>
            <a-select-option value="无记忆力下降">无</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="记忆力下降多久："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span:16 }"
          v-if="showMemory"
        >
          <a-input placeholder="请输入" />
        </a-form-item>

        <!-- 17.体格检查 -->
        <a-form-item label="体格检查：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
          <a-input placeholder="请输入" />
        </a-form-item>

        <!-- 18. 是否合并使用促认知药物 -->
        <a-form-item label="是否合并使用促认知药物:" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-select placeholder="请选择" @change="cognitiveDrugChange">
            <a-select-option value="有合并使用促认知药物">有</a-select-option>
            <a-select-option value="无合并使用促认知药物">无</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="具体药物及剂量:"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span:16 }"
          v-if="showCognitiveDrug"
        >
          <a-input placeholder="请输入具体药物及剂量" />
        </a-form-item>

        <center>
          <a-button type="primary" html-type="submit">保存</a-button>
        </center>
      </a-form>
    </a-card>
    <!-- 表单结束位置 -->

    <!-- <a href="https://www.baidu.com">点击</a> -->
    <!-- <button @click="save">保存</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //服务器地址
      serverUrl: this.GLOBAL.serverUrl,
      showJob: false,
      showDisease: false,
      showSmoke: false,
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
  //   规则校验
  beforeCreate() {
    this.form = this.$form.createForm(this);
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
    //保存数据到数据库
    submitInfo(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        debugger;
        if (!err) {
          values.birthday = values.birthday.format("YYYY-MM-DD");
          this.$http
            .post(this.serverUrl + "patient/info/save", values, {
              headers: {
                Token: localStorage.getItem("Token")
              }
            })
            .then(function(data) {
              console.log(data);
              this.$message.success("保存成功！",5);
              this.$router.push({ path: "/home/myPatients" });
            });
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
</style>


