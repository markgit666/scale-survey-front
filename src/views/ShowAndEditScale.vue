<template>

  <!-- 所有题目 -->
  <div>
    <a-card>
      <a-row>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
        <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
          <strong>新增题型：</strong>
          <a-select showSearch placeholder="点击此处增加题目" style="width: 150px" @change="typeHandleChange">
            <a-select-option value="questionType">题目类型</a-select-option>
            <a-select-option value="direction">指导语</a-select-option>
            <a-select-option value="radio">单选题</a-select-option>
            <a-select-option value="checkBox">多选题</a-select-option>
            <a-select-option value="QandA">问答题</a-select-option>
            <a-select-option value="draw">画图题</a-select-option>
            <a-select-option value="picture">图片题</a-select-option>
          </a-select>
          </a>
        </a-col>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
      </a-row>
    </a-card>
    <div :style="{ overflow: 'initial' }">
      <router-view></router-view>
      <div>
        <!--量表名称-->
        <a-card :style="{marginTop:'10px'}">
          <a-row>
            <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
            <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
              <label>
                量表名称：
              </label>
              <a-input v-model="oneScale.scaleName" placeholder="请输入量表名称" :style="{width:'60%'}"/>
            </a-col>
            <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
          </a-row>
        </a-card>


        <!-- 一个量表里的各种题目 -->
        <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId">
          <!-- 1.题目类型 -->
          <div v-if="value.questionType==='questionType'" :style="{marginTop:'10px'}">
            <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'80px'}">
              <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
                  <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="del(subjectId)">删除</a>
                  <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="down(subjectId)">下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a :style="{float:'right',marginTop:'-15px'}" class="child"
                     @click="up(subjectId)">上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <label>题目类型：</label>
                  <a-input placeholder="请在此添加题目类型" v-model="value.title" :style="{width:'60%'}" autosize/>
                </a-col>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </a-card>
          </div>

          <!-- 2.指导语 -->
          <div v-if="value.questionType==='direction'" :style="{marginTop:'15px'}">
            <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'80px'}">
              <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
                  <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="del(subjectId)">删除</a>
                  <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="down(subjectId)">下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a :style="{float:'right',marginTop:'-15px'}" class="child"
                     @click="up(subjectId)">上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <label>指导语：</label>

                  <a-input placeholder="请输入指导语" v-model="value.title" :style="{width:'60%'}"/>
                </a-col>

                </a-col>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </a-card>
          </div>
          <!-- 指导语结束 -->

          <!-- 3.单选 -->
          <div v-if=" value.questionType==='radio'" :style="{marginTop:'15px'}">
            <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
              <a-row>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
                <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="22">
                  <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="del(subjectId)">删除</a>
                  <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="down(subjectId)">下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a :style="{float:'right',marginTop:'-15px'}" class="child"
                     @click="up(subjectId)">上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a :style="{float:'right',marginTop:'-15px',color:'#19be6b'}" class="child"
                     @click="addOption(subjectId)">增加选项&nbsp&nbsp|&nbsp&nbsp</a>

                  <label>（单选）标题：</label>
                  <a-input placeholder="请输入标题！" v-model="value.title" :style="{width:'60%'}"/>

