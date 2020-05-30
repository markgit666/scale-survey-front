<template>
  <div>
    <div>
      <a-row :gutter="10">
        <a-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></a-col>
        <a-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
          <a-card>
            <center>
              <strong>
                <h2>基于经颅电刺激的认知障碍疾病综合康复研究</h2>
              </strong>
            </center>
            <br/>
            <br/>
            <!-- 步骤条 -->

            <el-steps :active="active" finish-status="success">
              <el-step title="知情同意书"></el-step>
              <el-step title="AD组入组/排除标准"></el-step>
              <el-step title="MCI组入组/排除标准"></el-step>
              <el-step title="临床基本资料"></el-step>
              <el-step title="实验室资料"></el-step>
              <!--              <el-step title="开始训练"></el-step>-->
            </el-steps>

            <!-- 知情同意书 -->
            <div v-if="active===0" :style="{marginTop:'20px'}">
              <!-- 知情同意书 -->
              <!-- <center>
                <h3>
                  <strong>知情同意书</strong>
                </h3>
              </center>-->
              <h4>
                <strong>尊敬的老人：</strong>
              </h4>
              <p :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}">
                您好！我们邀请您参加国家重点研发计划（2017YFC1310502）：
                基于经颅磁刺激与电波刺激辅具技术的认知障碍疾病综合康复研究。
                这是一项针对老年人群颅脑磁共振、认知功能检查（记忆力等）以及无创重复经颅磁/电刺激治疗的项目。
                现在将项目有关信息说明如下：
              </p>
              <h4>
                <strong>项目介绍（Project Introduction）</strong>
              </h4>
              <p :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}">
                阿尔茨海默病（AD）缺乏有效治疗方法，新药开发遇到很大的挑战，
                因此开发新的治疗方法成为重点发展的方向之一。
                无创重复经颅磁/电刺激治疗已在临床被广泛应用于抑郁症、焦虑症、失眠等治疗，
                近几年的研究发现，无创重复经颅磁/电刺激治疗在AD 的治疗及预防中也有良好的应用前景。
                本研究拟纳入轻中度AD和轻度认知损害个体各240例，进行2周共10 次的干预（真、假刺激两组），
                通过功能磁共振扫描定位，采集脑功能相关数据，比较干预前、2 周与3 月时的认知功能及脑功能改变。
              </p>

              <h4>
                <strong>获益（Benifit）</strong>
              </h4>
              <p :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}">
                本项目提供免费的大脑磁共振扫描，这是一项没有任何辐射的检查，
                可以帮助您了解自己的大脑状态（如结构、有没有脑萎缩、有没有明显的脑缺血等）。
                同时我们会给您做整套的认知功能检查，这些检查有助于帮助您了解自己的记忆、思维等能力，
                可早期筛查异常记忆下降的情况。我们会免费对您进行重复经颅磁（电）刺激治疗，
                前期研究表明该项无创治疗对认知功能有改善作用。
              </p>

              <h4>
                <strong>潜在风险和副作用(Risks and Side effects)</strong>
              </h4>

              <p :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}">
                除去那些身上装有电子的、磁的或机械的设备（如心脏起博器、金属假牙）的人，或有颅内动脉夹者，已知的磁共振成像对人的危害或副作用非常小。最大的风险是受到磁场吸引的金属物体在其飞行运动中击中您。为了减少这种风险，我们要求所有参与检查的人在进入磁体间之前除去身上所有的金属物品。
                磁共振扫描不会产生不适，但若您对置封闭空间感到恐惧，请告诉我们。
              </p>
              <p
                :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}"
              >神经心理测验的主要风险及不适是疲倦。您可以在测试时任何时间要求休息。</p>
              <p :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}">
                重复经颅磁（电）刺激治疗是一项无创的治疗方式，
                已被美国食品药品管理局批准用于抑郁症，也被广泛应用于失眠、焦虑症、帕金森病(PD)、
                癫痫、脑卒中后康复等。除去那些身上装有电子的、磁的或机械的设备（如心脏起博器、金属假牙）的人，
                或既往有癫痫病史者，已知的经颅磁（电）刺激治疗对人的危害或副作用非常小，常见的是轻微的头痛、
                头晕。目前报道的全世界数千例接受治疗的被试中有7人出现癫痫发作，与长时程高频刺激有关，
                可自行缓解，该研究所使用的刺激强度一般不会引起癫痫。
              </p>
              <p
                :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}"
              >您可以在检查的任何时候无需任何理由终止检查。</p>
              <h4>
                <strong>隐私(Confidentiality)</strong>
              </h4>
              <p :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}">
                本项目的结果可能会在学术期刊/书籍上发表，或者用于教学。
                但是您的名字或者其他可以确认您的信息将不会在任何发表或教学的材料中出现，除非得到您的允许。
              </p>
              <h4>
                <strong>费用(Costs）</strong>
              </h4>

              <p :style="{textIndent:'2em',lineHeight:'25px',fontFamily:'SimHei',color:'#495060'}">
                本研究涉及的磁共振扫描、神经心理测验、重复经颅磁（电）刺激治疗不会向您
                或您的医疗保险收取任何费用。
              </p>
              <h4>
                <strong>被试或者法定代表声明(Subject Statement)</strong>
              </h4>

              <!-- 受试者 -->
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="1" :xl="1">
                  <h4>法定代表</h4>
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox @change="testChange" v-model="testChecked" label></el-checkbox>
                </el-col>
                <el-col :xs="19" :sm="19" :md="19" :lg="22" :xl="22">
                  <p :style="{lineHeight:'25px',fontFamily:'SimHei',color:'#409EFF'}">
                    我确认已经被告知本项目的目的、过程、可能的风险和副作用以及潜在的获益和费用。
                    我的所有问题都已得到满意的回答。我已经详细阅读了本被试知情同意书。
                  </p>
                </el-col>
              </el-row>

              <!-- 法定代表 -->
              <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="1" :xl="1">
                  <h4>法定代表</h4>
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox @change="rightChange" v-model="rightChecked" label></el-checkbox>
                </el-col>
                <el-col :xs="19" :sm="19" :md="19" :lg="22" :xl="22">
                  <p :style="{lineHeight:'25px',fontFamily:'SimHei',color:'#409EFF'}">
                    我确认已经被告知本项目的目的、过程、可能的风险和副作用以及潜在的获益和费用。
                    我的所有问题都已得到满意的回答。我已经详细阅读了本被试知情同意书。
                  </p>
                </el-col>
              </el-row>

              <!-- 主试声明 -->
              <h4 :style="{marginTop:'10px'}">
                <strong>主试声明(Experimenter Statement)</strong>
              </h4>
              <el-row :gutter="10">
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-checkbox @change="mainChange" v-model="mainChecked" label></el-checkbox>
                </el-col>
                <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                  <p
                    :style="{lineHeight:'25px',fontFamily:'SimHei',color:'#409EFF'}"
                  >我已经解释了项目的目的、项目的程序、潜在的危险和不适以及被试的权益，并尽最大可能回答了与项目有关的问题。</p>
                </el-col>
              </el-row>
            </div>

            <!-- AD组入组标准/排除标准 -->

            <div v-if="active===1" :style="{marginTop:'20px'}">
              <h3>
                <strong>【入组标准】</strong>
              </h3>
              <h4>
                <strong>符合下列所有标准的患者将被入选至本研究中。</strong>
              </h4>

              <!-- AD组 内容循环 -->
              <div v-for="(jionItem,infoId) in eligibleInfoList " :key="infoId+'4'">
                <div v-if="jionItem.groupName==='AD' && jionItem.type==='join' ">
                  <el-row :gutter="10">
                    <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                      <p
                        :style="{lineHeight:'25px',fontFamily:'SimHei',color:'#495060',marginTop:'10px'}"
                      >{{jionItem.content}}</p>
                    </el-col>
                    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                      <p :style="{textIndent:'1em',marginTop:'10px'}">
                        <el-radio v-model="jionItem.answer" label="1">是</el-radio>
                        <el-radio v-model="jionItem.answer" label="0">否</el-radio>
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <h3>
                <strong>【排除标准】</strong>
              </h3>
              <h4>
                <strong>如果存在下列任何一种情况，那么受试者将不能进入本研究。</strong>
              </h4>

              <!-- AD组内容循环 -->
              <div v-for="(exceptItem,infoId) in eligibleInfoList " :key="infoId+'1'">
                <div v-if="exceptItem.groupName==='AD' && exceptItem.type==='except' ">
                  <el-row :gutter="10">
                    <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                      <p
                        :style="{lineHeight:'25px',fontFamily:'SimHei',color:'#495060',marginTop:'10px'}"
                      >{{exceptItem.content}}</p>
                    </el-col>
                    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                      <p :style="{textIndent:'1em',marginTop:'10px'}">
                        <el-radio v-model="exceptItem.answer" label="1">是</el-radio>
                        <el-radio v-model="exceptItem.answer" label="0">否</el-radio>
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- AD组内容循环结束 -->
            </div>

            <!-- MCI组入组标准/排除标准 -->
            <div v-if="active===2" :style="{marginTop:'20px'}">
              <h3>
                <strong>【入组标准】</strong>
              </h3>
              <h4>
                <strong>符合下列所有标准的患者将被入选至本研究中。</strong>
              </h4>
              <div v-for="(item,infoId) in eligibleInfoList " :key="infoId+'2'">
                <div v-if="item.groupName==='MCI' && item.type==='join' ">
                  <el-row :gutter="10">
                    <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                      <p
                        :style="{lineHeight:'25px',fontFamily:'SimHei',color:'#495060',marginTop:'10px'}"
                      >{{item.content}}</p>
                    </el-col>
                    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                      <p :style="{textIndent:'1em',marginTop:'10px'}">
                        <el-radio v-model="item.answer" label="1">是</el-radio>
                        <el-radio v-model="item.answer" label="0">否</el-radio>
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </div>

              <h3>
                <strong>【排除标准】</strong>
              </h3>
              <h4>
                <strong>如果存在下列任何一种情况，那么受试者将不能进入本研究。</strong>
              </h4>
              <div v-for="(item,infoId) in eligibleInfoList " :key="infoId+'3'">
                <div v-if="item.groupName==='MCI' && item.type==='except' ">
                  <el-row :gutter="10">
                    <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                      <p
                        :style="{lineHeight:'25px',fontFamily:'SimHei',color:'#495060',marginTop:'10px'}"
                      >{{item.content}}</p>
                    </el-col>
                    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                      <p :style="{textIndent:'1em',marginTop:'10px'}">
                        <el-radio v-model="item.answer" label="1">是</el-radio>
                        <el-radio v-model="item.answer" label="0">否</el-radio>
                      </p>
                    </el-col>
                  </el-row>
                </div>
                <!-- MCI组内容循环结束 -->
              </div>
            </div>

            <!-- 临床基本资料 -->
            <div v-if="active===3">
              <el-form
                :model="ruleForm.patientInfo"
                :rules="rules"
                :label-position="labelPosition"
                label-width="90px"
                ref="ruleForm"
              >
                <!-- --------------------------------- ----------------------->

                <a-row :gutter="10">
                  <a-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <!-- 身份证号 -->
                    <div  :style="{marginTop:'15px'}">
                      <strong> <label>身份证号：{{ruleForm.patientInfo.idCard}}</label></strong>
                    </div>
                  </a-col>
                </a-row>
                <!-- --------------------------------- ----------------------->
                <a-row :gutter="10">
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 姓名 -->
                    <el-form-item label="姓名 :" prop="name" :style="{marginTop:'20px'}">
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
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 出生年月 -->
                    <el-form-item label="出生年月:" prop="birthday" :style="{marginTop:'20px'}">
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
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 性别 -->
                    <el-form-item label="性别 :" prop="gender" style="width:100%;">
                      <el-radio label="1" v-model="ruleForm.patientInfo.gender">男</el-radio>
                      <el-radio label="0" v-model="ruleForm.patientInfo.gender">女</el-radio>
                    </el-form-item>
                  </a-col>
                  <!-- 民族 -->
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="民族 :" style="width:100%;">
                      <el-radio v-model="ruleForm.patientInfo.nation" label="汉族">汉族</el-radio>
                      <el-radio v-model="ruleForm.patientInfo.nation" label="其他">其他</el-radio>
                    </el-form-item>
                  </a-col>
                </a-row>

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 利手 -->
                    <el-form-item label="利手 :" style="width:90%;">
                      <el-radio v-model="ruleForm.patientInfo.hand" label="左">左</el-radio>
                      <el-radio v-model="ruleForm.patientInfo.hand" label="右">右</el-radio>
                    </el-form-item>
                  </a-col>

                  <!-- 婚姻 -->
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 文化程度 -->
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

                  <!-- 居住方式 -->
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <!-- 受教育年数-->
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 受教育年数 -->
                    <el-form-item label="教育年数 :">
                      <a-input-number
                        v-model="ruleForm.patientInfo.educationYears"
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
                        v-model="ruleForm.patientInfo.telephoneNumber"
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
                  <!-- 既往病史 -->
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="既往病史 :">
                      <el-select
                        v-model="ruleForm.patientInfo.medicalHistory"
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
                  <!-- 其他病史 -->
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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

                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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

                <a-row :gutter="15">
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 如果仍在吸烟 -->
                    <el-form-item label="一天几支 :" v-if="showSmoke">
                      <a-input-number
                        v-model="ruleForm.patientInfo.smokingNumEachDay"
                        placeholder="请输入数字值"
                        style="width:100%;"
                      />
                    </el-form-item>
                  </a-col>
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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

                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="15">
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <!-- 饮酒史 -->
                    <el-form-item label="一天几两 :" v-if="showDrink">
                      <a-input-number
                        v-model="ruleForm.patientInfo.drinkingNumEachDay"
                        placeholder="请输入数字值"
                        style="width:100%;"
                      />
                    </el-form-item>
                  </a-col>

                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="喝酒年数 :" v-if="showDrink">
                      <a-input-number
                        v-model="ruleForm.patientInfo.drinkingYears"
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

                <!------------------------------------------------------------------------->

                <a-row :gutter="10">
                  <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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

                  <a-col :xs="12" :sm="12" :md="12" :lg="24" :xl="12">
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
              </el-form>

              <!------------------------------------------------------------------------->
              <el-form
                :label-position="labelPosition"
                :model="ruleForm.patientInfo"
                :rules="rules"
                ref="ruleForm"
                label-width="180px"
              >
                <!-- --------------------------------------------------------------------- -->
                <a-row :gutter="10">
                  <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="有无精神疾病家族史 :" class="form-item-div">
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

                <!-- --------------------------------------------------------------------- -->
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item
                      label="具体精神疾病家族史 :"
                      class="form-item-div"
                      v-if="showMentalDisease"
                    >
                      <el-select
                        v-model="ruleForm.patientInfo.mentalDiseaseFamilyHistory"
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
                      class="form-item-div"
                      v-if="showOtherMentalDisease"
                    >
                      <el-input
                        v-model="ruleForm.patientInfo.otherMentalDiseaseFamilyHistory"
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
                    <el-form-item label="现病史（有无记忆下降）:" class="form-item-div">
                      <el-select
                        v-model="ruleForm.patientInfo.currentMedicalHistoryMemoryLoss"
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
                    <el-form-item label="记忆力下降多久 :" class="form-item-div" v-if="showMemory">
                      <el-input
                        type="text"
                        :style="{width:'97%'}"
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
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="体格检查（阳性发现） :">
                      <el-input
                        type="text"
                        :style="{width:'97%'}"
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
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="是否合并使用促认知药物 :" class="form-item-div">
                      <el-select
                        v-model="ruleForm.patientInfo.isUseCognitiveDrugs"
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
                    <el-form-item label="具体促认知药物 :" v-if="showCognitiveDrug">
                      <el-input
                        type="text"
                        maxlength="40"
                        :style="{width:'97%'}"
                        show-word-limit
                        v-model="ruleForm.patientInfo.drugsType "
                        size="medium"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="具体促认知药物剂量 :" v-if="showCognitiveDrug">
                      <el-input
                        type="text"
                        maxlength="40"
                        :style="{width:'97%'}"
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

            <!-- 实验室资料 -->
            <div v-if="active===4" :style="{marginTop:'20px'}">
              <div v-for="(item,infoId) in eligibleInfoList " :key="infoId">
                <div v-if="item.groupName==='EXP' ">
                  <a-row>
                    <a-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
                      <el-form label-width="150px" :label-position="labelPosition">
                        <el-form-item :label="item.content">
                          <el-radio-group v-model="item.answer">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-form>
                    </a-col>

                    <a-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                      <el-form label-width="90px">
                        <el-form-item label="异常结果：">
                          <el-input v-model="item.remark"></el-input>
                        </el-form-item>
                      </el-form>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>

            <div v-if="active===5">5</div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item>
                <div>
                  <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
                  <el-button style="margin-top: 12px;" v-on:click="next()">下一步</el-button>
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
  import axios from 'axios'

  export default {
    data () {
      // 手机号
      var validatePhone = (rule, value, callback) => {
        if (/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(value) == false) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        serverUrl: this.GLOBAL.serverUrl,
        labelPosition: 'left',
        testChecked: '',
        rightChecked: '',
        mainChecked: '',
        agreeBook: {
          someoneTest: '1', //受试者
          rightMember: '1', // 法定代表
          mainTest: '1' // 主试者
        },
        reportId:'',
        patientId: '',
        patientIdShow: true,

        // 被试基本资料
        ruleForm: {
          // 被试者基本资料
          patientInfo: {
            idCard: '',
            doctorId: '',
            name: '',
            birthday: '',
            gender: '',
            isSnoring:'',
            familyAddress: '',
            telephoneNumber: '',
            hand: '',
            nation: '',
            marriageStatus: '',
            workStatus: '', // 职业
            inServiceJob: '', // 在职职业
            educationLevel: '',
            educationYears: '',
            isSnoring: '',
            livingWay: '',
            medicalHistory: '', // 既往病史
            otherMedicalHistory: '', // 其他既往病史
            smokingHistory: '',
            smokingNumEachDay: '',
            smokingYears: '',
            drinkingHistory: '',
            drinkingType: '',
            drinkingNumEachDay: '',
            drinkingYears: '',
            isMentalDiseaseFamilyHistory: '', // 有无精神疾病家族史
            mentalDiseaseFamilyHistory: '', // 精神疾病家族史
            otherMentalDiseaseFamilyHistory: '', // 其他精神病史
            currentMedicalHistoryMemoryLoss: '', // 现病史（有无记忆下降）
            memoryLossTime: '', // 记忆力下降多久
            physicalExamination: '', // 体格检查情况
            isUseCognitiveDrugs: '', // 是否合并使用促认知药物
            drugsType: '', // 具体促认知药物
            drugsDosage: '' // 具体药物的剂量
          },
          //被试者实验条件
          patientEligibleList: []
        },
        //实验条件题目
        eligibleInfoList: [],
        // 表单规则校验
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
      }
    },

    mounted () {
      // 获取IdCard.vue文件传过来的IdCard值
      this.ruleForm.patientInfo.idCard = sessionStorage.getItem('idCard')
      this.ruleForm.patientInfo.doctorId = this.$route.query.doctorId
      this.reportId = this.$route.query.reportId

      let that = this

      axios
        .post(this.serverUrl + 'eligible/list')
        .then(response => {
          if (response.data.retCode === '000000') {
            that.eligibleInfoList = response.data.data
          }
        })
    },

    methods: {
      //受试者打钩
      testChange () {
        this.checked === 'true'
      },
      rightChange () {
        this.rightChecked === 'true'
      },
      mainChange () {
        this.mainChecked === 'true'
      },

      //   如果是在职，输入职业
      jobChange (value) {
        if (value == '在职') {
          this.showJob = true
        } else {
          this.showJob = false
        }
      },
      // 如果是其他疾病
      diseaseChange (value) {
        if (value == '其他疾病') {
          this.showDisease = true
        } else {
          this.showDisease = false
        }
      },
      smokingChange (value) {
        if (value == '仍在吸') {
          this.showSmoke = true
        } else {
          this.showSmoke = false
        }
      },
      drinkingChange (value) {
        if (value == '仍在喝') {
          this.showDrink = true
        } else {
          this.showDrink = false
        }
      },
      mentalDiseaseChange (value) {
        if (value == '有') {
          this.showMentalDisease = true
        } else {
          this.showMentalDisease = false
          this.showOtherMentalDisease = false
        }
      },
      otherMentalDiseaseChange (value) {
        if (value == '其他精神病史') {
          this.showOtherMentalDisease = true
        } else {
          this.showOtherMentalDisease = false
        }
      },
      memoryChange (value) {
        if (value == '有记忆力下降') {
          this.showMemory = true
        } else {
          this.showMemory = false
        }
      },
      cognitiveDrugChange (value) {
        if (value == '有合并使用促认知药物') {
          this.showCognitiveDrug = true
        } else {
          this.showCognitiveDrug = false
        }
      },

      //保存个人信息
      saveInfo () {

       var url = '/home/AnswerReport'+'?reportId=' + this.reportId +'&doctorId='+ this.ruleForm.patientInfo.doctorId
        this.formatPatientRelationInfo()
        this.$http
          .post(this.serverUrl + 'patient/relation/info/save', this.ruleForm)
          .then(

            function (data) {

              if (data.body.retCode === '000000') {

                this.patientId = data.body.data.patientId
                sessionStorage.setItem('patientId', this.patientId) //存储patientId
                this.$message.success('保存成功！', 5)
                this.$router.push({
                  path: url,
                  query: {
                    reportId: this.$route.query.reportId
                  }
                }) //保存成功跳转至答题页面，并且得到IdCard.vue页面传过来的reportId，再传到答题界面
              } else {
                this.$message.error('保存失败', 5)
                this.ruleForm.patientEligibleList.splice(0, this.ruleForm.patientEligibleList.length)
              }
            },
            err => {
              alert('网络异常，请检查是否连接上网络')
            }
          )
      },

      formatPatientRelationInfo () {
        var eligibleList = this.eligibleInfoList
        for (var i = 0; i < eligibleList.length; i++) {
          var eligible = {
            eligibleId: '',
            answer: '',
            remarks: ''
          }
          eligible.eligibleId = eligibleList[i].eligibleId
          eligible.answer = eligibleList[i].answer
          eligible.remarks = eligibleList[i].remarks
          this.ruleForm.patientEligibleList.push(eligible)
        }
      },

      // 下一步
      next () {
        if (
          this.testChecked === true &&
          this.rightChecked === true &&
          this.mainChecked === true
        ) {
          if (this.active < 3) {
            this.active++
          } else if (this.active === 3) {
            if (this.ruleForm.patientInfo.name === '') {
              this.$message.warning('姓名不能为空，请检查！')
              return
            }
            if (this.ruleForm.patientInfo.birthday === '') {
              this.$message.warning('出生年月不能为空，请检查！')
              return
            }
            if (this.ruleForm.patientInfo.gender === '') {
              this.$message.warning('性别不能为空，请检查！')
              return
            }
            if (this.ruleForm.patientInfo.telephoneNumber === '') {
              this.$message.warning('电话号码不能为空，请检查！')
              return
            }
            if (this.ruleForm.patientInfo.familyAddress === '') {
              this.$message.warning('家庭地址不能为空，请检查！')
              return
            }
            this.active++ // 必填的都填了，就进入下一步
          } else {
            //第五步，保存信息，跳转到答题页面
            this.saveInfo() //保存成功并跳到答题界面

          }
        } else {
          this.$message.warning('未确认知情同意书！')
        }
      },
      // 上一步
      previous () {
        --this.active
        if (this.active < 0) this.active = 0
      },

    }
  }
</script>


