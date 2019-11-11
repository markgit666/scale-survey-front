<template>
  <div>
    <div>
      <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <center>
          <a-card v-if="patientIdShow" :bordered="false" >
            <label>被试者Id：</label>
            <el-input type="text" show-word-limit maxlength="256" size="small" placeholder="请输入Id" v-model="patientId"
                      :style="{width:'40%'}"></el-input>
            <a-button type="primary" @click="conform" :style="{marginLeft:'10px'}">确定</a-button>
          </a-card>
          </center>
        </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>

      <!-- 答题界面 -->
      <div v-show="show">
        <div>
          <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <!--量表名称-->
              <center>
                <div :style="{marginTop:'15px'}">
                  <h3>
                    <strong>{{oneScale.scaleName}}</strong>
                  </h3>
                </div>
              </center>
              <!--答题人-->
              <a-card :bordered="false">
                <div>
                  <strong>答题人：</strong>
                  {{patientInfo.name}}
                </div>
              </a-card>
            </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>

          <!-- 一个量表里的各种题目 -->
          <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId">
            <!-- 1.单选 -->
            <div v-if=" value.questionType==='radio'">
              <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
                    <div v-for="(one, index) in answer.answerList" :key="index">
                      <div v-if="value.questionId === one.questionId">
                        <div class="singleChoice">

<!--                          <strong :style="{color:'#2d8cf0'}">(单选)</strong>-->
                          <!-- 单选题标题 -->
                          <strong :style="{marginTop:'10px'}">(单选题)&nbsp&nbsp{{value.title}}</strong>
                          <!-- 选项 -->
                          <el-radio-group v-model="one.content">
                            <div v-for="(item,optionId) in value.items" :key="optionId" class="radio-div">
                              <el-radio :label="item.option">{{item.option}}</el-radio>
                            </div>
                          </el-radio-group>

                        </div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
            </div>
            <!-- 单选结束 -->

            <!-- 2.多选 -->
            <div v-if=" value.questionType==='checkBox'">
              <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <a-card :bordered="false" :style="{marginTop:'10px'}">
                    <div v-for="(one, aindex) in answer.answerList" :key="aindex">
                      <div v-if="value.questionId === one.questionId">
                        <div class="singleChoice">

<!--                          <strong :style="{color:'#2d8cf0'}">(多选)</strong>-->
                          <!-- 标题 -->
                          <strong :style="{marginTop:'10px'}">(多选题)&nbsp&nbsp{{value.title}}</strong>
                          <!--选项 -->
                          <el-checkbox-group v-model="one.chooseAnswerList">
                            <div v-for="(item,optionId) in value.items" :key="optionId" class="radio-div">
                              <el-checkbox :label="item.option">{{item.option}}</el-checkbox>
                            </div>
                          </el-checkbox-group>

                        </div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
            </div>
            <!-- 多选结束 -->

            <!-- 2.指导语 -->
            <div v-if="value.questionType==='direction'">
              <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <div :style="{marginTop:'10px'}">
                    <strong>指导语：</strong>
                    {{value.title}}
                  </div>
                </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
            </div>
            <!-- 指导语结束 -->

            <!-- 3.量表小类 -->
            <div v-if="value.questionType==='questionType'" :style="{marginTop:'10px'}">
              <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <a-divider orientation="left">
                    <strong >{{value.title}}</strong>
                  </a-divider>
                </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
            </div>

            <!-- 4.问答题 -->
            <div v-if="value.questionType==='QandA'">
              <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <a-card :style="{marginTop:'10px'}" :bordered="false">
                    <div v-for="(one, index) in answer.answerList" :key="index">
                      <div v-if="value.questionId === one.questionId">
                        <!-- 问题 -->
                        <strong>(问答题)&nbsp&nbsp问题：</strong>
                        {{value.title}}<br/><br/>

                        <label>答案：</label>
                        <el-input type="text" show-word-limit maxlength="1000" size="small" placeholder="请记录答案!"
                                  v-model="one.content" :style="{width:'60%'}"/>
                      </div>
                    </div>
                  </a-card>
                </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
            </div>
            <!-- 5.画图 -->
            <div v-if="value.questionType ==='draw'">
              <div v-for="(one, index) in answer.answerList" :key="index">
                <div v-if="value.questionId === one.questionId">
                  <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                      <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
