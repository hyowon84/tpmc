
/*공구 목록*/
Ext.define('td.store.GpInfoList', {
	extend: 'Ext.data.Store',
	model : 'td.model.GpInfo',
	alias: 'store.GpInfoList',
	storeId: 'GpInfoList',
	fields : [
		{	name : 'gpcode',			type: 'string'},
		{	name : 'gpcode_name',	type: 'string'},
		{	name : 'stats',			type: 'string'},
		{	name : 'start_date',		type: 'date'},
		{	name : 'end_date',		type: 'date'},
		{	name : 'reg_date',		type: 'date'}
	],
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'reg_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
			
		},
		api : {
			read : '/resources/crud/gpinfo/read.php?mode=product'
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



/*공동구매 상태값*/
Ext.define('td.store.gpinfo_stats', {
	extend: 'Ext.data.ArrayStore',
	//extend: 'Ext.data.Store',
	model: 'td.model.comboDefault',
	storeId: 'gpinfo_stats',
	alias: 'store.gpinfo_stats',
	data: [
		['공구접수','00'],
		['주문마감','05'],
		['미발주포함','07'],
		['발주신청','10'],
		['송금완료','20'],
		['통관완료','30'],
		['국내도착','40'],
		['공구종료','99']
	]
});


