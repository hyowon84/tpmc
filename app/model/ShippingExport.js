/**
 * Created by lucael on 2017-11-21.
 */


/* 배송할 주문목록 */
Ext.define('ShippingExport', {
	extend: 'Ext.data.Model',
	idProperty: 'taskId',
	fields: [
		{name: 'projectId',		type: 'int'},
		{name: 'project',			type: 'string'},
		{name: 'taskId',			type: 'int'},
		{name: 'gpcode',			type: 'string'},
		{name: 'gpcode_name',	type: 'string'},
		{name: 'stats',			type: 'string'},
		{name: 'gpstats',			type: 'string'},
		{name: 'gpstats_name',	type: 'string'},
		{name: 'od_id',			type: 'string'},
		{name: 'clay_id',			type: 'string'},
		{name: 'gpcode_name',	type: 'string'},
		{name: 'it_id',			type: 'string'},
		{name: 'it_name',			type: 'string'},
		{name: 'it_org_price',	type: 'float'},
		{name: 'it_qty', 			type: 'int'},
		{name: 'total_price',	type: 'int'},
		{name: 'od_date',			type: 'date'}
	]
});