<template>
  <div>
    <center>
      <a-button class="noCreateButton" type="primary" ghost icon="plus" @click="goToCreate">
        <strong>立即创建</strong>
      </a-button>
    </center>
  </div>
</template>

<script>
export default {
  methods: {
    goToCreate() {
      this.$router.push({ path: "/Home/CreateScale" });
    }
  }
};
</script>

<style scoped>
.noCreateButton {
  margin-top: 150px;
  width: 300px;
  height: 100px;
  border: 2px dashed #2d8cf0;
}
</style>
