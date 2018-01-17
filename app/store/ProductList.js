
Ext.define('td.store.ProductList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Product',
	alias: 'store.ProductList',
	pageSize : 200,
	autoLoad : false,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'T.gp_update_time',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {
			
		},
		api : {
			read : '/resources/crud/product/product.read.php',
			update : '/resources/crud/product/product.update.php'
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




/*유틸페이지 상품목록 콤보박스*/
Ext.define('td.store.product', {
	extend: 'Ext.data.Store',
	model : 'td.model.Product',
	alias: 'store.product',
	pageSize : 200,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'CL.od_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/product/product.read.php?mode=editor'
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