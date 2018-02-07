/**
 * Created by lucae on 2018-01-10.
 */

//통관예정 발주서 목록
Ext.define('td.store.ClearanceTodoInvoiceList', {
	extend: 'Ext.data.Store',
	model: 'td.model.Invoice',
	alias: 'store.ClearanceTodoInvoiceList',
	pageSize : 100,
	autoSync : false,
	autoLoad : true,
	remoteSort: true,
	sorters:[
		{
			property: "GI.reg_date",
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
		},
		api : {
			read		: '/resources/crud/invoice/invoice.read.php?mode=ClearanceTodoInvoice',
			update	: '/resources/crud/invoice/invoice.update.php',
			destroy	: '/resources/crud/invoice/invoice.delete.php'
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


//통관완료 발주서 목록
Ext.define('td.store.ClearanceEndInvoiceList', {
	extend: 'Ext.data.Store',
	model: 'td.model.ClearanceEndInvoice',
	alias: 'store.ClearanceEndInvoiceList',
	groupField: 'Group',
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
			read		: '/resources/crud/invoice/invoice.read.php?mode=ClearanceEndInvoice',
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


/* 통관완료 발주서 아이템 목록 */
Ext.define('td.store.ClearanceItemList', {
	extend: 'Ext.data.Store',
	model : 'td.model.InvoiceItem',
	alias: 'store.ClearanceItemList',
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
			read 		: '/resources/crud/invoice/invoice.read.php?mode=invoice_item',
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



////좌측 상단 통관예정 발주서 목록
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
//			read		: '/resources/crud/invoice/stock.php?mode=invoiceTodoClearance',
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
