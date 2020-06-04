<template>
  <div>
    <a-layout id="components-layout-demo-fixed-sider">
      <!-- 侧边栏 -->
      <a-layout-sider
        theme="light"
        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      >
        <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']" @click="handleClick">
          <a-menu-item key="questionType">
            <a-icon type="bars" />
            <span>量表小类</span>
          </a-menu-item>

          <a-menu-item key="direction">
            <a-icon type="bulb" />
            <span>指导语</span>
          </a-menu-item>

          <a-menu-item key="radio">
            <a-icon type="check-circle" />
            <span>单选题</span>
          </a-menu-item>

          <a-menu-item key="checkBox">
            <a-icon type="check-square" />
            <span>多选题</span>
          </a-menu-item>

          <a-menu-item key="QandA">
            <a-icon type="edit" />
            <span>问答题</span>
          </a-menu-item>

          <a-menu-item key="draw">
            <a-icon type="form" />
            <span>画图题</span>
          </a-menu-item>

          <a-menu-item key="picture">
            <a-icon type="area-chart" />
            <span>图片题</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <!-- 右边内容 -->
      <a-layout :style="{ marginLeft: '150px', marginTop:'-24px' }">
        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
          <router-view></router-view>
          <div>
            <a class="target" href target="_blank"></a>

            <!--量表名称-->
            <a-card :hoverable="true" :bordered="false" :style="{height:'100px'}">
              <el-form :model="oneScale" :rules="rules" label-width="90px">
                <el-form-item label="量表名称:" prop="scaleName">
                  <el-input
                    maxlength="256"
                    size="small"
                    show-word-limit
                    v-model="oneScale.scaleName"
                    placeholder="请输入量表名称"
                    :style="{width:'65%'}"
                  />
                </el-form-item>
              </el-form>
            </a-card>

            <!-- 一个量表里的各种题目 -->
            <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId" class="box">
              <!-- 1.量表小类 -->
              <div v-if="value.questionType==='questionType'" :style="{marginTop:'10px'}">
                <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'80px'}">
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="del(subjectId)"
                  >删除</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="down(subjectId)"
                  >下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="up(subjectId)"
                  >上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <label>&nbsp&nbsp量表小类：</label>
                  <el-input
                    type="text"
                    show-word-limit
                    maxlength="40"
                    minlength="10"
                    size="small"
                    placeholder="请在此添加量表类型"
                    v-model="value.title"
                    autosize
                    :style="{width:'60%'}"
                  />
                </a-card>
              </div>
              <!-- .量表小类结束 -->

              <!-- 2.指导语 -->
              <div v-if="value.questionType==='direction'" :style="{marginTop:'10px'}">
                <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="del(subjectId)"
                  >删除</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="down(subjectId)"
                  >下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="up(subjectId)"
                  >上移&nbsp&nbsp|&nbsp&nbsp</a>

                  <el-form :style="{marginLeft:'25px'}">
                    <el-form-item label="指导语:">
                      <el-input
                        type="textarea"
                        show-word-limit
                        maxlength="1000"
                        autosize
                        placeholder="请输入指导语"
                        v-model="value.title"
                        :style="{width:'60%'}"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </a-card>
              </div>
              <!-- 指导语结束 -->

              <!-- 3.单选 -->
              <div v-if=" value.questionType==='radio'" :style="{marginTop:'10px'}">
                <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="del(subjectId)"
                  >删除</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="down(subjectId)"
                  >下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="up(subjectId)"
                  >上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px',color:'#19be6b'}"
                    class="child"
                    @click="addOption(subjectId)"
                  >增加选项&nbsp&nbsp|&nbsp&nbsp</a>

                  <h4 :style="{color:'#2d8cf0',marginTop:'10px'}">
                    <strong>（单选）</strong>
                  </h4>

                  <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp标题：</label>
                  <el-input
                    type="text"
                    show-word-limit
                    maxlength="256"
                    size="small"
                    placeholder="请输入标题！"
                    v-model="value.title"
                    :style="{width:'60%'}"
                  />
                  <el-switch
                    v-model="value.recordScore"
                    :style="{marginLeft:'20px'}"
                    active-text="计入总分"
                    inactive-text="不计入总分"
                  ></el-switch>
                  <el-input
                    type="text"
                    show-word-limit
                    maxlength="256"
                    size="small"
                    placeholder="请添加组类型！"
                    v-model="value.groupType"
                    :style="{width:'15%' , marginLeft:'15px'}"
                  />

                  <div
                    v-for="(item,optionId) in value.items"
                    :key="optionId"
                    :style="{marginTop:'10px'}"
                  >
                    <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp选项：</label>
                    <el-input
                      type="text"
                      show-word-limit
                      maxlength="256"
                      size="small"
                      placeholder="请输入选项！"
                      v-model="item.option"
                      :style="{width:'55%'}"
                    />
                    <a-icon
                      :style="{marginLeft:'10px'}"
                      type="minus-circle"
                      theme="twoTone"
                      twoToneColor="#ed3f14"
                      @click="delOption(subjectId, optionId)"
                    />
                    <el-input-number
                      size="small"
                      :min="0"
                      v-model="item.optionScore"
                      :style="{width:'15%',marginLeft:'10px'}"
                      label="请输入分数！"
                    ></el-input-number>
                  </div>
                </a-card>
              </div>
              <!-- 单选结束 -->

              <!-- 4.多选题 -->

              <div v-if=" value.questionType==='checkBox'" :style="{marginTop:'10px'}">
                <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="del(subjectId)"
                  >删除</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="down(subjectId)"
                  >下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="up(subjectId)"
                  >上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px',color:'#19be6b'}"
                    class="child"
                    @click="addOption(subjectId)"
                  >增加选项&nbsp&nbsp|&nbsp&nbsp</a>

                  <h4 :style="{color:'#2d8cf0',marginTop:'10px'}">
                    <strong>（多选）</strong>
                  </h4>

                  <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp标题：</label>

                  <el-input
                    type="text"
                    show-word-limit
                    maxlength="256"
                    size="small"
                    placeholder="请输入标题！"
                    v-model="value.title"
                    :style="{width:'60%'}"
                  />
                  <el-switch
                    v-model="value.recordScore"
                    :style="{marginLeft:'20px'}"
                    active-text="计入总分"
                    inactive-text="不计入总分"
                  ></el-switch>

                  <div
                    v-for="(item,optionId) in value.items"
                    :key="optionId"
                    :style="{marginTop:'10px'}"
                  >
                    <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp选项：</label>
                    <el-input
                      type="text"
                      show-word-limit
                      maxlength="256"
                      size="small"
                      placeholder="请输入选项！"
                      v-model="item.option"
                      :style="{width:'55%'}"
                    />
                    <a-icon
                      :style="{marginLeft:'10px'}"
                      type="minus-circle"
                      theme="twoTone"
                      twoToneColor="#ed3f14"
                      @click="delOption(subjectId, optionId)"
                    />
                    <el-input-number
                      size="small"
                      :min="0"
                      v-model="item.optionScore"
                      :style="{width:'15%',marginLeft:'10px'}"
                      label="请输入分数！"
                    ></el-input-number>
                  </div>
                </a-card>
              </div>
              <!-- 多选题结束 -->

              <!-- 5.问答题 -->
              <div v-if="value.questionType==='QandA'" :style="{marginTop:'10px'}">
                <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="del(subjectId)"
                  >删除</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="down(subjectId)"
                  >下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="up(subjectId)"
                  >上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp问题：</label>
                  <el-input
                    type="text"
                    show-word-limit
                    maxlength="256"
                    size="small"
                    placeholder="请添加您的问题"
                    v-model="value.title"
                    :style="{width:'58%'}"
                  />
                </a-card>
              </div>
              <!--问答题结束-->

              <!-- 6.画图 -->
              <div v-if="value.questionType ==='draw'" :style="{marginTop:'10px'}">
                <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="del(subjectId)"
                  >删除</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="down(subjectId)"
                  >下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="up(subjectId)"
                  >上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <h4 :style="{color:'#2d8cf0'}">
                    <strong>（画图题）</strong>
                  </h4>
                  <label>&nbsp&nbsp&nbsp&nbsp作答要求：</label>
                  <el-input
                    type="text"
                    show-word-limit
                    maxlength="1000"
                    size="small"
                    placeholder="请输入作答要求！"
                    v-model="value.title"
                    :style="{width:'60%'}"
                  />
                  <br />
                  <br />
                  <strong :style="{marginTop:'10px'}">&nbsp&nbsp&nbsp&nbsp注意：一定要点击"开始上传"，才能上传成功!</strong>
                  <br />
                  <br />
                  <!--画图--图片上传--开始-->
                  <div class="choose-upload">
                    <div id="choosePictureBox" :style="{marginLeft:'15px'}">
                      选择图片
                      <input
                        class="file"
                        type="file"
                        :id="drawIdFile(subjectId)"
                        name="file"
                        multiple="multiple"
                        accept="image/gif, image/jpeg, image/png, image/jpg"
                        @change="drawImageChoose(subjectId)"
                      />
                    </div>
                    <a-button
                      type="primary"
                      @click="drawUnload(subjectId)"
                      :style="{marginLeft:'15px'}"
                    >开始上传</a-button>
                  </div>

                  <!-- 文件名显示区域 -->
                  <div
                    :id="drawIdFileName(subjectId)"
                    :style="{marginTop:'10px',marginLeft:'15px'}"
                  ></div>

                  <!--画图--图片上传--结束-->
                </a-card>
              </div>
              <!-- 画图结束 -->

              <!-- 7.图片题 -->
              <div v-if="value.questionType ==='picture'" :style="{marginTop:'10px'}">
                <a-card :hoverable="true" :bordered="false" class="father" :style="{height:'100%'}">
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="del(subjectId)"
                  >删除</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="down(subjectId)"
                  >下移&nbsp&nbsp|&nbsp&nbsp</a>
                  <a
                    :style="{float:'right',marginTop:'-15px'}"
                    class="child"
                    @click="up(subjectId)"
                  >上移&nbsp&nbsp|&nbsp&nbsp</a>
                  <h4 :style="{color:'#2d8cf0'}">
                    <strong>（图片题）</strong>
                  </h4>
                  <label>&nbsp&nbsp&nbsp&nbsp作答要求：</label>
                  <el-input
                    type="text"
                    show-word-limit
                    maxlength="1000"
                    size="small"
                    placeholder="请输入作答要求！"
                    v-model="value.title"
                    :style="{width:'60%'}"
                  />
                  <br />
                  <br />
                  <strong :style="{marginTop:'10px',marginLeft:'15px'}">注意：一定要点击"开始上传"，才能上传成功!</strong>
                  <br />
                  <br />
                  <!--图片上传--开始-->
                  <div class="choose-upload">
                    <div id="choosePictureBox" :style="{marginLeft:'15px'}">
                      选择图片
                      <input
                        class="file"
                        type="file"
                        :id="idFile(subjectId)"
                        name="file"
                        multiple="multiple"
                        accept="image/gif, image/jpeg, image/png, image/jpg"
                        @change="pictureChoose(subjectId)"
                      />
                    </div>
                    <a-button
                      type="primary"
                      @click="unload(subjectId)"
                      :style="{marginLeft:'15px'}"
                    >开始上传</a-button>
                  </div>

                  <!-- 文件名显示区域 -->
                  <div :id="idFileName(subjectId)" :style="{marginTop:'10px',marginLeft:'15px'}"></div>
                  <!--图片上传--结束-->
                </a-card>
              </div>

              <!-- 图片题结束 -->
            </div>
            <!-- 一个量表的里所有题目 结束 -->
          </div>
          <!-- 量表名称 + 量表中所有题目 结束 -->

          <!--保存，预览-->

          <!--中间部分-->
          <div class="middleBox" v-show="showMiddleBox">
            <h4>
              <strong>点击左侧栏，即可添加题型</strong>
            </h4>
          </div>
          <!--中间部分 结束-->

          <!--保存-->
          <a-card
            :hoverable="true"
            :bordered="false"
            class="father"
            :style="{height:'120px',marginTop:'15px'}"
          >
            <center>
              <h3>
                <strong>如您已创建完成，请保存！</strong>
              </h3>
              <a-button type="primary" @click="submitScale" :style="{marginTop:'5px'}">保存</a-button>
              <a-button
                type="primary"
                @click="preview"
                :style="{marginTop:'5px' ,marginLeft:'15px'}"
              >预览</a-button>
            </center>
          </a-card>
          <!--保存 结束-->
        </a-layout-content>
      </a-layout>
      <!-- 以上右边内容结束位置 -->
    </a-layout>
    <!--侧边栏+右侧内容结束-->
  </div>

  <!--预览-->
