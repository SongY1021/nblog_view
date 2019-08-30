<template>
    <router-view/>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .body{
    background-color: #193c6d;
    background-image: url(//img.alicdn.com/tps/TB1d.u8MXXXXXXuXFXXXXXXXXXX-1900-790.jpg);
    background-size: 100%;
    /*! autoprefixer: off */
    background: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0, #003073), color-stop(100%, #029797));
    /*background: -webkit-linear-gradient(135deg, #003073, #029797);*/
    /* autoprefixer: on */
    background: -moz-linear-gradient(45deg, #003073, #029797);
    background: -ms-linear-gradient(45deg, #003073 0, #029797 100%);
    background: -o-linear-gradient(45deg, #003073, #029797);
    /*background: linear-gradient(135deg, #003073, #029797);*/
    text-align: center;
    margin: 0px;
    overflow: hidden;
  }
</style>

<style lang="less">
  @import './styles/scrollBar';
</style>
