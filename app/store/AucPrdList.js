
//경매상품목록
Ext.define('td.store.AucPrdList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Product',
	alias: 'store.AucPrdList',
	pageSize : 200,
	autoLoad : false,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'AL.ac_code',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/auction/read.php?mode=Auction',
			update : '/resources/crud/auction/update.php'
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



//경매입찰목록
Ext.define('td.store.AucBidList', {
	extend: 'Ext.data.Store',
	model : 'td.model.Product',
	alias: 'store.AucBidList',
	pageSize : 200,
	autoLoad : false,
	remoteSort: true,
	autoSync : true,
	fields : [
		{	name : 'ac_code',					type: 'string'},
		{	name : 'it_id',						type: 'string'},
		{	name : 'mb_id',						type: 'string'},
		{	name : 'mb_nick',					type: 'string'},
		{	name : 'mb_name',					type: 'string'},
		{	name : 'mb_hp',						type: 'string'},
		{	name : 'bid_qty',					type: 'int'},
		{	name : 'bid_price',				type: 'int'},
		{	name : 'bid_last_price',	type: 'int'},
		{	name : 'bid_stats',				type: 'string'},
		{	name : 'bid_date',				type: 'string'}
	],
	sorters:[
		{
			property:'bid_last_price',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/auction/read.php?mode=BidList'
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