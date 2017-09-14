angular.module('myApp').service('insuranceService', insuranceService);

	function insuranceService ($http, $q) {

		var self = this;
		self.UI = null;

		// Methods
		
		self.getClients = getClients;
		self.getPolicies = getPolicies;
		self.getPoliciesByClientId = getPoliciesByClientId;

		function getClients() {
			var url = 'http://www.mocky.io/v2/5808862710000087232b75ac';

            return $http.get(url).then(function (success) {
                if (success !== '') {
                    return success.data.clients;
                }
            });
		}

		function getPolicies() {
			var url = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

            return $http.get(url).then(function (success) {
                if (success !== '') {
                    return success.data.policies;
                }
            });
		}

		function getPoliciesByClientId(clientId) {
			var url = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

            return $http.get(url).then(function (success) {
                if (success !== '') {
					return success.data.policies;
                }
            });
		}
		
		return self;		
	}