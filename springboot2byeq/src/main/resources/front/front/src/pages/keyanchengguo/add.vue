<template>
<div :style='{"border":"2px solid #a4d9b7","padding":"20px","margin":"20px auto 0","borderRadius":"8px","flexWrap":"wrap","background":"#fff","width":"1200px","position":"relative"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="200px"
    >
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="成果名称" prop="chengguomingcheng">
            <el-input v-model="ruleForm.chengguomingcheng" 
                placeholder="成果名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}'  label="队伍名称" prop="duiwumingcheng">
            <el-select v-model="ruleForm.duiwumingcheng" placeholder="请选择队伍名称"  >
              <el-option
                  v-for="(item,index) in duiwumingchengOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}'  label="成果类型" prop="chengguoleixing">
            <el-select v-model="ruleForm.chengguoleixing" placeholder="请选择成果类型"  >
              <el-option
                  v-for="(item,index) in chengguoleixingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="成果附件" prop="chengguofujian">
            <file-upload
            tip="点击上传成果附件"
            action="file/upload"
            :limit="1"
            :multiple="true"
            :fileUrls="ruleForm.chengguofujian?ruleForm.chengguofujian:''"
            @change="chengguofujianUploadChange"
            ></file-upload>
          </el-form-item>  
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="封面" v-if="type!='cross' || (type=='cross' && !ro.fengmian)" prop="fengmian">
            <file-upload
            tip="点击上传封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.fengmian?ruleForm.fengmian:''"
            @change="fengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' class="upload" v-else label="封面" prop="fengmian">
                <img v-if="ruleForm.fengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.fengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.fengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="上传日期" prop="shangchuanriqi" >
              <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.shangchuanriqi" 
                  type="date"
                  placeholder="上传日期">
              </el-date-picker> 
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="队伍账号" prop="duiwuzhanghao">
            <el-input v-model="ruleForm.duiwuzhanghao" 
                placeholder="队伍账号" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="组长姓名" prop="zuzhangxingming">
            <el-input v-model="ruleForm.zuzhangxingming" 
                placeholder="组长姓名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"width":"100%","padding":"10px","margin":"0 0 0px","display":"inline-block"}' label="成果内容" prop="chengguoneirong">
            <editor 
                :style='{"padding":"0","boxShadow":"0 0 0px rgba(155, 198, 146, .5)","margin":"0","borderColor":"#ccc","backgroundColor":"#fff","borderRadius":"8px","borderWidth":"0","width":"80%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.chengguoneirong" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"8px 0 0 0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"20px 40px 20px 260px","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"20px","background":"#47b144","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"2px solid #3db769","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#3db769","borderRadius":"20px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            chengguomingcheng : false,
            duiwumingcheng : false,
            chengguoleixing : false,
            chengguofujian : false,
            fengmian : false,
            shangchuanriqi : false,
            chengguoneirong : false,
            duiwuzhanghao : false,
            zuzhangxingming : false,
            clicktime : false,
            clicknum : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          chengguomingcheng: '',
          duiwumingcheng: '',
          chengguoleixing: '',
          chengguofujian: '',
          fengmian: '',
          shangchuanriqi: '',
          chengguoneirong: '',
          duiwuzhanghao: '',
          zuzhangxingming: '',
          clicktime: '',
          clicknum: '',
        },
        duiwumingchengOptions: [],
        chengguoleixingOptions: [],
        rules: {
          chengguomingcheng: [
          ],
          duiwumingcheng: [
          ],
          chengguoleixing: [
            { required: true, message: '成果类型不能为空', trigger: 'blur' },
          ],
          chengguofujian: [
          ],
          fengmian: [
          ],
          shangchuanriqi: [
          ],
          chengguoneirong: [
          ],
          duiwuzhanghao: [
          ],
          zuzhangxingming: [
          ],
          clicktime: [
          ],
          clicknum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
        },
      };
    },
    computed: {



    },
    components: {
    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.shangchuanriqi = this.getCurDate()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='chengguomingcheng'){
              this.ruleForm.chengguomingcheng = obj[o];
              this.ro.chengguomingcheng = true;
              continue;
            }
            if(o=='duiwumingcheng'){
              this.ruleForm.duiwumingcheng = obj[o];
              this.ro.duiwumingcheng = true;
              continue;
            }
            if(o=='chengguoleixing'){
              this.ruleForm.chengguoleixing = obj[o];
              this.ro.chengguoleixing = true;
              continue;
            }
            if(o=='chengguofujian'){
              this.ruleForm.chengguofujian = obj[o];
              this.ro.chengguofujian = true;
              continue;
            }
            if(o=='fengmian'){
              this.ruleForm.fengmian = obj[o].split(",")[0];
              this.ro.fengmian = true;
              continue;
            }
            if(o=='shangchuanriqi'){
              this.ruleForm.shangchuanriqi = obj[o];
              this.ro.shangchuanriqi = true;
              continue;
            }
            if(o=='chengguoneirong'){
              this.ruleForm.chengguoneirong = obj[o];
              this.ro.chengguoneirong = true;
              continue;
            }
            if(o=='duiwuzhanghao'){
              this.ruleForm.duiwuzhanghao = obj[o];
              this.ro.duiwuzhanghao = true;
              continue;
            }
            if(o=='zuzhangxingming'){
              this.ruleForm.zuzhangxingming = obj[o];
              this.ro.zuzhangxingming = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
            if(o=='clicknum'){
              this.ruleForm.clicknum = obj[o];
              this.ro.clicknum = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            if((json.duiwumingcheng!=''&&json.duiwumingcheng) || json.duiwumingcheng==0){
                this.ruleForm.duiwumingcheng = json.duiwumingcheng
            }
            if((json.duiwuzhanghao!=''&&json.duiwuzhanghao) || json.duiwuzhanghao==0){
                this.ruleForm.duiwuzhanghao = json.duiwuzhanghao
            }
            if((json.zuzhangxingming!=''&&json.zuzhangxingming) || json.zuzhangxingming==0){
                this.ruleForm.zuzhangxingming = json.zuzhangxingming
            }
          }
        });
        this.$http.get('option/keyanduiwu/duiwumingcheng', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.duiwumingchengOptions = res.data.data;
          }
        });
        this.chengguoleixingOptions = "科研论文,专利,软件著作权,其他".split(',')
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('keyanchengguo/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('keyanchengguo/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('keyanchengguo/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('keyanchengguo/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      chengguofujianUploadChange(fileUrls) {
          this.ruleForm.chengguofujian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
      fengmianUploadChange(fileUrls) {
          this.ruleForm.fengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 200px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 200px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 0 12px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 80%;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 0 10px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px solid #9ce0b5;
	  cursor: pointer;
	  border-radius: 6px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  color: #3db769;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px solid #9ce0b5;
	  cursor: pointer;
	  border-radius: 6px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  color: #3db769;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px solid #9ce0b5;
	  cursor: pointer;
	  border-radius: 6px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  color: #3db769;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #9ce0b5;
	  border-radius: 4px;
	  padding: 12px;
	  box-shadow: inset 0px 0px 48px 0px #cef1db;
	  outline: none;
	  color: #666;
	  width: 80%;
	  font-size: 14px;
	  min-height: 180px;
	}
</style>
