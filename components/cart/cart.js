angular.module('cart', [])
.factory("cart",function(){

	var cartData = [];

	return{

		//添加指定的产品到购物车，或者如果购物车已经包含了该产品，就增加所需要的数量
		addProduct: function(id, name, price){
			var addedToExistingItem = false;
			for(var i = 0; i< cartData.length;i++){
				if(cartData[i].id == id){
					cartData[i].count++;
					addedToExistingItem = true;
					break;
				}
			}
			if(!addedToExistingItem){
				cartData.push({
					count: 1, id: id, price: price, name: name
				});
			}
		},
		//删除指定ID的产品
		removeProduct : function(id){
			for(var i = 0; i< cartData.length; i++){
				if(cartData[i].id == id){
					cartData.splice(i, 1);
					break;
				}
			}
		},
		//返回购物车中对象的数组
		getProducts: function(){
			return cartData;
		}
	}
})

/*
	指令名：cartSummary
*/
.directive("cartSummary", function(cart){
	return{
		//指定指令如何使用。我用了值E，它说明该指令只能作为元素应用，最常见的值是EA,表示指令可作为元素或属性被应用
		restrict: "E",
		//指定将被插入指令的元素内容的局部视图
		templateUrl: "components/cart/cartSummary.html",
		//指定向局部视图提供数据和行为的控制器
		controller: function($scope){

			var cartData = cart.getProducts();

			$scope.total = function(){
				var total = 0;
				for(var i = 0; i< cartData.length; i++){
					total += (cartData[i].price*cartData[i].count);
				}
				return total;
			}

			$scope.itemCount = function(){
				var total = 0 ;
				for(var i = 0;i<cartData.length; i++){
					total += cartData[i].count;
				}
				return total;
			}
		}
	}
})