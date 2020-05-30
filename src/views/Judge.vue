<template>
  <!-- 试卷界面 -->
  <div>
    <!-- 量表名称 -->
    <a-row>
      <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
      <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">

        <div :style="{marginTop:'15px'}">
          <center>
            <h3><strong>{{examinationPaperInfo.scaleInfo.scaleName}}</strong></h3>
          </center>
        </div>
      </a-col>
      <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
    </a-row>

    <!-- 评定人、答题人 开始-->
    <div>
      <a-row>
        <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
          <a-card :style="{height:'120px',marginTop:'10px'}" :bordered="false" :hoverable="true">

            <el-form  :model="JudgeInfo"  :rules="rules" label-width="70px" >
              <el-form-item label="评定人:" prop="checkUser">
                <el-input  maxlength="10" size="small" show-word-limit v-model="JudgeInfo.checkUser"
                           placeholder="请输入评定人" :style="{width:'25%'}"/>
              </el-form-item>
            </el-form>

            <label>&nbsp&nbsp&nbsp答题人：</label>
            {{examinationPaperInfo.patientInfo.name}}

          </a-card>
        </a-col>
        <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
    </div>
    <!-- 评定人、答题人 结束-->

    <!--所有题目 开始-->
    <div
      v-for="(oneQuestion, oneQuestionId) in examinationPaperInfo.scaleInfo.questionList"
      :key="oneQuestionId"
    >
      <!-- 1.如果是问答题 -->
      <div v-if="oneQuestion.questionType==='QandA'">
        <a-row>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
            <a-card :style="{height:'150px',marginTop:'15px'}" :bordered="false" :hoverable="true">

              <label>(问答题)&nbsp&nbsp问题：</label>
              <strong>{{oneQuestion.title}}</strong>
              <br/>
              <br/>

              <label>答案：</label>
              <strong :style="{color:'red'}">{{oneQuestion.answer.content}}</strong>
              <br/>
              <br/>

              <label>评分：</label>
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分"/>
              <br/>
              <br/>
            </a-card>
          </a-col>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        </a-row>
      </div>

      <!-- 2.如果是单选题 -->
      <div v-if="oneQuestion.questionType==='radio'">
        <a-row>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
            <a-card :style="{height:'150px',marginTop:'15px'}" :bordered="false" :hoverable="true">
<!--              <strong>（单选）</strong><br/><br/>-->
              <label>(单选题)&nbsp&nbsp题目：</label>
              <strong>{{oneQuestion.title}}</strong>
              <br/><br/>

              <label>答案：</label>
              <strong :style="{color:'red'}">{{oneQuestion.answer.content}}</strong>
              <br/><br/>

              <label>评分：</label>
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分"/>
            </a-card>
          </a-col>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        </a-row>

      </div>

      <!-- 3.如果是多选题 -->
      <div v-if="oneQuestion.questionType==='checkBox'">
        <a-row>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
            <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false" :hoverable="true">
