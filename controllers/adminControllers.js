angular.module('sportsStoreAdmin')
.constant('authUrl', "http://localhost:5500/users/login")
.constant("ordersUrl","http://localhost:5500/order")
.controller("authCtrl",function($scope, $http, $location, authUrl){
	$scope.authenticate = function(user,pass){
		$http.post(authUrl,{
			username:user,
			password:pass
		},{
			withCredentials:true
		}).success(function(data){
			$location.path("/main");
		}).error(function(error){
			$scope.authenticationError = error;
		});
	}
})
.controller("mainCtrl", function($scope){
	//视图使用ng-repeat指令为每个作用域screens数组的值生成元素
	$scope.screens = ['Products','Orders'];
	//加载后的高亮
	$scope.current = $scope.screens[0];
	//用于改变现实的视图
	//$index返回当前项在数组中的位置
	$scope.setScreen = function(index){
		$scope.current = $scope.screens[index];
	};
	//通过getScreen行为显示
	//当前被选中的导航值与我在本段开头定义的视图一一映射
	$scope.getScreen = function(){
		return $scope.current == "Products"? "/views/adminProducts.html":"/views/adminOrders.html";
	};
})
.controller("ordersCtrl",function($scope, $http, ordersUrl){
	$http.get(ordersUrl,{
		//在调用$http.get方法时设置了withCredentials配置项，和执行验证一样，这是确保浏览器包含安全的cookie返回Deployd验证请求
		withCredentials: true
	})
	.success(function(data){
		$scope.orders =  data;
	})
	.error(function(error){
		$scope.error = error;
	});
	$scope.selectedOrder;
	$scope.selectOrder = function(order){
		$scope.selectedOrder = order;
	};
	//计算订单产品数的总和
	$scope.calTotal = function(order){
		var total = 0;
		for(var i = 0;i<order.products.length; i++){
			total += order.products[i].count * order.products[i].price;
		}
		return total;
	}
});