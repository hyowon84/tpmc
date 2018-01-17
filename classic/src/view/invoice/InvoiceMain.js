
Ext.define('td.view.invoice.InvoiceMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.InvoiceMain',
	requires:[
		'td.view.invoice.InvoiceMainController',
		'td.store.mbinfo',
		'td.view.invoice.winGpSms',
		'td.view.invoice.winGpMemo',
		'td.view.invoice.winMakeInvoice',
		'td.view.grid.InvoiceOrderItemList'
	],
	controller:'InvoiceMainController',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '발주관리',
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
			id : 'InvoiceGplist',
			layout: 'fit',
			title : '공동구매 목록',
			region:'west',
			floatable: false,
			width: '30%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					xtype: 'InvoiceGpList',
					headerPosition: 'left',
					title : '<b>공구별 참고사항</b>',
					border: 0
				}
			]
		},

		{
			layout: 'fit',
			collapsible: false,
			region: 'center',
			scrollable: false,
			width : '70%',
			items : [
				{
					id : 'InvoiceOrderItemList',
					layout: {
						type: 'vbox',
						pack: 'start',
						align: 'stretch'
					},
					collapsible: false,
					scrollable: false,
					bodyBorder: false,
					defaults: {
						bodyPadding: 0
					},
					items: [
						{
							layout: 'fit',
							flex: 1,
							items : [
								{
									headerPosition: 'left',
									title : '<b>공구별 참고사항</b>',
									name : 'InvoiceGpMemo',
									xtype: 'InvoiceGpMemo',
									border: 0
								}
							]
						},
						{
							layout: 'fit',
							flex: 3,
							items : [
								{
									headerPosition: 'left',
									title : '<b>주문신청내역</b>',
									name : 'InvoiceOrderItemList',
									xtype: 'InvoiceOrderItemList',
									border: 0
								}
							]
						}
					]
				}
			]
		}
	]
});