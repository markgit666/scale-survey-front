<template>
  <div class="clearfix">
    <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
      <a-button>
        <a-icon type="upload" />Select File
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      @click="handleUpload"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
    >{{uploading ? 'Uploading' : 'Start Upload' }}</a-button>
  </div>
</template>
<script>
import reqwest from "reqwest";
export default {
  data() {
    return {
      fileList: [],
      uploading: false,
      serverUrl: this.GLOBAL.serverUrl
    };
  },
  methods: {
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
    handleUpload() {
      debugger;
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append("file", file);
      });
      this.uploading = true;

      // You can use any AJAX library you like
      reqwest({
        url: this.serverUrl + "file/upload",
        method: "post",
        processData: false,
        data: formData,
        success: () => {
          this.fileList = [];
          this.uploading = false;
          this.$message.success("上传成功！");
        },
        error: () => {
          this.uploading = false;
          this.$message.error("上传失败！");
        }
      });
    }
  }
};
</script>