<!--                  <div v-for="(item,optionId) in value.items" :key="optionId" class="singleChoice-option">-->
                    <div v-for="(item,optionId) in value.items" :key="optionId" class="singleChoice-option">
                    <div>
                      <a-radio :style="{width:'100%'}" :defaultChecked="false" disabled>
                        <a-input placeholder="请输入选项！" v-model="item.option" :style="{width:'60%'}"/>
                      </a-radio>
                    </div>

                    <div>
                      <a-icon
                        type="minus-circle"
                        theme="twoTone"
                        twoToneColor="#ed3f14"
                        @click="delOption(subjectId, optionId)"
                      />
                    </div>
                  </div>
                </a-col>
                <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="1"></a-col>
              </a-row>
            </a-card>
          </div>

          <!-- 4.多选题开始 -->
          <div v-if=" value.questionType==='checkBox'" :style="{marginTop:'15px'}">
            <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="del(subjectId)">删除</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="down(subjectId)">下移&nbsp&nbsp|&nbsp&nbsp</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child"
                 @click="up(subjectId)">上移&nbsp&nbsp|&nbsp&nbsp</a>
              <a :style="{float:'right',marginTop:'-15px',color:'#19be6b'}" class="child" @click="addOption(subjectId)">增加选项&nbsp&nbsp|&nbsp&nbsp</a>

              <a-form :style="{marginTop:'20px',marginLeft:'-130px'}">
                <a-form-item label="（多选）标题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请输入标题！" v-model="value.title"/>
                </a-form-item>
              </a-form>

              <div v-for="(item,optionId) in value.items" :key="optionId" class="singleChoice-option">
                <a-form :style="{marginLeft:'60px',width:'73%'}">
                  <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span:49 }">
                    <div class="singleChoice">

                      <a-checkbox :style="{width:'100%'}" :defaultChecked="false" disabled>
                        <a-input placeholder="请输入选项！" v-model="item.option" :style="{width:'95%'}"/>
                      </a-checkbox>
                    </div>
                  </a-form-item>
                </a-form>

                <div class="icons-list-checkBox">
                  <a-icon
                    type="minus-circle"
                    theme="twoTone"
                    twoToneColor="#ed3f14"
                    @click="delOption(subjectId, optionId)"
                  />
                </div>
              </div>

            </a-card>
          </div>
          <!-- 多选题结束 -->

          <!-- 5.问答题 -->
          <div v-if="value.questionType==='QandA'" :style="{marginTop:'15px'}">
            <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100px'}">
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="del(subjectId)">删除</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="down(subjectId)">下移&nbsp&nbsp|&nbsp&nbsp</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child"
                 @click="up(subjectId)">上移&nbsp&nbsp|&nbsp&nbsp</a>

              <a-form :style="{marginTop:'10px',marginLeft:'-130px'}">
                <a-form-item label="问题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请添加您的问题" v-model="value.title"/>
                </a-form-item>
              </a-form>

            </a-card>
          </div>

          <!--6.画图-->
          <div v-if="value.questionType ==='draw'" :style="{marginTop:'15px'}">
            <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="del(subjectId)">删除</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="down(subjectId)">下移&nbsp&nbsp|&nbsp&nbsp</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child"
                 @click="up(subjectId)">上移&nbsp&nbsp|&nbsp&nbsp</a>
              <h4 :style="{color:'#2d8cf0',marginTop:'10px'}"><strong>（画图题）</strong></h4>
              <a-form :style="{marginTop:'10px',marginLeft:'-130px'}">
                <a-form-item label="作答要求：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请输入作答要求" v-model="value.title"/>
                </a-form-item>
              </a-form>
              <strong :style="{marginTop:'10px'}">注意：一定要点击"开始上传"，才能上传成功!</strong>
              <br/><br/>
              <!--画图--图片上传--开始-->
              <div class="choose-upload">
                <div id="choosePictureBox">
                  选择图片
                  <input class="file" type="file" :id="drawIdFile(subjectId)" name="file" multiple="multiple"
                         accept="image/gif, image/jpeg, image/png, image/jpg"
                         @change="drawImageChoose(subjectId)"
                  >
                </div>
                <a-button type="primary" @click="drawUnload(subjectId)" :style="{marginLeft:'15px'}">开始上传</a-button>
              </div>

              <!-- 文件名显示区域 -->
              <div :id="drawIdFileName(subjectId)" :style="{marginTop:'10px'}"></div>

              <!--画图--图片上传--结束-->
            </a-card>
          </div>
          <!--           画图结束-->

          <!-- 7.图片题 -->
          <div v-if="value.questionType ==='picture'" :style="{marginTop:'15px'}">
            <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="del(subjectId)">删除</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child" @click="down(subjectId)">下移&nbsp&nbsp|&nbsp&nbsp</a>
              <a :style="{float:'right',marginTop:'-15px'}" class="child"
                 @click="up(subjectId)">上移&nbsp&nbsp|&nbsp&nbsp</a>
              <h4 :style="{color:'#2d8cf0',marginTop:'10px'}"><strong>（图片题）</strong></h4>
              <a-form :style="{marginTop:'10px',marginLeft:'-130px'}">
                <a-form-item label="作答要求：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请输入作答要求" v-model="value.title"/>
                </a-form-item>
              </a-form>
              <br/><br/>
              <strong :style="{marginTop:'10px'}">注意：一定要点击"开始上传"，才能上传成功!</strong>
              <!--图片上传--开始-->
              <div class="choose-upload">
                <div id="choosePictureBox">
                  选择图片
                  <input class="file" type="file" :id="idFile(subjectId)" name="file" multiple="multiple"
                         accept="image/gif, image/jpeg, image/png, image/jpg"
                         @change="pictureChoose(subjectId)"
                  >
                </div>
                <a-button type="primary" @click="unload(subjectId)" :style="{marginLeft:'15px'}">开始上传</a-button>
              </div>

              <!-- 文件名显示区域 -->
              <div :id="idFileName(subjectId)" :style="{marginTop:'10px'}"></div>
              <!--图片上传--结束-->
            </a-card>
          </div>
          <!-- 图片题结束 -->

          <!-- 8.删除 上移 下移 -->
          <!--            <div :style="{marginTop:'2vh'}" @click="hind(subjectId)">-->
          <!--              <div class="del_up_down_button">-->
          <!--                <a-button type="primary" @click="del(subjectId)" size="small">删除</a-button>-->
          <!--                <a-button type="primary" @click="up(subjectId)" size="small">上移</a-button>-->
          <!--                <a-button type="primary" @click="down(subjectId)" size="small">下移</a-button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!-- 删除 上移 下移 结束-->
        </div>
        <!-- 一个量表的里所有题目 结束 -->
      </div>
      <!-- 量表名称 + 量表中所有题目 结束 -->
      <a-card :hoverable="true" :bordered="false" class="father"
              :style="{height:'100%',marginTop:'15px',marginBottom:'20px'}">
        <center>
          <h3><strong>更新完成，请保存！</strong></h3>
          <a-button class="save_button" type="primary" @click="updataScale">保存</a-button>
          <a-button class="save_button" type="primary" @click="backTotalScale" :style="{marginLeft:'15px'}">返回
          </a-button>

        </center>
      </a-card>

    </div>
  </div>
  <!-- 所有题目结束 -->
  <!--  </a-card>-->
  <!-- 所有题目结束 -->
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  import LabelWrap from 'element-ui/packages/form/src/label-wrap'

  export default {
    components: { LabelWrap },
    data () {
      return {

        serverUrl: this.GLOBAL.serverUrl,

        disabled: true,
        // 存放题目的数组
        oneScale: {
          doctorId: '',
          // 量表名称
          scaleName: '',
          // 量表内容

        }
      }
    },

    mounted () {
      this.fetch()
    },
    methods: {
      // 查看量表------接口
      fetch () {
        let that = this
        axios
          .post(this.serverUrl + '/scale/info/get', this.$route.query, {
            headers: {
              Token: localStorage.getItem('Token')
            }
          })
          .then(response => {
            console.log(response)
            that.oneScale = response.data.data
          })
          .catch(function (error) {
            // 请求失败处理
            console.log(error)
          })
      },

      // 删除选项(单选，多选)
      delOption (subjectId, optionId) {
        var option = this.oneScale.questionList[subjectId].items
        option.splice(optionId, 1)
        console.log(this.oneScale.questionList[subjectId].items)
      },

      // 增加选项（单选，多选）
      addOption (subjectId) {
        console.log(subjectId)
        var items = this.oneScale.questionList[subjectId].items
        if (items.length <= 20) {
          var newitems = {}
          items = items.push(newitems)
          console.log(this.oneScale.questionList[subjectId].items)
        } else {
          this.$message.warning('选项不允许超过20个！', 5)
        }
      },

      // 删除题目
      del (subjectId) {
        console.log(subjectId)
        this.oneScale.questionList.splice(subjectId, 1)
      },

      delQuestion (index) {
        this.oneScale.questionList.splice(index, 1)
      },
      // 上移题目
      up (subjectId) {
        if (subjectId > 0) {
          this.oneScale.questionList.splice(
            subjectId,
            1,
            ...this.oneScale.questionList.splice(
              subjectId - 1,
              1,
              this.oneScale.questionList[subjectId]
            )
          )
        } else {
          alert('这是第一题，请勿上移！')
        }
      },
      // 下移题目
      down (subjectId) {
        console.log('a')
        if (subjectId < this.oneScale.questionList.length - 1) {
          this.oneScale.questionList.splice(
            subjectId,
            1,
            ...this.oneScale.questionList.splice(
              subjectId + 1,
              1,
              this.oneScale.questionList[subjectId]
            )
          )
        } else {
          alert('这是最后一题，请勿再移动！')
        }
      },

      // 画图题上传题目---开始

      // 绑定在"选择图片"input上的函数
      drawImageChoose (subjectId) {
        // 存放文件名的数组，用于显示
        var fileNameArray = []
        // 获取文件名称
        var filename = document.getElementById('file' + subjectId)
        for (var i = 0; i < filename.files.length; i++) {
          var temp = filename.files[i].name
          fileNameArray.push(temp)
        }
        // 拼接
        var idTemp = '#' + 'fileName' + subjectId
        $(idTemp).text(fileNameArray)
      },

      // 动态绑定Id---画图题---选择文件
      drawIdFile (subjectId) {
        console.log('file' + subjectId)
        return 'file' + subjectId
      },

      // 动态绑定Id---画图题---显示文件名
      drawIdFileName (subjectId) {
        return 'fileName' + subjectId
      },

      // 画图题---图片上传
      drawUnload (subjectId) {
        // FormDat对象
        var formobj = new FormData()
        // 获取表单中的数据
        var myfile = document.getElementById('file' + subjectId).files
        for (var i = 0; i < myfile.length; i++) {
          // 向对象中添加要发送的数据
          formobj.append('file', myfile[i])
        }

        // XMLHttpRequest对象
        var xmlobj = new XMLHttpRequest()

        // 指定提交类型（post）和选择要发送的地址
        var serverUrlTemp = this.serverUrl
        var pictureServerUrl = serverUrlTemp + 'file/upload'
        xmlobj.open('post', pictureServerUrl)

        // 发送数据
        xmlobj.send(formobj)
        let that = this
        xmlobj.onload = function () {
          if (xmlobj.readyState == 4 && xmlobj.status == 200) {
            // alert(xmlobj.responseText)
            that.$message.success('上传成功', 5)
            // 将json对象转化成字符串
            var responseText = JSON.parse(xmlobj.responseText)
            // 将response返回的图片二进制数据放入自己构造的list中
            that.oneScale.questionList[subjectId].attachmentList = responseText.data
          }
        }
      },

      // 图片题上传题目---开始
      // 绑定在"选择图片"input上的函数
      pictureChoose (subjectId) {
        // 存放文件名的数组，用于显示
        var fileNameArray = []
        // 获取文件名称
        var filename = document.getElementById('file' + subjectId)
        for (var i = 0; i < filename.files.length; i++) {
          var temp = filename.files[i].name
          fileNameArray.push(temp)
        }
        // 拼接
        var idTemp = '#' + 'fileName' + subjectId
        $(idTemp).text(fileNameArray)
      },

      // 动态绑定Id---图片题---选择文件
      idFile (subjectId) {
        console.log('file' + subjectId)
        return 'file' + subjectId
      },

      // 动态绑定Id---图片题---显示文件名
      idFileName (subjectId) {
        return 'fileName' + subjectId
      },

      // 图片题---图片上传
      unload (subjectId) {
        // FormDat对象
        var formobj = new FormData()
        // 获取表单中的数据
        var myfile = document.getElementById('file' + subjectId).files
        for (var i = 0; i < myfile.length; i++) {
          // 向对象中添加要发送的数据
          formobj.append('file', myfile[i])
        }

        // XMLHttpRequest对象
        var xmlobj = new XMLHttpRequest()

        // 指定提交类型（post）和选择要发送的地址
        var serverUrlTemp = this.serverUrl
        var pictureServerUrl = serverUrlTemp + 'file/upload'
        xmlobj.open('post', pictureServerUrl)

        // 发送数据
        xmlobj.send(formobj)
        let that = this
        xmlobj.onload = function () {
          if (xmlobj.readyState == 4 && xmlobj.status == 200) {
            // alert(xmlobj.responseText)
            that.$message.success('上传成功', 5)
            // 将json对象转化成字符串
            var responseText = JSON.parse(xmlobj.responseText)
            // 将response返回的图片二进制数据放入自己构造的list中
            that.oneScale.questionList[subjectId].attachmentList = responseText.data
          }
        }
      },
      // 图片题上传题目---结束

      // 更新 有问题修改中,20190912已解决
      updataScale () {
        // this.oneScale.questionList.pop();
        this.$http
          .post(this.serverUrl + 'scale/info/add', this.oneScale, {
            headers: {
              Token: localStorage.getItem('Token')
            }
          })
          .then(function (data) {
            console.log(data)

            if ((data.body.retCode === '000000')) {
              this.$message.success('更新成功！', 5)
            } else {
              this.$message.error('更新失败！', 5)
            }
            this.$router.push({ path: '/home/myScale' })
          })
      },

      // 返回量表汇总
      backTotalScale () {
        this.$router.push({ path: '/home/myScale' })
      },

      //  添加题目
      typeHandleChange (e) {
        console.log(e)
        //  单选
        if (e === 'radio') {
          var chooseQuestionObject = {
            questionType: e,
            show: true,
            title: '',
            items: [{ option: '' }, { option: '' }, { option: '' }]
          }
          this.oneScale.questionList.push(chooseQuestionObject)
        } else if (e === 'checkBox') {
          // 多选题
          var checkBoxObject = {
            questionType: e,
            show: true,
            title: '',
            items: [{ option: '' }, { option: '' }, { option: '' }]
          }
          this.oneScale.questionList.push(checkBoxObject)
        } else if (e === 'direction') {
          // 指导语
          var directionObject = {
            show: true,
            id: this.oneScale.questionList.length,
            questionType: e,
            title: ''
          }
          this.oneScale.questionList.push(directionObject)
        } else if (e === 'draw') {
          // 画图题
          var drawObject = {
            questionType: e,
            status: 'noNeed',
            show: true,
            title: '',
            attachmentList: this.fileNoList
          }

          this.oneScale.questionList.push(drawObject)
        } else if (e === 'picture') {
          // 图片题
          var pictureObject = {
            questionType: 'picture',
            status: 'noNeed',
            show: true,
            title: '',
            pictureAttachmentList: this.pictureFileNoList
          }
          this.oneScale.questionList.push(pictureObject)
        } else if (e === 'questionType') {
          // 一个量表中的题目类型
          var questionTypeObject = {
            questionType: e,
            show: true,
            title: ''
          }
          this.oneScale.questionList.push(questionTypeObject)
        } else if (e === 'QandA') {
          // 问答题
          var questionObject = {
            questionType: e,
            show: true
          }
          this.oneScale.questionList.push(questionObject)
        }
      }
    }
  }
