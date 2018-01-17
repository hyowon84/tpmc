
Ext.define('td.model.GpInfo', {
	extend: 'Ext.data.Model',
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
	]
});
