<template>
  <div class="previewBox">
    <div>
      <a-row>
        <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
          <!--量表名称-->
          <center>
            <div :style="{marginTop:'15px'}">
              <h3>
                <strong>{{oneScale.scaleName}}</strong>
              </h3>
            </div>
          </center>
        </a-col>
        <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>

      <!-- 一个量表里的各种题目 -->
      <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId">
        <!-- 1.单选 -->
        <div v-if=" value.questionType==='radio'">
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
              <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
                <div class="singleChoice">
                  <!-- 单选题标题 -->
                  <strong :style="{marginTop:'10px'}" >(单选)&nbsp&nbsp{{value.title}}</strong>

                  <!-- 单选题选项 -->
                  <a-radio-group name="radioGroup" :style="{marginTop:'2vh'}">
                    <div v-for="(item,optionId) in value.items" :key="optionId" class="radio">
                      <a-radio :value="item.option">{{item.option}}</a-radio>
                    </div>
                  </a-radio-group>
                </div>
              </a-card>
            </a-col>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>
        </div>
        <!-- 单选结束 -->

        <!-- 2.多选 -->
        <div v-if=" value.questionType==='checkBox'">
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
              <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
                <div class="singleChoice">
<!--                  <strong :style="{color:'#2d8cf0'}">(多选)</strong>-->
                  <!-- 标题 -->
                  <strong :style="{marginTop:'10px'}">(多选)&nbsp&nbsp{{value.title}}</strong>
                  <!--选项 -->
                  <a-radio-group name="radioGroup" :style="{marginTop:'2vh'}">
                    <div v-for="(item,optionId) in value.items" :key="optionId" class="radio">
                      <a-checkbox>{{item.option}}</a-checkbox>
                    </div>
                  </a-radio-group>
                </div>
              </a-card>
            </a-col>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>
        </div>
        <!-- 多选结束 -->

        <!-- 2.指导语 -->
        <div v-if="value.questionType==='direction'" :style="{marginTop:'10px'}">
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
              <div :style="{marginTop:'15px',width:'900px'}">
                <strong>指导语：</strong> {{value.title}}<br/>
              </div>
            </a-col>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>
        </div>
        <!-- 指导语结束 -->

        <!-- 3.量表小类 -->
        <div v-if="value.questionType==='questionType'" :style="{marginTop:'10px'}">
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
              <a-divider orientation="left">
                <strong >{{value.title}}</strong>
              </a-divider>
            </a-col>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>
        </div>

        <!-- 4.问答题 -->
        <div v-if="value.questionType==='QandA'">
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
              <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
                <div class="question">
                  <strong>(问答题)&nbsp&nbsp问题：</strong>
                  {{value.title}}
                </div>
                <label>&nbsp&nbsp&nbsp&nbsp&nbsp答案：</label>
                <el-input type="text" show-word-limit maxlength="1000" size="small" placeholder="请输入回答内容！"
                          :style="{width:'60%',marginTop:'10px'}"/>
                </a-form>

              </a-card>
            </a-col>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>
        </div>
        <!-- 5.画图 -->
        <div v-if="value.questionType ==='draw'" class="draw_div">
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
              <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
                <div >
