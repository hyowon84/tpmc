
Ext.define('td.view.invoice.ClearanceMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ClearanceMain',
	requires:[
		'Ext.ux.grid.Printer',
		'td.view.invoice.ClearanceMainController',
		'td.store.Local',
		'td.store.mbinfo',
		'td.view.combo.Invoice',
		'td.view.invoice.winMakeClearance',
		'td.view.grid.InvoiceOrderItemList',
		'td.view.grid.ClearanceTodoInvoiceList'
	],
	controller:'ClearanceMainController',
	closable: true,
	frame : false,
	title: '통관내역서 작성',
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
			title : '통관 목록',
			region:'west',
			floatable: false,
			width: '30%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					id : 'ClearanceInvoice',
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
									title: '통관예정발주서',
									name: 'ClearanceTodoInvoiceList',
									xtype: 'ClearanceTodoInvoiceList',
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
									title : '통관완료발주서',
									name : 'ClearanceEndInvoiceList',
									xtype: 'ClearanceEndInvoiceList',
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
					id : 'ClearanceItem',
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
									title : '<b>통관관련 품목</b>',
									name : 'ClearanceItemList',
									xtype: 'ClearanceItemList',
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