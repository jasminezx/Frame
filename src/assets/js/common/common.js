/*
 * @Author: zhangxue
 * @Date: 2020-07-13 14:20:31
 * @LastEditTime: 2020-07-13 14:51:59
 * @Description: 公共的js方法
 * @FilePath: \Frame\src\assets\js\common\common.js
 */ 

 const common = {
    rules:{
        // 20位以内的英文、数字和部分特殊字符
        validateBatchNum :(rule, value, callback) => {
            const _reg = /^[0-9a-zA-Z-_!@#$%^&*]{0,20}$/g;
            if (!value) {
              callback(new Error('不能为空'));
            } else if(_reg.test(value)){
                callback();
            }else {
                callback(new Error("请输入20位以内的英文、数字和部分特殊字符"));
            }
          },
          checkEmail:(rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (!value) {
              return callback(new Error('邮箱不能为空'))
            }else if (mailReg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的邮箱格式'))
              }
          },
          checkPhone:(rule, value, callback)=>{
              const phoneReg = /^1[3456789]\d{9}$/;
              if (!value) {
                return callback(new Error('手机号不能为空'))
              }else if (phoneReg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的手机号码'))
                }
          },
          checkId:(rule, value, callback)=>{
            const idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if (!value) {
              return callback(new Error('身份证号不能为空'))
            }else if (idReg.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的身份证号码'))
              }
        }
    }
 }

 export default common;