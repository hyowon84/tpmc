

Ext.define('td.view.shipping.ShippingMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ShippingMain',
	requires:[
		'Ext.layout.container.Border',
		'td.view.shipping.ShippingMainController',
		'td.view.combo.Order',
		'td.store.mbinfo',
		'td.view.shipping.winShippingExport',
		'td.view.shipping.winExportShippingMember',
		'td.view.grid.ShippingGpInfoList',
		'td.view.grid.ShippingMbList',
		'td.view.grid.ShippingOrderList'
	],
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '통합배송관리',
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
			title : '구매회원 목록',
			layout: 'fit',
			region:'west',
			floatable: false,
			width: '50%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					id : 'shipping_mbinfo',
					layout: {
						type: 'hbox',
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
							flex: 0.9,
							items : [
								{
									name : 'ShippingGpInfoList',
									xtype: 'ShippingGpInfoList',
									border: 0
								}
							]
						},
						{
							layout: 'fit',
							flex: 2.3,
							items : [
								{
									name : 'ShippingMbList',
									xtype: 'ShippingMbList',
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
			width : '50%',
			items : [
				{
					id : 'shipping_orderlist',
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
							flex: 2,
							items : [
								{
									name : 'ShippingOrderList',
									xtype: 'ShippingOrderList',
									border: 0,
									autoLoad : false
								}
							]
						},
						{
							layout: 'fit',
							flex: 1.5,
							items : [
								{
									name : 'ShipedOrderList',
									xtype: 'ShipedOrderList',
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