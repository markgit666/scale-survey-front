<template>
  <div>
    fhahfdhf
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    mounted () {
      this.fetch()
    },
    data () {
      return {
        serverUrl: this.GLOBAL.serverUrl,
      }
    },
    methods: {
      fetch () {

        axios.post(this.serverUrl + 'paper/scale/list',
          {
            headers: {
              Token: localStorage.getItem('Token')
            }
          }).then(res => {
          debugger
          console.log(res)
        })
      }
    }
  }
</script>
