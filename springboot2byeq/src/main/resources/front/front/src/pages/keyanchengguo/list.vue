<template>
<div>
	<div :style='{"width":"1200px","padding":"10px","margin":"12px auto 0","borderRadius":"16px","background":"linear-gradient(284deg, rgba(85,205,129,1) 0%, rgba(61,183,105,1) 100%),#3db769"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'///'" :style='{"fontSize":"14px","lineHeight":"1"}'>
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbItem" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<div class="list-preview" :style='{"margin":"10px auto","overflow":"hidden","flexWrap":"wrap","background":"none","display":"block","width":"1200px","position":"relative"}'>
		
		<div class="category-2" :style='{"width":"110px","margin":"10px 0 0","float":"left","flexDirection":"column","display":"flex","height":"auto"}'>
			<div class="item" :class="swiperIndex == '-1' ? 'active' : ''" @click="getList(1, '全部')" :plain="isPlain">全部</div>
			<div class="item" :class="swiperIndex == index ? 'active' : ''" v-for="(item, index) in fenlei" :key="index" @click="getList(1, item, 'btn' + index)" :ref="'btn' + index" plain>{{item}}</div>
		</div>
	
    <el-form :inline="true" :model="formSearch" class="list-form-pv" :style='{"border":"2px solid #a4d9b7","padding":"10px 0","margin":"10px 0 0 0","borderRadius":"8px","flexWrap":"wrap","background":"#fff","display":"flex","width":"calc(100% - 130px)","float":"right","height":"auto"}'>
      <el-form-item :style='{"margin":"10px"}'>
	    <div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","color":"#29292a","display":"inline-block"}'>成果名称</div>
        <el-input v-model="formSearch.chengguomingcheng" placeholder="成果名称" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"margin":"10px"}'>
		<div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","color":"#29292a","display":"inline-block"}'>队伍名称</div>
        <el-select v-model="formSearch.duiwumingcheng" placeholder="请选择队伍名称" :clearable="true">
          <el-option v-for="(item, index) in duiwumingchengOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :style='{"margin":"10px"}'>
		<div class="lable" v-if="true" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","color":"#29292a","display":"inline-block"}'>成果类型</div>
        <el-select v-model="formSearch.chengguoleixing" placeholder="请选择成果类型" :clearable="true">
          <el-option v-for="(item, index) in chengguoleixingOptions" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
	  <el-button v-if=" true " :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"10px","outline":"none","color":"#fff","borderRadius":"10px","background":"#55b44b","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="getList(1, curFenlei)"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-search"></i>查询</el-button>
	  <el-button v-if="isAuth('keyanchengguo','新增')" :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"10px","outline":"none","color":"#fff","borderRadius":"10px","background":"#55b44b","width":"auto","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="add('/index/keyanchengguoAdd')"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-circle-plus-outline"></i>添加</el-button>
    </el-form>

	<div class="list" :style='{"width":"calc(100% - 130px)","float":"right","margin":"20px 0"}'>
		<!-- 样式一 -->
		
		<!-- 样式二 -->
		<div class="list2 index-pv1" :style='{"border":"2px solid #a4d9b7","padding":"20px 0px 0 0px","overflow":"hidden","borderRadius":"8px","background":"#fff","width":"100%","height":"auto"}'>
			<div :style='{"cursor":"pointer","margin":"0 0 20px 2%","borderRadius":"10px","flexWrap":"wrap","background":"#fff","display":"flex","width":"48%","fontSize":"0","float":"left","height":"150px"}' v-for="(item, index) in dataList" :key="index" @click="toDetail(item)" class="list-item animation-box">
				<img :style='{"boxShadow":"8px 0px 0 rgba(146, 181, 164,.5)","borderColor":"rgba(146, 181, 164,.8)","objectFit":"cover","borderRadius":"10px 40px 40px 10px","borderWidth":"0 12px 0 0","width":"240px","borderStyle":"solid","float":"left","height":"100%"}' v-if="item.fengmian && item.fengmian.substr(0,4)=='http'" :src="item.fengmian" class="image" />
				<img :style='{"boxShadow":"8px 0px 0 rgba(146, 181, 164,.5)","borderColor":"rgba(146, 181, 164,.8)","objectFit":"cover","borderRadius":"10px 40px 40px 10px","borderWidth":"0 12px 0 0","width":"240px","borderStyle":"solid","float":"left","height":"100%"}' v-else :src="baseUrl + (item.fengmian?item.fengmian.split(',')[0]:'')" class="image" />
				<div class="item-info" :style='{"padding":"12px","margin":"0 20px 0 40px","overflow":"hidden","borderRadius":"8px","background":"#eff8f2","width":"calc(100% - 300px)","position":"relative","float":"right","height":"auto"}'>
					<div :style='{"width":"100%","margin":"0px","lineHeight":"32px","fontSize":"16px","color":"#333","background":"none"}' class="name ">{{item.chengguomingcheng}}</div>
					<div :style='{"width":"100%","margin":"0px","lineHeight":"32px","fontSize":"16px","color":"#333","background":"none"}' class="name ">{{item.duiwumingcheng}}</div>
					<div v-if="item.price" :style='{"padding":"12px","color":"#666","top":"0","textAlign":"center","background":"rede","width":"auto","lineHeight":"24px","fontSize":"14px","position":"absolute","right":"0"}' class="price"><span :style='{"fontSize":"12px"}'>￥</span>{{item.price}}</div>
				</div>
			</div>
		</div>
	</div>

	
	<el-pagination
	  background
	  class="pagination"
	  :pager-count="7"
	  :page-size="pageSize"
	  :page-sizes="pageSizes"
	  prev-text="上一页"
	  next-text="下一页"
	  :hide-on-single-page="false"
	  :layout='["total","prev","pager","next","sizes","jumper"].join()'
	  :total="total"
	  :style='{"width":"1200px","clear":"both","margin":"20px auto","whiteSpace":"nowrap","overflow":"hidden","color":"#333"}'
	  @current-change="curChange"
      @size-change="sizeChange"
	  @prev-click="prevClick"
	  @next-click="nextClick"
	></el-pagination>

  </div>
