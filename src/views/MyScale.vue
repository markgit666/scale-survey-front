<template>
  <div class="box">
    <a-card title="量表汇总">
      <a-table
        :columns="columns"
        :rowKey="record => record.scaleId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>editScale(record.scaleId)">查看</a>
              <a-divider type="vertical" />
              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="delScaleInfo(record.scaleId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>
              </a-popconfirm>

              <a-divider type="vertical" />

              <a @click="() =>chooseSomeOneAnswer(record.scaleId)">答题</a>

              <a-modal title="请扫描下方二维码答题" v-model="visible" @ok="handleOk">
                <div class="img_box">
                  <img
                    v-bind:src="imgUrl + 'url=Home/Answer&scaleId=' + record.scaleId"
                    class="img"
                  />
                </div>
              </a-modal>
            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>
    </a-card>
  </div>
</template>
<script>
import reqwest from "reqwest";
import axios from "axios";
import { debuglog } from "util";
const columns = [
  {
    title: "量表名称",
    dataIndex: "scaleName",
    // sorter: true,
    width: "35%",
    scopedSlots: { customRender: "scaleName" }
  },

  {
    title: "创建时间",
    dataIndex: "createTime"
  },

  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      visible: false,
      serverUrl: this.GLOBAL.serverUrl,
      imgUrl: this.GLOBAL.serverUrl + "file/qrCode/image/download?",
      data: [],
      pagination: {},
      loading: false,
      columns,
      id: 0
    };
  },
  methods: {
    // 分页
    handleTableChange(pagination, filters, sorter) {
      pagination.pageSize = 3;
      console.log("pagination=", pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      console.log("current是：", pager.current);
      this.pagination = pager;
      this.fetch({
        pageNo: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      console.log("params:", params);
      console.log("fetch pagination=", this.pagination);
      this.loading = true;
      reqwest({
        url: this.serverUrl + "scale/info/getList",
        method: "post",
        data: JSON.stringify({
          pageNo: 1,
          pageSize: 5,
          ...params
        }),
        type: "json",
        contentType: "application/json"
      }).then(values => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        console.log(values.data.totalNum);
        var page;
        if (values.data.totalNum % 5 === 0) {
          page = values.data.totalNum / 5;
        } else {
          page = Math.floor(values.data.totalNum / 5 + 1);
        }
        pagination.total = page * 10;
        console.log("total=", pagination.total);
        this.loading = false;
        this.data = values.data.list;
        this.pagination = pagination;
      });
    },

    //编辑量表
    editScale(scaleId) {
      debugger;
      this.$router.push({
        path: "/Home/ShowAndEditScale",
        // patients:patientId
        query: { scaleId: scaleId }
      });
    },

    //删除量表
    delScaleInfo(scaleId) {
      axios
        .post(this.serverUrl + "scale/info/remove", {
          scaleId: scaleId
        })
        .then(response => {
          console.log(response);
          this.fetch();
          this.$message.success("删除成功！");
        });
    },

    //答题
    chooseSomeOneAnswer(scaleId) {
      this.visible = true;
    },
    handleOk(e) {
      // console.log(e);
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.box {
  text-align: center;
}

.img_box {
  display: flex;
  justify-content: center;
}

.img {
  width: 200px;
  height: 200px;
}
</style>
