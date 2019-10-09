<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <!-- 侧边栏 -->
    <a-layout-sider
      theme="light"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']" @click="handleClick">
        <a-menu-item key="questionType">
          <a-icon type="bars" />
          <span>题目类型</span>
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
    <a-layout :style="{ marginLeft: '150px', marginTop:'-25px' }">
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <router-view></router-view>
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center'}">
          <!--量表名称-->
          <a-form :form="form">
            <a-form-item label="量表名称：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
              <a-input v-model="oneScale.scaleName" placeholder="请输入量表名称" />
            </a-form-item>
          </a-form>

          <!-- 一个量表里的各种题目 -->
          <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId" class="box">
            <!-- 1.题目类型 -->
            <div v-if="value.questionType==='questionType'" @click="display(subjectId)">
              <a-divider orientation="left">
                <a-input placeholder="请在此添加题目类型" :style="{width:'27vh'}" v-model="value.title" />
              </a-divider>
            </div>
            <!-- .题目类型结束 -->

            <!-- 2.指导语 -->
            <div v-if="value.questionType==='direction'" @click="display(subjectId)">
              <!-- <a-divider /> -->
              <a-form :form="form">
                <a-form-item label="指导语：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-textarea placeholder="请输入指导语" v-model="value.title" autosize />

                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
            </div>
            <!-- 指导语结束 -->

            <!-- 3.单选 -->
            <div v-if=" value.questionType==='radio'" @click="display(subjectId)">
              <a-divider />
              <a-form :form="form">
                <a-form-item label="（单选）标题： " :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请输入标题！" v-model="value.title" />
                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
              <div v-for="(item,optionId) in value.items" :key="optionId">
                <a-form :form="form">
                  <a-form-item label="选项" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                    <div class="singleChoice">
                      <a-input placeholder="请输入选项！" v-model="item.option" />
                      <div class="icons-list">
                        <a-icon
                          type="minus-circle"
                          theme="twoTone"
                          twoToneColor="#ed3f14"
                          @click="delOption(subjectId, optionId)"
                        />
                      </div>
                    </div>
                  </a-form-item>
                </a-form>
              </div>
              <div class="button_style" @click="addOption(subjectId)">
                <div class="icons-list">
                  <a-icon type="plus-circle" theme="twoTone" twoToneColor="#2b85e4" />
                </div>
                <font :style="{marginLeft:'10px', color:'#1c2438'}">添加选项</font>
              </div>
            </div>
            <!-- 单选结束 -->

            <!-- 4.多选题 -->
            <div v-if=" value.questionType==='checkBox'" @click="display(subjectId)">
              <a-divider />
              <a-form :form="form">
                <a-form-item label="（多选）标题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请输入标题！" v-model="value.title" />
                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
              <div v-for="(item,optionId) in value.items" :key="optionId">
                <a-form :form="form">
                  <a-form-item label="选项" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                    <div class="singleChoice">
                      <a-input placeholder="请输入选项！" v-model="item.option" />
                      <div class="icons-list">
                        <a-icon
                          type="minus-circle"
                          theme="twoTone"
                          twoToneColor="#ed3f14"
                          @click="delOption(subjectId, optionId)"
                        />
                      </div>
                    </div>
                  </a-form-item>
                </a-form>
              </div>
              <div class="button_style" @click="addOption(subjectId)">
                <div class="icons-list">
                  <a-icon type="plus-circle" theme="twoTone" twoToneColor="#2b85e4" />
                </div>
                <font :style="{marginLeft:'10px', color:'#1c2438'}">添加选项</font>
                <!-- <a-button type="primary" @click="addOption(subjectId)">新增选项</a-button> -->
              </div>
            </div>
            <!-- 多选题结束 -->

            <!-- 5.问答题 -->
            <div v-if="value.questionType==='QandA'" @click="display(subjectId)">
              <a-divider />
              <a-form :form="form">
                <a-form-item label="问题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请添加您的问题" v-model="value.title" />
                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
            </div>
            <!-- 6.画图 -->
            <div v-if="value.questionType ==='draw'" @click="display(subjectId)">
              <a-divider />
              <h4>（画图题）请点击下方"开始上传"进行上传：</h4>
              <div class="clearfix">
                <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
                  <a-button>
                    <a-icon type="upload" />选择图片
                  </a-button>
                </a-upload>
                <a-button
                  type="primary"
                  @click="handleUpload(subjectId)"
                  :disabled="fileList.length === 0"
                  :loading="uploading"
                  style="margin-top: 16px"
                >{{uploading ? 'Uploading' : '开始上传' }}</a-button>
              </div>
            </div>
            <!-- 画图结束 -->

            <!-- 7.图片题 -->
            <div v-if="value.questionType ==='picture'" @click="display(subjectId)">
              <a-divider />
              <h4>（图片题）请点击下方"开始上传"进行上传：</h4>
              <div class="clearfix">
                <a-upload
                  :fileList="pictureFileList"
                  :remove="pictureHandleRemove"
                  :beforeUpload="pictureBeforeUpload"
                >
                  <a-button>
                    <a-icon type="upload" />选择图片
                  </a-button>
                </a-upload>
                <a-button
                  type="primary"
                  @click="pictureHandleUpload(subjectId)"
                  :disabled="pictureFileList.length === 0"
                  :loading="uploading"
                  style="margin-top: 16px"
                >{{uploading ? 'Uploading' : '开始上传' }}</a-button>
              </div>
            </div>
            <!-- 图片题结束 -->

            <!-- 删除 上移 下移 -->
            <div :style="{marginTop:'2vh'}" @click="hind(subjectId)">
              <div class="del_up_down_button" v-if="value.show">
                <a-button type="primary" @click="del(subjectId)" size="small">删除</a-button>
                <a-button type="primary" @click="up(subjectId)" size="small">上移</a-button>
                <a-button type="primary" @click="down(subjectId)" size="small">下移</a-button>
              </div>
            </div>
            <!-- 删除 上移 下移 结束-->
          </div>
          <!-- 一个量表的里所有题目 结束 -->
        </div>
        <!-- 量表名称 + 量表中所有题目 结束 -->

        <center>
          <a-button class="save_button" type="primary" @click="submitScale">保存</a-button>
          <a-button class="save_button" type="primary" @click="preview">预览</a-button>
        </center>

        <!-- <button @click.prevent="post" class="save_button">保存</button> -->
      </a-layout-content>
    </a-layout>
    <!-- 以上右边内容结束位置 -->
  </a-layout>
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
import reqwest from "reqwest";
import { debuglog } from "util";
export default {
  //引用store.js
  store,
  // mounted() {
  //   this.oneScale = this.$route.query.oneScale;
  // },
  data() {
    return {
      fileNoList: [], //存放画图题上传的图片
      fileList: [], // 画图题，for循环中使用
      pictureFileNoList: [], //存放图片题上传的图片
      pictureFileList: [], //图片题，for循环内
      uploading: false,
      serverUrl: this.GLOBAL.serverUrl,
      // //选项名称
      // optionText: {
      //   name: ""
      // },
      // optionText: "",
      show: true,
      previewVisible: false,
      previewImage: "",
      //存放题目的数组
      oneScale: {
        doctorId: "",
        //量表名称
        scaleName: "",
        //量表内容
        questionList: []
      }
    };
  },

  //规则校验
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },

  methods: {
    //保存
    submitScale() {
      this.$http
        .post(this.serverUrl + "scale/info/add", this.oneScale, {
          headers: {
            Token: localStorage.getItem("Token")
          }
        })
        .then(function(data) {
          console.log(data);
          if ((data.body.retCode = "000000")) {
            this.$message.success("保存成功！", 5);
          } else {
            this.$message.error("保存失败！", 5);
          }
          this.$router.push({ path: "/home/myScale" });
        });
    },
    //预览
    preview() {
      debugger;

      let oneScale = JSON.stringify(this.oneScale);
      let routeData = this.$router.resolve({
        path: "/previewScale",
        query: { oneScale: oneScale }
        //  params:{catId:params.catId}
      });
      //新建个窗口来打开路由地址
      window.open(routeData.href, "_blank");
    },

    //  选题题型 ----添加---侧边栏
    handleClick(e) {
      //  单选
      if (e.key === "radio") {
        var chooseQuestionObject = {
          questionType: e.key,
          show: true,
          title: "",
          items: [{ option: "" }, { option: "" }, { option: "" }]
        };
        this.oneScale.questionList.push(chooseQuestionObject);
      } else if (e.key === "checkBox") {
        //多选题
        var checkBoxObject = {
          questionType: e.key,
          show: true,
          title: "",
          items: [{ option: "" }, { option: "" }, { option: "" }]
        };
        this.oneScale.questionList.push(checkBoxObject);
      } else if (e.key === "direction") {
        //指导语
        var directionObject = {
          show: true,
          id: this.oneScale.questionList.length,
          questionType: e.key,
          title: ""
        };
        this.oneScale.questionList.push(directionObject);
      } else if (e.key === "draw") {
        //画图题
        var drawObject = {
          questionType: e.key,
          status: "noNeed",
          show: true,
          title: "",
          attachmentList: this.fileNoList
        };

        this.oneScale.questionList.push(drawObject);
      } else if (e.key === "picture") {
        //图片题
        var pictureObject = {
          questionType: "picture",
          status: "noNeed",
          show: true,
          title: "",
          attachmentList: this.pictureFileNoList
        };
        this.oneScale.questionList.push(pictureObject);
      } else if (e.key === "questionType") {
        //一个量表中的题目类型
        var questionTypeObject = {
          questionType: e.key,
          show: true,
          title: ""
        };
        this.oneScale.questionList.push(questionTypeObject);
      } else if (e.key === "QandA") {
        //问答题
        var questionObject = {
          questionType: e.key,
          show: true
        };
        this.oneScale.questionList.push(questionObject);
      }
    },

    //画图题 ———— 上传图片开始
    //删除上传的图片
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    //上传图片
    handleUpload(subjectId) {
      debugger;
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append("file", file);
      });
      this.uploading = true;
      let that = this;
      // You can use any AJAX library you like
      reqwest({
        url: this.serverUrl + "file/upload",
        headers: {
          Token: localStorage.getItem("Token")
        },
        method: "post",
        processData: false,
        data: formData,
        success: () => {
          this.fileList = [];
          this.uploading = false;
          this.$message.success("上传成功！", 5);
        },
        error: () => {
          this.uploading = false;
          this.$message.error("上传失败！", 5);
        }
      }).then(values => {
        debugger;
        that.fileNoList = values.data;
        var drawObject = {
          questionType: "draw",
          show: true,
          title: "",
          markSubjectId: subjectId,
          attachmentList: this.fileNoList
        };
        var list = that.oneScale.questionList;
        debugger;
        for (var i = 0; i < list.length; i++) {
          if (list[i].status === "noNeed") {
            list.splice(i, 1);
          }
        }
        for (var i = 0; i < list.length; i++) {
          if (
            list.length > 0 &&
            list[i].questionType === "draw" &&
            list[i].markSubjectId === subjectId
          ) {
            list.splice(i, 1);
          }
        }
        that.oneScale.questionList.push(drawObject);
        console.log(values.data);
      });
    },
    //画图题 ————上传图片结束

    //图片题 ———— 上传图片开始
    //删除上传的图片
    pictureHandleRemove(file) {
      const index = this.pictureFileList.indexOf(file);
      const newPictureFileList = this.pictureFileList.slice();
      newPictureFileList.splice(index, 1);
      this.pictureFileList = newPictureFileList;
    },
    //选择图片
    pictureBeforeUpload(file) {
      this.pictureFileList = [...this.pictureFileList, file];
      return false;
    },
    //上传图片
    pictureHandleUpload(subjectId) {
      debugger;
      const { pictureFileList } = this;
      const formData = new FormData();
      pictureFileList.forEach(file => {
        formData.append("file", file);
      });
      this.uploading = true;
      let that = this;
      // You can use any AJAX library you like
      reqwest({
        url: this.serverUrl + "file/upload",
        headers: {
          Token: localStorage.getItem("Token")
        },
        method: "post",
        processData: false,
        data: formData,
        success: () => {
          this.pictureFileList = [];
          this.uploading = false;
          this.$message.success("上传成功！", 5);
        },
        error: () => {
          this.uploading = false;
          this.$message.error("上传失败！", 5);
        }
      }).then(values => {
        debugger;
        that.pictureFileNoList = values.data;
        var pictureObject = {
          questionType: "picture",
          show: true,
          title: "",
          markSubjectId: subjectId,
          attachmentList: this.pictureFileNoList
        };
        var list = that.oneScale.questionList;
        debugger;
        for (var i = 0; i < list.length; i++) {
          if (list[i].status === "noNeed") {
            list.splice(i, 1);
          }
        }
        for (var i = 0; i < list.length; i++) {
          if (
            list.length > 0 &&
            list[i].questionType === "picture" &&
            list[i].markSubjectId === subjectId
          ) {
            list.splice(i, 1);
          }
        }
        that.oneScale.questionList.push(pictureObject);
        console.log(values.data);
      });
    },
    //图片题 ————上传图片结束

    // 删除选项(单选，多选)
    delOption(subjectId, optionId) {
      debugger;
      var option = this.oneScale.questionList[subjectId].items;
      option.splice(optionId, 1);
      console.log(this.oneScale.questionList[subjectId].items);
    },

    // 增加选项（单选，多选）
    addOption(subjectId) {
      console.log(subjectId);
      var items = this.oneScale.questionList[subjectId].items;
      if (items.length <= 5) {
        var newitems = {};
        items = items.push(newitems);
        console.log(this.oneScale.questionList[subjectId].items);
      } else {
        this.$message.warning("选项不允许超过6个！", 5);
      }
    },

    // 隐藏删除、编辑、上移、下移的控件
    hind(subjectId) {
      console.log(subjectId);
      this.oneScale.questionList[subjectId].show = false;
    },

    // 展现删除、编辑、上移、下移的控件
    display(subjectId) {
      this.oneScale.questionList[subjectId].show = true;
    },

    //删除题目
    del(subjectId) {
      console.log(subjectId);
      this.oneScale.questionList.splice(subjectId, 1);
    },

    delQuestion(index) {
      this.oneScale.questionList.splice(index, 1);
    },
    //上移题目
    up(subjectId) {
      debugger;
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
    //下移题目
    down(subjectId) {
      console.log("a");
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

.singleChoice,
.martixRadio {
  display: flex;
  flex-direction: row;
}

.icons-list >>> .anticon {
  margin-left: 2vh;
  font-size: 20px;
}

.button_style {
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  /* border: 1px solid saddlebrown; */
  max-width: 20vh;
  margin-left: 24vh;
}

.del_up_down_button {
  border: 1px dashed #dddee1;
  /* margin-top: 5vh; */
  max-width: 100vh;
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.del_up_down_button button {
  width: 15vh;
  text-align: center;
  margin: 5vh;
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

.save_button {
  width: 30vh;
  height: 6vh;
  /* text-align: center; */
  margin: 5vh;
  /* background-color: #f56c6c; */
  /* border: 1px solid #f56c6c; */
}

.save_div {
  height: 10vh;
  margin: 0 auto;
  max-width: 30vh;
  display: flex;
  flex-direction: row;
  border: 1px solid saddlebrown;
  justify-content: center;
  align-items: center;
}

.icons-add-del {
  margin-left: 2vh;
  width: 96px;
  /* border: 1px solid saddlebrown; */
}
</style>
