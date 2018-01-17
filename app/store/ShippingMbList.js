
/*회원정보스토어*/
Ext.define('td.store.ShippingMbList', {
	extend: 'Ext.data.Store',
	requires : ['td.controller.TdController'],
	fields : [
		{	name : 'mb_nick'	},
		{	name : 'mb_name'	},
		{	name : 'hphone'		},
		{	name : 'SUM_QTY',					sortDir: 'DESC', sortType: 'asInt', mapping: 'SUM_QTY',					type: 'int'},
		{	name : 'SUM_TOTAL',				sortDir: 'DESC', sortType: 'asInt', mapping: 'SUM_TOTAL',				type: 'int'},
		{	name : 'S40_SUM_QTY',			sortDir: 'DESC', sortType: 'asInt', mapping: 'S40_SUM_QTY',			type: 'int'},
		{	name : 'S40_SUM_TOTAL',		sortDir: 'DESC', sortType: 'asInt', mapping: 'S40_SUM_TOTAL',		type: 'int'},
		{	name : 'NS40_SUM_QTY',		sortDir: 'DESC', sortType: 'asInt', mapping: 'NS40_SUM_QTY',		type: 'int'},
		{	name : 'NS40_SUM_TOTAL',	sortDir: 'DESC', sortType: 'asInt', mapping: 'NS40_SUM_TOTAL',	type: 'int'}
	],
	sorters:[
		{
			property:'S40_SUM_QTY',
			direction:'DESC'
		}
	],
	alias: 'store.ShippingMbList',
	pageSize : 500,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/shipping/shipping.read.php?mode=mblist'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}		
	}
});

