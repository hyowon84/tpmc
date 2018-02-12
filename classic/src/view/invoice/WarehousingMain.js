
Ext.define('td.view.invoice.WarehousingMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.WarehousingMain',
	requires:[
		'Ext.ux.grid.Printer',
		'td.view.invoice.WarehousingMainController',
		'td.store.Local',
		'td.store.mbinfo',
		'td.view.combo.Invoice',
		'td.view.grid.InvoiceOrderItemList',
		'td.view.grid.WarehousingTodoInvoiceList'
	],
	controller:'WarehousingMainController',
	closable: true,
	frame : false,
	title: '입고내역 작성',
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
			layout: 'fit',
			title : '입고예정 목록',
			region:'west',
			floatable: false,
			width: '30%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					id : 'WarehousingInvoice',
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
									title: '입고예정내역',
									name: 'WarehousingTodoInvoiceList',
									xtype: 'WarehousingTodoInvoiceList',
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
					id : 'WarehousingItem',
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
									title : '<b>입고관련 품목</b>',
									name : 'WarehousingItemList',
									xtype: 'WarehousingItemList',
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