<template>
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

          <div v-if="active===newActive" :style="{marginTop:'20px'}">
            <strong><h3 :style="{textAlign:'center', lineHeight:'25px',fontFamily:'SimHei'}">
              <!--量表名称-->
              {{scaleInfo.scaleName}}</h3></strong>

            <!--所有题目开始-->
            <div v-for="(item, subjectId) in scaleInfo.questionList " :key="subjectId">
              <!--题目类型-->
              <div v-if="item.questionType ==='questionType'">
                <div v-for="(value,index) in answer.answerList" :key="index">
                  <div v-if="item.questionId ===value.questionId ">
                    <a-divider orientation="left">{{item.title}}</a-divider>
                  </div>
                </div>
              </div>

              <!--指导语-->
              <div v-if="item.questionType ==='direction'">
                <span>指导语：{{item.title}}</span>
              </div>

              <!--问答题-->
              <div v-if="item.questionType ==='QandA'" :style="{marginTop:'20px'}">
                <div v-for="(value,index) in answer.answerList" :key="index">
                  <div v-if="item.questionId === value.questionId ">
                    <el-row :gutter="10">
                      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        {{item.title}}
                      </el-col>
                      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-input v-model="item.content"></el-input>
                      </el-col>
                      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
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
              <div v-if="item.questionType ==='radio'" :style="{marginTop:'20px'}">
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
                        <el-radio :label="options.option" :style="{marginTop:'10px'}">{{options.option}}</el-radio>
                      </div>
                    </el-radio-group>

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
                        <el-checkbox :label="options.option" :style="{marginTop:'10px'}">{{options.option}}
                        </el-checkbox>
                      </div>
                    </el-checkbox-group>
                    <p>正确个数：</p>
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
                            <el-input type="textarea" autosize v-model="value.content" style="width: 80%;"></el-input>
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
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="8">

                        <center>
                          <el-button type="primary" plain @click="handleChangeImage(subjectId,item.questionId)">保存图片
                          </el-button>
                        </center>

                        <!--                          <p>保存图片</p>-->

                      </el-col>
                    </el-row>

                  </div>
                </div>
              </div>
              <!--所有题目结束-->

            </div>
          </div>


          <div>
            <!--            <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>-->
            <el-button style="margin-top: 12px;" v-on:click="next">下一步</el-button>
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
    data () {
      return {
        active: 0,
        newActive: '',
        reportId: '',
        serverUrl: this.GLOBAL.serverUrl,
        scaleIdList: [], //量表id集合
        scaleInfo: '', //一个量表的信息
        oneImg: [],
        imgUrl: this.GLOBAL.serverUrl + 'file/download?fileNo=', //存放图片的地址
        canvasImgUrls: [],
        running: "",

        // 答案
        answer: {
          examinationId: '',
          reportId: '',
          scaleId: '',
          patientId: '',
          useTime: '',
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
          }],
      }
    },

    mounted () {
      this.getReportInfo()

    },
    methods: {
      // 获取报告表
      getReportInfo () {

        let that = this //在 then的内部不能使用Vue的实例化的this, 因为在内部 this 没有被绑定
        this.reportId = this.$route.query.reportId,
          axios.post(this.serverUrl + 'paper/patient/blank/get',
            {
              reportId: this.reportId,
              patientId: sessionStorage.getItem('patientId')
            }
          ).then(response => {

            if (response.data.retCode === '000000') {
              that.scaleIdList = response.data.data.reportInfoVO.scaleIdList

              that.newActive = 0
              that.getScaleInfo(0) //默认显示第一章量表
            } else {
              this.$message.error(response.retCode)
            }
          })

      },

      //获取量表
      getScaleInfo (stepNum) {

        let that = this
        axios.post(this.serverUrl + 'paper/patient/scale/get', {
          scaleId: this.scaleIdList[stepNum]
        }).then(res => {
          if (res.data.retCode === '000000') {
            // console.log('获取量表', res.request.response)
            res = JSON.parse(res.request.response)
            that.scaleInfo = res.data

            for (var i = 0; i < that.scaleInfo.questionList.length; i++) {
              var question = {
                questionId: that.scaleInfo.questionList[i].questionId,
                content: '', //答题内容
                score: '', //记录得分
                chooseAnswerList: []
              }
              that.answer.answerList.push(question)

            }
          }
        })
      },
      // 上一步
      // previous () {
      //   --this.active
      //   if (this.active < 0) this.active = 0
      // },

      // 下一步
      next () {
        if (this.active < 8) {

          this.active++
          this.getScaleInfo(this.active)
          this.newActive = this.active
        }
      },

      // canvas函数---开始

      // 移动端绘图, touchstart对应movedown
      touchstart (e) {
        const canvas = e.currentTarget
        // const canvas = document.querySelector('#mycanvas')
        this.context = canvas.getContext('2d') // 使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了

        var ev = e || window.event
        var x1 = ev.touches[0].clientX-50  //canvas.offsetLeft
        var y1 = ev.touches[0].pageY - canvas.offsetTop
        // 绘制线
        // 起点坐标
        this.context.lineWidth = 3
        this.context.beginPath()
        this.context.moveTo(x1, y1)
        // 终点坐标：鼠标按下并且拖动的位置
        this.touchmove
      },
      touchmove (e) {
        const canvas = e.currentTarget
        e.preventDefault()
        if (this.running == 'draw') {
          this.context.lineWidth = 3
          var ev = e || window.event
          // var x2 = ev.touches[0].clientX - canvas.offsetLeft
          // var y2 = ev.touches[0].pageY - canvas.offsetTop
          var x2 = ev.touches[0].clientX- 50//canvas.offsetLeft
          var y2 = ev.touches[0].pageY - canvas.offsetTop
          this.context.lineTo(x2, y2)

          // this.context.strokeStyle = '#333'// 线条的颜色
          this.context.stroke() // 画线
        }
      },
      // 鼠标按下
      mousedown (e) {
        const canvas = e.currentTarget
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了
        var ev = e || window.event
        var x1 = ev.clientX - 50 //canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
        var y1 = ev.pageY - canvas.offsetTop
        // 绘制线
        // 起点坐标
        this.context.beginPath()
        this.context.moveTo(x1, y1)
        // 终点坐标：鼠标按下并且拖动的位置
        this.mousemove
      },
      // 鼠标移动
      mousemove (e) {
        const canvas = e.currentTarget
        e.preventDefault()
        // 如果鼠标点击了，就开始画线
        if (this.running == 'draw') {
          this.context.lineWidth = 3
          // const canvas = document.querySelector("#mycanvas");
          // var context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
          var ev = e || window.event
          var x2 = ev.clientX - 50 // canvas.offsetLeft
          var y2 = ev.pageY - canvas.offsetTop
          this.context.lineTo(x2, y2)

          this.context.stroke() // 画线
        }
      },
      // 鼠标抬起
      mouseup (e) {
        e.preventDefault()
        this.running = '' // 设置为空之后，就不会再画线
      },

      // 动态绑定Id
      mycanvas (subjectId) {
        return 'mycanvas' + subjectId
      },

      // 清除所有
      clearAll (subjectId) {
        // const canvas = e.currentTarget
        var currentCanvas = '#' + 'mycanvas' + subjectId
        const canvas = document.querySelector(currentCanvas)
        this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      },

      // 画笔
      pen () {
        this.context.globalCompositeOperation = 'source-over'
      },

      // 橡皮擦
      eraser () {
        // 绘制原题
        this.context.globalCompositeOperation = 'destination-out'
        this.drawDown
      },
      // 绘制源图 鼠标按下
      drawDown (e) {
        const canvas = e.currentTarget
        // const canvas = document.querySelector('#mycanvas')
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了
        var ev = e || window.event
        var x3 = ev.clientX - canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
        var y3 = ev.pageY - canvas.offsetTop
        // 绘制线
        // 起点坐标
        this.context.beginPath()
        this.context.moveTo(x3, y3)
        // 终点坐标：鼠标按下并且拖动的位置
        this.drawMove
      },

      // 绘制源图 鼠标移动
      drawMove (e) {
        const canvas = e.currentTarget
        // const canvas = document.querySelector('#mycanvas')
        e.preventDefault()
        if (this.running == 'draw') {
          this.context.lineWidth = 20
          var ev = e || window.event
          var x4 = ev.clientX - 50 //canvas.offsetLeft
          var y4 = ev.pageY - canvas.offsetTop
          this.context.lineTo(x4, y4)

          // this.context.strokeStyle = "blue";
          this.context.stroke() // 画线
        }
      },
      // 保存图片
      handleChangeImage (subjectId, questionId) {
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
              if (response.data.retCode === '100000') {
                this.$message.error('保存图片失败', 4)
              } else {
                // response.data.data;
                for (var i = 0; i < this.answer.answerList.length; i++) {
                  if (questionId === this.answer.answerList[i].questionId) {
                    this.answer.answerList[i].content = response.data.data
                  }
                }
                this.$message.success('保存成功', 4)
              }
            },
            err => {
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
