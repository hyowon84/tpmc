
Ext.define('td.store.ShippingOrderList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Order',
	alias: 'store.ShippingOrderList',
	groupField: 'project',
	pageSize : 100,
	autoSync : false,
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property: "od_date",
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read : '/resources/crud/shipping/shipping.read.php?mode=orderlist',
			update : '/resources/crud/shipping/shipping.update.php'
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



Ext.define('td.store.ShipedOrderList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Order',
	alias: 'store.ShipedOrderList',
	groupField: 'project',
	pageSize : 100,
	autoSync : false,
	autoLoad : false,
	remoteSort: true,
	sorters:[
		{
			property: "od_date",
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read : '/resources/crud/shipping/shipping.read.php?mode=shipedlist'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});