</template>
<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>

<script>
import store from "../store";
import $ from "jquery";

export default {
  // 引用store.js
  store,

  data() {
    return {
      direction: "",
      // 规则校验
      rules: {
        scaleName: [
          { required: true, message: "量表名称不能为空", trigger: "blur" }
        ],
        direction: [
          { required: true, message: "指导语不能为空", trigger: "blur" }
        ]
      },
      // 是否展示创建量表中间的那个box
      showMiddleBox: "true",
      serverUrl: this.GLOBAL.serverUrl,
      show: true,
      previewVisible: false,
      previewImage: "",
      // 存放题目的数组
      oneScale: {
        doctorId: "",
        // 量表名称
        scaleName: "",
        // 量表内容
        questionList: []
      }
    };
  },

  methods: {
    // 图片题上传题目---开始
    // 绑定在"选择图片"input上的函数
    pictureChoose(subjectId) {
      // 存放文件名的数组，用于显示
      var fileNameArray = [];
      // 获取文件
      var filename = document.getElementById("file" + subjectId);
      if (filename.files.length > 20) {
        // 限制图片个数
        alert("图片上传的数量不能超过20张！");
      } else {
        for (var i = 0; i < filename.files.length; i++) {
          // 限制图片大小
          var pictureSize = 1024 * 1024 * 3;
          if (filename.files[i].size < pictureSize) {
            var temp = filename.files[i].name;
            fileNameArray.push(temp);
          } else {
            alert("您上传的图片中含有超过5M的图片,请重新选择");
            // 使之不会重复弹出
            return false;
          }
        }
      }

      // 拼接
      var idTemp = "#" + "fileName" + subjectId;
      $(idTemp).text(fileNameArray);
    },

    // 动态绑定Id---图片题---选择文件
    idFile(subjectId) {
      return "file" + subjectId;
    },

    // 动态绑定Id---图片题---显示文件名
    idFileName(subjectId) {
      return "fileName" + subjectId;
    },

    // 图片题---图片上传
    unload(subjectId) {
      // FormDat对象
      var formobj = new FormData();
      // 获取表单中的数据
      var myfile = document.getElementById("file" + subjectId).files;
      for (var i = 0; i < myfile.length; i++) {
        // 向对象中添加要发送的数据
        formobj.append("file", myfile[i]);
      }

      // XMLHttpRequest对象
      var xmlobj = new XMLHttpRequest();

      // 指定提交类型（post）和选择要发送的地址
      var serverUrlTemp = this.serverUrl;
      var pictureServerUrl = serverUrlTemp + "file/upload";
      xmlobj.open("post", pictureServerUrl);

      // 发送数据
      xmlobj.send(formobj);
      let that = this;
      xmlobj.onload = function() {
        if (xmlobj.readyState == 4 && xmlobj.status == 200) {
          // 将json对象转化成字符串
          var responseJson = JSON.parse(xmlobj.responseText);

          if (responseJson.retCode === "000000") {
            // 将response返回的图片二进制数据放入自己构造的list中
            that.oneScale.questionList[subjectId].attachmentList =
              responseJson.data;
            that.$message.success("上传成功", 5);
          } else {
            that.$message.error(responseJson.retMsg, 5);
          }
        }
      };
    },
    // 图片题上传题目---结束

    // 画图题上传题目---开始

    // 绑定在"选择图片"input上的函数
    drawImageChoose(subjectId) {
      // 存放文件名的数组，用于显示
      var fileNameArray = [];
      // 获取文件名称
      var filename = document.getElementById("file" + subjectId);

      if (filename.files.length > 20) {
        // 限制图片个数
        alert("图片上传的数量不能超过20张！");
      } else {
        for (var i = 0; i < filename.files.length; i++) {
          // 限制图片大小
          var pictureSize = 1024 * 1024 * 3;
          if (filename.files[i].size < pictureSize) {
            var temp = filename.files[i].name;
            fileNameArray.push(temp);
          } else {
            alert("您上传的图片中含有超过5M的图片,请重新选择");
            return false;
          }
        }
      }
      // 拼接
      var idTemp = "#" + "fileName" + subjectId;
      $(idTemp).text(fileNameArray);
    },

    // 动态绑定Id---画图题---选择文件
    drawIdFile(subjectId) {
      return "file" + subjectId;
    },

    // 动态绑定Id---画图题---显示文件名
    drawIdFileName(subjectId) {
      return "fileName" + subjectId;
    },

    // 画图题---图片上传
    drawUnload(subjectId) {
      // FormDat对象
      var formobj = new FormData();
      // 获取表单中的数据
      var myfile = document.getElementById("file" + subjectId).files;
      for (var i = 0; i < myfile.length; i++) {
        // 向对象中添加要发送的数据
        formobj.append("file", myfile[i]);
      }

      // XMLHttpRequest对象
      var xmlobj = new XMLHttpRequest();

      // 指定提交类型（post）和选择要发送的地址
      var serverUrlTemp = this.serverUrl;
      var pictureServerUrl = serverUrlTemp + "file/upload";
      xmlobj.open("post", pictureServerUrl);

      // 发送数据
      xmlobj.send(formobj);
      let that = this;
      xmlobj.onload = function() {
        if (xmlobj.readyState == 4 && xmlobj.status == 200) {
          // 将json对象转化成字符串
          var responseJson = JSON.parse(xmlobj.responseText);
          // 判断是否上传成功
          if (responseJson.retCode === "000000") {
            // 将response返回的图片二进制数据放入自己构造的list中
            that.oneScale.questionList[subjectId].attachmentList =
              responseJson.data;
            that.$message.success("上传成功", 5);
          } else {
            that.$message.error(responseJson.retMsg, 5);
          }
        }
      };
    },
    // 画图题上传题目---结束

    // 保存创建的量表
    submitScale() {
      // 如果量表名称为空，提示
      if (this.oneScale.scaleName === "") {
        this.$message.error("量表名称不能为空", 3);
        // 量表名称为空，则不执行下面的代码
        return;
      }
      // 如果题目内容为空，提示
      if (this.oneScale.questionList.length > 0) {
        // 存放量表的数组
        var questionListArray = this.oneScale.questionList;
        for (var i = 0; i < questionListArray.length; i++) {
          //如果内容为空
          if (questionListArray[i].title === "") {
            this.$message.error("内容不许为空", 3);
            return;
          }

          // 如果是单选或者多选题
          if (
            questionListArray[i].questionType === "radio" ||
            questionListArray[i].questionType === "checkBox"
          ) {
            for (var j = 0; j < questionListArray[i].items.length; j++) {
              //如果选项为空
              if (questionListArray[i].items[j].option === "") {
                this.$message.error("单选题或多选题---选项不能为空", 3);
                return;
              }
              // 如果选项重复
              for (var k = j + 1; k < questionListArray[i].items.length; k++) {
                if (
                  questionListArray[i].items[j].option ===
                  questionListArray[i].items[k].option
                ) {
                  this.$message.error("单选题或多选题---有重复的选项", 3);
                  return;
                }
              }
            }
          }
        }
      }

      // 以上都不为空，则保存量表
      this.$http
        .post(this.serverUrl + "scale/info/add", this.oneScale, {
          headers: {
            Token: localStorage.getItem("Token")
          }
        })
        .then(
          function(data) {
            if (data.body.retCode === "000000") {
              this.$message.success("保存成功！", 5);
              this.$router.push({ path: "/home/myScale" });
            } else if (data.body.retCode === "100001") {
              if (localStorage.getItem("Token") === null) {
                this.$message.error("未登录，即将跳转至登录页面", 5);
                this.$router.push({ path: "/login" });
              } else {
                this.$message.error("登录超时", 5);
                this.$router.push({ path: "/login" });
              }
            } else {
              this.$message.error(data.body.retMsg, 5);
            }
          },
          err => {
            alert("网络异常，请检查是否连接上网络");
          }
        );
    },

    // else {
    //   this.$message.error('提交失败')
    //   return false
    // }
    // })
    // },
    // 预览
    preview() {
      let oneScale = JSON.stringify(this.oneScale);
      // 容量大、安全、永久存储、跨页面
      localStorage.setItem("oneScale", oneScale);
      // 新窗口打开
      window.open("/previewScale");
    },

    //  选题题型 ----添加---侧边栏
    handleClick(e) {
      this.showMiddleBox = false;
      //  单选
      if (e.key === "radio") {
        var chooseQuestionObject = {
          questionType: e.key,
          show: true,
          title: "",
          // 单选题处，题目分数是否记录总分
          recordScore: true,
          groupType: "", //单选题的类型
          items: [
            { option: "", optionScore: 0 },
            { option: "", optionScore: 0 },
            {
              option: "",
              optionScore: 0
            },
            { option: "", optionScore: 0 }
          ]
        };
        this.oneScale.questionList.push(chooseQuestionObject);
      } else if (e.key === "checkBox") {
        // 多选题
        var checkBoxObject = {
          questionType: e.key,
          show: true,
          recordScore: true, //是否计入总分
          title: "",
          items: [
            { option: "", optionScore: 1 },
            { option: "", optionScore: 1 },
            { option: "", optionScore: 1 },
            { option: "", optionScore: 1 }
          ]
        };
        this.oneScale.questionList.push(checkBoxObject);
      } else if (e.key === "direction") {
        // 指导语
        var directionObject = {
          show: true,
          id: this.oneScale.questionList.length,
          questionType: e.key,
          title: ""
        };
        this.oneScale.questionList.push(directionObject);
      } else if (e.key === "draw") {
        // 画图题
        var drawObject = {
          questionType: e.key,
          status: "noNeed",
          show: true,
          title: "",
          attachmentList: this.fileNoList
        };

        this.oneScale.questionList.push(drawObject);
      } else if (e.key === "picture") {
        // 图片题
        var pictureObject = {
          questionType: "picture",
          status: "noNeed",
          show: true,
          title: "",
          attachmentList: this.pictureFileNoList
        };
        this.oneScale.questionList.push(pictureObject);
      } else if (e.key === "questionType") {
        // 一个量表中的量表小类
        var questionTypeObject = {
          questionType: e.key,
          show: true,
          title: ""
        };
        this.oneScale.questionList.push(questionTypeObject);
      } else if (e.key === "QandA") {
        // 问答题
        var questionObject = {
          questionType: e.key,
          show: true,
          title: ""
        };
        this.oneScale.questionList.push(questionObject);
      }
    },

    // 画图题 ———— 上传图片开始

    // 画图题 ————上传图片结束

    // 删除选项(单选，多选)
    delOption(subjectId, optionId) {
      var option = this.oneScale.questionList[subjectId].items;
      if (option.length < 3) {
        this.$message.error("选项至少为2个", 3);
      } else {
        option.splice(optionId, 1);
      }
    },

    // 增加选项（单选，多选）
    addOption(subjectId) {
      var items = this.oneScale.questionList[subjectId].items;

      if (items.length <= 20) {
        var newitems = { option: "", optionScore: 0 }; //添加单选题，构造数据结构
        items = items.push(newitems);
      } else {
        this.$message.warning("选项不允许超过20个！", 5);
      }
    },

    // 删除题目
    del(subjectId) {
      this.oneScale.questionList.splice(subjectId, 1);
      if (this.oneScale.questionList.length === 0) {
        this.showMiddleBox = true;
      }
    },

    delQuestion(index) {
      this.oneScale.questionList.splice(index, 1);
    },
    // 上移题目
    up(subjectId) {
      if (subjectId > 0) {
        this.oneScale.questionList.splice(
          subjectId,
          1,
          ...this.oneScale.questionList.splice(
            subjectId - 1,
            1,
            this.oneScale.questionList[subjectId]
          )
        );
        for (var i = 0; i < this.oneScale.questionList.length; i++) {
          this.oneScale.questionList[i].markSubjectId = i;
        }
      } else {
        alert("这是第一题，请勿上移！");
      }
    },
    // 下移题目
    down(subjectId) {
      if (subjectId < this.oneScale.questionList.length - 1) {
        this.oneScale.questionList.splice(
          subjectId,
          1,
          ...this.oneScale.questionList.splice(
            subjectId + 1,
            1,
            this.oneScale.questionList[subjectId]
          )
        );
        for (var i = 0; i < this.oneScale.questionList.length; i++) {
          this.oneScale.questionList[i].markSubjectId = i;
        }
      } else {
        alert("这是最后一题，请勿再移动！");
      }
    }
  }
};
</script>

<style scoped>
body {
  text-align: center;
}

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
.icons-list >>> .anticon {
  margin-left: 28px;
  font-size: 17px;
  margin-top: 9px;
}

.icons-list-checkBox >>> .anticon {
  margin-left: 5px;
  font-size: 17px;
  margin-top: 9px;
}

/* 上传图片样式 开始 */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

/* 上传图片样式 结束 */

.father .child {
  /*p的内容一开始设置为不可见*/
  display: none;
}

.father:hover .child {
  /*鼠标移入后，p的标签的内容为可见*/
  display: block;
}

.middleBox {
  margin-top: 15px;
  border: 1px dashed #2d8cf0;
  width: 100%;
  height: 45vh;
  text-align: center; /*文字水平居中对齐*/
  line-height: 280px; /*设置文字行距等于div的高度*/
  overflow: hidden;
}
</style>
