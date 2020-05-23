<template xmlns="http://www.w3.org/1999/html">
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
            <el-step title="MMSE"></el-step>
            <el-step title="SMCI"></el-step>
            <el-step title="PVLT-即刻"></el-step>
            <el-step title="PHQ-9"></el-step>
            <el-step title="ADL"></el-step>
            <el-step title="NPI"></el-step>
            <el-step title="CBI"></el-step>
            <el-step title="PVLT-延迟"></el-step>
            <el-step title="CDR"></el-step>
          </el-steps>

          <el-row>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <el-form :style="{marginTop:'20px'}">
                <el-form-item label="评定人:">
                  <el-input  v-model="answer.checkUser" style="width: 80%;"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <div v-if="active===newActive" >
            <strong><h3 :style="{textAlign:'center', lineHeight:'25px',fontFamily:'SimHei'}">
              <!--量表名称-->
              {{scaleInfo.scaleName}}</h3></strong>

            <!--所有题目开始-->
            <div v-for="(item, subjectId) in scaleInfo.questionList " :key="subjectId">


              <!--题目类型-->
              <div v-if="item.questionType ==='questionType'">
                <!--<div v-for="(value,index) in answer.answerList" :key="index">-->
                  <!--<div v-if="item.questionId ===value.questionId ">-->
                    <a-divider orientation="left">{{item.title}}</a-divider>
                  </div>
                <!--</div>-->
              <!--</div>-->

              <!--指导语-->
              <div v-if="item.questionType ==='direction'">
                <div :style="{marginTop:'20px'}">
                  <span >指导语：{{item.title}}</span>
                </div>

              </div>

              <!--问答题-->
              <div v-if="item.questionType ==='QandA'" :style="{marginTop:'20px'}">
                <div v-for="(value,index) in answer.answerList" :key="index">
                  <div v-if="item.questionId === value.questionId ">
                    <el-row :gutter="10">
                      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                        {{item.title}}
                      </el-col>
                      <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
                        <el-input v-model="value.content" placeholder="请输入答案"></el-input>
                      </el-col>
                      <el-col :xs="5" :sm="5" :md="5" :lg="8" :xl="5">
                        <el-select v-model="value.score" clearable placeholder="请评分">
                          <el-option
                            v-for="item in scoreOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>

              <!--单选题-->
              <div v-if="item.questionType ==='radio'"  :style="{marginTop:'20px'}" >
                <div v-if="item.recordScore === true ">
                  <div v-if="item.groupType ===''">
                   <div v-for="(value,index) in answer.answerList" :key="index">
                      <div v-if="item.questionId === value.questionId ">
                        <strong><p> {{item.title}}</p></strong>
                       <el-radio-group v-model="value.content">
                        <div
                          v-for="(options,optionId) in item.items"
                          :key="optionId"
                          class="radio-div"
                        >
                          <el-radio :label="options.option" :style="{marginTop:'10px'}" @change="radioChange(item.questionId, options.optionScore)">{{options.option}}</el-radio>
                        </div>
                       </el-radio-group>
                    </div>
                   </div>
                </div>
                </div>
              </div>


              <!--特殊单选题-->
              <div v-if="item.questionType ==='radio'"  :style="{marginTop:'20px'}" >
                <!--如果是特殊单选题，并且display等于1时才显示-->
                <div v-if="item.groupType !=='' && item.display ==='1' ">
                  <div v-for="(value,index) in answer.answerList" :key="index">
                    <div v-if="item.questionId === value.questionId ">
                      <strong><p> {{item.title}}</p></strong>
                      <el-radio-group v-model="value.content"
                    >
                      <div
                        v-for="(options,optionId) in item.items"
                        :key="optionId"
                        class="radio-div"
                      >
                        <el-radio :label="options.option" :style="{marginTop:'10px'}" @change="radioChange(item.questionId, options.optionScore)">{{options.option}}</el-radio>
                      </div>
                    </el-radio-group>
                    </div>
                  </div>
                </div>
              </div>


              <!--多选题-->
              <div v-if="item.questionType ==='checkBox'" :style="{marginTop:'20px'}">
                <div v-for="(value,index) in answer.answerList" :key="index">

                  <div v-if="item.questionId === value.questionId ">
                    <strong><span :style="{lineHeight:'25px',fontFamily:'SimHei'}"> {{item.title}}</span></strong><br>
                    <el-checkbox-group v-model="value.chooseAnswerList"
                    >
                      <div
                        v-for="(options,optionId) in item.items"
                        :key="optionId"
                        class="radio-div"
                      >
                        <el-checkbox  :label="options.option" :style="{marginTop:'10px'}" >{{options.option}}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                    <el-form>
                      <el-form-item label="插入:" :style="{marginTop:'15px'}">
                        <el-input placeholder="请输入插入内容..." v-model="value.insertContent" :style="{width:'50%'}"></el-input>
                      </el-form-item>
                      <el-form-item label="正确:">
                        <el-select v-model="value.score" clearable placeholder="请选择正确个数" style="width: 50%;">
                          <el-option
                            v-for="item in checkBoxOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>

              </div>

              <!--图片题-->
              <div v-if="item.questionType ==='picture'" :style="{marginTop:'20px'}">
                <div v-for="(value,index) in answer.answerList" :key="index">
                  <div v-if="item.questionId === value.questionId ">

                    <el-row :gutter="20">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <div
                          v-for="(oneImg,imgId) in item.attachmentList"
                          :key="imgId"
                        >
                          <el-image
                            style="width: 250px; height: 250px"
                            class="imgBox"
                            :src="imgUrl + oneImg"
                            :fit="'contain'"></el-image>
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10">
                        <el-form>
                          <el-form-item label="答案:">
                            <el-input type="textarea" autosize v-model="value.content" style="width: 80%;" placeholder="请输入答案"></el-input>
                          </el-form-item>
                          <el-form-item label="评分:">
                            <el-select v-model="value.score" clearable placeholder="请评分" style="width: 80%;">
                              <el-option
                                v-for="item in scoreOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>

                        </el-form>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>

              <!--画图题-->
              <div v-if="item.questionType ==='draw'" :style="{marginTop:'20px'}">
                <div v-for="(value,index) in answer.answerList" :key="index">
                  <div v-if="item.questionId === value.questionId ">

                    <!--图片-->
                    <div
                      v-for="(oneImg,imgId) in item.attachmentList"
                      :key="imgId"
                      class="imgBox"
                    >
                      <el-image
                        style="width: 250px; height: 250px"
                        :src="imgUrl + oneImg"
                        :fit="'contain'"></el-image>
                    </div>
                    <!--canvas-->
                    <div class="canvasDiv">
                      <canvas
                        class="canvasBox"
                        :id="mycanvas(subjectId)"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @mousedown="mousedown"
                        @mousemove="mousemove"
                        @mouseup="mouseup"
                        width="500px"
                        height="400px"
                      >您的浏览器不支持canvas，请更换浏览器！
                      </canvas>
                    </div>

                    <!--画笔工具-->
                    <el-row :gutter="10">
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">

                        <center>
                          <el-button type="primary" plain @click="pen">画笔</el-button>
                        </center>

                      </el-col>
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">

                        <center>
                          <el-button type="primary" plain @click="eraser">橡皮擦</el-button>
                        </center>

                      </el-col>
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">

                        <center>
                          <el-button type="primary" plain @click="clearAll(subjectId)">清除所有</el-button>
                        </center>

                      </el-col>

                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <center>
                          <el-button type="primary" plain @click="handleChangeImage(subjectId,item.questionId)">保存图片
                          </el-button>
                        </center>
                      </el-col>
                    </el-row>

                    <!--评分-->
                    <el-row>
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form :style="{marginTop:'15px'}">
                          <el-form-item label="评分:">
                            <el-select v-model="value.score" clearable placeholder="请评分">
                              <el-option
                                v-for="item in scoreOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-form>

                      </el-col>
                    </el-row>


                  </div>
                </div>
               </div>

              </div>
              <!--所有题目结束-->


          <div v-if="scaleInfo.scaleName!='神经精神科量表（NPI）' "  >
            <h3><strong :style="{color:'red'}"><label>总得分：{{computedTotalScore}}</label></strong></h3>
          </div>

          <!--不计分的单选题在此处-->
          <div v-for="(item, subjectId) in scaleInfo.questionList " :key="'s-'+subjectId">
            <div v-if="item.recordScore === false"  >
              <div  v-if="scaleInfo.scaleName === '病人健康问卷（PHQ-9）' ">
              <!--单选题-->
              <div v-if="item.questionType ==='radio'">
                <div v-for="(value,index) in answer.answerList" :key="index">
                  <div v-if="item.questionId === value.questionId ">
                    <strong><p> {{item.title}}</p></strong>
                    <el-radio-group v-model="value.content"
                    >
                      <div
                        v-for="(options,optionId) in item.items"
                        :key="optionId"
                        class="radio-div"
                      >
                        <el-radio :label="options.option" :style="{marginTop:'10px'}"  >{{options.option}}</el-radio>
                      </div>
                    </el-radio-group>

                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          </div>

          <div v-if="scaleInfo.scaleName==='PVLT费城词语学习训练'">
            <h3><strong :style="{color:'red'}"><label>正确个数：{{PVLTTotalScore}}</label></strong></h3>
          </div>

          <div v-if="scaleInfo.scaleName==='神经精神科量表（NPI）'">
            <h3><strong :style="{color:'red'}"><label>"频率"总分：{{frequencyTotalScore}}</label></strong></h3>
            <h3><strong :style="{color:'red'}"><label>"严重程度"总分：{{seriousTotalScore}}</label></strong></h3>
            <h3><strong :style="{color:'red'}"><label>"频率*严重程度"总分：{{frequencyAndSeriousTotalScore}}</label></strong></h3>
            <h3><strong :style="{color:'red'}"><label>"使照料者苦恼程度"总分：{{tortureTotalScore}}</label></strong></h3>
          </div>

          <div>
            <el-button style="margin-top: 12px;" v-on:click="next">下一个</el-button>
          </div>

        </a-card>
      </a-col>
      <a-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></a-col>
    </a-row>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {

        active: 0,
        newActive: '',
        reportId: '',
        doctorId:'',
        serverUrl: this.GLOBAL.serverUrl,
        scaleIdList: [], //量表id集合
        scaleInfo: '', //一个量表的信息
        oneImg: [],
        imgUrl: this.GLOBAL.serverUrl + 'file/download?fileNo=', //存放图片的地址
        canvasImgUrls: [],
        running: "",

        // 答案
        answer: {
          examinationPaperId: '',
          reportId: '',
          scaleId: '',
          patientId: '',
          useTime: '',
          checkUser:'', //评定人
          totalScore:'', //总得分
          answerList: []
        },
        //下拉框：分数数据
        scoreOptions: [{
          value: '0',
          label: '0分'
        }, {
          value: '0.5',
          label: '0.5分'
        }, {
          value: '1',
          label: '1分'
        }, {
          value: '2',
          label: '2分'
        }, {
          value: '3',
          label: '3分'
        },
          {
            value: '4',
            label: '4分'
          },
        ],

        // 多选框分数
        checkBoxOption:[{
          value: '0',
          label: '0个'
        },
          {
            value: '1',
            label: '1个'
          },
          {
            value: '2',
            label: '2个'
          },
          {
            value: '3',
            label: '3个'
          },
          {
            value: '4',
            label: '4个'
          },
          {
            value: '5',
            label: '5个'
          },
          {
            value: '6',
            label: '6个'
          },{
            value: '7',
            label: '7个'
          },{
            value: '8',
            label: '8个'
          },{
            value: '9',
            label: '9个'
          },{
            value: '10',
            label: '10个'
          },
          {
            value: '11',
            label: '11个'
          },
          {
            value: '12',
            label: '12个'
          }
       ],
        startTime:'', //答题开始时间
        endTime:'',// 答题结束时间

      }
    },

    watch:{
      answer: {
          handler(val, oldVal){
            if (val.answerList != null && val.answerList.length > 0){
              debugger

              for (var index in val.answerList) {
                var patientAnswer = val.answerList[index];
                var answerQuestion = patientAnswer.question;
                // 如果是单选题特殊题型
                if (answerQuestion.questionType === 'radio' && answerQuestion.groupType != null && answerQuestion.groupType != '' && answerQuestion.groupType.charAt(answerQuestion.groupType.length - 1) === '1' && patientAnswer.content === '无') {
                  console.log("我执行了")
                  //将问题列表中的其他相同组题目的可见性设置为0，即不可见
                  for (var j in this.scaleInfo.questionList){
                    var question = this.scaleInfo.questionList[j];
                      if (question.questionId != answerQuestion.questionId && question.groupType != null && question.groupType.charAt(0) === answerQuestion.groupType.charAt(0)) {
                        question.display = '0';
                        question.recordScore = false;

                      }
                  }
                }

                if (answerQuestion.questionType === 'radio' && answerQuestion.groupType != null && answerQuestion.groupType != '' && answerQuestion.groupType.charAt(answerQuestion.groupType.length - 1) === '1' && patientAnswer.content === '有') {
                  console.log("我执行了")
                  //将问题列表中的其他相同组题目的可见性设置为1，即可见
                  for (var index in this.scaleInfo.questionList){
                    var question = this.scaleInfo.questionList[index];
                    if (question.questionId != answerQuestion.questionId && question.groupType != null && question.groupType.charAt(0) === answerQuestion.groupType.charAt(0)) {
                      question.display = '1';
                      question.recordScore = true;
                    }
                  }
                }
              }
            }
            computedTotalScore()
          },
          deep:true
      }
    },

    mounted() {
      this.getReportInfo()
    },

    computed: {
      // 计算总分，除了“神经精神科量表”
      computedTotalScore () {
        debugger
        if (this.scaleInfo === '' || this.scaleInfo === null  ) {
          return
        }
        let answerList = []
        answerList = this.answer.answerList
        var totalScore = 0
        for (var i =0 ;i<answerList.length;i++){
          if(answerList[i].question.recordScore === true){
            totalScore = Number(totalScore) + Number(answerList[i].score)
          }

        }

        if (isNaN(totalScore)) {
          totalScore = 0
        }
        this.answer.totalScore = totalScore
        return totalScore
      },


      // 频率总分
      frequencyTotalScore(){

        if (this.scaleInfo === '' || this.scaleInfo === null  ) {
          return
        }
        let answerList = []
        answerList = this.answer.answerList
        var totalScore = 0
        for(var i =0 ;i<answerList.length;i++){
          var length = answerList[i].question.groupType.length
          if (answerList[i].question.recordScore === true && answerList[i].question.groupType.charAt(length-1) === '2' ) {
            totalScore = Number(totalScore) + Number(answerList[i].score)
          }

        }
        this.answer.totalScore = totalScore
        return totalScore
      },

      // 严重程度总分
      seriousTotalScore(){

        if (this.scaleInfo === '' || this.scaleInfo === null  ) {
          return
        }
        let answerList = []
        answerList = this.answer.answerList
        var totalScore = 0


        for(var i =0 ;i<answerList.length;i++){
          var length = answerList[i].question.groupType.length
          if (answerList[i].question.recordScore === true && answerList[i].question.groupType.charAt(length-1) === '3' ) {
            totalScore = Number(totalScore) + Number(answerList[i].score)
          }

        }
        this.answer.totalScore = totalScore
        return totalScore
      },

      // 频率*严重程度
      frequencyAndSeriousTotalScore(){
        debugger
        if (this.scaleInfo === '' || this.scaleInfo === null  ) {
          return
        }
        let answerList = []
        answerList = this.answer.answerList
        var totalScore = 0

        var groupTypeArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        for(var j = 0; j<groupTypeArray.length; j++){
          var totalScore1 = 0
          var totalScore2 = 0
        for(var i =0 ;i<answerList.length;i++){
          var length = answerList[i].question.groupType.length
          if ( answerList[i].question.recordScore === true && answerList[i].question.groupType.charAt(0) === groupTypeArray[j] ){

            if (answerList[i].question.groupType.charAt(length-1) === '2' ) {
              totalScore1 = Number(answerList[i].score)
            }
            if (answerList[i].question.groupType.charAt(length-1) === '3' ) {
              totalScore2 = Number(answerList[i].score)
            }

          }
        }
          totalScore = totalScore + totalScore1 * totalScore2
        }
        this.answer.totalScore = totalScore
        return totalScore
      },


      // 使照料者苦恼程度总分
      tortureTotalScore(){

        if (this.scaleInfo === '' || this.scaleInfo === null  ) {
          return
        }
        let answerList = []
        answerList = this.answer.answerList
        var totalScore = 0
        for(var i =0 ;i<answerList.length;i++){
          var length = answerList[i].question.groupType.length
          if (answerList[i].question.recordScore === true && answerList[i].question.groupType.charAt(length-1) === '4' ) {
            totalScore = Number(totalScore) + Number(answerList[i].score)
          }

        }
        this.answer.totalScore = totalScore
        return totalScore
      }


    },
    methods: {

      // 单选题radio事件绑定
      radioChange(questionId, optionScore){

        let list = []
        list = this.answer.answerList

        for (var index in list) {
          if (list[index].questionId === questionId) {
          list[index].score = optionScore
          }
        }
      },

      // 多选题绑定事件
      // checkBoxChange(questionId, optionScore){
      //
      //   let list = []
      //   list = this.answer.answerList
      //
      //   for (var index in list) {
      //     if (list[index].questionId === questionId) {
      //
      //       list[index].score = optionScore
      //     }
      //   }
      //
      // },

      // 获取报告表
      getReportInfo() {

        let that = this //在 then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定
        this.reportId = this.$route.query.reportId,
          this.doctorId = this.$route.query.doctorId,
          this.answer.reportId = this.reportId,
        axios.post(this.serverUrl + 'paper/patient/blank/get',
          {
            reportId: this.reportId,
            patientId: sessionStorage.getItem('patientId')
          }
        ).then(response => {
          if(response.data.retCode === '000000')
        {

          that.scaleIdList = response.data.data.reportInfoVO.scaleIdList
          that.answer.examinationPaperId = response.data.data.examinationPaperId
          that.newActive = 0
          that.getScaleInfo(0) //默认显示第一章量表
        }
      else
        {
          this.$message.error(response.retCode)
        }
      })

      },

      //获取量表
      getScaleInfo(stepNum) {

        let that = this
        axios.post(this.serverUrl + 'paper/patient/scale/get', {
          scaleId: this.scaleIdList[stepNum]
        }).then(res => {
          if(res.data.retCode === '000000') //获取量表成功
        {
          that.startTime = new Date().getTime() // 获取当前时间

          // Date date = new Date();
          // this.startTime = date.getTime();
          res = JSON.parse(res.request.response)
          that.scaleInfo = res.data

          for (var i = 0; i < that.scaleInfo.questionList.length; i++) {
            if (that.scaleInfo.questionList[i].questionType != 'questionType' &&
              that.scaleInfo.questionList[i].questionType != 'direction'
            ){
              var patientAnswer = {
                question: that.scaleInfo.questionList[i],
                questionId: that.scaleInfo.questionList[i].questionId,
                content: '', //答题内容
                score: '', //记录得分
                chooseAnswerList: []
              }
              that.answer.answerList.push(patientAnswer)
            }
          }
        }
      })
      },
      // 上一步
      // previous () {
      //   --this.active
      //   if (this.active < 0) this.active = 0
      // },

      // 保存量表信息
      saveScaleInfo(stepNum){
        this.answer.patientId = sessionStorage.getItem('patientId')
        this.answer.scaleId = this.scaleIdList[stepNum] //得到scaleId
        let that = this
        this.endTime = new Date().getTime();
        this.answer.useTime = (
         (this.endTime - this.startTime) /
         1000 /
         60
       ).toFixed(2);

        axios.post(this.serverUrl+'paper/patient/answer/commit',this.answer).then(res =>{
          if(res.data.retCode === '000000'){
          this.answer.answerList.splice(0,this.answer.answerList.length)
          this.getScaleInfo(this.active)
        }else{
            // this.$message.warn(res.data.retMsg)
        }
        })

      },

      // 下一步
      next() {
debugger
        if (this.active < this.scaleIdList.length) {
          this.saveScaleInfo(this.active)
          this.active++
          this.answer.totalScore = 0
          // this.getScaleInfo(this.active)
          this.newActive = this.active
        }
        if(this.active === this.scaleIdList.length){

 var url = './IdCard?reportId=' + this.reportId + '&doctorId='+this.doctorId
          //调用elementUI的加载层
          const loading = this.$loading({
            lock: true,
            text: '提交成功，3秒后跳转至初始页......',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
            this.$router.push({path:url}); // 强制切换当前路由 path
          loading.close();
        }, 3000);
        }
      },

      // canvas函数---开始

      // 移动端绘图, touchstart对应movedown
      touchstart(e) {
        const canvas = e.currentTarget
        // const canvas = document.querySelector('#mycanvas')
        this.context = canvas.getContext('2d') // 使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了

        var ev = e || window.event
        var x1 = ev.touches[0].clientX - 53 //canvas.offsetLeft
        var y1 = ev.touches[0].pageY - canvas.offsetTop
        // 绘制线
        // 起点坐标
        this.context.lineWidth = 3
        this.context.beginPath()
        this.context.moveTo(x1, y1)
        // 终点坐标：鼠标按下并且拖动的位置
        this.touchmove
      },
      touchmove(e) {
        const canvas = e.currentTarget
        e.preventDefault()
        if (this.running == 'draw') {
          this.context.lineWidth = 3
          var ev = e || window.event
          // var x2 = ev.touches[0].clientX - canvas.offsetLeft
          // var y2 = ev.touches[0].pageY - canvas.offsetTop
          var x2 = ev.touches[0].clientX - 53 //canvas.offsetLeft
          var y2 = ev.touches[0].pageY - canvas.offsetTop
          this.context.lineTo(x2, y2)

          // this.context.strokeStyle = '#333'// 线条的颜色
          this.context.stroke() // 画线
        }
      },
      // 鼠标按下
      mousedown(e) {
        const canvas = e.currentTarget
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了
        var ev = e || window.event
        var x1 = ev.clientX - 53 //canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
        var y1 = ev.pageY - canvas.offsetTop
        // 绘制线
        // 起点坐标
        this.context.beginPath()
        this.context.moveTo(x1, y1)
        // 终点坐标：鼠标按下并且拖动的位置
        this.mousemove
      },
      // 鼠标移动
      mousemove(e) {
        const canvas = e.currentTarget
        e.preventDefault()
        // 如果鼠标点击了，就开始画线
        if (this.running == 'draw') {
          this.context.lineWidth = 2
          // const canvas = document.querySelector("#mycanvas");
          // var context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
          var ev = e || window.event
          var x2 = ev.clientX - 53 //canvas.offsetLeft
          var y2 = ev.pageY - canvas.offsetTop
          this.context.lineTo(x2, y2)

          this.context.stroke() // 画线
        }
      },
      // 鼠标抬起
      mouseup(e) {
        e.preventDefault()
        this.running = '' // 设置为空之后，就不会再画线
      },

      // 动态绑定Id
      mycanvas(subjectId) {
        return 'mycanvas' + subjectId
      },

      // 清除所有
      clearAll(subjectId) {
        // const canvas = e.currentTarget
        var currentCanvas = '#' + 'mycanvas' + subjectId
        const canvas = document.querySelector(currentCanvas)
        this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      },

      // 画笔
      pen() {
        this.context.globalCompositeOperation = 'source-over'
      },

      // 橡皮擦
      eraser() {
        // 绘制原题
        this.context.globalCompositeOperation = 'destination-out'
        this.drawDown
      },
      // 绘制源图 鼠标按下
      drawDown(e) {
        const canvas = e.currentTarget
        // const canvas = document.querySelector('#mycanvas')
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了
        var ev = e || window.event
        var x3 = ev.clientX - 53 //canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
        var y3 = ev.pageY - canvas.offsetTop
        // 绘制线
        // 起点坐标
        this.context.beginPath()
        this.context.moveTo(x3, y3)
        // 终点坐标：鼠标按下并且拖动的位置
        this.drawMove
      },

      // 绘制源图 鼠标移动
      drawMove(e) {
        const canvas = e.currentTarget
        // const canvas = document.querySelector('#mycanvas')
        e.preventDefault()
        if (this.running == 'draw') {
          this.context.lineWidth = 500
          var ev = e || window.event
          var x4 = ev.clientX - 53 //canvas.offsetLeft
          var y4 = ev.pageY - canvas.offsetTop
          this.context.lineTo(x4, y4)

          // this.context.strokeStyle = "blue";
          this.context.stroke() // 画线
        }
      },
      // 保存图片
      handleChangeImage(subjectId, questionId) {
        var currentCanvas = '#' + 'mycanvas' + subjectId
        const canvas = document.querySelector(currentCanvas)
        // 导出base64格式的图片数据
        const src = canvas.toDataURL('image/png')
        this.canvasImgUrls.pop(src)
        this.canvasImgUrls.push(src)
        this.imgDataURL = src.substring(22)
        axios
          .post(this.serverUrl + 'file/base64/upload', {
            base64Image: this.imgDataURL
          })
          .then(
            response => {
          if(response.data.retCode === '100000'
      )
        {
          this.$message.error('保存图片失败', 4)
        }
      else
        {
          // response.data.data;
          for (var i = 0; i < this.answer.answerList.length; i++) {
            if (questionId === this.answer.answerList[i].questionId) {
              this.answer.answerList[i].content = response.data.data
            }
          }
          this.$message.success('保存成功', 4)
        }
      },
        err =>
        {
          alert('网络异常，请检查是否连接上网络')
        }
      )
      }

      // 画图题结束
    }
  }
</script>

<style scoped>
  .imgBox {
    text-align: center;
    border: 1px solid #dddee1;
  }

  .canvasBox {
    border: 1px solid #dddee1;
  }

</style>
