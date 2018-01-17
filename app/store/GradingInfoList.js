
/*공구 목록*/
Ext.define('td.store.GradingInfoList', {
	extend: 'Ext.data.Store',
	model : 'td.model.GpInfo',
	alias: 'store.GradingInfoList',
	pageSize : 100,
	remoteFilter:true,
	remoteSort:true,
	fields : [
		'grcode',
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
			property:'GR.reg_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read : '/resources/crud/grading/grading.read.php?mode=gradinginfo',
			update : '/resources/crud/grading/grading.update.php',
			destroy : '/resources/crud/grading/gradingcode.delete.php'
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