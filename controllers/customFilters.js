angular.module('customFilers', [])
	//商品分类
	.filter("unique",function(){
		return function(data, propertyName){
			if(angular.isArray(data) && angular.isString(propertyName)){
				var results = [];
				var keys = {};
				for(var i = 0; i < data.length; i++){
					var val = data[i][propertyName];
					if(angular.isUndefined(keys[val])){
						keys[val] = true;
						results.push(val);
					}
				}
				return results;
			}else{
				return data;
			}
		}
	})
	//从数组中返回一系列元素，与产品页面一致。过滤器接收参数有当前被选页面（它用于确认返回中的起始索引）和页面尺寸（它用于确认结束索引）
	.filter("range",function($filter){
		return function(data,page,size){
			if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
				var start_index = (page-1) * size;
				if(data.length < start_index){
					return [];
				}else{
					//important，用splice方法选择一部分数据数组，然后将它传入limitTo过滤器以选择不过超过该数量的条目显示在页面上。过滤器limitTo确保跨过数组末尾时没有问题，并将在制定数字不可用时返回较少条目
					return $filter("limitTo")(data.splice(start_index),size);
				}
			}else{
				return data;
			}
		}
	})
	//指令ng-repeat使之易于生成内容，但它仅在数组数据上工作。如果数据数组可以被显示在三个页面上，那pageCount过滤器的结果可能会是包含值1、2和3的数组
	.filter("pageCount", function(){
		return function(data,size){
			if(angular.isArray(data)){
				var result = [];
				for(var i = 0;i < Math.ceil(data.length/size); i++){
					result.push(i);
				}
				return result;
			}else{
				return data;
			}
		}
	});