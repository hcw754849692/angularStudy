angular.module('sportsStore')
.controller("cartSummaryController", function($scope, cart){

	$scope.cartData = cart.getProducts();
	//显示购物车商品信息
	$scope.total = function(){
		var total = 0;
		for(var i=0; i< $scope.cartData.length; i++){
			total += ($scope.cartData[i].price * $scope.cartData[i].count);
		}
		return total;
	}
	//删除购物车商品
	$scope.remove = function(id){
		cart.removeProduct(id);
	}
});