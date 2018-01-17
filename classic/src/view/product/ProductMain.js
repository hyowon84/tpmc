
Ext.define('td.view.product.ProductMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ProductMain',
	requires:[
		'Ext.ux.*',
		'Ext.layout.container.Border',
		'td.view.product.ProductMainController',
		'td.store.mbinfo',
		'td.store.Local',				
		'td.view.combo.Product',
		'td.view.grid.GpInfoList',
		'td.view.grid.ProductList'
	],
	controller:'ProductMainController',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '상품관리',
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
			id : 'prd_gpinfo',
			layout: 'fit',
			title : '분류',
			region:'west',
			floatable: false,
			width: '30%',
			scrollable: false,
			items : [
				{
					xtype: 'GpInfoList',
					height : 800
				}
			] 
		},
		{
			id : 'prd_product',
			layout: 'fit',
			title : '상품 목록',
			collapsible: false,
			region: 'center',
			scrollable: false,
			width : '70%',
			items : [
				{
					xtype: 'ProductList',
					height: 800
				}
			]
		}
	]
});