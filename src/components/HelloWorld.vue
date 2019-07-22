<template>
  <div>
    This is HellWord Page.
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  beforeCreate () {
    window.document.body.className = 'body'
  },
  beforeDestroy () {
    window.document.body.className = ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
