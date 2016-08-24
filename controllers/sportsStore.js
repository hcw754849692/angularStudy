angular.module('sportsStore')
//商品数据

//POST请求的URL，添加了cart服务的依赖，可以获得用户请求的产品详情。添加到控制器的行为叫作sendOrder,它接受运输详情作为参数
.constant("dataUrl", "http://localhost:5500/products")
.constant("orderUrl","http://localhost:5500/order")
.controller("sportsStoreCtrl",function($scope,$http, $location,dataUrl, orderUrl, cart){
	$scope.data = {
		/*products:[
			{ name: "Product #1", description: "A product", category: "Category #1", price: 100},
			{ name: "Product #2", description: "B product", category: "Category #1", price: 110},
			{ name: "Product #1", description: "AB product", category: "Category #1", price: 100},
			{ name: "Product #2", description: "AC product", category: "Category #1", price: 110},
			{ name: "Product #3", description: "C product", category: "Category #2", price: 210},
			{ name: "Product #4", description: "D product", category: "Category #3", price: 202},
			{ name: "Product #5", description: "E product", category: "Category #3", price: 202}]*/
	};
	//数据加载
	$http.get(dataUrl)
		.success(function(data){
			$scope.data.products = data;
		})
		.error( function(error){
			$scope.data.error = error;
		});
	$scope.sendOrder = function(shippingDetails){
		//创建运输详情对象的副本。必须做的是定于products属性来引用购物车中产品的数组
		var order = angular.copy(shippingDetails);
		order.products = cart.getProducts();
		$http.post(orderUrl, order)
			//为了请求成功，我将新创建的订单对象的id赋给作用域属性并清除购物车的内容
			.success(function(data){
				$scope.data.orderId = data.id;
				cart.getProducts().length = 0;
			})
			.error(function(error){
				$scope.data.orderError = error;
			}).finally(function(){
				$location.path("/complete");
			});
	}
});