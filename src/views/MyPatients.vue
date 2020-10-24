<template>
  <div class="box">
    <a-card :hoverable="true" :bordered="false">
      <a-row>
        <a-col :span="8">
          <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp姓名：</label>
          <el-input
            type="text"
            maxlength="10"
            show-word-limit
            :style="{width:'60%'}"
            size="small "
            v-model="searchData.name"
          ></el-input>
        </a-col>

        <a-col :span="8">
          <label>病历号：</label>
          <el-input
            type="text"
            maxlength="18"
            show-word-limit
            :style="{width:'60%'}"
            size="small "
            v-model="searchData.medicalRecordNum"
          ></el-input>
        </a-col>
        <a-col :span="6">
          <label>性别：</label>
          <el-select v-model="searchData.gender" style="width:70%;" size="small">
            <el-option label value></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>

          </el-select>
        </a-col>
      </a-row>&nbsp&nbsp
      <a-row>
        <a-col :span="8">
          <label>联系方式：</label>
          <el-input
            type="text"
            maxlength="11"
            show-word-limit
            :style="{width:'60%'}"
            size="small "
            v-model="searchData.telephoneNumber"
          ></el-input>
        </a-col>

        <a-col :span="7">
          <label>组别：</label>
          <el-select v-model="searchData.patientGroup" style="width:70%;" size="small">
            <el-option label value></el-option>
            <el-option label="AD组" value="AD"></el-option>
            <el-option label="MCI组" value="MCI"></el-option>
            <el-option label="TD组" value="TD"></el-option>
          </el-select>
        </a-col>

        <a-col :span="4">
          <a-button type="primary" icon="search" @click="search()">查找</a-button>
        </a-col>
        <a-col :span="3">
          <a-button
            type="primary"
            @click="exportPatientInfo"
            icon="arrow-up"
            :style="{marginLeft:'-10px'}"
          >信息导出</a-button>
        </a-col>

      </a-row>
      <br />

      <a-table
        :columns="columns"
        :rowKey="record => record.patientId"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="rowSelection"
        size="small"
      >
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>editInfo(record.patientId)">查看/编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="delPatientInfo(record.patientId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>

      <!--      分页-->
      <template>
        <a-pagination
          :pageSizeOptions="pageSizeOptions"
          :total="total"
          showSizeChanger
          :pageSize="pageSize"
          v-model="current"
          @showSizeChange="onShowSizeChange"
          :style="{marginTop:'15px',float:'right'}"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span>{{props.value}}条/页</span>
          </template>
        </a-pagination>
      </template>
    </a-card>
  </div>
</template>
<script>
import axios from "axios";
import reqwest from "reqwest";
import $ from "jquery";
import ACol from "ant-design-vue/es/grid/Col";

const columns = [
  {
    title: "病历号",
    dataIndex: "medicalRecordNum",
    // sorter: true,
    width: "5%",
    scopedSlots: { customRender: "patientId" }
  },
  {
    title: "姓名",
    dataIndex: "name",
    // sorter: true,
    width: "8%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "组别",
    dataIndex: "patientGroup",
    width: "6%"
  },
  {
    title: "性别",
    dataIndex: "gender",
    width: "6%"
  },
  {
    title: "出生日期",
    width: "10%",
    dataIndex: "birthday"
  },
  {
    title: "联系方式",
    width: "9%",
    dataIndex: "telephoneNumber"
  },
  {
    title: "民族",
    width: "7%",
    dataIndex: "nation"
  },
  {
    title: "家庭地址",
    width: "15%",
    dataIndex: "familyAddress"
  },
  {
    title: "入录时间",
    width: "15%",
    dataIndex: "createTime"
  },
  {
    title: "操作",
    width: "15%",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  components: { ACol },
  mounted() {
    this.fetch({ pageNo: this.current, pageSize: this.pageSize });
  },

  data() {
    return {
      // 分页变量
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      current: 1,
      pageSize: 10,
      total: 50,
      // 选中的某行，某些行
      selectedRowKeys: [],
      serverUrl: this.GLOBAL.serverUrl,
      data: [],
      pagination: {},
      loading: false,
      columns,
      id: 0,

      // 搜索时的数据
      searchData: {
        // 姓名
        name: "",
        // 性别
        gender: "",
        // 出生日期
        birthday: "",
        // 联系方式
        telephoneNumber: "",
        // 家庭地址
        // familyAddress: '',
        // 民族
        nation: ""
      },
      doctorId: ""
    };
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange
      };
    }
  },
  // 监控当前页页数变化
  watch: {
    current(val) {
      this.fetch({
        pageNo: val,
        pageSize: this.pageSize,
        data: {
          name: this.searchData.name,
          birthday: this.searchData.birthday,
          gender: this.searchData.gender,
          telephoneNumber: this.searchData.telephoneNumber,
          nation: this.searchData.nation
        }
      });
    }
  },

  methods: {
    // 选择一页几条数据
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.fetch({ pageNo: current, pageSize: pageSize });
    },

    // 选中的某一行或某些行的信息,用于导出清单列表
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    // 翻页
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      // pager.current = pagination.current
      this.pagination = pager;
      this.fetch({
        pageNo: pagination.current
      });
    },

    // 更新
    fetch(params = {}) {
      this.loading = true;
      let that = this;
      reqwest({
        url: this.serverUrl + "patient/info/getList",
        headers: {
          Token: localStorage.getItem("Token")
        },
        method: "post",
        data: JSON.stringify(params),
        type: "json",
        contentType: "application/json"
      }).then(
        values => {
          if (values.retCode === "000000") {
            that.total = values.data.totalNum;
            that.current = params.pageNo;
            this.loading = false;
            this.data = values.data.list;
            this.doctorId = values.data.list[0].doctorId;

            for (var i = 0; i < values.data.list.length; i++) {
              if (values.data.list[i].gender === "1") {
                values.data.list[i].gender = "男";
              } else {
                values.data.list[i].gender = "女";
              }
            }
          } else if (values.retCode === "100001") {
            if (localStorage.getItem("Token") === null) {
              this.$message.error("未登录，即将跳转至登录页面", 3);
              this.$router.push({ path: "/login" });
            } else {
              this.$message.error("登录超时", 5);
              this.$router.push({ path: "/login" });
            }
          } else {
            this.$message.error(values.retMsg, 5);
          }
        },
        err => {
          alert("网络异常，请检查是否连接上网络");
        }
      );
    },

    // 查看，编辑病人信息
    editInfo(patientId) {
      this.$router.push({
        path: "/home/showAndEditPatientInfo",
        // patients:patientId
        query: { patientId: patientId }
      });
    },

    // 查找---搜索
    search() {
      this.fetch({
        pageNo: 1,
        pageSize: this.pageSize,
        data: {
          name: this.searchData.name,
          medicalRecordNum: this.searchData.medicalRecordNum,
          gender: this.searchData.gender,
          telephoneNumber: this.searchData.telephoneNumber,
          patientGroup: this.searchData.patientGroup
        }
      });
    },

    // 删除某条病人信息
    delPatientInfo(patientId) {
      axios
        .post(
          this.serverUrl + "patient/info/remove",
          {
            patientId: patientId
          },
          {
            headers: {
              Token: localStorage.getItem("Token")
            }
          }
        )
        .then(
          response => {
            if (response.data.retCode === "000000") {
              this.fetch();
              this.$message.success("删除成功！", 5);
            } else if (response.data.retCode === "100001") {
              if (localStorage.getItem("Token") === null) {
                this.$message.error("未登录，即将跳转至登录页面", 5);
                this.$router.push({ path: "/login" });
              } else {
                this.$message.error("登录超时", 5);
                this.$router.push({ path: "/login" });
              }
            } else {
              this.$message.error(response.data.retMsg, 5);
            }
          },
          err => {
            alert("网络异常，请检查是否连接上网络");
          }
        );
    },

    // 选中后导出病人信息
    exportPatientInfo() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择需要操作的记录");
      } else {
        var form = $("<form>");
        form.attr("style", "display:none");
        form.attr("target", "");
        form.attr("method", "post");
        form.attr("action", this.serverUrl + "excel/export/patient/info");
        var input1 = $("<input>");
        input1.attr("type", "hidden");
        input1.attr("name", "patientIdArray");
        input1.attr("value", this.selectedRowKeys);

        var input2 = $("<input>");
        input2.attr("type", "hidden");
        input2.attr("name", "doctorId");
        input2.attr("value", this.doctorId);

        $("body").append(form);
        form.append(input1).append(input2);
        form.submit();
        form.remove();
      }
    }

  }
};
</script>

<style scoped>
.box {
  text-align: center;
}

#pagination-box {
  margin-top: 24px;
}
</style>
