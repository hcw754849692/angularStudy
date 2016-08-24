angular.module("sportsStore")
	.constant("productListActiveClass", "btn-primary") //高亮选择
	.constant("productListPageCount" ,3) //分页
	.controller("productListCtrl",function($scope,$filter, productListActiveClass, productListPageCount, cart){
		//导航栏、分页按钮高亮效果
		var selectedCategory = null;
		//添加分页
		$scope.selectedPage = 1;
		$scope.pageSize = productListPageCount;

		$scope.selectCategory = function(newCategory){
			selectedCategory = newCategory;
			$scope.selectedPage = 1;
		}
		$scope.selectPage = function(newPage){
			$scope.selectedPage = newPage;
		}

		$scope.categoryFilterFn = function(product){
			return selectedCategory == null ||
				product.category == selectedCategory;
		}
		//导航栏高亮显示
		$scope.getCategoryClass = function(category){
			return selectedCategory == category ? productListActiveClass: "";
		}
		//分页高亮显示
		$scope.getPageClass = function(page){
			return $scope.selectedPage == page ? productListActiveClass: "";
		}

		//购物车价格显示
		$scope.addProductToCart = function(product){
			cart.addProduct(product.id, product.name, product.price);
		}

	});