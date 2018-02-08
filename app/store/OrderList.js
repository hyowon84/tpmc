
Ext.define('td.store.OrderList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Order',
	alias: 'store.OrderList',
	groupField: 'Group',
	pageSize : 50,
	remoteSort: true,
	autoLoad : true,
	autoSync : true,
	sorters: [
		{
			property: 'CL.od_date',
			direction: 'DESC'
		},
		{
			property: 'CL.od_id',
			direction: 'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
			
		},
		api : {
			read : '/resources/crud/order/order.read.php?mode=orderlist',
			update : '/resources/crud/order/order.update.php'
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
	
		//api : {
		//	read	: '/adm/extjs/order/json/order.php?mode=orderlist',
		//	update: '/adm/extjs/order/orderdtl_update.php'
		//},
});

/* 변경로그 */
Ext.define('td.store.OrderLog', {
	extend: 'Ext.data.Store',
	//model : 'td.model.Order',
	alias: 'store.OrderLog',
	pageSize : 10,
	autoLoad : false,
	remoteSort: true,
	fields : [
		{ name : 'memo',			type: 'string'},
		{ name : 'key_id',		type: 'string'},
		{ name : 'value',			type: 'string'},
		{ name : 'reg_date',		type: 'date'},
		{ name : 'mb_name',		type: 'string'}
	],
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
			read : '/resources/crud/log/orderlog.php'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


/* SMS 로그 */
Ext.define('td.store.SmsLog', {
	extend: 'Ext.data.Store',
	//model : 'td.model.Order',
	alias: 'store.SmsLog',
	pageSize : 10,
	autoLoad : false,
	remoteSort: true,
	fields : [
		{ name : 'wr_no',			type: 'string'},
		{ name : 'wr_message',	type: 'string'},
		{ name : 'wr_datetime',	type: 'date'},
		{ name : 'wr_target',	type: 'string'},
		{ name : 'wr_reply',		type: 'string'}
	],
	sorters:[
		{
			property:'wr_datetime',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/log/smslog.php'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


/* 입금로그 */
Ext.define('td.store.BankLog', {
	extend: 'Ext.data.Store',
	//model : 'td.model.Order',
	alias: 'store.BankLog',
	pageSize : 10,
	autoLoad : false,
	remoteSort: true,
	fields : [
		{ name : 'tr_date',				type: 'string'},
		{ name : 'tr_time',				type: 'string'},
		{ name : 'input_price',		type: 'int'},
		{ name : 'trader_name',		type: 'string'}
	],
	sorters:[
		{
			property:'BANK_STAT',
			direction:'DESC'
		},
		{
			property:'tr_date',
			direction:'DESC'
		},
		{
			property:'tr_time',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/log/banklog.php'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}
	}
});


//입출금관리내역에서 사용하는 주문그리드
Ext.define('td.store.BankLinkOrder', {
	extend: 'Ext.data.Store',
	model : 'td.model.Order',
	alias: 'store.OrderList',
	groupField: 'Group',
	pageSize : 50,
	remoteSort: true,
	autoLoad : true,
	autoSync : true,
	sorters: [
		{
			property: 'CL.od_date',
			direction: 'DESC'
		},
		{
			property: 'CL.od_id',
			direction: 'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read	: '/resources/crud/order/order.read.php?mode=BankLinkOrder',
			update: '/resources/crud/order/BankLinkOrder.update.php'
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