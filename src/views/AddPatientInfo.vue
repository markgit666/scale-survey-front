<template>
  <!--添加被试者基本信息页面-->
  <div>
    <div>
      <a-row :gutter="10">
        <a-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></a-col>
        <a-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
          <a-card>
            <el-divider content-position="left">
              <strong>2.填写临床基本资料</strong></el-divider>


            <!-- 临床基本资料 -->
            <div>
              <el-form
                :model="ruleForm.patientInfo"
                :rules="rules"
                :label-position="labelPosition"
                label-width="230px"
                ref="ruleForm"
              >
                <!-- --------------------------------- ----------------------->
                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 身份证号 -->
                      <el-form-item label="身份证号 :" >
                      <strong>
                        <label>{{ruleForm.patientInfo.idCard}}</label>
                      </strong>
                      </el-form-item>

                  </a-col>
                </a-row>
                <!-- --------------------------------- ----------------------->
                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

                    <!-- 病历号 -->
                    <el-form-item label="病历号 :" prop="medicalRecordNum" >
                      <el-input
                        v-model="ruleForm.patientInfo.medicalRecordNum"
                        type="text"
                        maxlength="18"
                        show-word-limit
                        size="medium"
                        style="width:100%;"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </a-col>
                </a-row>
                <!-- --------------------------------- ----------------------->
                <a-row :gutter="10">

                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 姓名 -->
                    <el-form-item label="姓名 :" prop="name" >
                      <el-input
                        v-model="ruleForm.patientInfo.name"
                        type="text"
                        maxlength="10"
                        show-word-limit
                        size="medium"
                        style="width:100%;"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </a-col>
                </a-row>


                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

                    <!-- 出生年月 -->
                    <el-form-item label="出生年月:" prop="birthday" >
                      <el-date-picker
                        size="medium"
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.patientInfo.birthday"
                        style="width: 100%;"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </a-col>
                </a-row>

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">

                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 组别 -->
                    <el-form-item label="组别 :" prop="patientGroup">
                      <el-select
                        v-model="ruleForm.patientInfo.patientGroup"
                        placeholder="请选择"
                        style="width:100%;"
                        size="medium"
                      >
                        <el-option label value></el-option>
                        <el-option label="AD组" value="AD"></el-option>
                        <el-option label="MCI组" value="MCI"></el-option>
                      </el-select>
                    </el-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">

                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 性别 -->
                    <el-form-item label="性别 :" prop="gender">
                      <el-select
                        v-model="ruleForm.patientInfo.gender"
                        placeholder="请选择"
                        style="width:100%;"
                        size="medium"
                      >
                        <el-option label value></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 联系电话 -->
                    <el-form-item label="联系电话 :" prop="telephoneNumber">
                      <el-input
                        type="text"
                        maxlength="11"
                        show-word-limit
                        style="width:100%;"
                        v-model="ruleForm.patientInfo.telephoneNumber"
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">

                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 家庭地址 -->
                    <el-form-item label="家庭地址 :" prop="familyAddress">
                      <el-input
                        :style="{width:'100%'}"
                        type="text"
                        maxlength="100"
                        show-word-limit
                        v-model="ruleForm.patientInfo.familyAddress"
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">
                  <!-- 民族 -->
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="民族 :">
                      <el-select
                        v-model="ruleForm.patientInfo.nation"
                        placeholder="请选择"
                        style="width:100%;"
                        size="medium"
                      >
                        <el-option label value></el-option>
                        <el-option label="汉族" value="汉族"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                      </el-select>
                    </el-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 利手 -->
                    <el-form-item label="利手 :">
                      <el-select
                        v-model="ruleForm.patientInfo.hand"
                        placeholder="请选择"
                        style="width:100%;"
                        size="medium"
                      >
                        <el-option label value></el-option>
                        <el-option label="左" value="左"></el-option>
                        <el-option label="右" value="右"></el-option>
                      </el-select>
                    </el-form-item>
                  </a-col>
                </a-row>

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <!-- 婚姻 -->
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="婚姻 :">
                      <el-select
                        v-model="ruleForm.patientInfo.marriageStatus"
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
                <a-row :gutter="10">
                  <!-- 文化程度 -->
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="文化程度 :">
                      <el-select
                        v-model="ruleForm.patientInfo.educationLevel"
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
                </a-row>

                <a-row :gutter="10">
                  <!-- 居住方式 -->
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="居住方式 :">
                      <el-select
                        v-model="ruleForm.patientInfo.livingWay"
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

                <a-row :gutter="10">

                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 是否有打呼噜 -->
                    <el-form-item label="打呼噜 :">
                      <el-select
                        v-model="ruleForm.patientInfo.isSnoring"
                        placeholder="请选择"
                        style="width:100%;"
                        size="medium"
                      >
                        <el-option label value></el-option>
                        <el-option label="有打呼噜" value="有打呼噜"></el-option>
                        <el-option label="无打呼噜" value="无打呼噜"></el-option>
                      </el-select>
                    </el-form-item>
                  </a-col>


                </a-row>

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <!-- 受教育年数-->
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 受教育年数 -->
                    <el-form-item label="教育年数 :">
                      <a-input-number
                        v-model="ruleForm.patientInfo.educationYears"
                        placeholder="请输入数字值"
                        style="width:100%;"
                      />
                    </el-form-item>
                  </a-col>
                </a-row>


                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 职业 -->
                    <el-form-item label="职业 :">
                      <el-select
                        v-model="ruleForm.patientInfo.workStatus"
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
                </a-row>

                <!-- 如果是在职，输入职业 -->
                <a-row :gutter="15">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="在职职业 :" v-if="showJob">
                      <el-input
                        type="text"
                        maxlength="40"
                        style="width:100%;"
                        show-word-limit
                        v-model="ruleForm.patientInfo.inServiceJob"
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">
                  <!-- 既往病史 -->
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="既往病史 :">
                      <el-input
                        style="width:100%;"
                        type="text"
                        maxlength="40"
                        show-word-limit
                        v-model="ruleForm.patientInfo.medicalHistory"
                        size="medium"
                        placeholder="请输入"
                      ></el-input>

                      <!--<el-select-->
                        <!--v-model="ruleForm.patientInfo.medicalHistory"-->
                        <!--placeholder="请选择"-->
                        <!--style="width:100%;"-->
                        <!--size="medium"-->
                        <!--@change="diseaseChange"-->
                      <!--&gt;-->
                        <!--<el-option label value></el-option>-->
                        <!--<el-option label="高血压" value="高血压"></el-option>-->
                        <!--<el-option label="糖尿病" value="糖尿病"></el-option>-->
                        <!--<el-option label="冠心病" value="冠心病"></el-option>-->
                        <!--<el-option label="脑中风/脑梗" value="脑中风/脑梗"></el-option>-->
                        <!--<el-option label="其他疾病" value="其他疾病"></el-option>-->
                      <!--</el-select>-->
                    </el-form-item>
                  </a-col>
                </a-row>

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <!-- 其他病史 -->
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="其他病史 :" v-if="showDisease">
                      <el-input
                        style="width:100%;"
                        type="text"
                        maxlength="40"
                        show-word-limit
                        v-model="ruleForm.patientInfo.otherMedicalHistory"
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </a-col>
                </a-row>


                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="15">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 吸烟史 -->
                    <el-form-item label=" 吸烟历史 :">
                      <el-select
                        v-model="ruleForm.patientInfo.smokingHistory"
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
                </a-row>



                <a-row :gutter="15">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 如果仍在吸烟 -->
                    <el-form-item label="一天几支 :" v-if="showSmoke">
                      <a-input-number
                        v-model="ruleForm.patientInfo.smokingNumEachDay"
                        placeholder="请输入数字值"
                        style="width:100%;"
                      />
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 吸烟年数 -->
                    <el-form-item label="吸烟年数 :" v-if="showSmoke">
                      <a-input-number
                        v-model="ruleForm.patientInfo.smokingYears"
                        placeholder="请输入数字值"
                        style="width:100%;"
                      />
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 饮酒史 -->
                    <el-form-item label="饮酒历史 :">
                      <el-select
                        v-model="ruleForm.patientInfo.drinkingHistory"
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

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="15">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <!-- 饮酒史 -->
                    <el-form-item label="一天几两 :" v-if="showDrink">
                      <a-input-number
                        v-model="ruleForm.patientInfo.drinkingNumEachDay"
                        placeholder="请输入数字值"
                        style="width:100%;"
                      />
                    </el-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="喝酒年数 :" v-if="showDrink">
                      <a-input-number
                        v-model="ruleForm.patientInfo.drinkingYears"
                        placeholder="请输入数字值"
                        style="width:100%;"
                      />
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="饮酒类型 :" v-if="showDrink">
                      <el-select
                        v-model="ruleForm.patientInfo.drinkingType"
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

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="有无精神疾病家族史 :" >
                      <el-select
                        v-model="ruleForm.patientInfo.isMentalDiseaseFamilyHistory"
                        placeholder="请选择"
                        :style="{width:'100%'}"
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

                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item
                      label="具体精神疾病家族史 :"
                      v-if="showMentalDisease"

                    >
                      <el-select
                        v-model="ruleForm.patientInfo.mentalDiseaseFamilyHistory"
                        placeholder="请选择"
                        size="medium"
                        style="width:100%;"
                        @change="otherMentalDiseaseChange"
                      >
                        <el-option label value></el-option>
                        <el-option label="痴呆" value="痴呆"></el-option>
                        <el-option label="抑郁症" value="抑郁症"></el-option>
                        <el-option label="神经衰弱" value="神经衰弱"></el-option>
                        <el-option label="其他精神病史" value="其他精神病史"></el-option>
                      </el-select>
                    </el-form-item>
                  </a-col>
                </a-row>

                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item
                      label="其他精神病史 :"
                      v-if="showOtherMentalDisease"
                    >
                      <el-input
                        v-model="ruleForm.patientInfo.otherMentalDiseaseFamilyHistory"
                        size="medium"
                        placeholder="请输入"
                        type="text"
                        maxlength="40"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                  </a-col>
                </a-row>

                <!------------------------------------------------------------------------->

                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item
                    label="现病史（有无记忆下降）:"
                  >
                    <el-select
                      v-model="ruleForm.patientInfo.currentMedicalHistoryMemoryLoss"
                      placeholder="请选择"
                      size="medium"
                      style="width:100%;"
                      @change="memoryChange"
                    >
                      <el-option label value></el-option>
                      <el-option label="无" value="无记忆力下降"></el-option>
                      <el-option label="有" value="有记忆力下降"></el-option>
                    </el-select>
                  </el-form-item>
                  </a-col>
                </a-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="记忆力下降多久 :"  v-if="showMemory">
                      <el-input
                        type="text"
                        maxlength="40"
                        show-word-limit
                        v-model="ruleForm.patientInfo.memoryLossTime"
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- --------------------------------------------------------------------- -->
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="体格检查（阳性发现） :">
                      <el-input
                        type="text"
                        maxlength="300"
                        show-word-limit
                        v-model="ruleForm.patientInfo.physicalExamination"
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- --------------------------------------------------------------------- -->
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="是否合并使用促认知药物 :" >
                      <el-select
                        v-model="ruleForm.patientInfo.isUseCognitiveDrugs"
                        placeholder="请选择"
                        size="medium"
                        @change="cognitiveDrugChange"
                        style="width:100%;"
                      >
                        <el-option label value></el-option>
                        <el-option label="无" value="无合并使用促认知药物"></el-option>
                        <el-option label="有" value="有合并使用促认知药物"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="具体促认知药物、剂量、起始时间 :" v-if="showCognitiveDrug">
                      <el-input
                        type="text"
                        maxlength="40"
                        show-word-limit
                        v-model="ruleForm.patientInfo.drugsDosage "
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item>
                <div>
                  <el-button type="primary" v-on:click="next()">保存</el-button>
                </div>
              </el-form-item>
            </el-form>
          </a-card>
        </a-col>
        <a-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      // 手机号
      var validatePhone = (rule, value, callback) => {
        if (
          /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(
            value
          ) == false
        ) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };
      return {
        serverUrl: this.GLOBAL.serverUrl,
        labelPosition: "left",
        testChecked: "",
        rightChecked: "",
        mainChecked: "",
        agreeBook: {
          someoneTest: "1", //受试者
          rightMember: "1", // 法定代表
          mainTest: "1" // 主试者
        },
        patientId: "",
        examinationPaperId:'',
        patientIdShow: true,

        // 被试基本资料
        ruleForm: {
          // 报告表编号
          reportId:'',
          // 被试者基本资料
          patientInfo: {
            idCard: "",
            doctorId: "",
            medicalRecordNum:"", // 病历号
            patientGroup:"", // 组别
            name: "",
            birthday: "",
            gender: "",
            isSnoring: "",
            familyAddress: "",
            telephoneNumber: "",
            hand: "",
            nation: "",
            marriageStatus: "",
            workStatus: "", // 职业
            inServiceJob: "", // 在职职业
            educationLevel: "",
            educationYears: "",
            livingWay: "",
            medicalHistory: "", // 既往病史
            otherMedicalHistory: "", // 其他既往病史
            smokingHistory: "",
            smokingNumEachDay: "",
            smokingYears: "",
            drinkingHistory: "",
            drinkingType: "",
            drinkingNumEachDay: "",
            drinkingYears: "",
            isMentalDiseaseFamilyHistory: "", // 有无精神疾病家族史
            mentalDiseaseFamilyHistory: "", // 精神疾病家族史
            otherMentalDiseaseFamilyHistory: "", // 其他精神病史
            currentMedicalHistoryMemoryLoss: "", // 现病史（有无记忆下降）
            memoryLossTime: "", // 记忆力下降多久
            physicalExamination: "", // 体格检查情况
            isUseCognitiveDrugs: "", // 是否合并使用促认知药物
            drugsDosage: "", // 具体促认知药物
          },
          //被试者实验条件
          patientEligibleList: []
        },
        //实验条件题目
        eligibleInfoList: [],
        // 表单规则校验
        rules: {
          medicalRecordNum: [{ required: true, message: "不能为空！", trigger: "blur" }],
          name: [{ required: true, message: "不能为空！", trigger: "blur" }],
          birthday: [{ required: true, message: "不能为空！", trigger: "blur" }],
          gender: [{ required: true, message: "不能为空！", trigger: "blur" }],
          patientGroup: [{ required: true, message: "不能为空！", trigger: "blur" }],
          familyAddress: [
            { required: true, message: "不能为空！", trigger: "blur" }
          ],
          telephoneNumber: [
            { required: true, message: "不能为空！", trigger: "blur" },
            { validator: validatePhone, trigger: "blur" }
          ]
        },
        // 如果是在职职业，则填在职职业
        showJob: false,
        showDisease: false,
        showSmoke: false,
        active: 0,
        showDrink: false,
        showMentalDisease: false,
        showOtherMentalDisease: false,
        showMemory: false,
        showCognitiveDrug: false
      };
    },

    mounted() {
      // 获取IdCard.vue文件传过来的IdCard值
      this.ruleForm.patientInfo.idCard = sessionStorage.getItem("idCard");
      this.ruleForm.patientInfo.doctorId = this.$route.query.doctorId;
      this.ruleForm.reportId = this.$route.query.reportId;
    },

    methods: {
      //   如果是在职，输入职业
      jobChange(value) {
        if (value == "在职") {
          this.showJob = true;
        } else {
          this.showJob = false;
          this.ruleForm.patientInfo.inServiceJob = '';
        }
      },
      // 如果是其他疾病
      // diseaseChange(value) {
      //   if (value == "其他疾病") {
      //     this.showDisease = true;
      //   } else {
      //     this.showDisease = false;
      //     this.ruleForm.patientInfo.otherMedicalHistory = '';
      //
      //   }
      // },
      smokingChange(value) {
        if (value == "仍在吸") {
          this.showSmoke = true;
        } else {
          this.showSmoke = false;
          this.ruleForm.patientInfo.smokingNumEachDay = "";
          this.ruleForm.patientInfo.smokingYears = "";
        }
      },
      drinkingChange(value) {
        if (value == "仍在喝") {
          this.showDrink = true;
        } else {
          this.showDrink = false;
          this.ruleForm.patientInfo.drinkingNumEachDay = "";
          this.ruleForm.patientInfo.drinkingYears = "";
          this.ruleForm.patientInfo.drinkingType ="";
        }
      },
      mentalDiseaseChange(value) {
        if (value == "有") {
          this.showMentalDisease = true;
        } else {
          this.showMentalDisease = false;
          this.showOtherMentalDisease = false;
          this.ruleForm.patientInfo.mentalDiseaseFamilyHistory = '';
          this.ruleForm.patientInfo.otherMentalDiseaseFamilyHistory = ''

        }
      },
      otherMentalDiseaseChange(value) {
        if (value == "其他精神病史") {
          this.showOtherMentalDisease = true;
        } else {
          this.showOtherMentalDisease = false;
          this.ruleForm.patientInfo.otherMentalDiseaseFamilyHistory = ''
        }
      },
      memoryChange(value) {
        if (value == "有记忆力下降") {
          this.showMemory = true;
        } else {
          this.showMemory = false;
          this.ruleForm.patientInfo.memoryLossTime = ''

        }
      },
      cognitiveDrugChange(value) {
        if (value == "有合并使用促认知药物") {
          this.showCognitiveDrug = true;
        } else {
          this.showCognitiveDrug = false;
          this.ruleForm.patientInfo.drugsDosage = ''

        }
      },

      //保存个人信息
      saveInfo() {
        this.$http
          .post(this.serverUrl + "patient/relation/info/save", this.ruleForm)
          .then(
            function(data) {
              if (data.body.retCode === "000000") {
                this.patientId = data.body.data.patientId;
                this.examinationPaperId = data.body.data.examinationPaperId;
                sessionStorage.setItem("patientId", this.patientId); //存储patientId
                this.$message.success("保存成功！", 5);
                this.$router.push({ //保存被试者信息成功后，跳转至量表答题界面
                  path: "/Home/AnswerScaleList",
                  query: {
                    examinationPaperId: this.examinationPaperId,
                  }
                });
              } else {
                this.$message.error(data.body.retMsg, 5);
                this.ruleForm.patientEligibleList.splice(
                  0,
                  this.ruleForm.patientEligibleList.length
                );
              }
            },
            err => {
          alert("网络异常，请检查是否连接上网络");
      }
      );
      },

      // 下一步
      next() {

            if (this.ruleForm.patientInfo.name === "") {
              this.$message.warning("姓名不能为空，请检查！");
              return;
            }
            if (this.ruleForm.patientInfo.medicalRecordNum === "") {
              this.$message.warning("病历号不能为空，请检查！");
              return;
            }
            if (this.ruleForm.patientInfo.patientGroup === "") {
              this.$message.warning("组别不能为空，请检查！");
              return;
            }
            if (this.ruleForm.patientInfo.birthday === "") {
              this.$message.warning("出生年月不能为空，请检查！");
              return;
            }
            if (this.ruleForm.patientInfo.gender === "") {
              this.$message.warning("性别不能为空，请检查！");
              return;
            }
            if (this.ruleForm.patientInfo.telephoneNumber === "") {
              this.$message.warning("电话号码不能为空，请检查！");
              return;
            }
            if (this.ruleForm.patientInfo.familyAddress === "") {
              this.$message.warning("家庭地址不能为空，请检查！");
              return;
            }
            //第五步，保存信息，跳转到答题页面
            this.saveInfo(); //保存成功并跳到答题界面
      },

    }
  };
</script>