<!--                        <strong :style="{color:'#2d8cf0'}">(画图题)</strong><br/>-->
<!--                        <h4 :style="{color:'#2d8cf0'}"><strong>（画图题）</strong></h4>-->
                        <label><strong>(画图题)&nbsp&nbsp作答要求：</strong></label>  {{value.title}}
                        <div class="img-box-preview">
                          <div
                            v-for="(oneImg,imgId) in value.attachmentList"
                            :key="imgId"
                            class="image-div"
                          >
                            <img v-bind:src="imgUrl + oneImg"/>
                          </div>

                        </div>
                      </a-card>
                    </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>

                  <center>
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
                      >
                        您的浏览器不支持canvas，请更换浏览器！
                      </canvas>
                    </div>
                  </center>

                  <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                      <a-card :bordered="false">
                        <a-row type="flex" justify="space-around">
                          <a-col :span="4">
                            <a-button type="primary" @click="pen">画笔</a-button>
                          </a-col>
                          <a-col :span="4">
                            <a-button type="primary" @click="eraser">橡皮擦</a-button>
                          </a-col>
                          <a-col :span="4">
                            <a-button type="primary" @click="clearAll(subjectId)">清除</a-button>
                          </a-col>
                          <a-col :span="4">
                            <a-button type="primary" @click="handleChangeImage(subjectId,value.questionId)">保存图片
                            </a-button>
                          </a-col>
                        </a-row>
                      </a-card>
                    </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>

                </div>
              </div>

            </div>
            <!-- 画图结束 -->

            <!-- 图片题 -->
            <div v-if="value.questionType ==='picture'">
              <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                  <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
