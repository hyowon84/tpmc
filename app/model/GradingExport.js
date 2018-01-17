/**
 * Created by lucael on 2017-11-21.
 */


/* 배송할 주문목록 */
Ext.define('GradingExport', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'projectId',			type: 'int'},
		{name: 'project',				type: 'string'},
		{name: 'taskId',				type: 'int'},
		{name : 'no',     			type : 'int' },
		{name : 'grcode',      	type : 'string' },
		{name : 'gr_id',     		type : 'string' },
		{name : 'gr_stats',     type : 'string' },
		{name : 'gr_no',      	type : 'string' },
		{name : 'gr_name',     	type : 'string' },
		{name : 'gr_nickname',  type : 'string' },
		{name : 'gr_country',   type : 'string' },
		{name : 'gr_it_name',   type : 'string' },
		{name : 'gr_qty',      	type : 'int' },
		{name : 'gr_unit',     	type : 'string' },
		{name : 'gr_weight', 	  type : 'string' },
		{name : 'gr_metal',    	type : 'string' },
		{name : 'gr_parvalue',	type : 'string' },
		{name : 'gr_year',    	type : 'string' },
		{name : 'gr_note1',   	type : 'string' },
		{name : 'gr_note2',    	type : 'string' },
		{name : 'reg_date',    	type : 'date' }
	]
});