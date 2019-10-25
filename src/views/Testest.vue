
<template>
  <div v-show="isShowCover" style = "position:fixed;background:transparent;background:rgba(0,0,0,0.5);margin:auto;top:0;bottom:0;left:0;right:0">
aaaa
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShowCover: false
    }
  },
  mounted () {
    window.addEventListener(
      'onorientationchange' in window ? 'orientationchange' : 'resize',
      function () {
        if (window.orientation === 90 || window.orientation === -90) {
          // 想把下面的alert换成能够控制v-show的代码

          alert(
            this.$options.methods.showCover() +
              '横屏可能导致页面异常，建议竖屏操作！'
          )
          // alert("123");仅alert纯文本可以正常运行
        }
        // window.location.reload();
      },
      false
    )
  },
  methods:{
    showCover(){
      return '123'
    }
  }
}
</script>
