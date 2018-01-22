
Ext.define('td.view.invoice.WireMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.WireMain',
	requires:[
		'td.view.invoice.WireMainController',
		'td.store.mbinfo',
		'td.view.invoice.winGpSms',
		'td.view.invoice.winMakeInvoice',
		'td.view.invoice.winMakeWire',
		'td.view.grid.WireTodoInvoiceList',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.WireTodoInvoiceList',
		'td.view.combo.Invoice'
	],
	controller:'WireMainController',
	closable: true,
	frame : false,
	title: '송금내역서 작성',
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
			//id : 'InvoiceGplist',
			layout: 'fit',
			title : '발주서 목록',
			region:'west',
			floatable: false,
			width: '30%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					id : 'WireInvoice',
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
							items: [
								{
									headerPosition: 'left',
									title: '송금예정발주서',
									name: 'WireTodoInvoiceList',
									xtype: 'WireTodoInvoiceList',
									border: 0
								}
							]
						},
						{
							layout: 'fit',
							flex: 1,
							items : [
								{
									headerPosition: 'left',
									title : '송금완료발주서',
									name : 'WireEndInvoiceList',
									xtype: 'WireEndInvoiceList',
									border: 0
								}
							]
						}
					]
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
					id : 'WireItem',
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
									title : '<b>연결된 공구정보</b>',
									name : 'InvoiceGpInfo',
									xtype: 'InvoiceGpInfo',
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
									title : '<b>송금관련 품목</b>',
									name : 'WireItemList',
									xtype: 'WireItemList',
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