
/* 발주서 조회 페이지 목록*/
Ext.define('td.store.InvoiceList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Invoice',
	alias: 'store.InvoiceList',
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
			read		: '/resources/crud/invoice/invoice.read.php?mode=naviFindInvoice'
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


/* 발주서 아이템 목록 */
Ext.define('td.store.InvoiceItemList', {
	extend: 'Ext.data.Store',
	model : 'td.model.InvoiceItem',
	alias: 'store.InvoiceItemList',
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



/* 공구 목록 */
Ext.define('td.store.InvoiceGpList', {
	extend: 'Ext.data.Store',
	model : 'td.model.InvoiceGp',
	alias: 'store.InvoiceGpList',
	pageSize : 50,
	remoteFilter:true,
	remoteSort:true,
	autoSync : true,
	autoLoad : false,
	sorters:[
		{
			property:'GI.reg_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/invoice/invoice.read.php?mode=gpinfo',
			update : '/resources/crud/invoice/gpinfo.update.php?mode=grid'
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


/* 공구 메모  */
Ext.define('td.store.InvoiceGpMemo', {
	extend: 'Ext.data.Store',
	model : 'td.model.InvoiceGpMemo',
	alias: 'store.InvoiceGpMemo',
	pageSize : 50,
	remoteFilter:true,
	remoteSort:true,
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
			read : '/resources/crud/invoice/invoice.read.php?mode=gpmemo'
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



/* 발주서 아이템 목록 */
Ext.define('td.store.InvoiceOrderItemList', {
	extend: 'Ext.data.Store',
	model : 'td.model.InvoiceOrderItem',
	alias: 'store.InvoiceOrderItem',
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
			read : '/resources/crud/invoice/invoice.read.php?mode=orderitems',
			update : '/resources/crud/invoice/product.update.php'
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




/************8***********************  송금탭 ********************************/
//
//
///* 송금예정 발주서 목록*/
//Ext.define('td.store.invoiceTodoWire', {
//	extend: 'Ext.data.Store',
//	model : 'td.model.Invoice',
//	alias: 'store.invoiceTodoWire',
//	pageSize : 50,
//	remoteSort: true,
//	autoLoad : false,
//	autoSync : true,
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
//			read		: '/resources/crud/invoice/invoice.read.php?mode=WireTodoInvoice',
//			update	: '/resources/crud/invoice/invoice.update.php',
//			destroy	: '/resources/crud/invoice/invoice.delete.php'
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
//
//
///* 발주서 발주예정 목록*/
//Ext.define('td.store.MakeInvoiceList',{
//	extend: 'Ext.data.ArrayStore',
//	model : 'td.model.invoiceEndWire',
//	alias: 'store.MakeInvoiceList',
//	groupField: 'Group',
//	sorters:	{	property:'reg_date',		direction:'DESC'}
//});