<template>
  <a-card>
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      itemLayout="horizontal"
      :dataSource="data"
      v-for="(item,reportKey) in data"
      :key="reportKey"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions" @click="CheckReport(item,index)">查看</a>
        <a slot="actions" @click="qrCode(item)">答题二维码</a>

        <div v-if="qrCodeShowSwitch === item.reportId ">
          <a-modal title="请扫描下方二维码答题" v-model="visible" @ok="handleOk">
            <center>
              <img
                v-bind:src="imgUrl + 'url=Home/IdCard&reportId=' + item.reportId +'&doctorId=' + item.doctorId"
                class="img"
              />
            </center>
          </a-modal>
        </div>

        <a-list-item-meta>
          <a slot="title">{{item.reportName}}</a>
        </a-list-item-meta>量表数量：
        <div>{{item.scaleNum}}</div>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>
import reqwest from "reqwest";

export default {
  data() {
    return {
      visible: false, // 控制二维码显示与否
      qrCodeShowSwitch: "", //二维码
      imgUrl: this.GLOBAL.serverUrl + "file/report/qrCode/image/download?", //二维码路径
      serverUrl: this.GLOBAL.serverUrl,
      loading: true,
      data: [],
      reportName: "",
      scaleNum: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(params = {}) {
      let that = this;
      reqwest({
        url: this.serverUrl + "report/doctor/person/list",
        // 需要登录时
        headers: {
          Token: localStorage.getItem("Token")
        },
        data: JSON.stringify(params),
        type: "json",
        method: "post",
        contentType: "application/json"
      }).then(res => {
        if (res.retCode === "000000") {
          that.loading = false;
          that.data = res.data;
        } else if (values.retCode === "100001") {
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
      });
    },

    // 查看
    CheckReport(item) {
      this.$router.push({
        path: "./myReport/ReportDetails",
        // reportId:reportId
        query: { reportId: item.reportId }
      });
    },
    // 显示二维码
    qrCode(item) {
      this.qrCodeShowSwitch = item.reportId;
      this.visible = true;
    },

    handleOk(e) {
      this.visible = false;
    }
  }
};
</script>