<!--                    <h4 :style="{color:'#2d8cf0'}"><strong>（图片题）</strong></h4>-->
                    <label><strong>(图片题)&nbsp&nbsp作答要求：</strong></label>  {{value.title}}
                    <div v-for="(one, index) in answer.answerList" :key="index">
                      <div v-if="value.questionId === one.questionId">
                        <div class="img-box-preview">
                          <div
                            v-for="(oneImg,imgId) in value.attachmentList"
                            :key="imgId"
                            class="image-div"
                          >
                            <img v-bind:src="imgUrl + oneImg"/>
                          </div>
                        </div>
                        <br/><br/>
                        <label>答案：</label>
                        <el-input type="text" show-word-limit maxlength="1000" size="small" placeholder="请记录答案"
                                  v-model="one.content" :style="{width:'60%'}"/>
                      </div>
                    </div>
                  </a-card>
                </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
            </div>
            <!-- 图片题结束 -->
          </div>
          <!-- 所有题目结束 -->

          <!-- 提交 -->
          <a-row>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <a-card :style="{height:'130px',marginTop:'10px',marginBottom:'20px'}" :bordered="false">
                <center><h3><strong>如您已完成此量表，请保存！</strong></h3></center>
                <center>
                  <a-button @click="submitScale" type="primary"
                            :style="{marginTop:'20px',marginBottom:'20px'}">提交
                  </a-button>
                </center>
              </a-card>
            </a-col>
        <a-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
          <!-- 一个量表的里所有题目 结束 -->

        </div>
        <!-- 量表名称 + 量表中所有题目 结束 -->
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      imageData: '',
      serverUrl: this.GLOBAL.serverUrl,
      patientIdShow: true,
      // 画图题所用到的变量
      context: {},
      running: '',
      oneImg: [],
      imgUrl: this.GLOBAL.serverUrl + 'file/download?fileNo=',
      canvasImgUrls: [],
      // 画图题所用到的变量 -结束
      show: false,
      patientId: '',
      serverUrl: this.GLOBAL.serverUrl,
      oneScale: {},
      patientInfo: {},
      startTime: '',
      endTime: '',
      // 答案
      answer: {
        scaleId: '',
        patientId: '',
        useTime: '',
        answerList: []
      },
      imageUrl: '',
      form: {
        is_promoted: false,
        is_adv: false
      },
      // 存放canvas生成的图片的base64码
      imgDataURL: ''
    }
  },

  methods: {

    // 确定 提交病人Id，同时传scaleId
    conform () {
      this.startTime = new Date().getTime()
      let that = this
      axios
        .post(
          this.serverUrl + 'paper/blank/get',
          {
            scaleId: this.$route.query.scaleId,
            patientId: this.patientId
          },
          {
            headers: {
              Token: localStorage.getItem('Token')
            }
          }
        )
        .then(response => {
          if (response.data.retCode === '000000') {
            that.oneScale = response.data.data.scaleInfo
            that.patientInfo = response.data.data.patientInfo
            this.show = true
            this.patientIdShow = false
            var questionList = []
            questionList = that.oneScale.questionList
            for (var i = 0; i < questionList.length; i++) {
              var question = {
                questionId: questionList[i].questionId,
                content: '',
                chooseAnswerList: []
              }
              that.answer.answerList.push(question)
            }
          } else {
            this.$message.warning('不存在该病人Id', 2)
          }
        })
    },

    // 交卷 - 提交
    submitScale () {
      this.endTime = new Date().getTime()
      this.answer.useTime = ((this.endTime - this.startTime) / 1000 / 60).toFixed(2)
      this.answer.patientId = this.patientId
      this.answer.scaleId = this.$route.query.scaleId
      axios
        .post(this.serverUrl + 'paper/answer/commit', this.answer, {
          headers: {
            Token: localStorage.getItem('Token')
          }
        })
        .then(response => {
          if ((response.data.retCode === '000000')) {
            this.$router.push({ path: '/home/answerSubmitSuccess' })
          } else {
            this.$message.error(response.data.retMsg, 5)
          }
        }, err => {
          alert('网络异常，请检查是否连接上网络')
        })
    },

    // 画图题开始
    // 鼠标按下
    mousedown (e) {
      const canvas = e.currentTarget
      e.preventDefault()
      this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了
      var ev = e || window.event

      var x1 = ev.clientX - canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
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
        // const canvas = document.querySelector("#mycanvas");
        // var context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
        var ev = e || window.event
        var x2 = ev.clientX - canvas.offsetLeft
        var y2 = ev.pageY - canvas.offsetTop
        this.context.lineTo(x2, y2)
        this.context.lineWidth = 5

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

    // 清空所有
    clearAll (subjectId) {
      // const canvas = e.currentTarget
      var currentCanvas = '#' + 'mycanvas' + subjectId
      const canvas = document.querySelector(currentCanvas)
      this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
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
        var ev = e || window.event
        var x4 = ev.clientX - canvas.offsetLeft
        var y4 = ev.pageY - canvas.offsetTop
        this.context.lineTo(x4, y4)
        this.context.lineWidth = 5
        // this.context.strokeStyle = "blue";
        this.context.stroke() // 画线
      }
    },

    pen () {
      this.context.globalCompositeOperation = 'source-over'
    },

    // 移动端绘图, touchstart对应movedown
    touchstart (e) {
      const canvas = e.currentTarget
      // const canvas = document.querySelector('#mycanvas')
      this.context = canvas.getContext('2d') // 使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
      e.preventDefault()
      this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了

      var ev = e || window.event
      var x1 = ev.touches[0].clientX - canvas.offsetLeft
      var y1 = ev.touches[0].pageY - canvas.offsetTop
      // 绘制线
      // 起点坐标
      this.context.beginPath()
      this.context.moveTo(x1, y1)
      // 终点坐标：鼠标按下并且拖动的位置
      this.touchmove
    },

    touchmove (e) {
      const canvas = e.currentTarget
      e.preventDefault()
      if (this.running == 'draw') {
        var ev = e || window.event
        // var x2 = ev.touches[0].clientX - canvas.offsetLeft
        // var y2 = ev.touches[0].pageY - canvas.offsetTop
        var x2 = ev.touches[0].clientX - canvas.offsetLeft
        var y2 = ev.touches[0].pageY - canvas.offsetTop
        this.context.lineTo(x2, y2)
        this.context.lineWidth = 5
        // this.context.strokeStyle = '#333'// 线条的颜色
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
        .then(response => {
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
        }, err => {
          alert('网络异常，请检查是否连接上网络')
        })
    }
    // 画图题结束
  }
}
</script>>

<style scoped>
  body {
    background: #f8f8f9;
  }

  .singleChoice {
    display: flex;
    flex-direction: column;
  }

  /* 画图题样式 */

  .canvasDiv {
    z-index: 99999;
    width: 83%;
  }

  .canvasBox {
    border: 1px solid #2d8cf0;
    background-color: #FFFFFF;
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

  /* 图片 */
  .image-div img {
    margin-left: 10px;
    margin-bottom: 3vh;
    /*margin-left: 2vh;*/
    width: 30vh;
    height: 30vh;
    border: 1px solid #2d8cf0;
  }

  .radio-div {
    margin-top: 15px;
  }

</style>
