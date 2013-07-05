var ptCalc = angular.module('PT-Calculator', []);

ptCalc.controller('PtCalcCtrl', ['$scope', function ($scope) {
	
	var storageService = {
		compressionRate: 0.6,

		compression: function (backupData) {
			return Math.ceil(backupData * this.compressionRate);
		},

		deltaEOT: function(storage, yrChange, dlChange) {
			// BD*(1+Annual Data Growth)*Daily Change Rate (%)
			var annualGrowth =  1 + yrChange;
			// console.log('annualGrowth:', annualGrowth)
			return storage * annualGrowth * dlChange;
		}
	};

	$scope.totalStorage = function(calc) {
		// (Compression*(1+Annual Growth)+Delta
		// *No of Daily Backups+Delta*1.3
		// *No of Weekly Backups+Delta*1.4
		// *No of Monthly backups+Delta*1.5
		// *No of Yearly Backup)
		
		var s = storageService;
		var deltaEOT = function() {
			var delta = s.deltaEOT(calc.storage, calc.yrChange, calc.dlChange);
			// console.log('deltaEOT', delta);
			return delta;
		};

		var compressionWithDelta = function() {
			return s.compression(calc.storage) + deltaEOT();
		}; 
		// console.log('compressionWithDelta:', compressionWithDelta);
		
		var dlBackupsWithDelta  = function() {
			return (calc.dlBackups + deltaEOT())*1.3;
		}; 

		var wkBackupsWithDelta = function() {
			return (calc.wkBackups + deltaEOT())*1.4;
		};

		var mthBackupsWithDelta = function() {
			return (calc.mthBackups + deltaEOT())*1.5;
		};

		var tstorage = compressionWithDelta() * dlBackupsWithDelta() * wkBackupsWithDelta() * mthBackupsWithDelta() * calc.yrBackups;
		return Math.floor(tstorage);
		// return calc.wkBackups * calc.storage;
	};

	$scope.calc = {
		storage: 0,
		wkBackups: 1,
		yrBackups: 1,
		mthBackups: 1,
		dlBackups: 1,
		yrChange: 0.01,
		dlChange: 0.01
	};

}])