</script>

<style scoped>


  /*图片题选择图片按钮--开始*/

  .choose-upload {
    display: flex;
    flex-direction: row;
  }

  #choosePictureBox {
    position: relative;
    display: inline-block;
    background: #2d8cf0;
    /*border: 1px solid #99D3F5;*/
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  #choosePictureBox input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  #choosePictureBox:hover {
    background: #5cadff;
    /*border-color: white;*/
    color: white;
    text-decoration: none;
  }

  /*图片题选择图片按钮--结束*/

  /*.singleChoice {*/
  /*  display: flex;*/
  /*  flex-direction: row;*/
  /*}*/

  .icons-list >>> .anticon {
    margin-left: 2vh;
    font-size: 20px;
  }

  .del_up_down_button button {
    width: 15vh;
    text-align: center;
    margin: 5vh;
  }

  /* 保存 */
  .save_button {
    margin-top: 2vh;
  }

  .father .child {
    /*p的内容一开始设置为不可见*/
    display: none;
  }

  .father:hover .child {
    /*鼠标移入后，p的标签的内容为可见*/
    display: block;

  }

  /*.icons-list-checkBox >>> .anticon {*/
  /*  margin-left: 5px;*/
  /*  font-size: 17px;*/
  /*  margin-top: 9px;*/
  /*}*/

  /*.icons-list >>> .anticon {*/
  /*  margin-left: 28px;*/
  /*  font-size: 17px;*/
  /*  margin-top: 9px;*/
  /*}*/

  .singleChoice-option {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
</style>
