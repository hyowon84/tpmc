
/*공구 목록*/
Ext.define('td.store.ShippingGpInfoList', {
	extend: 'Ext.data.Store',
	model : 'td.model.GpInfo',
	alias: 'store.ShippingGpInfoList',
	pageSize : 100,
	remoteFilter:true,
	remoteSort:true,
	autoSync : true,
	fields : [
		'gpcode_name',
		'gpcode',
		{name: 'SUM_PAY',			sortDir: 'DESC', sortType: 'asInt', mapping: 'SUM_PAY',			type: 'int'},
		{name: 'SUM_QTY',			sortDir: 'DESC', sortType: 'asInt', mapping: 'SUM_QTY',			type: 'int'},
		{name: 'SUM_IV_QTY',	sortDir: 'DESC', sortType: 'asInt', mapping: 'SUM_IV_QTY',	type: 'int'},
		{name: 'NEED_IV_QTY',	sortDir: 'DESC', sortType: 'asInt', mapping: 'NEED_IV_QTY',	type: 'int'},
		{name: 'ITC_CNT',			sortDir: 'DESC', sortType: 'asInt', mapping: 'ITC_CNT',			type: 'int'},
		{name: 'IVC_CNT',			sortDir: 'DESC', sortType: 'asInt', mapping: 'IVC_CNT',			type: 'int'},
		{name: 'stats',				type: 'string'},
		{name: 'memo',				type: 'string'}
	],
	sorters:[
		{
			property:'GI.reg_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read : '/resources/crud/invoice/invoice.read.php?mode=gpinfo'
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