<!--
 * @Author: zhangxue
 * @Date: 2020-07-09 11:13:33
 * @LastEditTime: 2020-07-09 16:46:40
 * @Description: 整体框架
 * @FilePath: \packge\src\App.vue
--> 
<template>
  <div id="app" class="mc-main-box">
    <mc-header></mc-header>     
    <router-view/>
  </div>
</template>

<script>
import mcHeader from '@/components/moudel/header';
export default {
  name: 'App',
  components:{mcHeader}
}
</script>

<style lang="less">
  @import "./assets/css/index.less";
</style>
<style>
.mc-main-box {
  position: relative;
  padding-top: 76px;
}
</style>
