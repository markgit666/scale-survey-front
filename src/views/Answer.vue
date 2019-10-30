<template>
  <div class="answerBox">
    <div>
      <a-row>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
        <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
          <a-card v-if="patientIdShow" :bordered="false" class="patientId-box">
            <label>被试者Id：</label>
            <a-input placeholder="请输入Id" v-model="patientId" :style="{width:'45%'}"></a-input>
            <a-button type="primary" @click="conform" :style="{marginLeft:'10px'}">确定</a-button>
          </a-card>
        </a-col>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
      </a-row>

      <!-- 答题界面 -->
      <div v-show="show">
        <div>
          <a-row>
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
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
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
          </a-row>

          <!-- 一个量表里的各种题目 -->
          <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId">
            <!-- 1.单选 -->
            <div v-if=" value.questionType==='radio'">
              <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
              <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
                <div v-for="(one, index) in answer.answerList" :key="index">
                  <div v-if="value.questionId === one.questionId">
                    <div class="singleChoice">

                        <!-- 单选题标题 -->
                        <strong>{{value.title}}&nbsp;&nbsp;&nbsp;(单选)</strong>
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
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </div>
            <!-- 单选结束 -->

            <!-- 2.多选 -->
            <div v-if=" value.questionType==='checkBox'">
              <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
              <a-card :bordered="false" :style="{marginTop:'10px'}">
                <div v-for="(one, aindex) in answer.answerList" :key="aindex">
                  <div v-if="value.questionId === one.questionId">
                    <div class="singleChoice">
                      <!-- 标题 -->
                      <strong>{{value.title}}&nbsp;&nbsp;&nbsp;(多选)</strong>
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
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </div>
            <!-- 多选结束 -->

            <!-- 2.指导语 -->
            <div v-if="value.questionType==='direction'" >
              <a-row>
              <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
              <div :style="{marginTop:'10px'}">
                <strong>指导语：</strong>
                {{value.title}}
              </div>
              </a-col>
              <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </div>
            <!-- 指导语结束 -->

            <!-- 3.题目类型 -->
            <div v-if="value.questionType==='questionType'" :style="{marginTop:'10px'}">
              <a-row>
              <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
              <a-divider orientation="left">
                <strong>{{value.title}}</strong>
              </a-divider>
              </a-col>
              <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </div>

            <!-- 4.问答题 -->
            <div v-if="value.questionType==='QandA'">
              <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
                <a-card :style="{marginTop:'10px'}" :bordered="false">
                <div v-for="(one, index) in answer.answerList" :key="index">
                  <div v-if="value.questionId === one.questionId">
                    <!-- 问题 -->
                      <strong>问题：</strong>
                      {{value.title}}<br/><br/>
                      <label>答案：</label>
                      <a-input placeholder="请记录答案!" v-model="one.content" :style="{width:'60%'}"/>
                  </div>
                </div>
              </a-card>
                </a-col>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </div>
            <!-- 5.画图 -->
            <div v-if="value.questionType ==='draw'">
              <div v-for="(one, index) in answer.answerList" :key="index">
                <div v-if="value.questionId === one.questionId">
                  <a-row>
                    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                    <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
                  <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
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
                    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                  </a-row>

                  <!--canvas画板-->
                  <div :style="{background:'white',width:'80%'}">
                      <canvas
                        id="mycanvas"
                        @touchstart="touchstart"
                        @touchmove="touchmove"
                        @mousedown="mousedown"
                        @mousemove="mousemove"
                        @mouseup="mouseup"
                        width="500"
                        height="400"
                      >您的浏览器不支持canvas，请更换浏览器！
                      </canvas>
                  </div>

                  <!--工具-->
                  <a-row>
                    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                    <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
                      <a-card  :bordered="false">
                        <a-row type="flex" justify="space-around">
                          <a-col :span="4"> <a-button type="primary" @click="pen">画笔</a-button></a-col>
                          <a-col :span="4"><a-button type="primary" @click="eraser">橡皮擦</a-button></a-col>
                          <a-col :span="4"><a-button type="primary" @click="clearAll">清除</a-button></a-col>
                          <a-col :span="4"> <a-button type="primary" @click="handleChangeImage(value.questionId)">保存图片</a-button></a-col>
                        </a-row>
                      </a-card>
                    </a-col>
                    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                  </a-row>

                  <!-- 存放画完图生成图片的div -->
                  <!-- <div id="img-box" v-show="canvasImgUrls.length">
                <div
                  v-for="(canvasImgUrl,canvasImgUrlId ) in canvasImgUrls"
                  :key="canvasImgUrlId"
                  class="canvasImg-box"
                >
                  <img :src="canvasImgUrl" />
                </div>
                  </div>-->
                  <!-- <input type="hidden" v-model="one.content" @change="canvasImgGenerate" /> -->
                </div>
              </div>

            </div>
            <!-- 画图结束 -->

            <!-- 图片题 -->
            <div v-if="value.questionType ==='picture'">
              <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
              <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
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
                    <a-form :style="{marginTop:'20px'}">
                      <a-form-item label="请记录答案：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                        <a-input placeholder="请记录答案" v-model="one.content"/>
                      </a-form-item>
                    </a-form>
                  </div>
                </div>
              </a-card>
                </a-col>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </div>
            <!-- 图片题结束 -->
          </div>
          <!-- 所有题目结束 -->

          <!-- 提交 -->
          <a-row>
            <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
            <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
          <a-card :style="{height:'100%',marginTop:'15px',marginBottom:'20px'}" :bordered="false">
            <center><h3><strong>您已完成此量表，请保存！</strong></h3></center>
            <center>
              <a-button @click="submitScale" type="primary"
                        :style="{marginTop:'20px',width:'100px',height:'50px',marginBottom:'20px'}">提交
              </a-button>
            </center>
          </a-card>
            </a-col>
            <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
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
import $ from 'jquery'
import { debuglog } from 'util'

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
      // console.log(this.startTime);
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
            this.$message.warning('不存在该病人Id')
          }
        })
    },

    // 交卷 - 提交
    submitScale () {
      console.log(this.answer.answerList)
      this.endTime = new Date().getTime()
      this.answer.useTime = ((this.endTime - this.startTime) / 1000/60).toFixed(2)
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
            this.$message.error('提交失败', 5)
          }
        })
    },

    // 画图题开始
    // 鼠标按下
    mousedown (e) {
      const canvas = document.querySelector('#mycanvas')
      // this.context = canvas.getContext("2d");
      e.preventDefault()
      this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了
      var ev = e || window.event

      var x1 = ev.clientX - canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      // console.log("网页横坐标x1：", x1);
      // var y1 = ev.pageY - canvas.offsetTop;
      // console.log(canvas.offsetParent);
      var y1 = ev.pageY - canvas.offsetTop
      console.log('网页横坐标y1：', y1)
      // 绘制线
      // 起点坐标
      this.context.beginPath()
      this.context.moveTo(x1, y1)
      // 终点坐标：鼠标按下并且拖动的位置
      this.mousemove
    },

    // 鼠标移动
    mousemove (e) {
      const canvas = document.querySelector('#mycanvas')
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
    // 清空所有
    clearAll () {
      const canvas = document.querySelector('#mycanvas')
      this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    },

    // 橡皮擦
    eraser () {
      // 绘制原题
      this.context.globalCompositeOperation = 'destination-out'
      this.drawDown
      console.log('a')
    },

    // 绘制源图 鼠标按下
    drawDown (e) {
      const canvas = document.querySelector('#mycanvas')
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
      const canvas = document.querySelector('#mycanvas')
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
      console.log('ff')
    },

    // 移动端绘图, touchstart对应movedown
    touchstart (e) {
      const canvas = document.querySelector('#mycanvas')
      this.context = canvas.getContext('2d') // 使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
      // const canvas = document.querySelector("#mycanvas");
      e.preventDefault()
      this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了

      var ev = e || window.event
      var x1 = ev.touches[0].clientX - canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      // console.log("移动端横坐标x1：", x1);
      // console.log(canvas.offsetParent);
      var y1 = ev.touches[0].pageY - canvas.offsetTop
      console.log('移动端纵坐标y1：', y1)
      // 绘制线
      // 起点坐标
      this.context.beginPath()
      this.context.moveTo(x1, y1)
      // 终点坐标：鼠标按下并且拖动的位置
      this.touchmove
    },

    touchmove (e) {
      const canvas = document.querySelector('#mycanvas')
      e.preventDefault()
      if (this.running == 'draw') {
        var ev = e || window.event
        var x2 = ev.touches[0].clientX - canvas.offsetLeft
        var y2 = ev.touches[0].pageY - canvas.offsetTop
        console.log(canvas.offsetLeft)
        this.context.lineTo(x2, y2)
        this.context.lineWidth = 5
        this.context.stroke() // 画线
      }
    },
    // 保存图片
    handleChangeImage (questionId) {
      // 导出base64格式的图片数据
      const canvas = document.querySelector('#mycanvas')
      const src = canvas.toDataURL('image/png')
      this.canvasImgUrls.pop(src)
      this.canvasImgUrls.push(src)
      this.imgDataURL = src.substring(22)
      axios
        .post(this.serverUrl + 'file/base64/upload', {
          base64Image: this.imgDataURL
        })
        .then(response => {
          console.log(response)
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

  .answerBox {
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*margin: 0 auto;*/
    /*border: 1px solid red;*/
    /*width: 50rem;*/
    /*background-color: #f8f8f9;*/
    /*margin-left: 30px;*/
  }

  .singleChoice {
    display: flex;
    flex-direction: column;
  }

  /* 画图题样式 */
  #mycanvas {
    border: 1px solid #dddee1;
    }

  /*.canvas-tools-box{*/
  /*  display: flex;*/
  /*  flex-direction: row;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*  margin: 0 auto;*/
  /*  !* padding: 20vh; *!*/
  /*}*/

  /*.tools {*/
  /*  !* height: 25%; *!*/
  /*  display: flex;*/
  /*  !* margin-left: 10px; *!*/
  /*  flex-direction: column;*/
  /*  border: 1px solid #dddee1;*/
  /*}*/

  /*.box_box1,*/
  /*.box_box2,*/
  /*.box_box3,*/
  /*.box_box4 {*/
  /*  !* margin-left: 10px; *!*/
  /*  width: 100px;*/
  /*  height: 100px;*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*}*/

  /*.box_box1,*/
  /*.box_box2,*/
  /*.box_box3 {*/
  /*  border-bottom: 1px solid #dddee1;*/
  /*}*/

  /*.img-box-preview {*/
  /*  display: flex;*/
  /*  !* 左右布局 *!*/
  /*  justify-content: space-between;*/
  /*  !* //换行 *!*/
  /*  flex-wrap: wrap;*/
  /*  !* //紧揍排列 *!*/
  /*  align-content: flex-start;*/
  /*  width: 130vh;*/
  /*  height: auto;*/

  /*  flex-wrap: wrap;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*  margin: 0 auto;*/
  /*}*/

  /* 图片 */
  .image-div img {
    margin-bottom: 3vh;
    /*margin-left: 2vh;*/
    width: 15rem;
    height: 15rem;
    border: 1px solid #2d8cf0;
  }

  .canvasImg-box {
    height: 20vh;
    width: 20vh;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  /* 多选题样式 */
  input[type="checkbox"] {
    /*同样，首先去除浏览器默认样式*/
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /*编辑我们自己的样式*/
    position: relative;
    vertical-align: top;
    width: 18px;
    height: 18px;
    background: transparent;
    border: 1px solid #2d8cf0;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }

  input[type="checkbox"]:after {
    content: "√";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background: #2d8cf0;
    color: #fff;
    text-align: center;
    line-height: 18px;
    /*增加动画*/
    -webkit-transition: all ease-in-out 300ms;
    -moz-transition: all ease-in-out 300ms;
    transition: all ease-in-out 300ms;
    /*利用border-radius和opacity达到填充的假象，首先隐藏此元素*/
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    opacity: 0;
  }

  input[type="checkbox"]:checked:after {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    opacity: 1;
  }

  /* 单选题样式 */
  input[type="radio"] {
    /*去除浏览器默认样式*/
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /*自定义样式*/
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 18px;
    height: 18px;
    border: 1px solid #2d8cf0;
    outline: none;
    cursor: pointer;
    /*设置为圆形，看起来是个单选框*/
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  /**
      * 单选框 选中之后的样式
      **/
  input[type="radio"]:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    display: block;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #2d8cf0;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    transform: scale(0);
    /*增加一些动画*/
    -webkit-transition: all ease-in-out 300ms;
    -moz-transition: all ease-in-out 300ms;
    transition: all ease-in-out 300ms;
  }

  input[type="radio"]:checked:after {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    transform: scale(1);
  }

  .checkbox-div {
    margin-top: 15px;
  }

  .radio-div {
    margin-top: 15px;
  }

  .radio-text {
    margin-left: 10px;
  }

  .checkbox-text {
    margin-left: 10px;
    /* margin-top: -20px; */
  }

  .QAndA-input {
    margin-top: 20px;
    border: 1px solid red;
  }

  .draw-input {
    float: left;
    /* margin-left: 30px; */
    width: 100%;
  }
.patientId-box{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

</style>