<!--                  <h4><strong :style="{color:'#2d8cf0',marginLeft:'20px'}">(画图题)</strong></h4>-->
                  <strong :style="{marginLeft:'20px'}">(画图题)&nbsp&nbsp作答要求：</strong>
                  {{value.title}}
                </div>
                <div class="img-box-preview">
                  <div v-for="(oneImg,imgId) in value.attachmentList" :key="imgId" class="image-div">
                    <img v-bind:src="imgUrl + oneImg"/>
                  </div>
                </div>

                <div class="box">
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
              </a-card>
            </a-col>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>

          <!--工具-->
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
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
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>


        </div>
        <!-- 画图结束 -->

        <!-- 图片题 -->
        <div v-if="value.questionType ==='picture'">
          <a-row>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
            <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
              <a-card :style="{height:'100%',marginTop:'15px'}" :bordered="false">
                <div>
                  <strong :style="{marginLeft:'20px'}">(图片题)&nbsp&nbsp作答要求：</strong>
                  {{value.title}}
                </div>
                <div class="img-box-preview">
                  <div v-for="(oneImg,imgId) in value.attachmentList" :key="imgId" class="image-div">
                    <img v-bind:src="imgUrl + oneImg"/>
                  </div>
                </div>

                <a-form>

                  <a-form-item label="答案：" :label-col="{ span: 2 }" :wrapper-col="{ span:16 }"
                               :style="{marginTop:'12px'}">
                    <el-input type="text" show-word-limit maxlength="1000" size="small" placeholder="请输入回答内容！"/>
                    <!-- {{value.direction_content}} -->
                  </a-form-item>

                </a-form>
              </a-card>
            </a-col>
            <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
          </a-row>
        </div>
        <!-- 图片题结束 -->
      </div>

      <!--完成答题-->
      <a-row>
        <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
        <a-col :xs="20" :sm="16" :md="20" :lg="20" :xl="20">
          <a-card :style="{height:'130px',marginTop:'10px',marginBottom:'20px'}" :bordered="false">
            <center><h3><strong>如您已完成此量表，请保存！</strong></h3></center>
            <center>
              <a-button type="primary"
                        :style="{marginTop:'20px',marginBottom:'20px'}">提交
              </a-button>
            </center>
          </a-card>
        </a-col>
        <a-col :xs="2" :sm="4" :md="2" :lg="2" :xl="2"></a-col>
      </a-row>
    </div>
  </div>
  <!-- 量表名称 + 量表中所有题目 结束 -->
</template>

<script>
  export default {
    data () {
      return {
        context: {},
        running: '',
        oneImg: [],
        index: 0,
        // 图片地址
        imgUrl: this.GLOBAL.serverUrl + 'file/download?fileNo=',
        canvasImgUrls: [],
        oneScale: {
          doctorId: '',
          // 量表名称
          scaleName: '',
          // 量表内容
          questionList: []
        }
      }
    },

    mounted () {
      // this.oneScale = JSON.parse(this.$route.query.oneScale)
      debugger
      console.log(this.oneScale)

      // this.oneScale = JSON.parse(this.$route.params.oneScale)
      this.oneScale = JSON.parse(localStorage.getItem('oneScale'))

      this.oneImg = this.oneScale.questionList[0].attachmentList
    },
    updated () {
      const canvas = document.querySelector('#mycanvas')
      const box = document.querySelector('.box')
      this.context = canvas.getContext('2d') // 使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
    },
    methods: {
      // 鼠标按下
      mousedown (e) {
        const canvas = document.querySelector('#mycanvas')
        // this.context = canvas.getContext("2d");
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了
        var ev = e || window.event

        var x1 = ev.clientX - canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
        // var y1 = ev.pageY - canvas.offsetTop;
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
      },

      // 移动端绘图, touchstart对应movedown
      touchstart (e) {
        const canvas = document.querySelector('#mycanvas')
        e.preventDefault()
        this.running = 'draw' // 鼠标按下后，赋值为draw，表示要画线了

        var ev = e || window.event
        var x1 = ev.touches[0].clientX - canvas.offsetLeft // 获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
        var y1 = ev.touches[0].pageY - canvas.offsetTop
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
          this.context.lineTo(x2, y2)
          this.context.lineWidth = 5
          this.context.stroke() // 画线
        }
      },
      save () {
        const canvas = document.querySelector('#mycanvas')
        const src = canvas.toDataURL('image/png')
        this.canvasImgUrls.pop(src)
        this.canvasImgUrls.push(src)
      }
    }
  }
</script>
<style scoped>

  /*.previewBox {*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*  margin: 0 auto;*/
  /*  background-color: #f8f8f9;*/
  /*}*/

  .singleChoice {
    margin-left: 20px;
  }

  .question {
    margin-left: 20px;
  }

  .singleChoice {
    display: flex;
    flex-direction: column;
  }

  .radio {
    padding: 1vh;
  }

  .question {
    display: flex;
    flex-direction: row;
  }

  .person h4 {
    width: 11vh;
  }

  .time h4 {
    width: 14vh;
  }

  #mycanvas {
    border: 1px solid #dddee1;
  }

  .box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    /* padding: 20vh; */
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

</style>
