/**
 * Created by lucae on 2018-01-10.
 */

//통관예정 발주서 목록
Ext.define('td.store.ClearanceTodoInvoiceList', {
	extend: 'Ext.data.Store',
	model: 'td.model.Invoice',
	alias: 'store.ClearanceTodoInvoiceList',
	pageSize : 100,
	autoSync : true,
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
	autoSync : true,
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
			update	: '/resources/crud/invoice/clearance.update.php'	//stockinfo_update.php
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
	pageSize : 100,
	remoteSort: true,
	autoLoad : false,
	autoSync : true,
	sorters:[
		{
			property:'II.gpcode',
			direction:'ASC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read 		: '/resources/crud/invoice/invoice.read.php?mode=',
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

