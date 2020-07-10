<!--
 * @Author: zhangxue
 * @Date: 2020-07-09 16:35:01
 * @LastEditTime: 2020-07-10 09:36:57
 * @Description: 头部组件
 * @FilePath: \packge\src\components\moudel\header.vue
--> 
<template>
   <div class="mc-header-box">
      <ul class="mc-header-list">
        <li v-for="(item,index) in menuList" 
        :key="'menu' + index" 
        :class="{'active':item.key === activeMenu.key}" 
        @click="menuClick(item)">
          {{item.name}}
        </li>
      </ul>
      <div class="mc-user-box">
          <span>{{userInfo.name}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'mc-header',
  data () {
    return {
      menuList: [{
          name:"质控品管理",
          key:"zkpgl"
      },{
          name:"校准品管理",
          key:"jzpgl"
      }],
      activeMenu:{
           name:"质控品管理",
          key:"zkpgl"
      },
    //   用户信息
    userInfo:{
        name:"艾晓雪",
        // 是否是管理员
        admin:false
    }
    }
  },
  methods:{
    //   菜单点击事件
    menuClick(item){
        this.activeMenu = item;
        this.$emit('menuChange',item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mc-header-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 76px;
  line-height: 76px;
  padding-left: 290px;
  background:#071544 url('~@/assets/images/header/logo.png') 26px center no-repeat;
}

.mc-header-list {
    position: relative;
    font-size: 0;  
    text-align: left;
    width: 70%;
    float: left;
    
    li {
        position: relative;
        display: inline-block;
        font-size: 18px;
        line-height: 76px;
        color: #ddd;
        padding: 0 30px;
        cursor: pointer;
        margin-right: 20px;

        &:hover {
            opacity: 0.8;
            background: rgba(255,255,255,0.2);

            &:after {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(255,255,255,0.2);
                content: '';
            }
        }

        &.active {
            color: #fff;

            &:after {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #fff;
                content: '';
            }
        }
    }
}

.mc-user-box {
    float: right;
    height: 76px;
    background: url('~@/assets/images/header/user.png') left center no-repeat;
    padding-left: 34px;
    padding-right: 20px;
    color: #ddd;
    font-size: 16px;
    line-height: 76px;
    cursor: pointer;

    &:hover {
        opacity:0.9
    }
}
</style>
