angular.module('myApp', ['ui.bootstrap', 'dataGrid', 'pagination'])
	
	.service('insuranceService', function () { })
    .controller('MainCtrl', ['$scope', '$timeout', 'insuranceService', '$filter', 

    	function MainCtrl($scope, $timeout, insuranceService, $filter) {

		    $scope.mostrarTabla = false;
			$scope.loadingGif = true;
			$scope.showLoginError = false;

			$timeout( function(){
				$scope.loadingGif = false;
			}, 2000 );
			
			$scope.gridOptions = {
	            data: [],
	            urlSync: true,
				sort: {
                   predicate: 'name',
                   direction: 'asc'
				}
	        };
			
			
			
			$scope.gridOptions2 = {
	            data: [],
	            urlSync: true
	        };
			
			$scope.gridOptions3 = {
	            data: [],
	            urlSync: true
	        };
	
	        $scope.roleOptions = [
	        	{
	        		value: "admin",
	        		text: "admin"
	        	},
	        	{
	        		value: "user",
	        		text: "user"
	        	}
	        ]
			
			$scope.installmentPaymentOptions = [
				{
					value: false,
					text: "No"
				},
				{
					value: true,
					text: "Yes"
				}
			]
				
			$scope.showContent = function(loginEmail) {

				$scope.loadingGif = true;
				
				$timeout( function(){
					$scope.loadingGif = false;
				}, 2000 );
			
				insuranceService.getClients()
				.then(function (data) {

					if(data) {
						$scope.clients = data;
						var arrayOfClients = $scope.clients

						var filtered = jQuery.grep(arrayOfClients, function( item, index ) {
						  return ( item.email == loginEmail);
						});
						
						$scope.successLogin = filtered.length > 0 ? true : false;
						
						if($scope.successLogin) {
							$scope.mostrarTabla = true;
							$scope.gridOptions.data = data;
						}
						else {
							$scope.showLoginError = true;
						}
					}
					else {
						console.log("error loading clients");
					}

				}, function (error) {
					console.log("error loading clients");
		    	});
				
				insuranceService.getPolicies()
				.then(function (data) {

					if(data) {
						$scope.policies = data;
						$scope.gridOptions2.data = data;
					}
					else {
						console.log("error loading policies");
					}

				}, function (error) {
					console.log("error loading policies");
		    	});

			};
			
			$scope.goBack = function() {
				$scope.showLoginError = false;
			}

			$scope.exportToCsv = function (currentData) {
        		var exportData = [];
        		currentData.forEach(function (item) {
            		exportData.push({
                		'Id': item.id,
                		'Name': item.name,
                		'Email': item.email,
                		'Rol': item.role
            		});
        		});
        		JSONToCSVConvertor(exportData, 'Export', true);
    		}
			
			$scope.openPoliciesModal = function (clientId) {
				$("#policiesModal").modal("show");
				$scope.loadingGifModal = true;
				$scope.currentClientId = clientId;
				$timeout( function(){
					$scope.loadingGifModal = false;
				}, 2000 );
			
				insuranceService.getPolicies()
					.then(function (data) {

						if(data) {
							$scope.policies = data;
							var array = $scope.policies

							var filtered = jQuery.grep(array, function( item, index ) {
							  return ( item.clientId == clientId);
							});
							
							$scope.hasPolicies = filtered.length > 0 ? true : false;
							
							$scope.gridOptions3.data = filtered;
						}
						else {
							console.log("error loading policies");
						}

					}, function (error) {
						console.log("error loading policies");
					});
			}

		}]);

