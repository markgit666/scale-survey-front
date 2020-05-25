<template>
  <div >
    <a-card title="添加临床基本信息" class="info_box">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" >

        <a-row :gutter="10">
          <a-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <!-- 身份证号 -->
            <div  :style="{marginTop:'15px', float:'left'}">
              <strong> <label>身份证号：{{ruleForm.idCard}}</label></strong>
            </div>
          </a-col>
        </a-row>

        <!-- --------------------------------- ----------------------->
        <a-row :gutter="10">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 姓名 -->
            <el-form-item label="姓名 :" prop="name" :style="{marginTop:'20px'}">
              <el-input
                v-model="ruleForm.name"
                type="text"
                maxlength="10"
                show-word-limit
                size="medium"
                style="width:100%;"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </a-col>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 出生年月 -->
            <el-form-item label="出生年月:" prop="birthday" :style="{marginTop:'20px'}">
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
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="10">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 性别 -->
            <el-form-item label="性别 :" prop="gender" style="width:100%;">
              <el-radio label="1" v-model="ruleForm.gender">男</el-radio>
              <el-radio label="0" v-model="ruleForm.gender">女</el-radio>
            </el-form-item>
          </a-col>
          <!-- 民族 -->
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="民族 :" style="width:100%;">
              <el-radio v-model="ruleForm.nation" label="汉族">汉族</el-radio>
              <el-radio v-model="ruleForm.nation" label="其他">其他</el-radio>
            </el-form-item>
          </a-col>
        </a-row>
        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="10">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 利手 -->
            <el-form-item label="利手 :" style="width:90%;">
              <el-radio v-model="ruleForm.hand" label="左">左</el-radio>
              <el-radio v-model="ruleForm.hand" label="右">右</el-radio>
            </el-form-item>
          </a-col>

          <!-- 婚姻 -->
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="婚姻 :">
              <el-select
                v-model="ruleForm.marriageStatus"
                placeholder="请选择"
                style="width:100%;"
                size="medium"
              >
                <el-option label value></el-option>
                <el-option label="未婚" value="未婚"></el-option>
                <el-option label="有配偶" value="有配偶"></el-option>
                <el-option label="离异" value="离异"></el-option>
                <el-option label="丧偶" value="丧偶"></el-option>
              </el-select>
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="10">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 文化程度 -->
            <el-form-item label="文化程度 :">
              <el-select
                v-model="ruleForm.educationLevel"
                placeholder="请选择"
                style="width:100%;"
                size="medium"
              >
                <el-option label value></el-option>
                <el-option label="未上学" value="未上学"></el-option>
                <el-option label="小学" value="小学"></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中/中专" value="高中/中专"></el-option>
                <el-option label="大专/职大" value="大专/职大"></el-option>
                <el-option label="大学及以上" value="大学及以上"></el-option>
              </el-select>
            </el-form-item>
          </a-col>

          <!-- 居住方式 -->
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="居住方式 :">
              <el-select
                v-model="ruleForm.livingWay"
                placeholder="请选择"
                style="width:100%;"
                size="medium"
              >
                <el-option label value></el-option>
                <el-option label="独居" value="独居"></el-option>
                <el-option label="与子女同住" value="与子女同住"></el-option>
                <el-option label="与配偶同住" value="与配偶同住"></el-option>
                <el-option label="与保姆同住" value="与保姆同住"></el-option>
                <el-option label="敬老院" value="敬老院"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="10">
          <!-- 受教育年数-->
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 受教育年数 -->
            <el-form-item label="教育年数 :">
              <a-input-number
                v-model="ruleForm.educationYears"
                placeholder="请输入数字值"
                style="width:100%;"
              />
            </el-form-item>
          </a-col>

          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 联系电话 -->
            <el-form-item label="联系电话 :" prop="telephoneNumber">
              <el-input
                type="text"
                maxlength="11"
                show-word-limit
                style="width:100%;"
                v-model="ruleForm.telephoneNumber"
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="10">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 职业 -->
            <el-form-item label="职业 :" >
              <el-select
                v-model="ruleForm.workStatus"
                placeholder="请选择"
                style="width:100%;"
                size="medium"
                @change="jobChange"

              >
                <el-option label value></el-option>
                <el-option label="退休" value="退休"></el-option>
                <el-option label="离休" value="离休"></el-option>
                <el-option label="在职" value="在职"></el-option>
              </el-select>
            </el-form-item>
          </a-col>
          <!-- 既往病史 -->
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="既往病史 :">
              <el-select
                v-model="ruleForm.medicalHistory"
                placeholder="请选择"
                style="width:100%;"
                size="medium"
                @change="diseaseChange"
              >
                <el-option label value></el-option>
                <el-option label="高血压" value="高血压"></el-option>
                <el-option label="糖尿病" value="糖尿病"></el-option>
                <el-option label="冠心病" value="冠心病"></el-option>
                <el-option label="脑中风/脑梗" value="脑中风/脑梗"></el-option>
                <el-option label="其他疾病" value="其他疾病"></el-option>
              </el-select>
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <!-- 如果是在职，输入职业 -->
        <a-row :gutter="15">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="在职职业 :" v-if="ruleForm.workStatus==='在职'">
              <el-input
                type="text"
                maxlength="40"
                style="width:100%;"
                show-word-limit
                v-model="ruleForm.inServiceJob"
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </a-col>
          <!-- 其他病史 -->
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="其他病史 :" v-if="ruleForm.medicalHistory==='其他疾病'">
              <el-input
                style="width:100%;"
                type="text"
                maxlength="40"
                show-word-limit
                v-model="ruleForm.otherMedicalHistory"
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </a-col>
        </a-row>


          <a-row :gutter="15">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 吸烟史 -->
        <el-form-item label=" 吸烟历史 :">
          <el-select
            v-model="ruleForm.smokingHistory"
            placeholder="请选择"
            style="width:100%;"
            size="medium"
            @change="smokingChange"
          >
            <el-option label value></el-option>
            <el-option label="没有吸烟史" value="没有吸烟史"></el-option>
            <el-option label="已戒" value="已戒"></el-option>
            <el-option label="仍在吸" value="仍在吸"></el-option>
          </el-select>
        </el-form-item>
        </a-col>

        <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <!-- 饮酒史 -->
          <el-form-item label="饮酒历史 :">
            <el-select
              v-model="ruleForm.drinkingHistory"
              placeholder="请选择"
              style="width:100%;"
              size="medium"
              @change="drinkingChange"
            >
              <el-option label value></el-option>
              <el-option label="没有饮酒史" value="没有饮酒史"></el-option>
              <el-option label="已戒" value="已戒"></el-option>
              <el-option label="仍在喝" value="仍在喝"></el-option>
            </el-select>
          </el-form-item>
        </a-col>
        </a-row>

        <a-row :gutter="15">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 如果仍在吸烟 -->
            <el-form-item label="一天几支 :" v-if="ruleForm.smokingHistory==='仍在吸'">
              <a-input-number
                v-model="ruleForm.smokingNumEachDay"
                placeholder="请输入数字值"
                style="width:100%;"
              />
            </el-form-item>
          </a-col>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 吸烟年数 -->
            <el-form-item label="吸烟年数 :" v-if="ruleForm.smokingHistory==='仍在吸'">
              <a-input-number
                v-model="ruleForm.smokingYears"
                placeholder="请输入数字值"
                style="width:100%;"
              />
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="15">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <!-- 饮酒史 -->
            <el-form-item label="一天几两 :" v-if="ruleForm.drinkingHistory==='仍在喝'">
              <a-input-number
                v-model="ruleForm.drinkingNumEachDay"
                placeholder="请输入数字值"
                style="width:100%;"
              />
            </el-form-item>
          </a-col>

          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="喝酒年数 :" v-if="ruleForm.drinkingHistory==='仍在喝'">
              <a-input-number
                v-model="ruleForm.drinkingYears"
                placeholder="请输入数字值"
                style="width:100%;"
              />
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="10">
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="饮酒类型 :" v-if="showDrink">
              <el-select
                v-model="ruleForm.drinkingType"
                placeholder="请选择"
                style="width:100%;"
                size="medium"
              >
                <el-option label value></el-option>
                <el-option label="啤酒" value="啤酒"></el-option>
                <el-option label="黄酒" value="黄酒"></el-option>
                <el-option label="白酒" value="白酒"></el-option>
                <el-option label="葡萄酒" value="葡萄酒"></el-option>
              </el-select>
            </el-form-item>
          </a-col>
        </a-row>
      </el-form>

      <!-- --------------------------------------------------------------------- -->
      <el-form
        :label-position="labelPosition"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="180px"
      >
        <a-row :gutter="10">
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- 家庭地址 -->
            <el-form-item label="家庭地址 :" prop="familyAddress">
              <el-input
                :style="{width:'97%'}"
                type="text"
                maxlength="100"
                show-word-limit
                v-model="ruleForm.familyAddress"
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <a-row :gutter="10">
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="有无精神疾病家族史 :" >
              <el-select
                v-model="ruleForm.isMentalDiseaseFamilyHistory"
                placeholder="请选择"
                :style="{width:'97%'}"
                size="medium"
                @change="mentalDiseaseChange"
              >
                <el-option label value></el-option>
                <el-option label="无" value="无"></el-option>
                <el-option label="有" value="有"></el-option>
              </el-select>
            </el-form-item>
          </a-col>
        </a-row>

        <!-- --------------------------------------------------------------------- -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item
              label="具体精神疾病家族史 :"
              v-if="ruleForm.isMentalDiseaseFamilyHistory==='有'"
            >
              <el-select
                v-model="ruleForm.mentalDiseaseFamilyHistory"
                placeholder="请选择"
                :style="{width:'97%'}"
                size="medium"
                @change="otherMentalDiseaseChange"

              >
                <el-option label value></el-option>
                <el-option label="痴呆" value="痴呆"></el-option>
                <el-option label="抑郁症" value="抑郁症"></el-option>
                <el-option label="神经衰弱" value="神经衰弱"></el-option>
                <el-option label="其他精神病史" value="其他精神病史"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- --------------------------------------------------------------------- -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item
              label="其他精神病史 :"

              v-if="ruleForm.mentalDiseaseFamilyHistory==='其他精神病史'"
            >
              <el-input
                v-model="ruleForm.otherMentalDiseaseFamilyHistory"
                size="medium"
                :style="{width:'97%'}"
                placeholder="请输入"
                type="text"
                maxlength="40"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!------------------------------------------------------------------------->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="现病史（有无记忆下降）:" >
              <el-select
                v-model="ruleForm.currentMedicalHistoryMemoryLoss"
                placeholder="请选择"
                :style="{width:'97%'}"
                size="medium"
                @change="memoryChange"

              >
                <el-option label value></el-option>
                <el-option label="无" value="无记忆力下降"></el-option>
                <el-option label="有" value="有记忆力下降"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- --------------------------------------------------------------------- -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="记忆力下降多久 :"   v-if="ruleForm.currentMedicalHistoryMemoryLoss==='有记忆力下降'">
              <el-input
                type="text"
                :style="{width:'97%'}"
                maxlength="40"
                show-word-limit
                v-model="ruleForm.memoryLossTime"
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- --------------------------------------------------------------------- -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="体格检查（阳性发现） :">
              <el-input
                type="text"
                :style="{width:'97%'}"
                maxlength="300"
                show-word-limit
                v-model="ruleForm.physicalExamination"
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- --------------------------------------------------------------------- -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="是否合并使用促认知药物 :">
              <el-select
                v-model="ruleForm.isUseCognitiveDrugs"
                placeholder="请选择"
                :style="{width:'97%'}"
                size="medium"
                @change="cognitiveDrugChange"
              >
                <el-option label value></el-option>
                <el-option label="无" value="无合并使用促认知药物"></el-option>
                <el-option label="有" value="有合并使用促认知药物"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- --------------------------------------------------------------------- -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="具体促认知药物 :" v-if="ruleForm.isUseCognitiveDrugs==='有合并使用促认知药物'">
              <el-input
                type="text"
                maxlength="40"
                :style="{width:'97%'}"
                show-word-limit
                v-model="ruleForm.drugsType "
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="具体促认知药物剂量 :" v-if="ruleForm.isUseCognitiveDrugs==='有合并使用促认知药物'">
              <el-input
                type="text"
                maxlength="40"
                :style="{width:'97%'}"
                show-word-limit
                v-model="ruleForm.drugsDosage "
                size="medium"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 保存按钮 -->
        <el-form-item>
          <el-button type="primary" @click="updateInfo('ruleForm')" class="saveButton">保存</el-button>
        </el-form-item>
      </el-form>
      <!--表单结束位置-->

    </a-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {

      // 手机号
      var validatePhone = (rule, value, callback) => {
        if (/^1[34578]{1}\d{9}$/.test(value) == false) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }

      return {
        labelPosition: 'left',
        ruleForm: {},
        rules: {
          name: [{ required: true, message: '不能为空！', trigger: 'blur' }],
          birthday: [{ required: true, message: '不能为空！', trigger: 'blur' }],
          gender: [{ required: true, message: '不能为空！', trigger: 'blur' }],
          familyAddress: [
            { required: true, message: '不能为空！', trigger: 'blur' }
          ],
          telephoneNumber: [
            { required: true, message: '不能为空！', trigger: 'blur' },
            { validator: validatePhone, trigger: 'blur' }
          ]

        },
        // 服务器地址
        serverUrl: this.GLOBAL.serverUrl,
        // 个人信息
        name: 'zoujiem',
        birthday: null,
        educationYears: '',
        gender: '',
        config: {
          rules: [
            { type: 'object', required: true, message: 'Please select time!' }
          ]
        }
      }
    },

    mounted () {
      this.fetch()
    },

    methods: {
      handleChange () {
      },
      //   如果是在职，输入职业
      jobChange (value) {
        if (value == '在职') {
          this.showJob = true
        } else {
          this.ruleForm.inServiceJob=""
        }
      },
      diseaseChange (value) {
        if (value == '其他疾病') {
          this.showDisease = true
        } else {
          this.showDisease = false
          this.ruleForm.otherMedicalHistory=""
        }
      },
      smokingChange (value) {
        debugger
        if (value == '仍在吸') {
          this.showSmoke = true
        } else {
          this.showSmoke = false
          this.ruleForm.smokingNumEachDay = ""
          this.ruleForm.smokingYears=""

        }
      },
      drinkingChange (value) {
        if (value == '仍在喝') {
          this.showDrink = true
        } else {
          this.showDrink = false
          this.ruleForm.drinkingNumEachDay = ""
          this.ruleForm.drinkingYears = ""

        }
      },
      mentalDiseaseChange (value) {
        if (value == '有') {
          this.showMentalDisease = true
        } else {
          this.showMentalDisease = false
          this.showOtherMentalDisease = false
          this.ruleForm.mentalDiseaseFamilyHistory =""
          this.ruleForm.otherMentalDiseaseFamilyHistory =""

        }
      },


      otherMentalDiseaseChange (value) {
        if (value == '其他精神病史') {
          this.showOtherMentalDisease = true
        } else {
          this.showOtherMentalDisease = false
          this.ruleForm.otherMentalDiseaseFamilyHistory = ""
        }
      },
      memoryChange (value) {
        if (value == '有记忆力下降') {
          this.showMemory = true
        } else {
          this.showMemory = false
          this.ruleForm.memoryLossTime = ""
        }
      },
      cognitiveDrugChange (value) {
        if (value == '有合并使用促认知药物') {
          this.showCognitiveDrug = true
        } else {
          this.showCognitiveDrug = false
          this.ruleForm.drugsType = ""
          this.ruleForm.drugsDosage = ""
        }
      },

      // 查看/编辑
      fetch () {
        let that = this
        axios
          .post(this.serverUrl + '/patient/info/get', this.$route.query, {
            headers: {
              Token: localStorage.getItem('Token')
            }
          })
          .then(response => {
            debugger
            if ((response.data.retCode === '000000')) {
              that.ruleForm = response.data.data
            } else if (response.data.retCode === '100001') {
              if (localStorage.getItem('Token') === null) {
                this.$message.error('未登录，即将跳转至登录页面', 5)
                this.$router.push({ path: '/login' })
              } else {
                this.$message.error('登录超时', 5)
                this.$router.push({ path: '/login' })
              }
            }else {
          this.$message.error(response.data.retMsg, 3)
        }
          }, err => {
            alert('网络异常，请检查是否连接上网络')
          })
          .catch(function (error) {
            // 请求失败处理
          })
      },

      // 编辑后的保存功能
      updateInfo (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http
              .post(this.serverUrl + '/patient/info/save', this.ruleForm, {
                headers: {
                  Token: localStorage.getItem('Token')
                }
              })
              .then(function (data) {
                if (data.data.retCode === '000000') {
                  this.$message.success('更新成功', 5)
                  this.$router.push({ path: '/Home/MyPatients' })
                } else if (data.data.retCode === '100001') {
                  if (localStorage.getItem('Token') === null) {
                    this.$message.error('未登录，即将跳转至登录页面', 5)
                    this.$router.push({ path: '/login' })
                  } else {
                    this.$message.error('登录超时', 5)
                    this.$router.push({ path: '/login' })
                  }
                } else {
                  this.$message.error(data.data.retMsg, 3)
                }
              }, err => {
                alert('网络异常，请检查是否连接上网络')
              })
          } else {
            this.$message.error('格式错误', 5)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .info_box {
    text-align: center;
  }

  .form-div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
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
