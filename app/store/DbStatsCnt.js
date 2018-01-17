

//주문내역 상태값별 카운팅
Ext.define('td.store.DbStatsCnt', {
	extend: 'Ext.data.Store',
	alias: 'store.DbStatsCnt',
	storeId: 'DbStatsCnt',
	fields: [
		{	name : 'colName',			type: 'string'},
		{	name : 'data1',				type: 'string'}
	],	
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	proxy : {
		type : 'ajax',
		extraParams : {
			
		},
		api : {
			read : '/resources/crud/dashboard/read.php?mode=statscnt'
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


Ext.define('td.store.DbOldInvoice', {
	extend: 'Ext.data.Store',
	alias: 'store.DbOldInvoice',
	storeId: 'DbOldInvoice',
	fields: [
		{	name : 'colName',			type: 'string'},
		{	name : 'data1',				type: 'string'}
	],
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/dashboard/read.php?mode=oldinvoice'
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



Ext.define('td.store.DbVisitor', {
	extend: 'Ext.data.Store',
	alias: 'store.DbVisitor',
	storeId: 'DbVisitor',
	fields: [
		{	name : 'colName',			type: 'string'},
		{	name : 'data1',				type: 'string'}
	],
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	sorters:[
		{
			property: 'vi_id',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/dashboard/read.php?mode=visitinfo'
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

