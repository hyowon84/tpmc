
Ext.define('td.store.BankStatement', {
	extend: 'Ext.data.Store',
	alias: 'store.BankStatement',
	pageSize : 50,
	remoteSort: true,
	autoLoad : false,
	autoSync : false,
	fields : [
		{ name : 'number',				type : 'int' },
		{ name : 'account_name',	type : 'string' },
		{	name : 'tr_date',				type : 'date'},
		{	name : 'tr_time',				type : 'string'},
		{ name : 'tr_type',				type : 'string' },
		{ name : 'output_price',	type : 'int' },
		{ name : 'input_price',		type : 'int' },
		{ name : 'trader_name',		type : 'string' },
		{ name : 'remain_money',	type : 'int' },
		{ name : 'bank',					type : 'string' },
		{ name : 'bank_type',			type : 'string' },
		{ name : 'tax_type',			type : 'string' },
		{ name : 'tax_no',				type : 'string' },
		{ name : 'tax_refno',			type : 'string' },
		{ name : 'admin_link',		type : 'string' },
		{ name : 'admin_memo',		type : 'string' }
	],
	sorters:[
		{
			property:'BD.tr_date',
			direction:'DESC'
		},
		{
			property:'BD.tr_time',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/bank/bank.read.php?mode=banklist',
			update : '/resources/crud/bank/bank.update.php'
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