<!--              <strong>（多选）</strong><br/><br/>-->
              <label>(多选题)&nbsp&nbsp题目：</label>
              <strong>{{oneQuestion.title}}</strong>
              <br/><br/>

              <label>答案：</label>
              <strong :style="{color:'red'}">
              <span
                v-for="(item,itemId) in oneQuestion.answer.chooseAnswerList"
                :key="itemId"
              >{{item}}&nbsp;&nbsp;</span>
              </strong>
              <br/><br/>

              <label>评分：</label>
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分"/>
              <br/><br/>

            </a-card>
          </a-col>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        </a-row>
      </div>

      <!-- 6.如果是画图题 -->
      <div v-if="oneQuestion.questionType==='draw'">
        <a-row>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
            <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false" :hoverable="true">
              <h4><strong :style="{color:'#2d8cf0',marginLeft:'20px'}">(画图题)</strong></h4>
              <div class="img-box-preview">
                <div
                  v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
                  :key="oneImageId"
                  class="image-div"
                >
                  <img v-bind:src="imgUrl + oneImage" class="draw-img"/>
                </div>
              </div>
              <br/>
              <span :style="{marginLeft:'10px'}">答案如下图所示：</span>
              <br/>
              <br/>
              <!--图片答案-->
              <img v-bind:src="imgUrl + oneQuestion.answer.content" class="draw-img"/>
              <br/><br/>
              <label>评分：</label>
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score"/>
            </a-card>
          </a-col>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        </a-row>
      </div>

      <!-- 7.如果是图片题 -->
      <div v-if="oneQuestion.questionType==='picture'">
        <a-row>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
            <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false" :hoverable="true">
              <h4><strong :style="{color:'#2d8cf0',marginLeft:'20px'}">(图片题)</strong></h4>
              <div class="img-box-preview">
                <div
                  v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
                  :key="oneImageId"
                  class="image-div"
                >
                  <img v-bind:src="imgUrl + oneImage"/>
                </div>
              </div>
              <label>答案：</label>
              <strong :style="{color:'red'}">{{oneQuestion.answer.content}}</strong>
              <br/><br/>
              <label>评分：</label>
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分"/>
            </a-card>
          </a-col>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        </a-row>
      </div>

      <!-- 4.如果是量表小类 -->
      <div v-if="oneQuestion.questionType==='questionType'" :style="{marginTop:'10px'}">
        <a-row>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
            <a-divider orientation="left"><strong>{{oneQuestion.title}}</strong></a-divider>
          </a-col>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        </a-row>
      </div>

      <!-- 5.如果是指导语 -->
      <div v-if="oneQuestion.questionType==='direction'">
        <a-row>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
            <div :style="{marginTop:'15px',width:'900px'}">
              <strong>指导语：</strong>{{oneQuestion.title}}<br/>
            </div>
          </a-col>
          <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        </a-row>
      </div>
    </div>
    <!--    所有题目结束-->

    <!-- 保存 -->
    <a-row>
      <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
      <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
        <a-card :style="{height:'100%',marginTop:'15px',marginBottom:'20px'}" :bordered="false"
                :hoverable="true">
          <center>
            <div>
              <h3><strong :style="{color:'red'}"><label>总得分：{{computedTotalScore}}</label></strong></h3>
            </div>
            <h3 :style="{marginTop:'10px'}"><strong>如您已评定完量表，请保存！</strong></h3>
            <a-button type="primary" @click="saveScore" :style="{marginTop:'15px'}">保存</a-button>
          </center>
        </a-card>
      </a-col>
      <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
    </a-row>

  </div>
  <!-- 试卷界面  结束 -->
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      // 规则校验
      rules: {
        checkUser: [
          { required: true, message: '评定人不能为空', trigger: 'blur' }
        ]
      },
      serverUrl: this.GLOBAL.serverUrl,
      // 图片地址
      imgUrl: this.GLOBAL.serverUrl + 'file/download?fileNo=',
      examinationPaperInfo: {
        scaleInfo: { scaleName: '', questionList: [] },
        patientInfo: { name: '' }

      },

      JudgeInfo: {
        examinationPaperId: '',
        checkUser: '',
        totalScore: 0,
        answerJudgeList: []
      }
    }
  },

  mounted () {
    this.fetch()
  },

  computed: {
    computedTotalScore () {
      let questionList = []
      questionList = this.examinationPaperInfo.scaleInfo.questionList
      var totalScore = 0
      for (var i = 0; i < questionList.length; i++) {
        totalScore = totalScore + questionList[i].answer.score
      }
      if (isNaN(totalScore)) {
        totalScore = 0
      }
      this.JudgeInfo.totalScore = totalScore
      return totalScore
    }
  },

  methods: {

    // 评分-----拿到数据
    fetch () {
      let that = this
      axios
        .post(
          this.serverUrl + 'paper/info/get',

          this.$route.query,

          {
            headers: {
              Token: localStorage.getItem('Token')
            }
          }
        )
        .then(response => {
          if (response.data.retCode === '000000') {
            that.examinationPaperInfo = response.data.data
            if (that.examinationPaperInfo.judgeInfo != null) {
              that.JudgeInfo.examinationPaperId = that.examinationPaperInfo.examinationPaperId
              that.JudgeInfo.checkUser = that.examinationPaperInfo.judgeInfo.checkUser
              that.JudgeInfo.totalScore = that.examinationPaperInfo.judgeInfo.totalScore
            }
          } else if (response.data.retCode === '100001') {
            if (localStorage.getItem('Token') === null) {
              this.$message.error('未登录，即将跳转至登录页面', 5)
              this.$router.push({ path: '/login' })
            } else {
              this.$message.error('登录超时', 5)
              this.$router.push({ path: '/login' })
            }
          } else {
            this.$message.error(response.data.retMsg, 5)
          }
        }, err => {
          alert('网络异常，请检查是否连接上网络')
        })
    },
    // 保存
    saveScore () {
      if (this.JudgeInfo.checkUser === ''){
        this.$message.error("评定人不能为空")
      } else {
        // 得到答卷Id
        this.JudgeInfo.examinationPaperId = this.examinationPaperInfo.examinationPaperId

        // 题目列表
        var questionList = this.examinationPaperInfo.scaleInfo.questionList
        for (var i = 0; i < questionList.length; i++) {
          var answer = {
            answerId: questionList[i].answer.answerId,
            score: questionList[i].answer.score
          }
          this.JudgeInfo.answerJudgeList.push(answer)
        }

        axios
          .post(this.serverUrl + 'paper/judge/commit', this.JudgeInfo, {
            headers: {
              Token: localStorage.getItem('Token')
            }
          })
          .then(response => {
            if (response.data.retCode === '000000') {
              this.$message.success('保存成功', 4)
              this.$router.push({
                path: '/home/myAnswer'
              })
            } else if (data.data.retCode === '100001') {
              if (localStorage.getItem('Token') === null) {
                this.$message.error('未登录，即将跳转至登录页面', 5)
                this.$router.push({ path: '/login' })
              } else {
                this.$message.error('登录超时', 5)
                this.$router.push({ path: '/login' })
              }
            } else {
              this.$message.error(data.data.retMsg, 5)
            }
          }, err => {
            alert('网络异常，请检查是否连接上网络')
          })
      }

    }
  }
}
</script>

<style scoped>
  .image-div img {
    margin-left: 10px;
    margin-bottom: 3vh;
    /*margin-left: 2vh;*/
    width: 30vh;
    height: 30vh;
    border: 1px solid #2d8cf0;
  }

  .img-box-preview {
    display: flex;
    /* 左右布局 */
    justify-content: space-between;
    /* //换行 */
    flex-wrap: wrap;
    /* //紧揍排列 */
    align-content: flex-start;
    width: auto;
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 20px;
  }

  .draw-img {
    width: 30vh;
    height: 30vh;
    border: 1px solid #2d8cf0;
  }

</style>
