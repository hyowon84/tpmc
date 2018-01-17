
Ext.define('td.view.product.AuctionMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.AuctionMain',
	requires:[
		'td.view.product.ProductMainController',
		'td.store.Local',
		'td.view.combo.Product',
		'td.store.mbinfo',
		'td.store.AucPrdList',
		'td.view.grid.AucPrdList',
		'td.view.grid.AucBidList'
	],
	controller:'ProductMainController',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '경매상품관리',
	bodyPadding:'5 5 5 5',
	width: '100%',
	layout: 'border',
	defaults: {
		collapsible: true,
		split: true,
		frame: false,
		style: 'float:left; margin:0px; padding:0px;',
		scrollable: true
	},
	items: [
		{
			id : 'auc_auction',
			layout: 'fit',
			title : '경매상품 목록',
			collapsible: false,
			region: 'west',
			scrollable: false,
			width : '70%',
			items : [
				{
					xtype: 'AucPrdList',
					height: 800
				}
			]
		},
		{
			id : 'auc_bidlist',
			layout: 'fit',
			title : '입찰정보 목록',
			region:'center',
			floatable: false,
			width: '30%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					xtype: 'AucBidList',
					height : 800
				}
			] 
		}
	]
});