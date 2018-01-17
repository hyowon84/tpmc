
Ext.define('td.view.shipping.winShippingExport', {
	extend: 'Ext.window.Window',
	xtype: 'winShippingExport',
	reference: 'winShippingExport',
	title: '배송예정 목록',
	width: 1400,
	minWidth: 350,
	maxWidth:1900,
	height: 600,
	scrollable: true,
	closable: true,
	closeAction: 'hide',
	x: -800, y: 50,
	//maximizable: true,
	layout : 'fit',
	items: [
		{
			xtype: 'form',
			alias:'widget.ShippingExportForm',
			reference: 'ShippingExportListForm',
			frame:false,
			url : '/resources/crud/shipping/shippingform.update.php',
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 120,
				msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
			},
			width: '100%',
			height:600,
			autoScroll:true,
			split: false,
			collapsible: false,
			floatable: false,
			layout : 'fit',
			items: [
				{//상태변경시 pk값으로 이용
					xtype: 'textfield',
					hidden : true,
					name: 'hphone'
				},
				{
					xtype : 'ShippingExportList',
					width : 500,
					height: 300
				}
			],

			listeners: {
				//afterrender: 'mbInfoLoading'
			},

			buttons: [
				{
					xtype: 'statusbar',
					dock: 'bottom',
					reference: 'sb_shipping',
					name : 'sb_shipping',
					defaultText: '대기..',
					//style : 'background:#e0ebf3',
					plugins: {
						ptype: 'validationstatus',
						form: 'ShippingExportListForm'
					}
				},'->',
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					items: [
						,
						{
							xtype: 'cb_shippingstats',
							reference: 'shippingstats',
							value: '25'
						},
						{
							text: '상태변경',
							iconCls: 'icon-table_edit',
							handler: 'updateOrderStats'
						},
						{
							xtype: 'textfield',
							reference: 'refund_money',
							emptyText: '환불금액',
							name: 'refund_money'
						},
						{
							xtype: 'textfield',
							reference: 'delivery_invoice',
							emptyText: '송장번호',
							name: 'delivery_invoice'
						},
						{
							text: '운송장갱신',
							iconCls: 'icon-table_edit',
							handler: 'updateDeliveryInvoice'
						},
						{
							text: '취소',
							handler: 'cancelExportShipping'
						}
					]
				}
			]
		}
	]
});
