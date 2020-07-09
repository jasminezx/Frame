/*
 * @Author: zhangxue
 * @Date: 2020-07-09 09:49:24
 * @LastEditTime: 2020-07-09 16:09:51
 * @Description: 全局配置文件
 * @FilePath: \model\src\assets\js\config.js
 */

// 服务器配置
import serverUrl from './server-config.js';
// let production = process.env.NODE_ENV !== 'production'
// 默认开发环境
const develop = true;

const config = {
  //  是否是调试模式，true 为json数据，false 为服务器数据
  isDebug: develop,
  // ajax查询方式   GET
  methodGet: 'GET',
  // ajax查询方式  POST
  methodPost: develop ? 'GET' : 'POST',
  // ajax查询方式  PUT
  methodPut: develop ? 'GET' : 'PUT',
  // ajax查询方式  DELETEsocketio
  methodDelete: develop ? 'GET' : 'DELETE',
  // ajax查询方式  PATCH
  methodPatch: develop ? 'GET' : 'PATCH',
  //  url链接,也就是数据的地址
  url: {},
  // 是否显示日志
  showLog: true,
  // 服务器地址
  dirServicePath: '',
};
// 本地数据
const localUrl = {
  // 首页模块的数据
  index: {
    // 标注来源分布情况
    bzlyfbqk: '/static/json/index/bzlyfbqk.json',
    // 领导监管情况
    ldjgqk: '/static/json/index/ldjgqk.json',
  },
  // 列表
  list: '/static/json/list.json',
};
config.url = config.isDebug ? localUrl : serverUrl;
//  注册全局变量，fdConfig
window.fdConfig = config;
