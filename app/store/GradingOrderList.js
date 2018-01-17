
Ext.define('td.store.GradingOrderList', {
	extend: 'Ext.data.Store',
	model: 'GradingExport',
	alias: 'store.GradingOrderList',
	groupField: 'project',
	pageSize : 100,
	autoSync : false,
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property: "GI.reg_date",
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read : '/resources/crud/grading/grading.read.php?mode=ordered',
			update : '/resources/crud/grading/grading.update.php'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		},
		writer : {
			type : 'json',
			writeAllFields : true,
			encode : true,
			rootProperty : 'data'
		}
	}
});



Ext.define('td.store.GradedOrderList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Order',
	alias: 'store.GradedOrderList',
	groupField: 'project',
	pageSize : 100,
	autoSync : false,
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property: "GI.reg_date",
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read : '/resources/crud/grading/grading.read.php?mode=complete'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


Ext.define('td.store.GradingExportList',{
	extend: 'Ext.data.ArrayStore',
	model: 'GradingExport',
	alias: 'store.GradingExportList',
	groupField: 'project'
	//sorters:	{	property:'od_date',		direction:'DESC'}
});

