/**
 * Created by lucae on 2018-01-10.
 */

//입고예정 발주서 목록
Ext.define('td.store.WarehousingTodoInvoiceList', {
	extend: 'Ext.data.Store',
	model: 'td.model.Invoice',
	alias: 'store.WarehousingTodoInvoiceList',
	pageSize : 100,
	autoSync : false,
	autoLoad : true,
	remoteSort: true,
	sorters:[
		{
			property: "cr_id",
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read		: '/resources/crud/invoice/invoice.read.php?mode=ClearanceEndInvoice'
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


//입고완료 발주서 목록
Ext.define('td.store.WarehousingEndInvoiceList', {
	extend: 'Ext.data.Store',
	model: 'td.model.WarehousingEndInvoice',
	alias: 'store.WarehousingEndInvoiceList',
	groupField: 'Group',
	pageSize : 100,
	autoSync : false,
	autoLoad : true,
	remoteSort: true,
	sorters:[
		{
			property: "wr_id",
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read		: '/resources/crud/invoice/invoice.read.php?mode=WarehousingEndInvoice',
			update	: '/resources/crud/invoice/invoice.update.php'	//stockinfo_update.php
			//destroy	: '/resources/crud/invoice/invoice.delete.php'
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


/* 입고완료 발주서 아이템 목록 */
Ext.define('td.store.WarehousingItemList', {
	extend: 'Ext.data.Store',
	model : 'td.model.InvoiceItem',
	alias: 'store.WarehousingItemList',
	pageSize : 50,
	remoteSort: true,
	autoLoad : false,
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
			read 		: '/resources/crud/invoice/invoice.read.php?mode=ClearanceEndItem',
			update	: '/resources/crud/invoice/invoice_item.update.php'
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



////좌측 상단 입고예정 발주서 목록
//Ext.define('store.invoice_list',{
//	extend: 'Ext.data.Store',
//	fields:['name','value'],
//	pageSize : 300,
//	//model	:	'model_stockManage',
//	fields : [
//		'gpcode',
//		'iv_id',
//		'iv_dealer',
//		'iv_order_no',
//		'iv_receipt_link',
//		'iv_date',
//		'od_exch_rate',
//		'money_type',
//		'iv_tax',
//		'iv_shippingfee',
//		'iv_memo',
//		'admin_id',
//		'admin_name',
//		'reg_date'
//	],
//	remoteSort: true,
//	autoLoad : false,
//	autoSync : true,
//	//remoteFilter: true,
//	sorters:[
//		{
//			property:'reg_date',
//			direction:'DESC'
//		}
//	],
//	proxy : {
//		type : 'ajax',
//		extraParams : {
//
//		},
//		api : {
//			read		: '/resources/crud/invoice/stock.php?mode=invoiceTodoWarehousing',
//			update	: '/resources/crud/invoice/stockinfo_update.php',
//			destroy	: '/resources/crud/invoice/invoice_info.delete.php',
//		},
//		reader : {
//			rootProperty : 'data',
//			totalProperty : 'total'
//		},
//		writer : {
//			type : 'json',
//			writeAllFields : true,
//			encode : true,
//			rootProperty : 'data'
//		}
//	}
//});
