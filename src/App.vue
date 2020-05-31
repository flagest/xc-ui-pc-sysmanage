<template>
  <div>
    <home/>
    <router-view></router-view>
  </div>
</template>

<script>
  import home from './module/home/page/home'

  export default {
    data() {
      return {
        name: 'app'
      }
    },
    components: {
      home
    },

    created: function (newPath) {
    }
  }
</script>

<style>
  * {
    -webkit-user-select: text;
  }
</style>