</div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
	    layouts: '',
		swiperIndex: -1,
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '科研成果'
          }
        ],
        formSearch: {
          chengguomingcheng: '',
          duiwumingcheng: '',
          chengguoleixing: '',
        },
        fenlei: [],
        dataList: [],
        total: 1,
        pageSize: 10,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        curFenlei: '全部',
        isPlain: false,
        indexQueryCondition: '',
	      duiwumingchengOptions: [],
	      chengguoleixingOptions: [],
        timeRange: []
      }
    },
    created() {
      this.indexQueryCondition = this.$route.query.indexQueryCondition ? this.$route.query.indexQueryCondition : '';
      this.baseUrl = this.$config.baseUrl;
      this.$http.get('option/keyanduiwu/duiwumingcheng').then(res => {
        if (res.data.code == 0) {
          this.duiwumingchengOptions = res.data.data;
        }
      });
	    this.chengguoleixingOptions = '科研论文,专利,软件著作权,其他'.split(',');
      this.getFenlei();
      this.getList(1, '全部');
    },
    //方法集合
    methods: {
      add(path) {
        this.$router.push({path: path});
      },
      getFenlei() {
        this.$http.get('option/keyanduiwu/duiwumingcheng').then(res => {
          if (res.data.code == 0) {
            this.fenlei = res.data.data;
          }
        });
      },
      getList(page, fenlei, ref = '') {
		if(fenlei == '全部') this.swiperIndex = -1;
		for(let i=0;i<this.fenlei.length;i++) {
			if(fenlei == this.fenlei[i]) {
				this.swiperIndex = i;
				break;
			}
		}
        this.curFenlei = fenlei;
        if (this.curFenlei == '全部') {
          this.isPlain = false;
        } else {
          this.isPlain = true;
        }
        let params = {page, limit: this.pageSize};
        let searchWhere = {};
        if (this.formSearch.chengguomingcheng != '') searchWhere.chengguomingcheng = '%' + this.formSearch.chengguomingcheng + '%';
        if (this.formSearch.duiwumingcheng != '') searchWhere.duiwumingcheng = this.formSearch.duiwumingcheng;
        if (this.formSearch.chengguoleixing != '') searchWhere.chengguoleixing = this.formSearch.chengguoleixing;
        if (this.curFenlei != '全部') searchWhere.duiwumingcheng = this.curFenlei;
        this.$http.get('keyanchengguo/list', {params: Object.assign(params, searchWhere)}).then(res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.totalPage = res.data.data.totalPage;
			
			this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
          }
        });
      },
      curChange(page) {
        this.getList(page,this.curFenlei);
      },
      prevClick(page) {
        this.getList(page,this.curFenlei);
      },
      sizeChange(size){
        this.pageSize = size
        this.getList(1,this.curFenlei);
      },
      nextClick(page) {
        this.getList(page,this.curFenlei);
      },
      toDetail(item) {
        this.$router.push({path: '/index/keyanchengguoDetail', query: {detailObj: JSON.stringify(item)}});
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.list-preview .list-form-pv .el-input {
		width: auto;
	}

	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 9px;
		color: #eee;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner a {
		color: #eee;
		display: inline-block;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner {
		color: #fff;
		display: inline-block;
	}
	
	.category-1 .item {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 10px 0 0;
		color: #999;
		background: #efefef;
		width: 72px;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-1 .item:hover {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 10px 0 0;
		color: #999;
		background: #000;
		width: 72px;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-1 .item.active {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 10px 0 0;
		color: #999;
		background: #000;
		width: 72px;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item {
		cursor: pointer;
		padding: 0px 0;
		margin: 0 0 10px 0;
		color: #3db769;
		font-size: 14px;
		border-color: #3db769;
		line-height: 40px;
		border-radius: 30px;
		background: #ecfcf2;
		width: 100%;
		border-width: 2px;
		border-style: solid;
		text-align: center;
		height: 40px;
	}
	
	.category-2 .item:hover {
		cursor: pointer;
		border-radius: 30px;
		padding: 0px 0;
		margin: 0 0 10px 0;
		color: #fff;
		background: #3db769;
		width: 100%;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		height: 40px;
	}
	
	.category-2 .item.active {
		cursor: pointer;
		border-radius: 30px;
		padding: 0px 0;
		margin: 0 0 10px 0;
		color: #fff;
		background: #3db769;
		width: 100%;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		height: 40px;
	}
	
	.list-form-pv .el-input /deep/ .el-input__inner {
		border: 2px solid #a4d9b7;
		border-radius: 8px;
		padding: 0 10px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-select /deep/ .el-input__inner {
		border: 2px solid #a4d9b7;
		border-radius: 8px;
		padding: 0 10px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-date-editor /deep/ .el-input__inner {
		border: 2px solid #a4d9b7;
		border-radius: 8px;
		padding: 0 30px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list .index-pv1 .animation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		z-index: initial;
	}
	
	.list .index-pv1 .animation-box:hover {
		transform: 0;
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
		z-index: 1;
	}
	
	.list .index-pv1 .animation-box img {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
	}
	
	.list .index-pv1 .animation-box img:hover {
		transform: 0;
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
	}
	
	.el-pagination /deep/ .el-pagination__total {
		margin: 0 10px 0 0;
		color: #666;
		font-weight: 400;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev {
		border: none;
		border-radius: 2px;
		padding: 0 4px;
		margin: 0 5px;
		color: #3db769;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next {
		border: none;
		border-radius: 2px;
		padding: 0 4px;
		margin: 0 5px;
		color: #3db769;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0 4px;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0 4px;
		margin: 0 5px;
		color: #C0C4CC;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}
	
	.el-pagination /deep/ .el-pager .number {
		cursor: pointer;
		border-radius: 2px;
		margin: 0 5px;
		color: #666;
		background: #f4f4f5;
		display: inline-block;
		vertical-align: top;
		line-height: 28px;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number:hover {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #3db769;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #f4f4f5;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number.active {
		cursor: default;
		padding: 0 4px;
		margin: 0 5px;
		color: #3db769;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #fff;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes {
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input {
		margin: 0 5px;
		width: 100px;
		position: relative;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 25px 0 8px;
		color: #3db769;
		display: inline-block;
		font-size: 13px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
		top: 0;
		position: absolute;
		right: 0;
		height: 100%;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
		cursor: pointer;
		color: #C0C4CC;
		width: 25px;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
	}
	
	.el-pagination /deep/ .el-pagination__jump {
		margin: 0 0 0 24px;
		color: #606266;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input {
		border-radius: 3px;
		padding: 0 2px;
		margin: 0 2px;
		display: inline-block;
		width: 50px;
		font-size: 14px;
		line-height: 18px;
		position: relative;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		border-radius: 3px;
		padding: 0 3px;
		color: #3db769;
		background: #FFF;
		display: inline-block;
		width: 100%;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
		height: 28px;
	}
</style>
