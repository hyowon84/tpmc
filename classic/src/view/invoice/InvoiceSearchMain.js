
Ext.define('td.view.invoice.InvoiceSearchMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.InvoiceSearchMain',
	requires:[
		'Ext.ux.*',
		'Ext.layout.container.Border',
		'td.view.invoice.InvoiceSearchMainController',
		'td.store.mbinfo',
		'td.store.Local',
		'td.view.grid.InvoiceList'
	],
	controller:'InvoiceSearchMainController',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '발주서 조회',
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
			id : 'InvoiceList',
			layout: 'fit',
			title : '발주서',
			region:'west',
			floatable: false,
			width: '70%',
			scrollable: false,
			items : [
				{
					xtype: 'InvoiceList',
					height : 800
				}
			]
		},
		{
			id : 'InvoiceItem',
			layout: 'fit',
			title : '연결된 발주 품목',
			collapsible: false,
			region: 'center',
			scrollable: false,
			width : '30%',
			items : [
				{
					xtype: 'InvoiceItemList',
					height: 800
				}
			]
		}
	]
});